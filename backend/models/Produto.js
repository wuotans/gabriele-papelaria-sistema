const mongoose = require('mongoose');

const InsumoProdutoSchema = new mongoose.Schema({
  insumo: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo', required: true },
  quantidade: { type: Number, required: true, min: 1 }
});

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  insumos: [InsumoProdutoSchema],
  precoVenda: { type: Number, required: true, min: 0 },
  imagem: { type: String },
  custoTotal: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

ProdutoSchema.pre('save', async function(next) {
  // Calcular custo total baseado nos insumos
  let custoTotal = 0;
  for (const item of this.insumos) {
    const insumo = await mongoose.model('Insumo').findById(item.insumo);
    custoTotal += insumo.custoPorUnidade * item.quantidade;
  }
  this.custoTotal = custoTotal;
  next();
});

module.exports = mongoose.model('Produto', ProdutoSchema);