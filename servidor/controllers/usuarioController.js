const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer Email y Passwor
    const { email, password } = req.body;

    try {

        // Revisar q el usuario registrado sea unico, comparando su email con el de los demas usuarios.

        let usuario = await Usuario.findOne({ email });

        // En caso de q su email coincida con otro
        if (usuario) {
            return res.status(404).json({ msg: 'El usuario ya existe' });
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        // genSalt se encarga de aunque dos passwords sean iguales, el resulatado del cifrado sea distinto. Entre parentesis el pones el numero de bits
        const salt = await bcryptjs.genSalt(5);
        // Sobrescribir el password del usuario por el cifrado
        // El hash coge el password del usuario y el salt
        usuario.password = await bcryptjs.hash( password, salt );

        // Guardar el usuario
        await usuario.save();

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

        }, ( error, token ) => {
            if(error) throw error;

            // Mensaje de confirmacion
            res.json({ 
                msg: 'Usuario Creado Correctamente', 
                token: token });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');        
    }
};