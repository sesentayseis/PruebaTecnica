const mysql = require('mysql2');

// Configuración de MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'tareas'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = connection; // Exporta la conexión a la base de datos
