// Añadir un evento al botón para buscar el Pokémon
document.getElementById('search-button').addEventListener('click', function() {
    const pokemonName = document.getElementById('search-input').value.toLowerCase();
    fetchPokemon(pokemonName);
  });
  
  // Función para obtener información del Pokémon desde la API
  async function fetchPokemon(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const data = await response.json();
      displayPokemon(data);
    } catch (error) {
      document.getElementById('pokemon-info').innerHTML = `<p>${error.message}</p>`;
    }
  }
  
  // Función para mostrar la información del Pokémon
  function displayPokemon(pokemon) {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemonTypes = pokemon.types.map(type => type.type.name).join(', ');
    const pokemonStats = pokemon.stats.map(stat => {
      return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
    }).join('');
    const pokemonImage = pokemon.sprites.front_default;
  
    // Actualizamos la imagen del Pokémon
    document.getElementById('pokemon-image').src = pokemonImage;
  
    // Mostrar la información en el cuadro al lado de la Pokébola
    const pokemonInfo = `
      <h2>${pokemonName}</h2>
      <p><strong>Tipos:</strong> ${pokemonTypes}</p>
      <div><strong>Estadísticas:</strong>${pokemonStats}</div>
    `;
  
    document.getElementById('pokemon-info').innerHTML = pokemonInfo;
  }
  