import React from 'react';

const StatusWall = ({ status, isConnected }) => {
  if (!status || !status.message) {
    return (
      <div className="status-wall empty">
        <h3>El Muro Está Vacío</h3>
        <p>Sé el primero en publicar un estado</p>
        <div className="connection-status">
          {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
        </div>
      </div>
    );
  }

  return (
    <div className="status-wall">
      <div className="connection-status">
        {isConnected ? '🟢 En tiempo real' : '🔴 Desconectado'}
      </div>
      
      <div className="current-status">
        <div className="status-header">
          <img 
            src={status.author.avatar} 
            alt={status.author.name}
            className="author-avatar"
          />
          <div className="author-info">
            <span className="author-name">{status.author.name}</span>
            <span className="provider-badge">{status.author.provider}</span>
          </div>
          <span className="timestamp">
            {new Date(status.timestamp).toLocaleString()}
          </span>
        </div>
        
        <div className="status-message">
          {status.message}
        </div>
      </div>
    </div>
  );
};

export default StatusWall;