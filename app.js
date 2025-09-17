const express = require('express');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');

const app = express();

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear formularios
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones
app.use(session({
  secret: 'secretoseguro123',
  resave: false,
  saveUninitialized: false
}));

// Sequelize (base de datos SQLite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Hacer sequelize accesible desde req
app.use((req, res, next) => {
  req.sequelize = sequelize;
  next();
});

// Redirigir al login como punto de entrada
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Cargar rutas (las añadiremos después)
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use(authRoutes);
app.use('/products', productRoutes);

// Página de error 404
app.use((req, res) => {
  res.status(404).render('not_found');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
