import { Link } from "react-router-dom"

export default function CardPokemon({pokemon}) {
  return (
    <>
      <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
        <div className="card-img">
          {/* Imagen de la card */}
          <img
            src={pokemon.sprites.front_default}
            alt={`Pokemon ${pokemon.name}`}
          />
        </div>
        {/* Cuerpo de la card */}
        <div className="card-info">
          <div className="name-id">

          <span className="pokemon-id">N° {pokemon.id} </span>
          <h3> {pokemon.name}</h3>
          </div>

          <div className="card-types">
            {/* mapeo para escribir los tipos de los pokemons */}
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={type.type.name}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  )
}
