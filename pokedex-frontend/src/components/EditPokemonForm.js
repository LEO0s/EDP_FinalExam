import React, { useState } from 'react';
import './Forms.css';

function EditPokemonForm({ pokemon, onSubmit }) {
  const [formData, setFormData] = useState({
    name: pokemon.name,
    description: pokemon.description,
    weight: pokemon.weight,
    height: pokemon.height,
    abilities: pokemon.abilities.join(', '),
    baseExperience: pokemon.baseExperience,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      description: formData.description,
      weight: parseInt(formData.weight),
      height: parseInt(formData.height),
      abilities: abilitiesArray,
      baseExperience: parseInt(formData.baseExperience),
    };

    onSubmit(submitData);
  };

  return (
    <form className="form edit-form" onSubmit={handleSubmit}>
      <h3>Edit Pokémon</h3>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Abilities (comma-separated)</label>
        <input
          type="text"
          name="abilities"
          value={formData.abilities}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Base Experience</label>
          <input
            type="number"
            name="baseExperience"
            value={formData.baseExperience}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Weight (hg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Height (dm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Changes
      </button>
    </form>
  );
}

export default EditPokemonForm;
