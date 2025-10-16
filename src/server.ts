import express, { Express, Request, Response, NextFunction } from 'express';
import workflowRoutes from './routes/workflows';

export function createServer(): Express {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Routes
  app.use('/api/workflows', workflowRoutes);

  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API documentation
  app.get('/api', (req: Request, res: Response) => {
    res.json({
      name: 'n8n MVP API',
      version: '0.1.0',
      description: 'Simple workflow automation API',
      endpoints: {
        workflows: {
          'POST /api/workflows': 'Create a new workflow',
          'GET /api/workflows': 'List all workflows',
          'GET /api/workflows/:id': 'Get workflow by ID',
          'POST /api/workflows/:id/execute': 'Execute workflow',
          'DELETE /api/workflows/:id': 'Delete workflow'
        },
        health: {
          'GET /health': 'Health check endpoint'
        }
      }
    });
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  });

  return app;
}
