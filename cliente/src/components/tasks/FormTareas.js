import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTareas = () => {
    
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext; 

    // Effect que detecta si hay una tarea seleccionada
    useEffect( () => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    // State del Formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    // Arry destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //// Leer los valores delformulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Revisar si es edicion o nueva tarea
        if(tareaseleccionada === null) {
            // Pasar la validación, lo hice en la funcion agregarTarea(tarea), ahi volvi a poner el errortarea: false, para que este como su estado inicial 
    
            // Agregar la nueva tarea al state de tareas, tambien le agrego las propiedades que yo quiera
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea();
        };

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form    
        guardarTarea({
            nombre: ''
        });

    }

    return ( 
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div>
                    {tareaseleccionada
                        ?
                        <h3 className='tarea-action'>Editando Tarea</h3>
                        :
                        <h3 className='tarea-action'>Crear nueva Tarea</h3>
                    }                    
                </div>
                <div className='contenedor-imput'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className='contenedor-imput'>
                    <input
                        type='submit'
                        className='btn-primario-editar'
                        value={tareaseleccionada 
                                ?
                                    "Editar" 
                                :
                                    "Agregar"
                        }
                    />
                </div>
            </form>

            {errortarea 
                ? 
                    <p className='mensaje error'>El nombre de la tarea es obligatorio</p> 
                : 
                    null
            }

        </div>
    );
}
 
export default FormTareas;
