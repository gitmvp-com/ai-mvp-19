import { IWorkflow, IWorkflowExecutionData, IWorkflowExecutionResult, INode } from '../types/workflow';
import { createNode } from '../nodes/NodeFactory';
import { BaseNode } from '../nodes/BaseNode';

export class WorkflowEngine {
  async execute(workflow: IWorkflow, inputData: any = {}): Promise<IWorkflowExecutionResult> {
    const startTime = Date.now();
    const executionData: IWorkflowExecutionData = {};

    try {
      // Find start node
      const startNode = workflow.nodes.find(n => n.type === 'start');
      if (!startNode) {
        throw new Error('Workflow must have a start node');
      }

      // Execute workflow starting from start node
      await this.executeNode(startNode, workflow, executionData, inputData);

      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: executionData,
        executionTime
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return {
        success: false,
        data: executionData,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime
      };
    }
  }

  private async executeNode(
    node: INode,
    workflow: IWorkflow,
    executionData: IWorkflowExecutionData,
    inputData: any
  ): Promise<any> {
    // Check if already executed
    if (executionData[node.id]) {
      return executionData[node.id];
    }

    console.log(`Executing node: ${node.id} (${node.type})`);

    // Create and execute node
    const nodeInstance: BaseNode = createNode(node);
    const result = await nodeInstance.execute(inputData, executionData);

    if (!result.success) {
      throw new Error(`Node ${node.id} failed: ${result.error}`);
    }

    // Store result
    executionData[node.id] = result.data;

    // Find and execute connected nodes
    const connectedNodeIds = workflow.connections[node.id] || [];
    
    for (const targetNodeId of connectedNodeIds) {
      const targetNode = workflow.nodes.find(n => n.id === targetNodeId);
      if (targetNode) {
        await this.executeNode(targetNode, workflow, executionData, result.data);
      }
    }

    return result.data;
  }
}

export const workflowEngine = new WorkflowEngine();
