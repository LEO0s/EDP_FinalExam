const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for custom Pokémon and deleted Pokémon IDs
let customPokemon = [];
let deletedPokemonIds = []; // Track deleted Pokémon (both API and custom)

// PokéAPI base URL
const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

// ==================== GET ENDPOINTS ====================

// Get 30 Pokémon from PokéAPI
app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get(`${POKEAPI_BASE}/pokemon?limit=30`);
    const pokemonList = response.data.results;

    // Fetch details for each Pokémon
    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        try {
          const details = await axios.get(pokemon.url);
          // Skip if marked as deleted
          if (deletedPokemonIds.includes(details.data.id)) {
            return null;
          }
          return {
            id: details.data.id,
            name: details.data.name,
            sprite: details.data.sprites.front_default,
            isCustom: false
          };
        } catch (error) {
          return null;
        }
      })
    );

    // Combine with custom Pokémon (also filter out deleted ones)
    const activePokemon = [...pokemonDetails.filter(p => p !== null)];
    const activeCustom = customPokemon.filter(p => !deletedPokemonIds.includes(p.id));
    const allPokemon = [...activePokemon, ...activeCustom];
    
    res.json(allPokemon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon list' });
  }
});

// Get details of a specific Pokémon
app.get('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if it's a custom Pokémon
    const customPoke = customPokemon.find(p => p.id === id);
    if (customPoke) {
      return res.json(customPoke);
    }

    // Fetch from PokéAPI
    const pokemonResponse = await axios.get(`${POKEAPI_BASE}/pokemon/${id}`);
    const speciesResponse = await axios.get(`${POKEAPI_BASE}/pokemon-species/${id}`);

    const pokemon = pokemonResponse.data;
    const species = speciesResponse.data;

    // Extract flavor text (description)
    const description = species.flavor_text_entries
      .find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';

    const details = {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      weight: pokemon.weight,
      height: pokemon.height,
      baseExperience: pokemon.base_experience,
      stats: pokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      abilities: pokemon.abilities.map(ability => ability.ability.name),
      cry: pokemon.cries?.latest || null,
      description: description,
      isCustom: false
    };

    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon details' });
  }
});

// ==================== CREATE ENDPOINT ====================

// Create a custom Pokémon
app.post('/api/pokemon', (req, res) => {
  const { name, abilities, baseExperience, stats, weight, height, description, sprite } = req.body;

  // Validate required fields
  if (!name || !abilities || baseExperience === undefined || !stats || weight === undefined || height === undefined || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newPokemon = {
    id: `custom-${Date.now()}`,
    name,
    abilities: Array.isArray(abilities) ? abilities : [abilities],
    baseExperience,
    stats: Array.isArray(stats) ? stats : [stats],
    weight,
    height,
    description,
    sprite: sprite || 'https://via.placeholder.com/96',
    isCustom: true
  };

  customPokemon.push(newPokemon);
  res.status(201).json(newPokemon);
});

// ==================== UPDATE ENDPOINT ====================

// Update a custom Pokémon
app.patch('/api/pokemon/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, weight, height, abilities, baseExperience } = req.body;

  const pokemonIndex = customPokemon.findIndex(p => p.id === id);

  if (pokemonIndex === -1) {
    return res.status(404).json({ error: 'Pokémon not found' });
  }

  // Update fields
  if (name !== undefined) customPokemon[pokemonIndex].name = name;
  if (description !== undefined) customPokemon[pokemonIndex].description = description;
  if (weight !== undefined) customPokemon[pokemonIndex].weight = weight;
  if (height !== undefined) customPokemon[pokemonIndex].height = height;
  if (abilities !== undefined) customPokemon[pokemonIndex].abilities = Array.isArray(abilities) ? abilities : [abilities];
  if (baseExperience !== undefined) customPokemon[pokemonIndex].baseExperience = baseExperience;

  res.json(customPokemon[pokemonIndex]);
});

// ==================== DELETE ENDPOINT ====================

// Delete a Pokémon (custom or API)
app.delete('/api/pokemon/:id', (req, res) => {
  const { id } = req.params;
  
  // Check if it's a custom Pokémon
  const customIndex = customPokemon.findIndex(p => p.id === id);
  
  if (customIndex !== -1) {
    // Remove custom Pokémon from array
    const deleted = customPokemon.splice(customIndex, 1);
    // Also add to deleted list for consistency
    if (!deletedPokemonIds.includes(id)) {
      deletedPokemonIds.push(id);
    }
    return res.json({ message: 'Pokémon deleted', pokemon: deleted[0] });
  }
  
  // Check if it's an API Pokémon (numeric ID)
  const numericId = parseInt(id);
  if (!isNaN(numericId)) {
    if (!deletedPokemonIds.includes(numericId)) {
      deletedPokemonIds.push(numericId);
    }
    return res.json({ 
      message: 'Pokémon deleted', 
      pokemon: { id: numericId, name: 'Deleted Pokémon' } 
    });
  }
  
  res.status(404).json({ error: 'Pokémon not found' });
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`Pokédex backend server is running on http://localhost:${PORT}`);
});
