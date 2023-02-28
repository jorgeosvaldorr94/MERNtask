const mongoose = require('mongoose');

// Definir la bd o su estructura (Schema)
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

// Le decimos a mongo que vamos a registrar el modelo Usuario con su Schema
module.exports = mongoose.model('Usuario', UsuarioSchema);