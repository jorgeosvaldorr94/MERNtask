const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if( !token ) {
        return res.status(401).json({ msg: "No hay token, permiso no valido (server, auth.js 1)" });
    };

    // validar el token
    try {
        // Verificar el token
        const cifrado = jwt.verify(token, process.env.SECRETA);
        // en el payload de usuarioController, le pasamos usuario, y podemos acceder al id
        // Por lo que aqui estamos guardando el usuario en el req.
        req.usuario = cifrado.usuario;
        // next para que vaya al sgt middleware... es decir en proyectos.js cuando termine con auth, va apara el que esta debajo.
        console.log(req.usuario)
        next();
        
    } catch (error) {
        res.status(401).json({ msg: "Token no valido (server, auth.js 2)" });
        console.log(error); 
    }
}; 