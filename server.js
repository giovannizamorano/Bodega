// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// Configurar cors para permitir solicitudes desde http://localhost:3001
app.use(cors({
  origin: 'http://localhost:3001'
}));

mongoose.connect('mongodb://localhost:27017/negocio')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB', err));

app.use(bodyParser.json());

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido al backend del servidor');
});

// Rutas de productos y autenticación
app.use('/productos', productRoutes);
app.use('/auth', authRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

app.listen(3000, () => {
  console.log('Servidor esta corriendo en el puerto 3000');
});
