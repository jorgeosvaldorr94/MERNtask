const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); 

exports.autenticarUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // extraer el email y password
    const { email, password } = req.body;

    try {
        // Revisar que el email sea unico
        let usuario = await Usuario.findOne({ email });

        // En caso de que el usuario no exista
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Si ya vimos que el usuario existe, validamos su password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Si todo es correcto, creamos el jwt
        // Crear y firmar el jsonwebtoken
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // Firmar el jsonwebtoken
        jwt.sign(payload, process.env.SECRETA, {
            // Que el token expire en una hora (3600 segundos)
            expiresIn: 3600
        }, (error, token) => {
            if (error) {
                throw error;
            }

            // Mensaje de confirmación
            res.json({ token });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor' });
    }
};

// Obtiene que usuario esta autenticado.
exports.usuarioAutenticado = async ( req, res ) => {
    try {
        // Esto nos va a traer todo el registro del usuario que tenga el id que estamos enviando.
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        // De esta forma estaremos enviando el usuario.
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error (server authController 4)" });
        
    }
};