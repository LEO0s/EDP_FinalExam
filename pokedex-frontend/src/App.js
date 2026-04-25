import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import CreatePokemonForm from './components/CreatePokemonForm';
import EditPokemonForm from './components/EditPokemonForm';

const API_BASE = 'http://localhost:5000/api';
const STORAGE_KEY = 'pokedex_custom_pokemon';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load custom Pokémon from localStorage
  const loadCustomPokemonFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  };

  // Save custom Pokémon to localStorage
  const saveCustomPokemonToStorage = (customPokemonList) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customPokemonList));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Sync custom Pokémon from localStorage to backend on app load
  const syncCustomPokemonToBackend = async () => {
    const customPokemon = loadCustomPokemonFromStorage();
    if (customPokemon.length > 0) {
      try {
        // Recreate custom Pokémon on backend
        for (const pokemon of customPokemon) {
          await axios.post(`${API_BASE}/pokemon`, pokemon);
        }
      } catch (error) {
        console.warn('Could not sync custom Pokémon to backend:', error.message);
        // This is okay - local data will still be available from localStorage
      }
    }
  };

  // Fetch all Pokémon on component mount
  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/pokemon`);
      const customFromStorage = loadCustomPokemonFromStorage();
      
      // Combine API Pokémon with localStorage custom Pokémon
      const allPokemon = [...response.data, ...customFromStorage];
      setPokemon(allPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      // Still load custom Pokémon from storage even if API fails
      const customFromStorage = loadCustomPokemonFromStorage();
      setPokemon(customFromStorage);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPokemon = async (poke) => {
    try {
      const response = await axios.get(`${API_BASE}/pokemon/${poke.id}`);
      setSelectedPokemon(response.data);
      setShowCreateForm(false);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const handleCreatePokemon = async (newPokemon) => {
    try {
      const response = await axios.post(`${API_BASE}/pokemon`, newPokemon);
      const createdPokemon = response.data;
      
      // Update state
      const updatedList = [...pokemon, createdPokemon];
      setPokemon(updatedList);
      
      // Save to localStorage
      const customPokemon = updatedList.filter(p => p.isCustom);
      saveCustomPokemonToStorage(customPokemon);
      
      setShowCreateForm(false);
      alert('Pokémon created successfully!');
    } catch (error) {
      console.error('Error creating Pokémon:', error);
      alert('Error creating Pokémon. Please check all required fields.');
    }
  };

  const handleUpdatePokemon = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${API_BASE}/pokemon/${id}`, updatedData);
      const updatedList = pokemon.map(p => p.id === id ? response.data : p);
      setPokemon(updatedList);
      
      // Save to localStorage
      const customPokemon = updatedList.filter(p => p.isCustom);
      saveCustomPokemonToStorage(customPokemon);
      
      setSelectedPokemon(response.data);
      setShowEditForm(false);
      alert('Pokémon updated successfully!');
    } catch (error) {
      console.error('Error updating Pokémon:', error);
      alert('Error updating Pokémon.');
    }
  };

  const handleDeletePokemon = async (id) => {
    if (window.confirm('Are you sure you want to delete this Pokémon?')) {
      try {
        await axios.delete(`${API_BASE}/pokemon/${id}`);
        const updatedList = pokemon.filter(p => p.id !== id);
        setPokemon(updatedList);
        
        // Save to localStorage
        const customPokemon = updatedList.filter(p => p.isCustom);
        saveCustomPokemonToStorage(customPokemon);
        
        setSelectedPokemon(null);
        alert('Pokémon deleted successfully!');
      } catch (error) {
        console.error('Error deleting Pokémon:', error);
        alert('Error deleting Pokémon.');
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔴 Pokédex 🔴</h1>
        <p>Gotta Catch 'Em All!</p>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <button className="create-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? 'Cancel' : '+ Add New Pokémon'}
          </button>

          {showCreateForm && (
            <CreatePokemonForm onSubmit={handleCreatePokemon} />
          )}

          {loading ? (
            <div className="loading">Loading Pokémon...</div>
          ) : (
            <PokemonList
              pokemon={pokemon}
              onSelect={handleSelectPokemon}
              selectedId={selectedPokemon?.id}
            />
          )}
        </div>

        <div className="right-panel">
          {selectedPokemon ? (
            <>
              <PokemonDetails pokemon={selectedPokemon} />

              <div className="action-buttons">
                {selectedPokemon.isCustom && (
                  <button
                    className="edit-btn"
                    onClick={() => setShowEditForm(!showEditForm)}
                  >
                    {showEditForm ? 'Cancel' : '✏️ Edit'}
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDeletePokemon(selectedPokemon.id)}
                >
                  🗑️ Delete
                </button>
              </div>

              {showEditForm && selectedPokemon.isCustom && (
                <EditPokemonForm
                  pokemon={selectedPokemon}
                  onSubmit={(data) => handleUpdatePokemon(selectedPokemon.id, data)}
                />
              )}
            </>
          ) : (
            <div className="no-selection">
              <p>Select a Pokémon to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
