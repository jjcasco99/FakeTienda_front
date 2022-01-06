import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';

import Products from "./Products/Products";


const Home = () => {

  const [nombre, setNombre] = useState("");
  const [juegos, setJuegos] = useState([]);
  const [ordenar, setOrden] = useState('');

  useEffect(() => {
    const getGames = async() => {
      const resp = await axios.get(`http://localhost:5000/api/games/${nombre}`);
      const json = resp.data;
      const juegoArray = json.map(element => {
        return{
          'nombre': element.nombre,
          'imagen': element.img,
          'relevancia': element.relevancia,
          'precio': element.precio,
          'empresa': element.empresa.nombre,
          'cip': element.empresa.cip,
          'direccion': element.empresa.direccion
        }
      })
      // console.log(juegoArray)
      setJuegos(juegoArray)
    }
    getGames();
  }, [nombre])


  const paintGames = () => {
    return juegos.map((juego, i) => <Products info={juego} key={i} />)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setNombre(event.target.busqueda.value)
    // console.log(nombre);
  }

  const sortGames = (event) => {
    setOrden(event.target.value)
  }

  juegos.sort((a, b) => {
    if(ordenar === 'Barato'){
      return a.precio - b.precio;
    } else if(ordenar === 'Caro'){
      return b.precio - a.precio;
    } else if(ordenar === 'Mejor'){
      return b.relevancia - a.relevancia;
    } else if(ordenar === 'Peor'){
      return a.relevancia - b.relevancia;
    } else if(ordenar === 'A-Z'){
      return a.nombre.localeCompare(b.nombre);
    } else if(ordenar === 'Z-A'){
      return b.nombre.localeCompare(a.nombre);
    }
  })

  
  return (
    <div className="busqueda">
      <form onSubmit={handleSubmit}>
        <label htmlFor="busqueda">Juego: </label>
        <input type="text" name="busqueda"/><br /><br />
        <input type="submit" value="Buscar" />
      </form>
      <div className="filtros">
        <select onChange={sortGames}>
          <option value="---">---</option>
          <option value="Barato">Mas barato a mas caro</option>
          <option value="Caro">Mas caro a mas barato</option>  
          <option value="Mejor">Mejor valorado</option>    
          <option value="Peor">Peor valorado</option>  
          <option value="A-Z">Orden de la A a la Z</option>  
          <option value="Z-A">Orden de la Z a la A</option>  
        </select>      
      </div>
      <>{paintGames()}</>
    </div>
    
  );
};

export default Home;
