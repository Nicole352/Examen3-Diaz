const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
require('./config/passport');

const app = express();
const server = http.createServer(app);

// Configurar Socket.IO
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Estado global del muro
let currentStatus = {
  message: '',
  author: null,
  timestamp: null
};

// Middleware de Socket.IO para autenticación
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Token requerido'));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    next(new Error('Token inválido'));
  }
});

// Conexiones Socket.IO
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.user.name} (${socket.id})`);
  
  // Enviar estado actual al conectarse
  socket.emit('currentStatus', currentStatus);
  
  // Escuchar nuevo estado
  socket.on('newStatus', (data) => {
    if (!data.message || data.message.trim().length === 0) {
      socket.emit('error', { message: 'El estado no puede estar vacío' });
      return;
    }
    
    if (data.message.length > 280) {
      socket.emit('error', { message: 'El estado no puede exceder 280 caracteres' });
      return;
    }
    
    // Actualizar estado global
    currentStatus = {
      message: data.message.trim(),
      author: {
        id: socket.user.id,
        name: socket.user.name,
        avatar: socket.user.avatar,
        provider: socket.user.provider
      },
      timestamp: new Date().toISOString()
    };
    
    console.log(`Nuevo estado de ${socket.user.name}: ${currentStatus.message}`);
    
    // Emitir a todos los clientes conectados
    io.emit('statusUpdated', currentStatus);
  });
  
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.user.name} (${socket.id})`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});