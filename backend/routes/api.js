const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Ruta protegida para obtener perfil
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider
    }
  });
});

// Verificar si el usuario está autenticado
router.get('/me', authenticateToken, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

module.exports = router;