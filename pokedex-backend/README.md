# Pokédex Backend API

Express.js backend for the Pokédex Web Application.

## Installation

```bash
npm install
```

## Running the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### GET /api/pokemon
Fetches 30 Pokémon from PokéAPI + any custom Pokémon.

### GET /api/pokemon/:id
Fetches details of a specific Pokémon (including description, stats, abilities, etc.)

### POST /api/pokemon
Creates a new custom Pokémon.

**Body:**
```json
{
  "name": "string",
  "abilities": ["string"],
  "baseExperience": number,
  "stats": [{"name": "string", "value": number}],
  "weight": number,
  "height": number,
  "description": "string",
  "sprite": "string (optional URL)"
}
```

### PATCH /api/pokemon/:id
Updates a custom Pokémon.

**Body:** (All fields optional)
```json
{
  "name": "string",
  "description": "string",
  "weight": number,
  "height": number,
  "abilities": ["string"],
  "baseExperience": number
}
```

### DELETE /api/pokemon/:id
Deletes a custom Pokémon.

## Data Storage

Custom Pokémon are stored in-memory. For production, consider using a database like MongoDB or PostgreSQL.
