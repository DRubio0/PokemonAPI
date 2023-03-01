import { Component } from "react";
import Carousel from "../Components/CarouselPokemon";

export default class PokeFiltered extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      img: "#",
      id: "",
      type: "",
    };
  }

  fetchApi = async () => {
    let res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.name}`
    );
    let data = await res.json();
    // console.log(data);
    this.setState({
      img: data.sprites.other.dream_world.front_default,
      id: data.id,
      height: data.height,
      type: data.types[0].type.name,
    });
  };

  // componentDidMount(){
  //   this.fetchApi()
  // }

  handleName = (event) => {
    this.setState({
      name: event.target.value.toLowerCase(),
    });
  };

  handleSubmit = (event) => {
    this.fetchApi();
    event.preventDefault();
  };
  render() {
    if (this.state.img === "#" ) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div className="search-panel">
                <h1>Ingresa el nombre de tu Pokemon:</h1>
                <br />
                {/* <label htmlFor=""> Ingrese el nombre: {" "}</label> */}
                <form className="d-flex" role="search">
                  <input
                    required
                    className="form-control me-2"
                    type="search"
                    placeholder="Nombre de Pokemon"
                    aria-label="Search"
                    onChange={this.handleName}
                  />
                  <button
                    onClick={this.handleSubmit}
                    className="btn btn-danger"
                    type="submit"
                  >
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <Carousel />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="container">
            <div className="row">
              <div className="container-class justify-content-center">
                <div className="name-card-class"></div>
                {/* Aplicar mapeado para cambiar fondo dependiendo del tipo */}
                <div className={`fondo-card-${this.state.type}`}>
                  <div className="card-pokemon-class">
                    <div className="card-img-class m-5">
                      {/* Imagen de la card */}
                      <img
                        src={this.state.img}
                        alt={`Pokemon ${this.state.name}`}
                      />
                    </div>
                    {/* Cuerpo de la card */}
                    <div className="card-info-class">
                      <span className="pokemon-id-class">
                        N° {this.state.id}
                      </span>
                      <h3>
                        Nombre: <br /> {this.state.name.toLocaleUpperCase()}
                      </h3>
                      <h3>
                        Tipo: <br /> {this.state.type}
                      </h3>
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => {
                          this.setState({
                            name: "",
                            img: "#",
                            id: "",
                            height: "",
                          });
                        }}
                      >
                        Regresar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
