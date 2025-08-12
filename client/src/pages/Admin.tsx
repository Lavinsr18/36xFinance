import React, { useState } from 'react';
import '../pages/adl.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // Add your authentication logic here
  };

  return (
    <div className="admin-login-container">
      <div className="overlay" />
      <div className="login-box animate-fade-in">
        <h1 className="login-title">36x Finance Admin Panel</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field animate-hover"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field animate-hover"
            required
          />
          <button type="submit" className="login-button glow-on-hover">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;