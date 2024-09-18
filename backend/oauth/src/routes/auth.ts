import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const KEYCLOAK_URL = `${process.env.OAUTH_INTERNAL_PROTOCOL}://${process.env.KEYCLOAK_INTERNAL_HOST}:${process.env.KEYCLOAK_INTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const GRANT_TYPE = process.env.KEYCLOAK_GRANT_TYPE || 'password';

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/auth/realms/${REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        grant_type: GRANT_TYPE,
        username,
        password,
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in, refresh_expires_in } = response.data;

    return res.status(201).json({
      token_type: 'Bearer',
      access_token,
      expires_in,
      refresh_token,
      refresh_expires_in,
    });
  } catch (error: any) {
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(400).json({ error: 'Bad Request' });
  }
});

export default router;
