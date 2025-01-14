const { Sequelize } = require('sequelize');
const LinkModel = require('./Link');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.Link = LinkModel(sequelize);

module.exports = db;
