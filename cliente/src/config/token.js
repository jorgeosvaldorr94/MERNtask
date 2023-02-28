import clienteAxios from "./axios";

const tokenAuth = token => {

    if(token) {

        // si le estamos pasando un token, a nuestro clienteAxios le vamos a agregar por defecto en headers, el key para leer el token (x-auth-token), y luego le vamos a pasar el token.
        clienteAxios.defaults.headers.common['x-auth-token'] = token;

    } else {

        // En caso contrario eliminamos el x-auth-token para que no este en el objeto del clienteAxios... se elimina porque puede que el usuario haya cerrado sesion, o haya expirado el token.
        delete clienteAxios.defaults.headers.common['x-auth-token'];
        
    }
};

export default tokenAuth;