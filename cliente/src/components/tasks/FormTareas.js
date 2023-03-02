import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// Importar el componente para la Descripcion
import Descripcion from './Descripcion';

const FormTareas = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // State del Formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
        texto: '',
    })

    const [ descripcion, setDescripcion] = useState('');

    /*
    // Effect para que se agrege en descripcion, lo que voy escribiendo en el
    useEffect(() => {
        if (cambio) {
            setDescripcion(cambio);
        }
    }, [cambio]);
    */

    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    
    const handleCloseDescripcion = (cerrar, texto) => {
        if (cerrar && texto) {
            guardarTarea({
                ...tarea,
                texto: texto
            });
        }
        setMostrarDescripcion(false);
    };

    const propsDescripcion = {
        editar: true,
        etiqueta: tarea.nombre,
        onClose: handleCloseDescripcion,
    };

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: '',
                texto: ''
            });
        }
    }, [tareaseleccionada]);

    //extraer el nombre de la tarea del proyecto
    const { nombre } = tarea;

    //extraer el nombre texto de la tarea del proyecto
    const { texto } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    // Arry destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //// Leer los valores delformulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // Funcion para el boton del formulario.
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        // Actualizar el texto de la tarea en el modal
        propsDescripcion.texto = tarea.texto;

        // Revisar si es edicion o nueva tarea
        if (tareaseleccionada === null) {
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
            nombre: '',
            texto: '',
        });
    };

    return (
        <div className='formulario'>
            <form onSubmit={handleSubmit}>
                <div>
                    {tareaseleccionada ? (
                        <h3 className='tarea-action'>Editando Tarea</h3>
                    ) : (
                        <h3 className='tarea-action'>Crear nueva Tarea</h3>
                    )}
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
                        value={tareaseleccionada ? 'Editar' : 'Agregar'}
                    />
                </div>
                <div className='contenedor-imput'>
                    <button
                        type='button'
                        className='btn btn-desc'
                        onClick={() => setMostrarDescripcion(true)}
                    >
                        <FontAwesomeIcon icon={faEye} />Descripcion
                    </button>
                </div>
                {mostrarDescripcion && <Descripcion 
                    {...propsDescripcion} 
                    onClose={handleCloseDescripcion} 
                />}
            </form>
            {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
};

export default FormTareas;

/*
import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTareas = () => {
    
    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { texto, tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext; 

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
*/
