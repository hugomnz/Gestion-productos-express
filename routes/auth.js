const express = require('express');
const router = express.Router();
const { User } = require('../models');
const CryptoJS = require('crypto-js');

// Middleware: si el usuario ya está logueado, redirige al home
function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect('/products');
  }
  next();
}

// Registro
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', redirectIfAuthenticated, async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.render('register', { error: 'Nombre de usuario ya en uso' });
  }

  const hashedPassword = CryptoJS.SHA256(password).toString();

  await User.create({ username, email, password: hashedPassword });

  res.redirect('/login');
});

// Login
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', redirectIfAuthenticated, async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  const hashed = CryptoJS.SHA256(password).toString();

  if (!user || user.password !== hashed) {
    return res.render('login', { error: 'Nombre de usuario o contraseña incorrectos' });
  }

  req.session.user = { username: user.username };
  res.redirect('/products');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
