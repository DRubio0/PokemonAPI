/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";

export default function PokePage() {
  /**Metodo FETCH para capturar los Pokemons por su ID */
  const getPokemonById = async (id) => {
    const url = "https://pokeapi.co/api/v2/";
    const res = await fetch(`${url}pokemon/${id}`);
    const data = await res.json();
    //console.log(data)
    return data;
  };

  //Estado interno para recibir la informacion de la API
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  /**Metodo para recibir los ID de que manda por medio de React-Router */
  const { id } = useParams();

  /**Metodo para imprimir datos  */
  const fetchPokemon = async (id) => {
    const data = await getPokemonById(id);
    //asignamos los datos al parametro de pokemon
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

 


  return (
    <div className="container main-pokemon">
      {/* condicional para que espere el cargado de la informacion */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="header-main-pokemon">
            <span className="number-pokemon">#{pokemon.id}</span>
            <div className="container-img-pokemon mt-5">
              {/* Imagen del pokemon */}
              <img
              //mapeo para buscar el tipo de pokemon y pueda poner el fondo al que pertenece
                className={`fondo-${pokemon.types[0].type.name}`}
                src={pokemon.sprites.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>
            <div className="container-info-pokemon">
              <h1>{pokemon.name.toUpperCase()}</h1>
              <div className="card-types info-pokemon-type">
                {/* Mapeo para que nos muestre el tipo de pokemon que es */}
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>

               <div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
                  {/* corregimos la medida de la altura ya que viene en milimetros */}
									<span>{(pokemon.height)/10} mts</span>
								</div>
								<div className='group-info'>
									<p>Peso</p>
                  {/**Cambiamos la unidad de medida de peso ya que viene en KG y lo pasamos a LB ya que es el peso que nosotros utilizamos en El Salvador  */}
									<span>{((pokemon.weight)*2.20462).toFixed(2)} lb</span>
								</div>
							</div>
            </div>
          </div>

          <div className='container-stats'>
            
						<div className='stats'>
            
						<h1> Estadísticas   </h1>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>
        </>
      )}
    </div>
  );
}
