const express = require('express');
const bodyParser = require('body-parser');
const expressListEndpoints = require('express-list-endpoints');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

// Importar rotas
const postsRoutes = require('./routes/posts');
const imagesRoutes = require('./routes/images');

// Usar rotas
app.use('/api/posts', postsRoutes);
app.use('/api/images', imagesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/api/endpoints', (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});