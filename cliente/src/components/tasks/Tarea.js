import React, { useContext, useState } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

// Importar la funcion para Mostrar la AlertaEliminar.
import AlertaEliminar from '../../context/alertas/AlertaEliminar';

// Importar el componente para la Descripcion
import Descripcion from './Descripcion';

// Importar librerias para los iconos
import { faEye, faGrillHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tarea = ({tarea}) => {

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Obtener el proyecto activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Extraer el proyecto
    const [proyectoActual] = proyecto;

    /*
    //Funcion que se ejecuta cuando se aprieta el btn de eliminar Tarea
    const tareaEliminar = id => {
        // Aqui requerimos pasar el id al backend para demostrar que somos los creadores de ese proyecto.
        eliminarTarea(id, proyectoActual._id);

        // Esto es xq estamos extrayendo un arreglo (proyecto linea 13) entonces aunque el nos esta dando el un solo objeto en el arreglo, hay que especificar que sea la posicion 0, que seria el primer y unico proyecto que hay....
        // EL comentario anterior era antes de hacer el BackEnd
        obtenerTareas(proyectoActual.id)
        // Otra manera seria extrayendo el proyecto activo de proyecto, aplicando un arry destructuring
        //seria asi
        //                 const [proyectoActual] = proyecto;
        //                 obtenerTareas(proyectoActual.id);
    };
    */

    // Nueva funcion, con la implementacion de la alerta.
    const tareaEliminar = (id) => {
        AlertaEliminar({
            mensaje: "Seguro que quieres eliminar esta tarea ?",
            onConfirm: () => {
                eliminarTarea(id, proyectoActual._id);
                obtenerTareas(proyectoActual.id);
            },
        });
    };
    

    // Func q modifica el estado de la tarea
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        
        actualizarTarea(tarea);
    }

    // Agregaer tarea para editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    // Funcion para mostrar el cartel de descripcion.
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    
    const handleCloseDescripcion = (cerrar) => {
        if (cerrar) {
            setMostrarDescripcion(false);
        }
    };
   
/*
    return (
            <li className='tarea sombra'>
                <p>{tarea.nombre}</p>

                <div className='estado'>
                    {tarea.estado
                    ?
                        (
                            <button
                                type='button'
                                className='completo'
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button
                                type='button'
                                className='incompleto'
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                    }
                </div>

                {!tareaseleccionada 
                    ?
                        <div className='acciones'>
                            <button
                                type='button'
                                className='btn btn-submit2 btn-primario'
                                onClick={ () => seleccionarTarea(tarea) }
                            >Editar</button> 

                            <button
                                type='button'
                                className='btn btn-secundario'
                                onClick={() => tareaEliminar(tarea._id)}
                            >Eliminar</button>                    
                        </div>
                    : 
                        null 
                }
            </li>
    );
}
*/

return (
    <li className='tarea sombra'>
      <p>{tarea.nombre}</p>

      <div className='estado'>
        {tarea.estado ? (
          <button type='button' className='completo' onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type='button' className='incompleto' onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>

      {!tareaseleccionada ? (
        <div className='acciones'>

          <button type='button' className='btn btn-desc' onClick={() => setMostrarDescripcion(true)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          
          <button type='button' className='btn btn-submit2 btn-primario' onClick={() => seleccionarTarea(tarea)}>
            Editar
          </button>

          <button type='button' className='btn btn-secundario2' onClick={() => tareaEliminar(tarea._id)}>
            Eliminar
          </button>
          

        </div>
        
      ) : null}

      {mostrarDescripcion && <Descripcion etiqueta='Descripción' onClose={handleCloseDescripcion} />}
    </li>
  );
};

export default Tarea;