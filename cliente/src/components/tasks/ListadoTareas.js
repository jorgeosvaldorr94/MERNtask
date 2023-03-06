import React, { useContext } from 'react';
import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AlertaEliminar from '../../context/alertas/AlertaEliminar';

const ListadoTareas = () => {

    // Extraer proyecto actual
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext; 

    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Seleccione un Proyecto</h2>

    // Arry destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Moestrar la alerta y Eliminar un Proyecto en caso afirmativo.
    const onClickEliminar = () => {
        AlertaEliminar({
          mensaje: "Seguro que quieres eliminar este proyecto ?",
          onConfirm: () => {
            eliminarProyecto(proyectoActual._id);
          },
        });
      };

    return ( 

        <>
            <h2>Proyecto: <span>{proyectoActual.nombre}</span></h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ?
                        (<li className='tarea'><p>No hay Tareas</p></li>)
                    :
                       <TransitionGroup>
                        {
                            tareasProyecto.map( tarea => (
                                <CSSTransition                                 
                                    key={tarea.id}
                                    timeout={200}
                                    classNames='tarea'                     
                                >
                                    <Tarea 
                                        tarea={tarea}      
                                    />
                                </CSSTransition>
                            ))
                        }
                        </TransitionGroup>
                        
                }

                
            </ul>

                <button
                    type='button'
                    className='btn btn-eliminar btn-delete'
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
        </>
    );
}
 
export default ListadoTareas;
