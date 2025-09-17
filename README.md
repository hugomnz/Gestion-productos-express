# Gestion-productos-express
Aplicación web en Node.js con Express, EJS y SQLite que permite registrar usuarios, iniciar sesión y gestionar productos (crear, listar, editar y eliminar) con control de permisos y sesiones.

# 🛒 Aplicación Web de Gestión de Productos con Usuarios

Este proyecto es una aplicación web completa desarrollada con **Node.js**, **Express**, **EJS** y **SQLite** mediante **Sequelize** como ORM.  
Permite **registrarse, iniciar sesión y gestionar productos** con operaciones CRUD (crear, listar, ver detalle, editar, eliminar).  
Incluye autenticación básica con sesiones, protección de rutas y control de permisos por usuario.

---

## ✨ Características principales

- 👤 **Gestión de usuarios**
  - Registro de nuevos usuarios con nombre, email y contraseña.
  - Login con validación de credenciales.
  - Contraseñas almacenadas con **hash SHA256** (CryptoJS).
  - Sesiones con `express-session`.
  - Logout seguro.

- 📦 **Gestión de productos**
  - Listado de todos los productos (solo para usuarios logueados).
  - Listado de productos propios del usuario.
  - Creación de nuevos productos con nombre, descripción y precio.
  - Vista de detalle de cada producto.
  - Edición y eliminación de productos, **solo por su propietario**.
  - Validaciones básicas de datos (precio numérico, campos obligatorios).

- 🎨 **Interfaz**
  - Plantillas renderizadas con **EJS**.
  - Estilos básicos en `public/css/style.css`.
  - Plantillas dedicadas para:
    - Login / Registro
    - Listado de productos
    - Mis productos
    - Formulario de producto
    - Detalle de producto
    - Confirmación de eliminación
    - Errores (404 y acceso denegado)

- 🗄️ **Base de datos**
  - SQLite con Sequelize (archivo `database.sqlite` en la raíz).
  - Modelo `User` (username, email, password).
  - Modelo `Product` (name, description, price, owner).
  - Creación automática de tablas con `sequelize.sync()`.

- 🔒 **Seguridad**
  - Middleware de autenticación para proteger rutas.
  - Restricciones de permisos: solo el propietario puede editar/borrar su producto.
  - Manejo de errores con vistas específicas (`access_denied`, `not_found`).

---

## 🗂️ Estructura del proyecto

tu-proyecto/
├─ app.js # Servidor principal Express
├─ package.json
├─ package-lock.json
├─ database.sqlite # Base de datos (se crea sola si no existe)
│
├─ models/
│ ├─ index.js # Inicialización de Sequelize y exportación de modelos
│ ├─ product.js # Definición modelo Product
│ └─ user.js # Definición modelo User
│
├─ routes/
│ ├─ auth.js # Rutas de autenticación (login, registro, logout)
│ └─ products.js # Rutas CRUD de productos
│
├─ views/ # Plantillas EJS
│ ├─ access_denied.ejs
│ ├─ login.ejs
│ ├─ my_products.ejs
│ ├─ not_found.ejs
│ ├─ product_delete.ejs
│ ├─ product_detail.ejs
│ ├─ product_form.ejs
│ ├─ products.ejs
│ └─ register.ejs
│
└─ public/
└─ css/
└─ style.css # Estilos globales

---

## ⚙️ Requisitos previos

- **Node.js** v18 o superior
- **npm** (incluido con Node.js)
- No necesitas instalar SQLite manualmente, se maneja con `sqlite3`.

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/hugomnz/gestion-productos-express.git
   cd gestion-productos-express
   ```
2. Instalar dependencias
```bash
npm install
```

3. Configurar estructura de carpetas
  Asegúrate de tener:
- Archivos EJS dentro de views/.
- CSS en public/css/style.css.
- Modelos en models/.
- Rutas en routes/.

4. Ejecutar el servidor
  ```
  npm start
  # o
  node app.js
  ```
5. Abrir en el navegador:
URL: http://localhost:3000
- Flujo:
- Regístrate en /register.
- Haz login en /login.
- Gestiona tus productos en /products.

🛠️ Scripts disponibles

En package.json puedes añadir:

"scripts": {
  "start": "node app.js",
  "dev": "NODE_ENV=development node app.js"
}


Así podrás ejecutar:

npm start   # ejecución normal
npm run dev # modo desarrollo

🔍 Flujo de uso

Registro (/register) → crear usuario nuevo.

Login (/login) → iniciar sesión.

Listado general (/products) → ver todos los productos.

Mis productos (/products/user) → ver solo los tuyos.

Crear producto (/products/create) → añadir uno nuevo.

Detalle (/products/:id) → ver info completa de un producto.

Editar (/products/update/:id) → solo si eres propietario.

Eliminar (/products/delete/:id) → confirmar y borrar.

Logout (/logout) → cerrar sesión.

🌍 Compatibilidad

Probado en navegadores modernos:

Google Chrome ≥ 90

Firefox ≥ 88

Edge ≥ 90

Safari ≥ 14

📦 Dependencias principales

express — framework web.

express-session — gestión de sesiones.

ejs — motor de vistas.

sequelize — ORM.

sqlite3 — base de datos embebida.

crypto-js — hash de contraseñas.
