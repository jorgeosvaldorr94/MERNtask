import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTareas from '../tasks/FormTareas';
import ListadoTareas from '../tasks/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    // Extraer la información de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])



    return (
        <div className='contenedor-app'>

            <Sidebar />

            <div className='seccion-principal'>

                <Barra />

                <main>

                    <FormTareas />

                    <div className='contenedor-tareas'>
                        <ListadoTareas />
                    </div>
                </main>
            </div>

        </div>
    );
}

export default Proyectos;