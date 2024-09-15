// routes/products.js
const express = require('express');
const router = express.Router();
const Producto = require('../modelos/product');
const authenticate = require('../middleware/authenticate');


// Crear producto
router.post('/', authenticate, (req, res) => {
  const producto = new Producto(req.body);
  producto.cajas = Math.floor(producto.cantidad / producto.unidadesPorCaja);
  producto.save()
    .then(producto => res.json(producto))
    .catch(err => res.status(400).json(err));
});

// Leer productos
router.get('/', authenticate, (req, res) => {
  Producto.find()
    .then(productos => res.json(productos))
    .catch(err => res.status(400).json(err));
});

// Actualizar producto
router.put('/:id', authenticate, (req, res) => {
  Producto.findById(req.params.id)
    .then(producto => {
      if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
      Object.assign(producto, req.body);
      producto.cajas = Math.floor(producto.cantidad / producto.unidadesPorCaja);
      return producto.save();
    })
    .then(producto => res.json(producto))
    .catch(err => res.status(400).json(err));
});

// Eliminar producto
router.delete('/:id', authenticate, (req, res) => {
  Producto.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Producto eliminado' }))
    .catch(err => res.status(400).json(err));
});

//obtener las estadisticas de los productos

router.get('/estadisticas', authenticate, async (req, res) => {
    try {
      const productos = await Producto.find();
      const totalVentas = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
      const totalProductos = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
  
      res.json({
        totalVentas,
        totalProductos
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;