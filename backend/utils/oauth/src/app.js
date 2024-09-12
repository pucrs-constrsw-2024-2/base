const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');  // Certifique-se de que este caminho está correto

dotenv.config();

const app = express();
const port = process.env.OAUTH_INTERNAL_PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`OAuth service listening at http://localhost:${port}`);
});