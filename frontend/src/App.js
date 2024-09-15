import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../src/css/App.css';
import '../src/css/satoshi.css'
import axios from 'axios';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';  // Mantenemos el Dashboard como un componente separado
import Charts from './pages/charts';        // Página para los gráficos
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (username, password, rememberMe) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }
      navigate('/');  // Redirige al Dashboard después del login
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password });
      console.log('Register successful', response);
    } catch (error) {
      console.error('Register error', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/charts" element={<Charts />} />
        
        <Route path="/login" element={
          <>
            {isLogin ? <Login onLogin={handleLogin} /> : <Register onRegister={handleRegister} />}
            <div className="title">
              <h1>GILUC</h1>
            </div>
            <div className="switch-button">
              <input 
                type="checkbox" 
                id="switch" 
                checked={!isLogin} 
                onChange={handleToggle} 
              />
              <label className="switch-button-label" htmlFor="switch"></label>
              <span>{isLogin ? 'Registro de usuario' : 'Inicio de sesión'}</span>
            </div>
          </>
        } />

      </Routes>
    </div>
  );
};

export default App;