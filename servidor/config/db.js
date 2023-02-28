const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Desactivar la opción 'strictQuery'
mongoose.set('strictQuery', false);

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Conectada');
    } catch (error) { // Capturar el error
        console.log(error);
        process.exit(1); // Detener la API en caso de ERROR
    }
};

module.exports = conectarDB;