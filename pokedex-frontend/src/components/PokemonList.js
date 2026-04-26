import React from 'react';
import { getSpriteUrl, POKEMON_PLACEHOLDER } from '../utils/placeholders';
import './PokemonList.css';

function PokemonList({ pokemon, onSelect, selectedId }) {
  return (
    <div className="pokemon-list">
      <h2>Pokémon List</h2>
      <div className="list-container">
        {pokemon.map((poke) => (
          <div
            key={poke.id}
            className={`pokemon-item ${selectedId === poke.id ? 'selected' : ''} ${
              poke.isCustom ? 'custom' : ''
            }`}
            onClick={() => onSelect(poke)}
          >
            <img 
              src={getSpriteUrl(poke.sprite)} 
              alt={poke.name} 
              onError={(e) => {
                e.target.src = POKEMON_PLACEHOLDER;
              }}
            />
            <p className="pokemon-name">{poke.name}</p>
            {poke.isCustom && <span className="custom-badge">Custom</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
