const express = require('express');
const rounter = express.Router();
const livrosController = require('../controllers/livrosController');

rounter.get('/', livrosController.getLivros);
rounter.get('/:id', livrosController.getLivro);
rounter.post('/', livrosController.createLivro);
rounter.put('/:id', livrosController.updateLivro);
rounter.delete('/:id', livrosController.removeLivro);

module.exports = rounter;