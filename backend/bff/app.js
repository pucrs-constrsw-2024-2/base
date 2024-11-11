const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.BFF_PORT || 8080;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const classesRoutes = require('./routes/classes');
const gradesRoutes = require('./routes/grades');
const roomsRoutes = require('./routes/rooms');
const featuresRoutes = require('./routes/features');
const lessonsRoutes = require('./routes/lessons');
const subjectsRoutes = require('./routes/subjects');
const resourcesRoutes = require('./routes/resources');
const maintenancesRoutes = require('./routes/maintenances');
const coursesRoutes = require('./routes/courses');
const referencesRoutes = require('./routes/references');
const reservationsRoutes = require('./routes/reservations');
const incidentsRoutes = require('./routes/incidents');
const professorsRoutes = require('./routes/professors');
// const degreesRoutes = require('./routes/degrees');
const { checkLoggedIn } = require("./middleware/authMiddleware");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CONSTRSW-2024-1 - BFF',
      version: '1.0.0',
      description: 'API Backend For Frontend',
    },
  },
  apis: ['./routes/*.js'], // path to the API docs
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("Starting API...");

app.use("/classes", checkLoggedIn, classesRoutes);
app.use("/classes", checkLoggedIn, gradesRoutes);
app.use("/rooms", checkLoggedIn, roomsRoutes);
app.use("/rooms", checkLoggedIn, featuresRoutes);
app.use("/lessons", checkLoggedIn, lessonsRoutes);
app.use("/lessons", checkLoggedIn, subjectsRoutes);
app.use('/resources', checkLoggedIn, resourcesRoutes);
app.use('/resources', checkLoggedIn, maintenancesRoutes);
app.use('/courses', checkLoggedIn, coursesRoutes);
app.use('/courses', checkLoggedIn, referencesRoutes);
app.use('/reservations', checkLoggedIn, reservationsRoutes);
app.use('/reservations', checkLoggedIn, incidentsRoutes);
app.use('/professors', checkLoggedIn, professorsRoutes);
// app.use('/professors', checkLoggedIn, degreesRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
