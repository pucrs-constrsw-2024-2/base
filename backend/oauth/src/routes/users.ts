import { Router, Request, Response } from 'express';

const router = Router();

interface User {
  id: number;
  email: string;
  senha: string;
}

let users: User[] = [];
let nextId = 1;

router.post('/users', (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const newUser: User = {
      id: nextId++,
      email,
      senha
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

router.get('/users', (req: Request, res: Response) => {
  return res.json(users);
});

router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return res.json(user);
});

router.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { email, senha } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (email) users[userIndex].email = email;
  if (senha) users[userIndex].senha = senha;

  return res.json(users[userIndex]);
});

router.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  users.splice(userIndex, 1);
  return res.status(204).send(); // 204 No Content
});

router.patch('/users/:id/senha', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { senha } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (!senha) {
      return res.status(400).json({ message: 'Senha é obrigatória.' });
  }

  users[userIndex].senha = senha;

  return res.json({ message: 'Senha atualizada com sucesso.' });
});

export default router;
