import axios from "axios";
import { Router, Request, Response } from "express";
import * as dotenv from "dotenv";

/**
 * @swagger
 * /:
 *   post:
 *     summary: Obter token de acesso
 *     description: Recupera um token de acesso do Keycloak utilizando nome de usuário e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       201:
 *         description: Token de acesso criado com sucesso.
 *       400:
 *         description: Erro na estrutura da chamada.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro ao obter token.
 */

dotenv.config();

const KEYCLOAK_URL = `${process.env.KEYCLOAK_EXTERNAL_HOST}:${process.env.KEYCLOAK_EXTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
const clientId = process.env.KEYCLOAK_CLIENT_ID;
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  }

  if (!clientId || !clientSecret) {
    return res
      .status(500)
      .json({ message: "Credenciais do cliente não configuradas." });
  }

  try {
    const response = await axios.post(
      `http://${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        username: username,
        password: password,
        grant_type: "password",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.status(201).json(response.data);
  } catch (error: any) {
    console.error("Erro ao obter token do Keycloak:", error);

    if (error.response && error.response.status === 401) {
      return res
        .status(401)
        .json({ message: "Usuário ou senha inválidos." });
    }

    if (error.response && error.response.status === 400) {
      return res
        .status(400)
        .json({ message: "Erro na estrutura da chamada." });
    }

    return res.status(500).json({ message: "Erro ao obter token." });
  }
});

export default router;
