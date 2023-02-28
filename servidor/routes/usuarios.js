// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crea un usuario (middleware) ya es codigo express
// Su endpoit sera:
//.... /api/usuarios ....
router.post('/',
    // Agregar reglas de validacion
    [
        // Revisar el nombre, que no este vacio. Mensaje de error
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'Password mínimo de 6 caracteres').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);

module.exports = router;