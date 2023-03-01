import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import CardPokemon from '../Components/CardPokemon';
import PokeSearch from '../Components/PokeSearch';
import { AppContext } from '../Provider/Provider'

export default function SearchPage() {
  //usamos useLocation para poder saber la informacion que estamos trayendo con la busqueda
  const location = useLocation();
  // console.log(location)
  //globalPokemon: nos trae la informacion que encuentra de todos los pokemons que contengan la referencia de los datos ingresados en el buscador
  const {globalPokemon} = useContext(AppContext);

  //fitrado de pokemons por nombre
  const filteredPokemon = globalPokemon.filter((pokemon)=>
    //aca isntanciamos la informacion que se recoge de todos los pokemons al estado 
    pokemon.name.includes(location.state.toLowerCase()))
  // console.log(filteredPokemon)
  return (
    <>
      <PokeSearch/>
      <div className="container">
        <p className="p-search">
          Se encontraron <span>{filteredPokemon.length}</span> resultados
        </p>
        <div className="card-list-pokemon">
          {/*PARA MOSTRAR LOS POKEMONS ENTONTRADOS */}
          {filteredPokemon.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
        </div>
      </div>
    </>
  )
}
