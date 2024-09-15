import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/productform';
import Navbar from '../components/navbar';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/productos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleSaveProduct = async (product) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      if (editingProduct) {
        const response = await axios.put(`http://localhost:3000/productos/${editingProduct._id}`, product, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.map(p => p._id === response.data._id ? response.data : p));
      } else {
        const response = await axios.post('http://localhost:3000/productos', product, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts([...products, response.data]);
      }
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar el producto:', error.response.data);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    await axios.delete(`http://localhost:3000/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div id="main" className="dashboard-page">

      <Navbar/>

      <header id="header" className="dashboard-header">
      </header>
      <div className="dashboard-content">


        {/*Inicio formulario de ingreso y modificacion de productos*/}
        <h2>Lista de productos</h2>
        {showForm ? (
          <ProductForm
            onSave={handleSaveProduct}
            product={editingProduct}
            onCancel={() => setShowForm(false)}
            existingProducts={products}
          />
        ) : (
          <button className="dashboard-button" onClick={() => setShowForm(true)}>Agregar Producto</button>
        )}
        {/*Fin del formulario*/}
      


        {/*Inicio tabla de productos ya ingresados*/}
        <table className="dashboard-table">

          
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cc</th>
              <th>Cantidad</th>
              <th>Tipo</th>
              <th>Cajas</th>
              <th>Acciones</th>
            </tr>
          </thead>


          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td>{product.litraje}</td>
                <td>{product.cantidad}</td>
                <td>{product.tipo}</td>
                <td>{product.cajas}</td>
                <td>
                  <button className="button" onClick={() => handleEditProduct(product)}>Editar</button>
                  <button className="button" onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>


        </table>
        {/*Fin de tabla de productos ingresados*/}


      </div>
    </div>
  );
};

export default Dashboard;
