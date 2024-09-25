import axios from 'axios';
import { Router, Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const KEYCLOAK_URL = `${process.env.KEYCLOAK_INTERNAL_HOST}:${process.env.KEYCLOAK_INTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const router = Router();
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário no Keycloak com email e senha.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Email e senha são obrigatórios ou email inválido.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       409:
 *         description: Username já existente.
 *       500:
 *         description: Erro ao criar o usuário.
 */
router.post('/', async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const authHeader = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Verifica se email e senha foram fornecidos
  if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Valida o formato do email
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido.' });
  }

  try {
      const response = await axios.post(
          `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users`,
          {
              email,
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
                  Authorization: authHeader // Usa o authHeader original
              }
          }
      );

      res.status(201).json({
          id: response.data.id,
          email
      });

  } catch (error: any) {
      console.error('Erro ao criar o usuário no Keycloak:', error);

      // Mapeia os erros de acordo com os códigos de status
      if (error.response) {
          switch (error.response.status) {
              case 409:
                  return res.status(409).json({ message: 'Username já existente.' });
              case 401:
                  return res.status(401).json({ message: 'Access token inválido.' });
              case 403:
                  return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint.' });
              default:
                  break;
          }
      }

      res.status(500).json({ message: 'Erro ao criar o usuário.' });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     description: Lista todos os usuários do Keycloak. Aceita o parâmetro query "enabled" para filtrar usuários.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *       - in: query
 *         name: enabled
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       400:
 *         description: O valor de "enabled" deve ser true ou false.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao listar usuários.
 */
router.get('/', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { enabled } = req.query;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Valida o parâmetro 'enabled'
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
        Authorization: authHeader,
      },
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Erro ao listar usuários no Keycloak:', error);

    // Mapeia os erros de acordo com os códigos de status
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return res.status(401).json({ message: 'Access token inválido.' });
            case 403:
                return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
            default:
                break;
        }
    }

    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obter um usuário
 *     description: Recupera um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       404:
 *         description: Usuário não encontrado.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao obter usuário.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Verifica se o ID do usuário foi fornecido
  if (!id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  try {
    const response = await axios.get(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      {
        headers: {
          Authorization: authHeader, // Usa o authHeader original
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Erro ao obter usuário no Keycloak:', error);

    // Mapeia os erros de acordo com os códigos de status
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return res.status(401).json({ message: 'Access token inválido.' });
            case 403:
                return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
            case 404:
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            default:
                break;
        }
    }

    res.status(500).json({ message: 'Erro ao obter usuário.' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     description: Atualiza as informações de um usuário existente. Apenas os campos fornecidos no corpo da requisição serão atualizados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               senha:
 *                 type: string
 *                 example: "newpassword"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar usuário.
 */

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email, senha, firstName, lastName } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Cria um objeto com os dados a serem atualizados
  const updateData: any = {};
  if (email) updateData.email = email;
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (senha) {
    updateData.credentials = [
      {
        type: 'password',
        value: senha,
        temporary: false,
      },
    ];
  }

  try {
    await axios.put(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      updateData,
      {
        headers: {
          Authorization: `${authHeader}`,
        },
      }
    );

    return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error: any) {
    console.error('Erro ao atualizar usuário no Keycloak:', error);

    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Access token inválido.' });
    }

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
    }
    
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualizar senha de um usuário
 *     description: Atualiza a senha de um usuário existente pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senha:
 *                 type: string
 *                 example: "newpassword"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *       400:
 *         description: Senha é obrigatória.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar senha.
 */
router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { senha } = req.body;
  const authHeader = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Verifica se a senha foi fornecida
  if (!senha) {
      return res.status(400).json({ message: 'Senha é obrigatória.' });
  }

  try {
      await axios.put(
          `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}/reset-password`,
          {
              type: 'password',
              value: senha,
              temporary: false
          },
          {
              headers: {
                  Authorization: authHeader,
              },
          }
      );

      return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
  } catch (error: any) {
      console.error('Erro ao atualizar senha no Keycloak:', error);

      // Mapeia os erros de acordo com os códigos de status
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  return res.status(401).json({ message: 'Access token inválido.' });
              case 403:
                  return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
              case 404:
                  return res.status(404).json({ message: 'Usuário não encontrado.' });
              default:
                  break;
          }
      }

      res.status(500).json({ message: 'Erro ao atualizar senha.' });
  }
});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     description: Exclui um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_token_here"
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso.
 *       401:
 *         description: Token de autenticação é obrigatório.
 *       404:
 *         description: Usuário não encontrado.
 *       403:
 *         description: Access token não concede permissão para acessar esse endpoint ou objeto.
 *       500:
 *         description: Erro ao excluir usuário.
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  // Verifica se o token de autenticação está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação é obrigatório.' });
  }

  // Verifica se o ID do usuário foi fornecido
  if (!id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  try {
    await axios.delete(
      `http://${KEYCLOAK_URL}/admin/realms/${REALM}/users/${id}`,
      {
        headers: {
          Authorization: authHeader, // Usa o authHeader original
        },
      }
    );

    return res.status(204).send();
  } catch (error: any) {
    console.error('Erro ao excluir usuário no Keycloak:', error);

    // Mapeia os erros de acordo com os códigos de status
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return res.status(401).json({ message: 'Access token inválido.' });
            case 403:
                return res.status(403).json({ message: 'Access token não concede permissão para acessar esse endpoint ou objeto.' });
            case 404:
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            default:
                break;
        }
    }

    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
});

export default router;
