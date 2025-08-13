import React from 'react';

const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión para Acceder al Muro</h2>
      <div className="login-buttons">
        <button onClick={handleGoogleLogin} className="btn-google">
          🔍 Continuar con Google
        </button>
        <button onClick={handleGitHubLogin} className="btn-github">
          💻 Continuar con GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginButton;