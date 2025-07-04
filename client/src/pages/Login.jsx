import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('user', name);
      onLogin(name);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
