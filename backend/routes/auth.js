const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta para iniciar OAuth con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { 
        id: req.user.id, 
        name: req.user.name, 
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Enviar token como cookie httpOnly Y como cookie accesible
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });
    
    // Cookie adicional para que el frontend pueda leer el token
    res.cookie('auth_token', token, { 
      httpOnly: false, // Accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect(`${process.env.CLIENT_URL}?auth=success`);
  }
);

// Ruta para iniciar OAuth con GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback de GitHub
router.get('/github/callback', 
  passport.authenticate('github', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { 
        id: req.user.id, 
        name: req.user.name, 
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    // Cookie adicional para que el frontend pueda leer el token
    res.cookie('auth_token', token, { 
      httpOnly: false, // Accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect(`${process.env.CLIENT_URL}?auth=success`);
  }
);

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('auth_token'); // Limpiar ambas cookies
  res.json({ success: true, message: 'Sesión cerrada' });
});

module.exports = router;