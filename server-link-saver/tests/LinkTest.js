const { Sequelize, DataTypes } = require('sequelize');
const LinkModel = require('../models/Link');
const config = require('../config/config.json')['test'];

const sequelize = new Sequelize(config.url, { dialect: config.dialect, logging: false });

const testLink = async () => {
  try {
    const Link = LinkModel(sequelize, DataTypes);
    await sequelize.sync({ force: true });

    const newLink = await Link.create({
      title: 'Example Link',
      url: 'https://example.com',
      userId: 'user123',
    });

    const link = await Link.findOne({ where: { id: newLink.id } });

    await link.update({ title: 'Updated Link Title' });

    await link.destroy();

    const deletedLink = await Link.findOne({ where: { id: newLink.id } });

    console.log('Test result:', {
      created: newLink.toJSON(),
      found: link.toJSON(),
      afterDelete: deletedLink,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

testLink();