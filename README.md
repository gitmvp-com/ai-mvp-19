# ai-mvp-19 - n8n MVP

A simplified MVP version of [n8n](https://github.com/n8n-io/n8n) - workflow automation made simple.

## 🎯 Key Feature

This MVP focuses on the core workflow automation functionality:

- **Visual Workflow Builder**: Create workflows by connecting nodes
- **Basic Nodes**: Start, Set Variables, HTTP Request, and Conditional nodes
- **Workflow Execution**: Execute workflows and see results
- **In-Memory Storage**: Quick prototyping without database setup

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.19
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start on http://localhost:5678

### Build for Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📖 Usage

### Creating a Workflow

1. Access the web interface at http://localhost:5678
2. Click "Create Workflow"
3. Add nodes by clicking "Add Node"
4. Connect nodes by defining the flow
5. Configure each node's parameters
6. Click "Execute" to run the workflow

### Available Nodes

#### Start Node
- Entry point for every workflow
- Provides initial data to the workflow

#### Set Variable Node
- Set or modify variables
- Transform data between nodes

#### HTTP Request Node
- Make HTTP requests (GET, POST, PUT, DELETE)
- Integrate with external APIs

#### Conditional Node
- Add logic to your workflows
- Route execution based on conditions

### API Endpoints

#### Create Workflow
```bash
POST /api/workflows
Content-Type: application/json

{
  "name": "My Workflow",
  "nodes": [...],
  "connections": {...}
}
```

#### Execute Workflow
```bash
POST /api/workflows/:id/execute
Content-Type: application/json

{
  "inputData": {...}
}
```

#### List Workflows
```bash
GET /api/workflows
```

#### Get Workflow
```bash
GET /api/workflows/:id
```

## 🏗️ Architecture

```
src/
├── index.ts              # Application entry point
├── server.ts             # Express server setup
├── types/                # TypeScript type definitions
│   └── workflow.ts       # Workflow-related types
├── workflow/             # Workflow engine
│   ├── WorkflowEngine.ts # Core execution engine
│   └── WorkflowStore.ts  # In-memory storage
├── nodes/                # Node implementations
│   ├── BaseNode.ts       # Base node class
│   ├── StartNode.ts      # Start node
│   ├── SetNode.ts        # Set variable node
│   ├── HttpNode.ts       # HTTP request node
│   └── IfNode.ts         # Conditional node
└── routes/               # API routes
    └── workflows.ts      # Workflow endpoints
```

## 🔧 Configuration

No environment variables required for basic usage. The MVP runs out of the box!

Optional configuration:
- `PORT`: Server port (default: 5678)
- `NODE_ENV`: Environment mode (development/production)

## 📝 Example Workflow

```json
{
  "name": "Simple API Call",
  "nodes": [
    {
      "id": "start-1",
      "type": "start",
      "position": { "x": 100, "y": 100 }
    },
    {
      "id": "http-1",
      "type": "http",
      "position": { "x": 300, "y": 100 },
      "parameters": {
        "method": "GET",
        "url": "https://api.github.com/repos/n8n-io/n8n"
      }
    }
  ],
  "connections": {
    "start-1": ["http-1"]
  }
}
```

## 🎓 Learn More

This MVP is inspired by [n8n](https://github.com/n8n-io/n8n), a powerful workflow automation platform.

To learn more about the full n8n platform:
- [n8n Documentation](https://docs.n8n.io)
- [n8n GitHub Repository](https://github.com/n8n-io/n8n)
- [n8n Community](https://community.n8n.io)

## 🤝 Contributing

This is an MVP for learning purposes. Feel free to:
- Add more node types
- Implement data persistence
- Add a visual workflow builder UI
- Improve error handling
- Add workflow versioning

## 📄 License

MIT License - feel free to use this MVP for learning and experimentation.

## 🙏 Acknowledgments

- Inspired by [n8n](https://github.com/n8n-io/n8n)
- Built as a simplified learning implementation
