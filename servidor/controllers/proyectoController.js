// Importar el modelo
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    } 
      
    try {
        // Crear un nuevo proyecto, pasandole el modelo, solo le pasamos el nombre q es lo q vamos a escribir en el Postman, un json con el nombre solamente.
        const proyecto = new Proyecto({
            ...req.body,
            // ahora guardamos el id del usuario autenticado en el campo creador
            creador: req.usuario.id            
        });
        
        await proyecto.save();
        // en caso de que todo este bien
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el Proyecto');       
    }
}; 

// Obtiene todos los proyectos del usuario que esta autenticado
exports.obtnerProyectos = async ( req, res ) => {
    try {
        // (find)Extraer todos los proyectos de usuario que esta autenticado. y le dices que campos o condicion se tiene que cumplir para traerte los registros. 
        console.log(req.usuario);
        const proyectos = await Proyecto.find({ creador: req.usuario.id});
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el Proyecto');  
    }
};

// Actualiza un proyecto
exports.actualizarProyecto = async ( req, res ) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    } 

    // Extraer la informacion del viejo proyecto
    const { nombre } =req.body;
    const nuevoProyecto = {};

    // Agrego un nuevo campo al proyecto que es un objeto vacio, por cada campo tengo que repetir y hacer esto mismo. En este proyecto, solo voy a verificae que el campo nombre no este vacio, es lo que nos interesa. 
    if(nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {

        // Revisar el ID
        // Con express se hace facil decir, ve a tal id y actualizalo.
        // await siempre se utiliza para hacer consultas.
        let proyecto = await Proyecto.findById(req.params.id);

        // Revisar que exista el proyecto
        if(!proyecto) {
            return res.satatus(404).json({ msg: "Proyecto no encontrado"});
        };

        // Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id ) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado"});
        };

        // Actualizar
        // Usamos await xq vamos a hacer consulta, en el modelo de proyecto buscamos por id y actualizamos. EN req.params.id esta alojado el id del proyecto seleccionado. En nuevoProyecto esta toda la informacion, que seria el nombre solamente.
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

        // Retornamos la respuesta como un json. En otros caso hemos retornado la respuesta como un mensaje, ahora la respueta queremos que sea el proyecto actualizado.
        res.json({ proyecto });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el Proyecto');  
    }
};

// Elimina un proyecto
exports.eliminarProyecto = async ( req, res ) => {
    try {
        // Revisar el ID
        // Con express se hace facil decir, ve a tal id y actualizalo.
        // await siempre se utiliza para hacer consultas.
        let proyecto = await Proyecto.findById(req.params.id);

        // Revisar que exista el proyecto
        if (!proyecto) {
            return res.satatus(404).json({ msg: "Proyecto no encontrado" });
        };

        // Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            // El error de estado 401 es cuanalgo esta prohibido.
            return res.status(401).json({ msg: "No Autorizado" });
        };

        // Eliminar el proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });

        // Retornamos la respuesta como un json. En otros caso hemos retornado la respuesta como un mensaje, o un objeto, ahora la respueta queremos que sea un mensaje.
        res.json({ msg: "Proyecto eliminado exitosamente" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar');
        
    }

}