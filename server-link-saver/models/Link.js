const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,  
  tableName: 'Link',  
});

module.exports = Link;


