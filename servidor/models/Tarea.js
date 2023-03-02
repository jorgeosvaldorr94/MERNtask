const mongoose = require('mongoose');

const tareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    texto: {
        type: String,
        required: false,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        // tipo referencia, por eso usamos la sgt sintaxis.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Tarea', tareaSchema);