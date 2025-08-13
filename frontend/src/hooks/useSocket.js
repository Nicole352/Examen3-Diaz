import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const useSocket = (url, token) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    if (!token) return;

    const newSocket = io(url, {
      auth: { token },
      withCredentials: true
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Conectado al servidor');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Desconectado del servidor');
    });

    newSocket.on('currentStatus', (status) => {
      setCurrentStatus(status);
    });

    newSocket.on('statusUpdated', (status) => {
      setCurrentStatus(status);
    });

    newSocket.on('error', (error) => {
      alert(error.message);
    });

    return () => {
      newSocket.close();
    };
  }, [url, token]);

  const sendStatus = useCallback((message) => {
    if (socket && isConnected) {
      socket.emit('newStatus', { message });
    }
  }, [socket, isConnected]);

  return { socket, isConnected, currentStatus, sendStatus };
};

export default useSocket;