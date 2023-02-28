const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea un proyecto (middleware) ya es codigo express
// Su endpoit sera:
//.... /api/proyectos ....
router.post('/', 
    // este middleware va primero a auth, verifica, y luego pasa para el proximo middleware.
    auth,
    [
        check('nombre', 'El nombre del proyyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Este get es para obtener todos los proyectos de los usuarios que estan autenticados.
router.get('/', 
    // Este middleware va primero a auth, verifica, y luego pasa para el proximo middleware.
    auth,
    proyectoController.obtnerProyectos
);

// Este put es para modificar y actualizar un proyecto (via ID) del usuario que esta autenticado. (Express permite ese comodin de id)
router.put('/:id', 
    // Este middleware va primero a auth, verifica que el usuario esta autenticado, y luego mira que el usuario tenga un nombre y finalmente que se agrege en el middleware.
    auth,
    [
        check('nombre', 'El nombre del proyyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

router.delete('/:id', 
    // El principio de API rest, nos dice q tenemos pasarle un id.
    // Este middleware va primero a auth, verifica que el usuario esta autenticado, y luego mira que el usuario tenga un nombre y finalmente que se agrege en el middleware.
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;  