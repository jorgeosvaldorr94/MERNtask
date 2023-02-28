import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Extraer los valores del Context de alerta
    // lo creo en minuscula por preferencia.
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext; 

    // Extraer los valores del context de autenticacion
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado.
    const navigate = useNavigate();
    useEffect(() => {
        if(autenticado) {
            navigate('/proyectos');
        }
        if(mensaje) {
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }
    }, [mensaje, autenticado, navigate]);
    
    //State de inicio de sesion
    const [ usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: '',
    });

    // Extraer de usuario
    const { nombre, email, password, confirmar} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    //cuando el usuario toca el boton de iniciar sesion
    const onSubmit = (e) => {
        e.preventDefault();

        //Validar los campos
        if( nombre.trim() === '' || 
        email.trim() === '' || 
        password.trim() === '' || 
        confirmar.trim() === '' ) {
            // eslint-disable-next-line
            {/* Mostramos la alerta en caso de algun campo vacio, ver en alertaState, q a la funcion mostrarAlerta, le pasamos como payload un msg y una categoria.*/}
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Password minimo 6 caracteres
        if( password.length < 6 ) {
            mostrarAlerta('EL password debe teber minimo 6 caracteres', 'alerta-error');
            return;
        }

        //Validar igualdad de los Password
        if( password !== confirmar ) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //Pasarlo al ACTION
        registrarUsuario({
            // Recordar que lo coorecto es pasar nombre, email, password
            // lo hago asi para ubicarme.
            nombre: nombre,
            email: email,
            password: password
        });

    };

    return ( 
        <div className='form-usuario'>
            { alerta 
                ?
                    (<div className={`alerta ${alerta.categoria}`}>
                        {alerta.msg}
                    </div>)
                : 
                    null}
            <div className='contenedor-form sombra-dark'>
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='email'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='ej: tuemail@gmail.com'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='confirmar'>Password</label>
                        <input
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Confirmar Password'
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Registrar'
                        />
                    </div>

                </form>

                <Link 
                    to={"/"}
                    className='enlace-cuenta'
                >Iniciar Sesión</Link>

            </div>
        </div>
     );
}
 

export default (NuevaCuenta);
