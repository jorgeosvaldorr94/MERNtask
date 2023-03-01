import React, { useContext, useState } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

// Importar la funcion para Mostrar la AlertaEliminar.
import AlertaEliminar from '../../context/alertas/AlertaEliminar';

// Importar el componente para la Descripcion
import Descripcion from './Descripcion';

// Importar librerias para los iconos
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
        setMostrarDescripcion(false);
        
    };

    const propsDescripcion = {
        texto: 'Aqui iria la descripcion de la tarea',
        editar: tareaseleccionada ? true : null
    };

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

            {mostrarDescripcion && <Descripcion {...propsDescripcion} onClose={handleCloseDescripcion} />}
        </li>
    );
};

export default Tarea;

/*
import React, { useContext, useState } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

// Importar la funcion para Mostrar la AlertaEliminar.
import AlertaEliminar from '../../context/alertas/AlertaEliminar';

// Importar el componente para la Descripcion
import Descripcion from './Descripcion';

// Importar librerias para los iconos
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tarea = ({ tarea }) => {

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {
      tareaseleccionada,
      eliminarTarea,
      obtenerTareas,
      actualizarTarea,
      guardarTareaActual
    } = tareasContext;
  
    // Obtener el proyecto activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
  
    // Extraer el proyecto
    const [proyectoActual] = proyecto;
  
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
    const cambiarEstado = (tarea) => {
      if (tarea.estado) {
        tarea.estado = false;
      } else {
        tarea.estado = true;
      }
  
      actualizarTarea(tarea);
    };
  
    // Agregaer tarea para editar
    const seleccionarTarea = (tarea) => {
      guardarTareaActual(tarea);
    };
  
    // Funcion para mostrar el cartel de descripcion.
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  
    // Definir la variable "editar"
    let editar = null;
    if (tareaseleccionada) {
      editar = true;
    }

    const handleCloseDescripcion = (cerrar) => {      
        setMostrarDescripcion(false);        
      };
  
    return (
      <li className="tarea sombra">
        <p>{tarea.nombre}</p>
  
        <div className="estado">
          {tarea.estado ? (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >
              Completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => cambiarEstado(tarea)}
            >
              Incompleto
            </button>
          )}
        </div>


       // Pasar los props "texto" y "editar" a "Descripcion" 
        {!tareaseleccionada ? (
          <div className="acciones">
            <button
              type="button"
              className="btn btn-desc"
              onClick={() => setMostrarDescripcion(true)}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
  
            <button
              type="button"
              className="btn btn-submit2 btn-primario"
              onClick={() => seleccionarTarea(tarea)}
            >
              Editar
            </button>
  
            <button
              type="button"
              className="btn btn-secundario2"
              onClick={() => tareaEliminar(tarea._id)}
            >
              Eliminar
            </button>
          </div>
        ) : null}
  
         Pasar los props "texto" y "editar" a "Descripcion" 
        {mostrarDescripcion && (
          <Descripcion
            etiqueta="Descripción"
            onClose={handleCloseDescripcion}
            texto="Aqui iria la descripcion de la tarea"
            editar={editar}
          />
        )}
      </li>
    );
  };

export default Tarea;
*/


/*
import React, { useContext, useState } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

// Importar la funcion para Mostrar la AlertaEliminar.
import AlertaEliminar from '../../context/alertas/AlertaEliminar';

// Importar el componente para la Descripcion
import Descripcion from './Descripcion';

// Importar librerias para los iconos
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
        setMostrarDescripcion(false);
        
    };

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
*/