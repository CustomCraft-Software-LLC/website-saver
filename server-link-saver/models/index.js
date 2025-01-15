const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.Link = require('./Link')(sequelize, DataTypes);

module.exports = db;