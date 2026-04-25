import React from 'react';
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
            <img src={poke.sprite} alt={poke.name} />
            <p className="pokemon-name">{poke.name}</p>
            {poke.isCustom && <span className="custom-badge">Custom</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
