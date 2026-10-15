import { Router, Request, Response } from 'express';

export const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'CodeForge AI API',
    version: '1.0.0',
    status: 'online'
  });
});

apiRouter.get('/problems', (req: Request, res: Response) => {
  res.json({
    problems: [
      { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays & Hashing' },
      { id: '2', title: 'Valid Anagram', difficulty: 'Easy', category: 'Strings' },
      { id: '3', title: 'LRU Cache', difficulty: 'Medium', category: 'Design' }
    ]
  });
});
