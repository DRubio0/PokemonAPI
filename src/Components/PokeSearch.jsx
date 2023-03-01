import React, { useContext } from "react";
import { AppContext } from "../Provider/Provider";
import { useNavigate } from "react-router-dom";

//icon
import { TbPokeball } from "react-icons/tb";

export default function PokeSearch() {
  //referencia del Context en el buscador
  const { onInputChange, valueSearch, onResetForm } = useContext(AppContext);
  //para navegar a la pagina que nos mostrara la busqueda realizada
  const navigate = useNavigate();
  const onSeachSubmit = (event) => {
    event.preventDefault();
    navigate("/search", {
      //aca es donde llega la informacion que escribimos en el input
      state: valueSearch,
    });
    //para reiniciar el estado de la busqueda
    onResetForm();
  };
  return (
    <div>
      <header className="container col-4">
        <form onSubmit={onSeachSubmit}>
          <div className="form-group">
            <TbPokeball size={"1.5rem"} />
            <input
              type="search"
              required
              name="valueSearch"
              value={valueSearch}
              onChange={onInputChange}
              placeholder="Nombre del Pokemon"
            />
          </div>
          <button className="btn-search" type="submit">
            Buscar
          </button>
        </form>
      </header>
    </div>
  );
}
