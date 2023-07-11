const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const database = require('./conexiondb/database');
const tasksRoutes = require('./routes/tasks');
const categoriesRoutes = require('./routes/categories');

// Configuración de Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//  rutas de tareas y categorías
app.use('/', tasksRoutes);
app.use('/categories', categoriesRoutes);

// Inicio del servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
