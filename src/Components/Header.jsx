import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../Assets/logo.png";

//icons
import { TbPokeball } from "react-icons/tb";
import { TbMapSearch } from "react-icons/tb";
import { GiArchiveResearch } from "react-icons/gi";
import Footer from "./Footer";

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="navbar-body ">
          <nav className="navbar container justify-content-center ">
              <div className="navbar-brand" href="#/">
                <Link to="/" className="logo">
                  <img src={Logo} alt="Bootstrap" />
                </Link>
              </div>
          </nav>
        </div>

        <div className="line ">
          <div className="container mb-3"></div>
        </div>

        <div className="buttom-div">
          <div className="gap-2 mx-auto">
            <Link to="index">
              <button className="btn btn-primary m-2" type="button">
                <TbPokeball className="m-1" size={"1.5rem"} />
                Inicio
              </button>
            </Link>
            <Link to="pokeClass">
              <button className="btn btn-primary m-2" type="button">
                <TbMapSearch className="m-1" size={"1.5rem"} />
                Buscador
              </button>
            </Link>
            <Link to="pokeRange">
              <button className="btn btn-primary m-2" type="button">
                <GiArchiveResearch className="m-1" size={"1.5rem"} />
                Rangos
              </button>
            </Link>
          </div>
        </div>

{/* Con la funcion Outlet que trae react-router mandos a imprimir la vista de el contenido de las paginas que se referenciaron en AppRouter  */}
        <Outlet />

        <Footer />
      </>
    );
  }
}
