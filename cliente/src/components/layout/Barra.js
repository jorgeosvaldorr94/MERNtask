
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Paso 1
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {
    const navigate = useNavigate(); // Paso 3

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/'); // Paso 4
    };

    return (
        <header className='app-header'>
            {usuario ? (
                <p className='nombre-usuario'>
                    Hola <span>{usuario.nombre}</span>
                </p>
            ) : null}

            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => handleCerrarSesion()} // Cambio en onClick
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
};

export default Barra;

/*
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    // Extraer la información de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    

    return (
        <header className='app-header'>
            {usuario
                ?
                <p className='nombre-usuario'>Hola <span>{usuario.nombre}</span></p>
                :
                null}

            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>);
}

export default Barra;
*/