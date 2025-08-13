import React, { useState } from 'react';

const StatusForm = ({ onSubmit, user, isConnected }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting || !isConnected) return;

    setIsSubmitting(true);
    onSubmit(message);
    setMessage('');
    setIsSubmitting(false);
  };

  const remainingChars = 280 - message.length;

  return (
    <div className="status-form">
      <div className="user-info">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <span className="user-name">{user.name}</span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="¿Qué está pasando? Tu estado reemplazará el actual para todos..."
          maxLength={280}
          disabled={!isConnected || isSubmitting}
          className="status-input"
        />
        
        <div className="form-footer">
          <span className={`char-counter ${remainingChars < 20 ? 'warning' : ''}`}>
            {remainingChars} caracteres restantes
          </span>
          <button 
            type="submit" 
            disabled={!message.trim() || !isConnected || isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Publicando...' : 'Publicar Estado'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusForm;