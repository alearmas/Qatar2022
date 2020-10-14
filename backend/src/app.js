const express = require('express');
const cors = require('cors'); // Cors es una libreria que permite conectar que 2 servidores puedan intercambiar datos enter ellos
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', require('./routes/user'))
app.use('/notes', require('./routes/note'))

module.exports = app;