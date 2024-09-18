import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const KEYCLOAK_URL = `${process.env.OAUTH_INTERNAL_PROTOCOL}://${process.env.KEYCLOAK_INTERNAL_HOST}:${process.env.KEYCLOAK_INTERNAL_PORT}`;
const REALM = process.env.KEYCLOAK_REALM;

router.post('/', async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/auth/admin/realms/${REALM}/users`,
      {
        username,
        email: username,
        enabled: true,
        firstName,
        lastName,
        credentials: [{ type: 'password', value: password, temporary: false }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userId = response.headers.location.split('/').pop();

    return res.status(201).json({
      id: userId,
      username,
      firstName,
      lastName,
      enabled: true,
    });
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      return res.status(401).json({ error: 'Unauthorized' });
    } else if (status === 403) {
      return res.status(403).json({ error: 'Forbidden' });
    } else if (status === 409) {
      return res.status(409).json({ error: 'Conflict: Username already exists' });
    }

    return res.status(400).json({ error: 'Bad Request' });
  }
});

export default router;
