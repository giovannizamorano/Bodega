import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    onLogin(username, password, rememberMe);
  };

  return (
    <div className="form-container">
      <h2>Inicio de sesión</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="login-username">Usuario:</label>
        <input 
          type="text" 
          id="login-username"
          name="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          autoComplete="username"
        />
        <label htmlFor="login-password">Contraseña:</label>
        <input 
          type="password" 
          id="login-password"
          name="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          autoComplete="current-password"
        />
        <div className="remember-me">
          <input 
            type="checkbox" 
            id="remember-me"
            checked={rememberMe} 
            onChange={(e) => setRememberMe(e.target.checked)} 
          />
          <label htmlFor="remember-me">Recordar Usuario</label>
        </div>
        <button type="submit" className="button">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
