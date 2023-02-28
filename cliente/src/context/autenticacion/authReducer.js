import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION 
} from '../../types';


const authReducer = ( state, action ) => {

    switch(action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                // NO necesito pasar el token xq debe estar almacenado en el localStorage.
                //token: action.payload.token,
                mensaje: null,
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            // Revisar xq siempre me da un registro error (aqui me elimina el token del localStorage).
            // localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload,
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null,
                mensaje: action.payload,
            }
        default:
            return state;
    }
};

export default authReducer; 