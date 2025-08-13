import React, { useState, useEffect } from 'react';
import { authAPI } from './utils/auth';
import useSocket from './hooks/useSocket';
import LoginButton from './components/LoginButton';
import StatusWall from './components/StatusWall';
import StatusForm from './components/StatusForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Hook de Socket.IO
  const { isConnected, currentStatus, sendStatus } = useSocket(
    'http://localhost:5000',
    token
  );

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuthentication = async () => {
      const authData = await authAPI.checkAuth();
      if (authData) {
        setUser(authData.user);
        const userToken = authAPI.getToken();
        console.log('Token encontrado:', userToken ? 'Sí' : 'No');
        setToken(userToken);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  // Manejar parámetro de URL después de OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'success') {
      window.location.replace('/');
    }
  }, []);

  const handleLogout = () => {
    authAPI.logout();
  };

  const handleStatusSubmit = (message) => {
    sendStatus(message);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌟 Muro de Estados Efímero</h1>
        <p>Solo el último estado se mantiene visible para todos</p>
      </header>

      <main className="App-main">
        {!user ? (
          <LoginButton />
        ) : (
          <>
            <div className="user-section">
              <div className="user-welcome">
                ¡Hola, {user.name}!
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              </div>
            </div>

            <StatusWall status={currentStatus} isConnected={isConnected} />
            
            <StatusForm 
              onSubmit={handleStatusSubmit}
              user={user}
              isConnected={isConnected}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;