const mongoose = require('mongoose');

const ItemPedidoSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  quantidade: { type: Number, required: true, min: 1 },
  valorUnitario: { type: Number, required: true, min: 0 }
});

const PedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  aniversariante: { type: String, required: true },
  idade: { type: Number, required: true, min: 0 },
  tema: { type: String, required: true },
  dataPedido: { type: Date, default: Date.now },
  dataEntrega: { type: Date, required: true },
  dataFesta: { type: Date, required: true },
  itens: [ItemPedidoSchema],
  valorTotal: { type: Number },
  custoInsumos: { type: Number },
  status: { type: String, enum: ['pendente', 'produção', 'concluído', 'entregue'], default: 'pendente' }
});

PedidoSchema.pre('save', function(next) {
  // Calcular valor total
  this.valorTotal = this.itens.reduce((total, item) => {
    return total + (item.valorUnitario * item.quantidade);
  }, 0);
  next();
});

module.exports = mongoose.model('Pedido', PedidoSchema);