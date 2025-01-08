const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const linkRoutes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));