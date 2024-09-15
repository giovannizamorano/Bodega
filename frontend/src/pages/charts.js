import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Navbar from '../components/navbar';

// Registrar todos los componentes necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Charts component mounted'); // Log para verificar el montaje
    const fetchProducts = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/productos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      console.log('Data fetched:', response.data);
    };
    fetchProducts();
  }, []);

  const data = {
    labels: products.map(product => product.nombre),
    datasets: [{
      label: 'Cantidad',
      data: products.map(product => product.cantidad),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="charts-page">
      <Navbar />
      <div className="charts-content">
        <h2>Gráficos y Análisis</h2>
        {products.length > 0 ? (
          <Bar data={data} />
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Charts;