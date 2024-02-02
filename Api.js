import axios from 'axios';

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const results = response.data.results;

    const pokemonDataPromises = results.map(async (pokemon) => {
      const pokemonDetails = await axios.get(pokemon.url);
    
      const types = pokemonDetails.data.types.map(type => type.type.name);
    
      return {
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), 
        imageUrl: pokemonDetails.data.sprites.front_default,
        id: pokemonDetails.data.id,
        types: types
      };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData.slice(0, 200);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};
