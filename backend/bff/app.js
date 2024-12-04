const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.BFF_INTERNAL_PORT || 3000;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const classesRoutes = require("./routes/classes");
const coursesRoutes = require("./routes/courses");
const lessonsRoutes = require("./routes/lessons");
const professorsRoutes = require("./routes/professors");
const reservationsRoutes = require("./routes/reservations");
const resourcesRoutes = require("./routes/resources");
const roomsRoutes = require("./routes/rooms");
const studentsRoutes = require("./routes/students");

const { checkLoggedIn } = require("./middleware/authMiddleware");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Closed SARC BFF API",
			version: "1.0.0",
			description: "API Backend For Frontend",
		},
	},
	apis: ["./routes/*.js"], // path to the API docs
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/classes", checkLoggedIn, classesRoutes);
app.use("/rooms", checkLoggedIn, roomsRoutes);
app.use("/lessons", checkLoggedIn, lessonsRoutes);
app.use("/resources", checkLoggedIn, resourcesRoutes);
app.use("/courses", checkLoggedIn, coursesRoutes);
app.use("/reservations", checkLoggedIn, reservationsRoutes);
app.use("/students", checkLoggedIn, studentsRoutes);
app.use("/professors", checkLoggedIn, professorsRoutes);

app.get("/health", (req, res) => {
	res.status(200).send("OK");
});

app.listen(port);
