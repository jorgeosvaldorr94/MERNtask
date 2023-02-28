import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    // Extraer los valores del Context de alerta
    // lo creo en minuscula por preferencia.
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext; 

    // Extraer los valores del context de autenticacion
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso de que el password o usuarios no existan.
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
        email: '',
        password: ''
    });

    // Extraer de usuario
    const { email, password} = usuario;

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
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos som obligatorios', 'alerta-error');
        } 

        //Pasarlo al ACTION
        iniciarSesion({ email, password });
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
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
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
                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesión'
                        />
                    </div>

                </form>

                <Link 
                    to={'nueva-cuenta'}
                    className='enlace-cuenta'
                >Obtener Cuenta</Link>

            </div>
        </div>
     );
}
 
export default Login;
