require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/users');
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));


const app = express();
const PORT = process.env.OAUTH_INTERNAL_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);

app.listen(PORT, () =>
    console.log('rodando')
);