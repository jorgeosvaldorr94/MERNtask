import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { boton, proyectoActual } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext; 

    // Estado para almacenar el nombre del proyecto activo
    const [proyectoActivo, setProyectoActivo] = useState('');

    // nuevo
    // UseEffect para actualizar el botón activo
    useEffect(() => {
        if (proyectoActual && proyectoActual._id === proyecto._id) {
            setProyectoActivo(proyecto._id);
        }
    }, [proyectoActual, proyecto, boton]);


    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {

        proyectoActual(id); // fijar un proyecto actual

        obtenerTareas(id); //filtrar las tareas cuando se le de click
        
        // establecer el nombre del proyecto activo
        setProyectoActivo(id); 

    }

    // className='btn-proyecto'

    return ( 
        <button
            type='button'
            value={proyecto.nombre}
            className={`btn-proyecto ${proyecto.nombre === boton ? 'btn-activo' : ''}`}
            onClick={ () => seleccionarProyecto(proyecto._id) }
        >{proyecto.nombre}</button>
     );
}
 
export default Proyecto;


