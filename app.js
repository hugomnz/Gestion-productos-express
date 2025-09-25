const express = require('express');
const session = require('express-session');
const path = require('path');

const { sequelize } = require('./models');

const app = express();

/* -------------------- Configuración de vistas y estáticos -------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* ------------------------------ Sesiones ------------------------------------ */
const SESSION_SECRET = process.env.SESSION_SECRET || 'cambia-esto-en-produccion-123';
app.set('trust proxy', 1); // recomendable si hay proxy/CDN (Render/Railway)
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true en HTTPS detrás de proxy 
    sameSite: 'lax'
  }
}));

/* ---------------------------- Verificación DB ------------------------------- */
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a SQLite OK'))
  .catch(err => console.error('❌ Error conectando a SQLite:', err));

/* ------------------------------- Rutas -------------------------------------- */
// Entrada: redirige a login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Rutas de autenticación y productos
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use(authRoutes);
app.use('/products', productRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('not_found');
});

/* ----------------------------- Servidor ------------------------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en http://localhost:${PORT}`);
});
