export const CarouselCard = ({ pokeData }) => {
  const { id, name, sprites } = pokeData;
  const imgUrl = sprites.front_default;

  return (
    <div className="">
      <div className="card mb-5" style={{ width: "15rem" }}>
        <img src={imgUrl} alt={name} className="card-img-top" />
        <div className="card-body">
          <p className="card-text text-center">
            ID: <b>{id}</b> <br />
            Nombre: <b> {name.toUpperCase()}</b>
            <br />
            <div className="type-pokemon-card">
              
              {/*mapeado para el tipo del pokemon  */}
              {pokeData.types.map((type) => (
                <span key={type.type.name} className={type.type.name}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
