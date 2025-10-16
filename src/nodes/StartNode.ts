import { BaseNode } from './BaseNode';
import { INodeExecutionResult, IWorkflowExecutionData } from '../types/workflow';

export class StartNode extends BaseNode {
  async execute(
    inputData: any,
    executionData: IWorkflowExecutionData
  ): Promise<INodeExecutionResult> {
    try {
      // Start node simply passes through the input data
      const initialData = this.getParameter('initialData', {});
      
      const output = {
        ...initialData,
        ...inputData,
        timestamp: new Date().toISOString(),
        workflowStarted: true
      };

      return this.success(output);
    } catch (error) {
      return this.error(error instanceof Error ? error.message : 'Start node failed');
    }
  }
}
