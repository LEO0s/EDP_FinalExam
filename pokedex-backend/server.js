const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for custom Pokémon, deleted Pokémon IDs, and edited API Pokémon
let customPokemon = [];
let deletedPokemonIds = []; // Track deleted Pokémon (both API and custom)
let editedApiPokemon = {}; // Store edits to API Pokémon: { id: { changes } }

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

    // Apply any edits to this API Pokémon
    if (editedApiPokemon[id]) {
      const edits = editedApiPokemon[id];
      if (edits.name) details.name = edits.name;
      if (edits.description) details.description = edits.description;
      if (edits.weight !== undefined) details.weight = edits.weight;
      if (edits.height !== undefined) details.height = edits.height;
      if (edits.abilities) details.abilities = edits.abilities;
      if (edits.baseExperience !== undefined) details.baseExperience = edits.baseExperience;
    }

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

// Update a Pokémon (custom or API)
app.patch('/api/pokemon/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, weight, height, abilities, baseExperience } = req.body;

  // Check if it's a custom Pokémon
  const customIndex = customPokemon.findIndex(p => p.id === id);

  if (customIndex !== -1) {
    // Update custom Pokémon
    if (name !== undefined) customPokemon[customIndex].name = name;
    if (description !== undefined) customPokemon[customIndex].description = description;
    if (weight !== undefined) customPokemon[customIndex].weight = weight;
    if (height !== undefined) customPokemon[customIndex].height = height;
    if (abilities !== undefined) customPokemon[customIndex].abilities = Array.isArray(abilities) ? abilities : [abilities];
    if (baseExperience !== undefined) customPokemon[customIndex].baseExperience = baseExperience;

    return res.json(customPokemon[customIndex]);
  }

  // Check if it's an API Pokémon (numeric ID)
  const numericId = parseInt(id);
  if (!isNaN(numericId)) {
    // Store edits to API Pokémon
    if (!editedApiPokemon[numericId]) {
      editedApiPokemon[numericId] = {};
    }

    if (name !== undefined) editedApiPokemon[numericId].name = name;
    if (description !== undefined) editedApiPokemon[numericId].description = description;
    if (weight !== undefined) editedApiPokemon[numericId].weight = weight;
    if (height !== undefined) editedApiPokemon[numericId].height = height;
    if (abilities !== undefined) editedApiPokemon[numericId].abilities = Array.isArray(abilities) ? abilities : [abilities];
    if (baseExperience !== undefined) editedApiPokemon[numericId].baseExperience = baseExperience;

    return res.json({
      message: 'API Pokémon updated',
      id: numericId,
      edits: editedApiPokemon[numericId]
    });
  }

  res.status(404).json({ error: 'Pokémon not found' });
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
