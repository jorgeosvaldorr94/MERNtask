import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

// Importar nuestro cliente de Axios, xq vamos a ir al Back-End
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


const AuthState = props => {
    
    // Primero agragamos nuestro state inicial
    const initialState = {
        // obtener el token de localStorage y guardarlo en el estado token.
        token: localStorage.getItem('token'),
        // El usuario en un inicio no va a estar autenticado
        autenticado: null,
        // El usuario tampoco va a tener informacion para poder mostrar en el saludo (hola: ...) tambien requerimos el id para asociar sus proyectos y sus tareas.
        usuario: null,
        // Mensaje para las alertas
        mensaje: null,
    };


    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Funcion para pasar los datos a la base de datos.
    // Aqui recibimos los datos que nos envia NuevaCuenta.js en el comentario de pasarlo al ACTION.
    const registrarUsuario = async datos => {
        try {  
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Una vez que el usuario tenga un registro exitoso, vamos a obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            // Poner un console.log y ver la ruta para saber donde encontrar el mensaje.
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
        
    };

    // Retornar el usuario autenticado. Nos va a servir tanto como para cuando el usuario crea una cuenta, como para cuando inicia sesion.
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        };

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesion.
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos );
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })

        }
    }

    // Cierra la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;