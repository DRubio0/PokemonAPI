import { useContext } from "react";
import { AppContext } from "../Provider/Provider";
import FilterBar from "../Components/FilterBar";
import PokemonList from "../Components/PokemonList";
import PokeSearch from "../Components/PokeSearch";

//icons
import { SlOptionsVertical } from "react-icons/sl";

/* En esta vista lo que nos mostrar es la informacion de los pokemons en forma de CARD y tambien un buscador para tener mejor accedo a la informacion del pokemon seleccionado ademas del filtrado por tipo */
export default function HomePage() {
  //mandamos a llamar del Provider el setOffet y lo incluimos en la funcion onClickLoadMore
  // const onClickLoadMore = () => {
  //   setOffset(offset + 20);
  // };

  /**
   * active:para dar el estado iniciar del componente de filtrado
   * setActive: para asignar el estado del componente y que lo realise
   * onClickLoadMore: funcion creada en el Context para que nos cargue 20 pokemons mas
  
  */
  const { active, setActive, onClickLoadMore } = useContext(AppContext);

  return (
    <>
      {/* COmponente de busqueda de pokemon */}
      <PokeSearch />

      <div className="container-filter container">
        {/* aca agregamos la conficional para que muestre el fitro por tipo de pokemon ya que por medio del provider nos viene en true asi que para que permanezca oculto lo colocamos en una funcio onCLick con su negacion*/}
        <div className="icon-filter" onClick={() => setActive(!active)}>
          {/* Trabajaremos la parte del filtrado y mandaremos a llamar al componente */}
          <SlOptionsVertical />
          <span>Filtrador de Pokemons</span>
          <FilterBar />
        </div>
      </div>
      <div>
        {/**Componente que muestra todos los pokemons llamados por la peticion en diseño de CARD */}
        <PokemonList />
      </div>

      {/* boton para cargar 20 pokemons mas */}
      <div className="container-btn-load-more container">
        <button className="btn-load-more" onClick={onClickLoadMore}>
          Cargar 20 Pokemons Mas.
        </button>
      </div>
    </>
  );
}
