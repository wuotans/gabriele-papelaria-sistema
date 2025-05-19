const express = require('express');
const router = express.Router();
const insumosController = require('../controllers/insumosController');
const upload = require('../app').upload;

router.post('/', upload.single('imagem'), insumosController.createInsumo);
router.get('/', insumosController.getAllInsumos);
// Adicionar outras rotas (GET /:id, PUT, DELETE)

module.exports = router;