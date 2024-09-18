import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app = express();
const PORT = 3000;

app.use('/login', authRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
