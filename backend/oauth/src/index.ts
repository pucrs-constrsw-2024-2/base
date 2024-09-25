import express, { Request, Response } from 'express';
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à página principal!');
});
app.use("/login", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
