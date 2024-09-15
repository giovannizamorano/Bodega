const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
  unidadesPorCaja: { type: Number, required: true },
  cajas: { type: Number, default: 0 },
  litraje: { type: Number, default: 0 } 
});

// Calculo del número de cajas
productoSchema.pre('save', function(next) {
  this.cajas = Math.floor(this.cantidad / this.unidadesPorCaja);
  next();
});

module.exports = mongoose.model('Producto', productoSchema);
