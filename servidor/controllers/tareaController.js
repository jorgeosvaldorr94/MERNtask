// Importar el modelo
const Tarea = require('../models/Tarea');
// Importar el modelo de Proyecto xq las tareas pertenecen a un Proyecto.
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crear una nueva Tarea.
exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    } 

    try {

        // Extraer el proyecto y comprovar si existe.
        // 'proyecto' es el id del proyecto
        const { proyecto } = req.body;

        // Comprobar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        };

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado"});
        };

        // Crear la tarea
        const tarea = new Tarea(req.body)
        await tarea.save();
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}; 

// Obtener las tareas por proyecto
exports.obtenerTareas = async ( req, res ) => {

    try {
        // Que proyecto queremos exrtraer ??
        // Extraer el proyecto y comprovar si existe.
        // 'proyecto' es el id del proyecto
        // Ver xq es req.query y no req.body.
        const { proyecto } = req.query;

        // Comprobar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        };

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto. Importante saber que en esta parte del codigo nos va a marcar un undefined si omitimos en el routes de tareas.js el middleware auth...
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado" });
        };

        // Obtener las tareas por proyecto.
        // Fijarnos que en el modelo de tareas, hay un campo que se llama proyecto, que ahi esta el id del proyecto. Le decimos que busque en el campo proyecto del modelo de tarea (que contiene el id del proyecto), donde sea igual al (const { proyecto } = req.body).
        // Si yo agrego .sort({ creado: -1 }) al final de la linea de abajo, me las ordena a partir de la nueva tarea.
        const tareas = await Tarea.find({ proyecto: proyecto }).sort({ creado: -1 });
        // Finalmente enviamos las tareas por JSON.
        res.json({ tareas });
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// Actualizar una tarea.
exports.actualizarTarea = async ( req, res ) => {
    try {
        // Que proyecto queremos exrtraer ?? 
        // Extraer el proyecto y de la tarea el nombre, el estado y le texto.
        // 'proyecto' es el id del proyecto.
        const { proyecto, nombre, estado, texto } = req.body;
        
        // Revisar si la tarea existe (por el id que le estamos pasando en 'put'.. router.put('/:id'...) es por ello que donde pasemos un id como parametro, que en este caso esta en la URL, lo extraemos de esta forma (req.params.id).
        let tarea = await Tarea.findById(req.params.id);      
        
        // Si no existe la tarea.
        if(!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        };

        // Extraer proyecto para asegurarnos de que le pertenezca a la persona autenticada.
        const existeProyecto = await Proyecto.findById(proyecto);
    
        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto. Importante saber que en esta parte del codigo nos va a marcar un undefined si omitimos en el routes de tareas.js el middleware auth...
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado" });
        };

        // Crear un objeto con la nueva informacion.
        const nuevaTarea = {};

        // Vamos a ir armando el objeto a medida que el usuario vaya haciendo cambios.
        
        nuevaTarea.nombre = nombre;      
        nuevaTarea.estado = estado;
        nuevaTarea.texto = texto;
        
        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

        // Mostrar la tarea si tod esta bien.
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');        
    }
};

// Elimina una tarea
exports.eliminarTarea = async ( req, res ) => {
    try {
        // Que proyecto queremos exrtraer ?? 
        // Extraer el proyecto y de la tarea en nombre y el estado.
        // 'proyecto' es el id del proyecto.
        // recordar que como enviamos por params, ya no es req.body, es req.query.
        const { proyecto } = req.query;

        // Revisar si la tarea existe (por el id que le estamos pasando en 'put'.. router.put('/:id'...) es por ello que donde pasemos un id como parametro, que en este caso esta en la URL, lo extraemos de esta forma (req.params.id).
        let tarea = await Tarea.findById(req.params.id);

        // Si no existe la tarea.
        if (!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        };

        // Extraer proyecto para asegurarnos de que le pertenezca a la persona autenticada.
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto. Importante saber que en esta parte del codigo nos va a marcar un undefined si omitimos en el routes de tareas.js el middleware auth...
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado" });
        };

       // Eliminar tarea
       await Tarea.findOneAndRemove({ _id: req.params.id });
       res.json({ msg: "Tarea Eliminada" });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};