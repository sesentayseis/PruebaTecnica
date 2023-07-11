const express = require('express');
const router = express.Router();
const connection = require('../conexiondb/database');
// Rutas de las tareas
router.get('/', (req, res) => {
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, categories.title AS category, tasks.status
      FROM tasks
      INNER JOIN categories ON tasks.category_id = categories.id
    `;
  
    connection.query(query, (err, tasks) => {
      if (err) throw err;
      connection.query('SELECT * FROM categories', (err, categories) => {
        if (err) throw err;
        res.render('index', { tasks, categories });
      });
    });
  });
  
  
  router.post('/tasks', (req, res) => {
    const { title, description, category, status } = req.body;
    const task = { title, description, category_id: category, status };
    connection.query('INSERT INTO tasks SET ?', task, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  router.get('/tasks/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tasks WHERE id = ?', id, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

  router.get('/tasks/edit/:id', (req, res) => {
    const taskId = req.params.id;
  
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, categories.title AS category, tasks.status , category_id
      FROM tasks
      INNER JOIN categories ON tasks.category_id = categories.id
      WHERE tasks.id = ?
    `;
  
    connection.query(query, [taskId], (err, task) => {
      if (err) throw err;
      
      // Consulta para obtener todas las categorías
      connection.query('SELECT * FROM categories', (err, categories) => {
        if (err) throw err;
  
        res.render('edit-task', { task: task[0], categories: categories });
      });
    });
  });

  router.post('/tasks/update/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, category, status } = req.body;
    const task = { title, description, category_id: category, status };   
    
    connection.query('UPDATE tasks SET ? WHERE id = ?', [task, taskId], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  
  
  module.exports = router;

  