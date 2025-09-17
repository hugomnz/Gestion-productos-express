const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);

sequelize.sync();

module.exports = { sequelize, User, Product };
