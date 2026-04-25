# Pokédex Frontend

React-based frontend for the Pokédex Web Application.

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

Make sure the backend server is running on `http://localhost:5000`

## Features

- **View Pokémon**: Browse 30 Pokémon from PokéAPI
- **View Details**: Click any Pokémon to see detailed information
- **Create**: Add custom Pokémon entries
- **Edit**: Modify custom Pokémon details
- **Delete**: Remove custom Pokémon
- **Stats Visualization**: Visual representation of Pokémon stats

## Components

- **App.js**: Main application component with state management
- **PokemonList.js**: Displays list of Pokémon
- **PokemonDetails.js**: Shows detailed information about selected Pokémon
- **CreatePokemonForm.js**: Form to create new Pokémon
- **EditPokemonForm.js**: Form to edit existing custom Pokémon

## API Integration

The frontend communicates with the backend API at:
- `http://localhost:5000/api/pokemon`

Make sure the backend server is running before starting the frontend.
