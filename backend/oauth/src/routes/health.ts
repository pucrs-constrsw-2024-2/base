import { Router, Request, Response } from 'express';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    try {  
      return res.status(200).json();
    } catch (error: any) {
      console.error('Erro', error);
      res.status(500).json({ message: 'Erro' });
    }
  });

export default router;