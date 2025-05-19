const mongoose = require('mongoose');

const ItemVendaSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: { type: Number, required: true, min: 1 }
});

const VendaSchema = new mongoose.Schema({
  itens: [ItemVendaSchema],
  custoTotal: { type: Number },
  valorTotal: { type: Number },
  lucroTotal: { type: Number },
  dataVenda: { type: Date, default: Date.now }
});

VendaSchema.pre('save', async function(next) {
  let custoTotal = 0;
  let valorTotal = 0;
  
  for (const item of this.itens) {
    const produto = await mongoose.model('Produto').findById(item.produto);
    custoTotal += produto.custoTotal * item.quantidade;
    valorTotal += produto.precoVenda * item.quantidade;
  }
  
  this.custoTotal = custoTotal;
  this.valorTotal = valorTotal;
  this.lucroTotal = valorTotal - custoTotal;
  next();
});

module.exports = mongoose.model('Venda', VendaSchema);