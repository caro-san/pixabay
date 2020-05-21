import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la app
  // const [state, funcion]

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas]= useState(1);

  useEffect(() =>{
    //se crea la funcion
    const consultarApi = async () => {
      if(busqueda === '') return;
    
    const imagenesPorPagina = 15;
    const key = '16597868-ece7e7d4593fdffadb4faec86';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagenes(resultado.hits);

    // Calcular el total de paginas
    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas);

    //Mover la pantalla hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior:'smooth'})

    }
    //se ejecuta la funcion
    consultarApi();

  }, [busqueda, paginaactual])

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual===0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //Definir la pagina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
        imagenes={imagenes}
        />

        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={paginaAnterior}
          > &laquo; Anterior </button>
        )}

        {(paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          > Siguiente &raquo; </button>
        )}


      </div>
    </div>
  );
}

export default App;