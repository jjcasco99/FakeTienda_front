import React from "react";


const Products = (props) => {

  return <div className="juego">
            <div className="cara-frontal"> 
              <p>{props.info.nombre}</p>
              <img src={props.info.imagen} alt={props.info.nombre}/>
              <p>Valoración: {props.info.relevancia}</p>
              <p>Precio: {props.info.precio}€</p>
              <p>Empresa: {props.info.empresa}</p>
            </div>
            <div className="cara-trasera">
              <p>Datos del fabricante:</p>
              <p>Nombre empresa: {props.info.empresa}</p>
              <p>CIP: {props.info.cip}</p>
              <p>Dirección: {props.info.direccion}</p>
            </div>
         </div>;
};

export default Products;
