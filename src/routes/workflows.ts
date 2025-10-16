import { Router, Request, Response } from 'express';
import { workflowStore } from '../workflow/WorkflowStore';
import { workflowEngine } from '../workflow/WorkflowEngine';
import { IWorkflow } from '../types/workflow';

const router = Router();

// Create workflow
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, nodes, connections, active } = req.body;

    if (!name || !nodes || !connections) {
      return res.status(400).json({ error: 'Missing required fields: name, nodes, connections' });
    }

    // Validate that there's at least one start node
    const hasStartNode = nodes.some((n: any) => n.type === 'start');
    if (!hasStartNode) {
      return res.status(400).json({ error: 'Workflow must have at least one start node' });
    }

    const workflow = workflowStore.create({ name, nodes, connections, active });
    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create workflow' });
  }
});

// List all workflows
router.get('/', (req: Request, res: Response) => {
  try {
    const workflows = workflowStore.findAll();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch workflows' });
  }
});

// Get workflow by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workflow = workflowStore.findById(id);

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch workflow' });
  }
});

// Execute workflow
router.post('/:id/execute', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { inputData = {} } = req.body;

    const workflow = workflowStore.findById(id);
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    console.log(`\n🚀 Executing workflow: ${workflow.name} (${id})`);
    const result = await workflowEngine.execute(workflow, inputData);
    console.log(`✅ Workflow completed in ${result.executionTime}ms\n`);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to execute workflow' });
  }
});

// Update workflow
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const workflow = workflowStore.update(id, updates);
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to update workflow' });
  }
});

// Delete workflow
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = workflowStore.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete workflow' });
  }
});

export default router;
