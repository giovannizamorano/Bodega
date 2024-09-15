import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <div className="form-container">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="register-username">Usuario:</label>
        <input 
          type="text" 
          id="register-username"
          name="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          autoComplete="username"
        />
        <label htmlFor="register-password">Contraseña:</label>
        <input 
          type="password" 
          id="register-password"
          name="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          autoComplete="new-password"
        />
        <button type="submit" className="button">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
