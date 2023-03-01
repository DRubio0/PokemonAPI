//Carousel
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselCard } from "./CarouselCard";
import Loader from "./Loader";

export default function CarouselPokemon() {

  /**declaramos un estado para mandar a llamar informacion de la API */
  const [pokeData, setPokeData] = useState([]);
  /**Tambien declaramos un estado de carga incial para dar tiempo que haga el llamado */
  const [loading, setLoading] = useState(true);

  /**Funcion para mandar a llamar a 200 pokemons para que los muestre en el Carousel con el metodo AXIOS */
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=250')
        const {results } = res.data;
        const pokeUrl = results.map(result => result.url)
        const pokeData = await Promise.all(
          pokeUrl.map(async url =>{
            const res = await axios.get(url)
            return res.data;
          })
        )
        setPokeData(pokeData);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    /**Imprimimos los datos que recoge la funcion */
    fetchPokemonData()
  }, []);

  return (
    <div className="container">
      {
        loading ? (
          // condicion en lo que carga la informacion
          <div><Loader/></div>
        ):(
          <>
          {/* cuando la cargada muestra el Carousel  */}
          <h1 className="mb-5 text-center">Galeria Pokemon</h1>
          {/* <p>Carousel con los 200 Pokemons</p> */}
          <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay={true}
          autoPlaySpeed={2000}
          centerMode={false}
          className="mb-5"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 2000,
                min: 1024
              },
              items: 5,
              paritialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              paritialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              paritialVisibilityGutter: 30
            }
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
          >
            {
              pokeData.map(pokemon => (
                <CarouselCard key={pokemon.id} pokeData={pokemon}/>
              ))
            }
          </Carousel>
          </>
        )
      }
    </div>
  );
}
