/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { useForm } from "../Components/hook/UseForm";
import axios from "axios";

export default function MyProvider(props) {
  //Estados iniciales para la aplicacion
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  /*METODO AXIOS MANDANDO A LLAMAR A 20 POKEMONS */
  const [allPokemon, setAllPokemon] = useState([]);
  const [offset, setOffset] = useState(0);

  const getAllPokemon = async (limit = 20) => {
    const url = "https://pokeapi.co/api/v2/";
    axios
      .get(`${url}pokemon?limit=${limit}&offset=${offset}`)
      .then(async (res) => {
        const promise = res.data.results.map(async (pokemon) => {
          //Aca necesitamos obtener la informacion mas detallada de cada pokemon y para eso utlizamos dentro del metodo AXIOS una funcion FERCH porque necesitamos mandar una promesa con la informacion mas detallada
          const res = await fetch(pokemon.url);
          const data = await res.json();
          //console.log(data);
          return data;
        });
        const results = await Promise.all(promise);
        setAllPokemon([...allPokemon, ...results]);
        setLoading(false);
      });
  };

  //Metodo para que cargue 20 pokemons mas a la pagina
  const onClickLoadMore = () => {
    setOffset(offset + 20);
  };

  useEffect(() => {
    getAllPokemon();
    //aca se le asigana a Hook que este atento a actualizar cada vez que
    // offset cambie su valor
  }, [offset]);

  /*METODO FECHT MANDANDO A LLAMAR A TODOS LOS POKEMONS QUE CONTIENE LA API */
  const [globalPokemon, setGlobalPokemon] = useState([]);

  const getGlobalPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${url}pokemon?limit=100000&offset=0`);
    const data = await res.json();
    // console.log(data)
    //Mapeando la infomracion de forma mas detallada de cada Pokemon
    const promise = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      //console.log(data)
      return data;
    });
    // console.log(promise)
    const results = await Promise.all(promise);
    //guardamos el estado
    setGlobalPokemon(results);
    setLoading(false);
  };

  useEffect(() => {
    getGlobalPokemon();
  }, []);

  /*FUNCIONES PARA EL BUSCADOR */
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  /*FILTRADO DE POKEMON POR TIPO */
  //iniciamos el tipo de pokemons en FALSE ya que utilizamos un checkbox que siempre nos genera un valor boolean 
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  //metodo para validar el tipo de pokemon
  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });
    if (e.target.checked) {
      const filteredResults = globalPokemon.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      //console.log(filteredResults)
      setFilteredPokemon([...filteredPokemon, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemon.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      //console.log(filteredResults)
      setFilteredPokemon([...filteredResults]);
    }
  };

  return (
    // aca mandamos a imprimir las funciones que se a creado
    <AppContext.Provider
      value={{
        allPokemon,
        setAllPokemon,
        onClickLoadMore,
        globalPokemon,
        getGlobalPokemon,
        valueSearch,
        onInputChange,
        onResetForm,
        //para cargar
        loading,
        setLoading,
        //para filtro
        active,
        setActive,
        handleCheckbox,
        filteredPokemon,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export const AppContext = createContext();
