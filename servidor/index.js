// Importar express
const express = require('express');
const conectarDB = require('./config/db');
// Importar cors, es para que no tengamos error al correr el frontend en el puerto 3000 y el backend en el 4000
const cors = require('cors'); 

// Crear el servidor e iniciar express
const app = express();

// Conectar a la base de Datos
conectarDB(); // Recordar que es una funcion, la llamamos solamente

// Habilitar cors
app.use(cors());

// Hablitar express.json
app.use(express.json({extended: true}));

// Crear un puerto... si no existe la variable de entorno, utiliza el puerto 4000
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Definir la pagina principal
app.get('/', (req, res) => {
    res.send('Hola Mundo desde el Server');
})

// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
