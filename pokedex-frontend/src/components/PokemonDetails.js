import React from 'react';
import './PokemonDetails.css';

function PokemonDetails({ pokemon }) {
  return (
    <div className="pokemon-details">
      <div className="details-header">
        <img src={pokemon.sprite} alt={pokemon.name} className="main-sprite" />
        <h2>{pokemon.name}</h2>
        {pokemon.isCustom && <span className="badge">Custom Pokémon</span>}
      </div>

      <div className="details-section">
        <h3>Description</h3>
        <p>{pokemon.description}</p>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <h4>Height</h4>
          <p>{pokemon.height} dm</p>
        </div>
        <div className="detail-item">
          <h4>Weight</h4>
          <p>{pokemon.weight} hg</p>
        </div>
        <div className="detail-item">
          <h4>Base Experience</h4>
          <p>{pokemon.baseExperience}</p>
        </div>
      </div>

      {pokemon.abilities && pokemon.abilities.length > 0 && (
        <div className="details-section">
          <h3>Abilities</h3>
          <div className="abilities">
            {pokemon.abilities.map((ability, index) => (
              <span key={index} className="ability-tag">
                {ability}
              </span>
            ))}
          </div>
        </div>
      )}

      {pokemon.stats && pokemon.stats.length > 0 && (
        <div className="details-section">
          <h3>Stats</h3>
          <div className="stats">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-name">{stat.name}</span>
                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{
                      width: `${Math.min((stat.value / 150) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pokemon.cry && (
        <div className="details-section">
          <h3>Cry</h3>
          <audio controls src={pokemon.cry} />
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
