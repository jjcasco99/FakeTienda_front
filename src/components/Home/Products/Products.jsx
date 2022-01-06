import React from "react";


const Products = (props) => {

  return <div className="juego">
          <p>{props.info.nombre}</p>
          <img src={props.info.imagen} alt={props.info.nombre}/>
          <p>Valoración: {props.info.relevancia}</p>
          <p>Precio: {props.info.precio}€</p>
          <p>Empresa: {props.info.empresa}</p>
         </div>;
};

export default Products;
