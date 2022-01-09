import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import './Home.css'
import Products from "./Products/Products";
import { useDebounce } from "use-debounce";


const Home = () => {
  // Hook para el juego a buscar
  const [nombre, setNombre] = useState("");
  // Hook donde guardamos la precargar de juegos o el juego a buscar
  const [juegos, setJuegos] = useState([]);
  // Hook para guardar el value del select para ordenar los juegos
  const [ordenar, setOrden] = useState('');
  // Hook para ver la pagina donde estamos
  const [paginaActual, setPaginaActual] = useState(1);
  // Hook para limitar los juegos por pagina
  const [juegosPorPagina] = useState(8);
  // Hook para debounce
  const [debouncedText] = useDebounce(nombre, 1500); 

  

  useEffect(() => {
    const getGames = async() => {
      const resp = await axios.get(`http://localhost:5000/api/games/${debouncedText}`);
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
  }, [debouncedText])


  const paintGames = () => {
    return elementosActuales.map((juego, i) => <Products info={juego} key={i} />)
  }

  // Recogida y orden de los valores del select
  const sortGames = (event) => {
    setOrden(event.target.value)
  }

  juegos.sort((a, b) => {
    switch(ordenar) {
      case 'Barato':
        return a.precio - b.precio;
      case 'Caro':
        return b.precio - a.precio;
      case 'Mejor':
        return b.relevancia - a.relevancia;
      case 'Peor':
        return a.relevancia - b.relevancia;
      case 'A-Z' :
        return a.nombre.localeCompare(b.nombre);
      case 'Z-A':
        return b.nombre.localeCompare(a.nombre);
      default:
        return 0;
    }
  })


  // Paginación -->
  const indiceDeElementos = paginaActual * juegosPorPagina;
  const indiceDePrimerosElementos = indiceDeElementos - juegosPorPagina;
  const elementosActuales = juegos.slice(indiceDePrimerosElementos,indiceDeElementos);
  
  // Para que aparezca el numero de paginas (indices)
  const paginas = [];

  for (let i = 1; i <= Math.ceil(juegos.length / juegosPorPagina); i++) {
    paginas.push(i);
  }

  // Cambio de paginas
  const paginacion = paginas => setPaginaActual(paginas);

  
  return (
    <div className="busqueda">
      <div className="flex">
        <form>
          <label htmlFor="busqueda">Busca tus juegos:</label>
          <input type="text" id="buscador" name="busqueda" onChange={(e) =>{
          if(e.target.value != null) {
            setNombre(e.target.value)
          }
        }}/>
        </form>

        <div className="filtros">
          <select onChange={sortGames}>
            <option value="---">"Elige para ordenar"</option>
            <option value="Barato">Mas barato a mas caro</option>
            <option value="Caro">Mas caro a mas barato</option>  
            <option value="Mejor">Mejor valorado</option>    
            <option value="Peor">Peor valorado</option>  
            <option value="A-Z">Orden de la A a la Z</option>  
            <option value="Z-A">Orden de la Z a la A</option>  
          </select>      
        </div>

      </div>
      
          <div className="cartas">
            {paintGames()}
            </div>
      <ul className="paginacion">
        {paginas.map(numero => (
          <li key={numero} className="pagina"><a onClick={() => paginacion(numero)} href="#">{numero}</a></li>
        ))}
      </ul>
    </div>
    
  );
};

export default Home;
