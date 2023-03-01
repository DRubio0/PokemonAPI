import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarouselCard } from "../Components/CarouselCard";
import Loader from "../Components/Loader";


//icons
import { GiArchiveResearch } from "react-icons/gi";
export const PokeRange = () => {
  /**declaramos un estado para mandar a llamar informacion de la API */
  const [pokeData, setPokeData] = useState([]);
  /**Tambien declaramos un estado de carga incial para dar tiempo que haga el llamado */
  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(1);

  /**Funcion para mandar a llamar a 200 pokemons para que los muestre en el Carousel con el metodo AXIOS */
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset -1}`
        );
        const { results } = res.data;
        const pokeUrl = results.map((result) => result.url);
        const pokeData = await Promise.all(
          pokeUrl.map(async (url) => {
            const res = await axios.get(url);
            return res.data;
          })
        );
        setPokeData(pokeData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    /**Imprimimos los datos que recoge la funcion */
    fetchPokemonData();
  }, [limit, offset]);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleOffsetChange = (e) => {
    setOffset(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <h1>Pokémon List <GiArchiveResearch size={'3rem'}/></h1>
            <p>Declaramos dos variables llamadas "limit" y "offset" las cuales son las que recibiran los datos que se ingresen en los input. <br />
            Y esos datos son enviados a la peticion AXIOS para que pueda trabajar con los parametros ingresados alterando el link de la peticion GET <br /> <b> (https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}) </b></p>
            <div className="handle-input">
              
              <div>
                <label htmlFor="limit-input">Limit : </label>
                <input
                  id="limit-input"
                  type="number"
                  min={"1"}
                  max={'10000'}
                  value={limit}
                  onChange={handleLimitChange}
                />
              </div>
              <div>
                <label htmlFor="offset-input">Offset : </label>
                <input
                  id="offset-input"
                  type="number"
                  min={"1"}
                  max={'10000'}
                  value={offset}
                  onChange={handleOffsetChange}
                />
              </div>
            </div>
          </div>
          <div className="card-container container">
            {pokeData.map((pokemon) => (
              <CarouselCard key={pokemon.id} pokeData={pokemon} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
