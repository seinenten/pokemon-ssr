//* Por ids de Pokemons
// /pokemons/1
// /pokemons/2
// /pokemons/3
// /pokemons/4
// /pokemons/5
//* Por nombres de Pokemons
// /pokemons/ekans
//* Por paginas
// /pokemons/page/1
// /pokemons/page/2
// /pokemons/page/3
// /pokemons/page/4

const TOTAL_POKEMONS = 100;
const TOTAL_PAGES = 5;

( async () => {

  const fs = require('fs');

  //* generamos un arreglo o un ciclo
  const pokemonIds = Array.from({ length:TOTAL_POKEMONS }, (_ , i) => i + 1 );
  const pokemonPagesIds = Array.from({ length:TOTAL_PAGES }, (_ , i) => i + 1 );

  //* Le concatenamos el link al arreglo
  let fileContentPokemonId = pokemonIds.map(
    id => `/pokemons/${ id }`
  ).join('\n')

  const fileContentPokemonPagesId = pokemonPagesIds.map(
    id => `/pokemons/page/${ id }`
  ).join('\n')

  //* Por nombres de Pokemons
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then( res => res.json() );

  //* Le concatenamos el link al arreglo
  fileContentPokemonId += '\n';
  fileContentPokemonId += pokemonNameList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join( '\n' );

  //* Concatenar los contenidos
  const combinedContent = `${fileContentPokemonId}\n${fileContentPokemonPagesId}`;

  fs.writeFileSync('routes.txt', combinedContent);

  console.log('Routes.txt Generated');

} )();
