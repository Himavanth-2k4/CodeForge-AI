import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.floor(process.uptime()),
    service: 'codeforge-api'
  });
});

healthRouter.get('/ready', (req: Request, res: Response) => {
  res.json({
    ready: true,
    environment: process.env.NODE_ENV || 'development'
  });
});
