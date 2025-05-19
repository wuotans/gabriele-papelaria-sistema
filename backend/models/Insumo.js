const mongoose = require('mongoose');

const InsumoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  quantidadeTotal: { type: Number, required: true, min: 0 },
  custoPorUnidade: { type: Number, required: true, min: 0 },
  imagem: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insumo', InsumoSchema);