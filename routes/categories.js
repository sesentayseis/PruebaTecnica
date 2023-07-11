const express = require('express');
const router = express.Router();
const connection = require('../conexiondb/database');


// Rutas de las categorias
router.get('/', (req, res) => {
    connection.query('SELECT * FROM categories', (err, categories) => {
      if (err) throw err;
      res.render('categories', { categories });
    });
  });
  
  router.post('/', (req, res) => {
    const { title } = req.body;
    const category = { title };
    connection.query('INSERT INTO categories SET ?', category, (err) => {
      if (err) throw err;
      res.redirect('/categories');
    });
  });
  
  router.get('/edit/:id', (req, res) => {
    const categoryId = req.params.id;
    
    connection.query('SELECT * FROM categories WHERE id = ?', [categoryId], (err, categories) => {
      if (err) throw err;
      res.render('edit-categories', { categories });
    });
  });
  router.post('/edit/:id', (req, res) => {
    const { id, title } = req.body;   
    
    connection.query('UPDATE `tareas`.`categories` SET `title` = ? WHERE (`id` = ?)', [title, id], (err) => {
      if (err) throw err;
      console.log('Se cambió el nombre de la categoría');

      res.redirect('/categories');
    });
  });
  router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM `tareas`.`categories` WHERE id = ?', id, (err) => {
      if (err) throw err;
      res.redirect('/categories');
    });
  });
  

  module.exports = router;