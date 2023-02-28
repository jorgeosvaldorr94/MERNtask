// Aqui estara todo lo de autenticacion

// Rutas para autentucar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar sesion (middleware) ya es codigo express
// Su endpoit sera:
//.... /api/auth ....
router.post('/',
    // Agregar reglas de validacion
    /*
    [
        // Revisar el email, que sea unico. Mensaje de error
        // Para autenticar no necesitamos el nombre
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'Password mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    */
    authController.autenticarUsuario
);

// Obtener el usuario autenticado.
//.... /api/auth ....
router.get('/',
    // Agregar reglas de validacion
    [
        auth,
        authController.usuarioAutenticado
    ],
);

module.exports = router;