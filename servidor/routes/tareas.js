const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
// El siguiente middleware es porque el usuario tiene que estar autenticado para manipular una tarea.
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crear una tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // Para recordarme a mi mismo que el proyecto es obligatorio.
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);


// Obtener tareas por proyecto.
// api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
);


// Actualizar una tarea
// api/tareas, hay que pasarle el id de la tarea.
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);


// Eliminar una tarea
// api/tareas, hay que pasarle el id de la tarea.
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router; 