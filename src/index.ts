import { createServer } from './server';

const PORT = process.env.PORT || 5678;

const app = createServer();

app.listen(PORT, () => {
  console.log(`🚀 n8n MVP Server started`);
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`📖 API Documentation available at http://localhost:${PORT}/api`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  POST   /api/workflows          - Create a new workflow');
  console.log('  GET    /api/workflows          - List all workflows');
  console.log('  GET    /api/workflows/:id      - Get workflow by ID');
  console.log('  POST   /api/workflows/:id/execute - Execute workflow');
  console.log('  DELETE /api/workflows/:id      - Delete workflow');
});
