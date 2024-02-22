import axios from 'axios';

export const fetchPokemonList = async () => {
  try {
    let allPokemon = [];
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon';
    let count = 0;

    // Nombre de pages à récupérer
    const pagesToFetch = 8;

    while (nextUrl && count < pagesToFetch) {
      const response = await axios.get(nextUrl);
      const { results, next } = response.data;
      
      // Récupérer les détails de chaque Pokémon
      const pokemonDataPromises = results.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        const types = pokemonDetails.data.types.map(type => type.type.name);
        
        // Récupérer l'URL de l'espèce
        const speciesUrl = pokemonDetails.data.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        
        const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'fr');

        // Récupérer le nom français du Pokémon
        const frenchName = speciesResponse.data.names.find(name => name.language.name === 'fr').name;

        return {
          name: frenchName.charAt(0).toUpperCase() + frenchName.slice(1), 
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.data.id}.png`,
          gifUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetails.data.id}.gif`,
          shinyImageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonDetails.data.id}.png`,
          pokemonNoShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`,
          id: pokemonDetails.data.id,
          types: types,
          weight: pokemonDetails.data.weight,
          height: pokemonDetails.data.height,
          description: description ? description.flavor_text : 'Description non disponible'
        };
      });

      const pokemonData = await Promise.all(pokemonDataPromises);
      allPokemon = [...allPokemon, ...pokemonData];

      nextUrl = next; 
      count++;
    }

    return allPokemon;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};
