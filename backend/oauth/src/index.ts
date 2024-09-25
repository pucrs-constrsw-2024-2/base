import express, { Request, Response } from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";
import healthRoutes from "./routes/health";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bem-vindo à página principal!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/login", authRoutes);
app.use("/users", userRoutes);
app.use("/health", healthRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
