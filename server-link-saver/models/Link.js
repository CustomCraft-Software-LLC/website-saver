const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Link', LinkSchema);