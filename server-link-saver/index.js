const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const linkRoutes = require('./routes/index.js');

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://website-saver.onrender.com', 'http://localhost:5000', 'http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});