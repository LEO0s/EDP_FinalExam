// Placeholder image for custom Pokémon without sprites
export const POKEMON_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ccircle cx="100" cy="80" r="40" fill="%23cccccc"/%3E%3Cellipse cx="100" cy="140" rx="45" ry="35" fill="%23cccccc"/%3E%3Ctext x="100" y="180" font-size="14" text-anchor="middle" fill="%23999999"%3ENo Image%3C/text%3E%3C/svg%3E';

// Function to get sprite URL with fallback
export const getSpriteUrl = (sprite) => {
  return sprite && sprite.trim() ? sprite : POKEMON_PLACEHOLDER;
};
