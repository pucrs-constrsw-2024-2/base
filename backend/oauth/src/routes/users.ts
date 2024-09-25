import axios from 'axios';
import { Router, Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const KEYCLOAK_URL = `${process.env.KEYCLOAK_EXTERNAL_HOST}:${process.env.KEYCLOAK_EXTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const router = Router();
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

router.post('/', async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido.' });
  }

  try {
      const response = await axios.post(
          `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`,
          {
              email: email,
              enabled: true,
              credentials: [
                  {
                      type: 'password',
                      value: senha,
                      temporary: false
                  }
              ]
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${authHeader}`
              }
          }
      );

      res.status(201).json({
          id: response.data.id,
          email: email
      });

  } catch (error: any) {
      console.error('Erro ao criar o usuário no Keycloak:', error);

      if (error.response && error.response.status === 409) {
          return res.status(409).json({ message: 'Username já existente.' });
      }

      if (error.response && error.response.status === 401) {
          return res.status(401).json({ message: 'Access token inválido.' });
      }

      if (error.response && error.response.status === 403) {
          return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint.' });
      }

      res.status(500).json({ message: 'Erro ao criar o usuário.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { enabled } = req.query;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (enabled !== undefined && enabled !== 'true' && enabled !== 'false') {
    return res.status(400).json({ message: 'O valor de "enabled" deve ser true ou false.' });
  }

  try {
    let url = `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`;
    if (enabled !== undefined) {
      url += `?enabled=${enabled}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `${authHeader}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Erro ao listar usuários no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }

    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (!id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  try {
    const response = await axios.get(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authHeader.split(' ')[1]}`,
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(response.data);

  } catch (error: any) {
    console.error('Erro ao obter usuário no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(500).json({ message: 'Erro ao obter usuário.' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email, senha } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const response = await axios.put(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      {
        email: email,
        credentials: [
          {
            type: 'password',
            value: senha,
            temporary: false,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authHeader.split(' ')[1]}`,
        },
      }
    );

    if (response.status === 204) { 
      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    }

    return res.status(200).json(response.data);

  } catch (error: any) {
    console.error('Erro ao atualizar usuário no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (!id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  try {
    await axios.delete(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authHeader.split(' ')[1]}`,
        },
      }
    );

    return res.status(204).send(); 

  } catch (error: any) {
    console.error('Erro ao deletar usuário no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(500).json({ message: 'Erro ao deletar o usuário.' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { senha } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  if (!senha) {
    return res.status(400).json({ message: 'Senha é obrigatória.' });
  }

  try {
    await axios.put(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}/reset-password`,
      {
        type: 'password',
        value: senha,
        temporary: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authHeader.split(' ')[1]}`,
        },
      }
    );

    return res.status(200).json({ message: 'Senha atualizada com sucesso.' });

  } catch (error: any) {
    console.error('Erro ao atualizar senha no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(500).json({ message: 'Erro ao atualizar a senha.' });
  }
});

export default router;
