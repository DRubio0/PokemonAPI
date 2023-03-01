import React, { useContext } from "react";
import { AppContext } from "../Provider/Provider";
import CardPokemon from "./CardPokemon";
import Loader from "./Loader";

export default function PokemonList() {
 
  /*
    allPokemon: mandamos a llamar a todos los 20 pokemon que el metodo AXIOS recoge
    loading: damos inicio al estado para que los datos sean llamador y en lo que se espera muestra un Loader creado en un componente
    filtederPokemon: nos mustra en las CARD los pokemons que se selecionan con en filtrado
    */
  const { allPokemon, loading, filteredPokemon } = useContext(AppContext);
  return (
    <>
    {/* al iniciar la aplicacion que cargue un Loader para darle tiempo la peticion de hacer la busqueda */}
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">
          {/* para mostrar los pókemons que se buscan por medio del search */}
          {filteredPokemon.length ? (
            <>
              {filteredPokemon.map((pokemon) => (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {/* Si no se a ingresado un pokemon en el buscador que despliegue el siguiente metodo */}
              {/* Muestra los pokemon en la pagina de inicio */}
              {allPokemon.map((pokemon) => (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
