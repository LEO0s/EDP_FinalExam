import React, { useState } from 'react';
import { getSpriteUrl, POKEMON_PLACEHOLDER } from '../utils/placeholders';
import './Forms.css';

function CreatePokemonForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    abilities: '',
    baseExperience: '',
    weight: '',
    height: '',
    description: '',
    sprite: '',
    stats: [
      { name: 'hp', value: 50 },
      { name: 'attack', value: 50 },
      { name: 'defense', value: 50 },
      { name: 'sp-attack', value: 50 },
      { name: 'sp-defense', value: 50 },
      { name: 'speed', value: 50 },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatChange = (index, value) => {
    const newStats = [...formData.stats];
    newStats[index].value = parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      stats: newStats,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const abilitiesArray = formData.abilities
      .split(',')
      .map((ab) => ab.trim())
      .filter((ab) => ab);

    const submitData = {
      name: formData.name,
      abilities: abilitiesArray,
      baseExperience: parseInt(formData.baseExperience),
      weight: parseInt(formData.weight),
      height: parseInt(formData.height),
      description: formData.description,
      sprite: formData.sprite || undefined,
      stats: formData.stats,
    };

    onSubmit(submitData);
    setFormData({
      name: '',
      abilities: '',
      baseExperience: '',
      weight: '',
      height: '',
      description: '',
      sprite: '',
      stats: [
        { name: 'hp', value: 50 },
        { name: 'attack', value: 50 },
        { name: 'defense', value: 50 },
        { name: 'sp-attack', value: 50 },
        { name: 'sp-defense', value: 50 },
        { name: 'speed', value: 50 },
      ],
    });
  };

  return (
    <form className="form create-form" onSubmit={handleSubmit}>
      <h3>Create New Pokémon</h3>

      <div className="form-group">
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Abilities * (comma-separated)</label>
        <input
          type="text"
          name="abilities"
          placeholder="ability1, ability2"
          value={formData.abilities}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Base Experience *</label>
          <input
            type="number"
            name="baseExperience"
            value={formData.baseExperience}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Weight (hg) *</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Height (dm) *</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Sprite URL (optional)</label>
        <input
          type="url"
          name="sprite"
          value={formData.sprite}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
        />
        <div className="sprite-preview">
          <p className="preview-label">Preview:</p>
          <img 
            src={getSpriteUrl(formData.sprite)} 
            alt="sprite-preview" 
            onError={(e) => {
              e.target.src = POKEMON_PLACEHOLDER;
            }}
            className="preview-image"
          />
          {!formData.sprite && <p className="placeholder-note">(Placeholder will be used)</p>}
        </div>
      </div>

      <div className="stats-section">
        <h4>Stats</h4>
        {formData.stats.map((stat, index) => (
          <div key={index} className="stat-input">
            <label>{stat.name}</label>
            <input
              type="range"
              min="0"
              max="150"
              value={stat.value}
              onChange={(e) => handleStatChange(index, e.target.value)}
            />
            <span className="stat-value-display">{stat.value}</span>
          </div>
        ))}
      </div>

      <button type="submit" className="submit-btn">
        Create Pokémon
      </button>
    </form>
  );
}

export default CreatePokemonForm;
