const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Middleware para proteger rutas
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(403).render('access_denied');
  }
  next();
}

// GET /products - todos los productos
router.get('/', requireLogin, async (req, res) => {
  const productos = await Product.findAll();
  res.render('products', { productos, user: req.session.user.username });
});

// GET /products/user - productos del usuario autenticado
router.get('/user', requireLogin, async (req, res) => {
  const productos = await Product.findAll({
    where: { owner: req.session.user.username }
  });
  res.render('my_products', { productos });
});

// GET /products/create - formulario nuevo producto
router.get('/create', requireLogin, (req, res) => {
  res.render('product_form', { producto: null, error: null });
});

// POST /products/create - crear producto
router.post('/create', requireLogin, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    await Product.create({
      name,
      description,
      price,
      owner: req.session.user.username
    });
    res.redirect('/products');
  } catch (err) {
    res.render('product_form', { producto: null, error: 'Datos inválidos' });
  }
});

// GET /products/:id - ver detalle del producto
router.get('/:id', requireLogin, async (req, res) => {
  const producto = await Product.findByPk(req.params.id);
  if (!producto) {
    return res.status(404).render('not_found');
  }

  const esPropietario = producto.owner === req.session.user.username;

  res.render('product_detail', {
    producto,
    esPropietario
  });
});

// GET /products/update/:id - formulario edición
router.get('/update/:id', requireLogin, async (req, res) => {
  const producto = await Product.findByPk(req.params.id);

  if (!producto || producto.owner !== req.session.user.username) {
    return res.status(403).render('access_denied');
  }

  res.render('product_form', { producto, error: null });
});

// POST /products/update/:id - guardar cambios
router.post('/update/:id', requireLogin, async (req, res) => {
  const producto = await Product.findByPk(req.params.id);

  if (!producto || producto.owner !== req.session.user.username) {
    return res.status(403).render('access_denied');
  }

  const { name, description, price } = req.body;

  try {
    await producto.update({ name, description, price });
    res.redirect('/products/' + producto.id);
  } catch (err) {
    res.render('product_form', { producto, error: 'Error al actualizar' });
  }
});

// GET /products/delete/:id - confirmar eliminación
router.get('/delete/:id', requireLogin, async (req, res) => {
  const producto = await Product.findByPk(req.params.id);

  if (!producto || producto.owner !== req.session.user.username) {
    return res.status(403).render('access_denied');
  }

  res.render('product_delete', { producto });
});

// POST /products/delete/:id - eliminar producto
router.post('/delete/:id', requireLogin, async (req, res) => {
  const producto = await Product.findByPk(req.params.id);

  if (!producto || producto.owner !== req.session.user.username) {
    return res.status(403).render('access_denied');
  }

  await producto.destroy();
  res.redirect('/products');
});

module.exports = router;
