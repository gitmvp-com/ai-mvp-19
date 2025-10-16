import { BaseNode } from './BaseNode';
import { INodeExecutionResult, IWorkflowExecutionData } from '../types/workflow';
import { set } from 'lodash';

export class SetNode extends BaseNode {
  async execute(
    inputData: any,
    executionData: IWorkflowExecutionData
  ): Promise<INodeExecutionResult> {
    try {
      const values = this.getParameter('values', {});
      const keepOnlySet = this.getParameter('keepOnlySet', false);

      let output = keepOnlySet ? {} : { ...inputData };

      // Set each value
      for (const [key, value] of Object.entries(values)) {
        // Support nested paths like 'user.name'
        set(output, key, value);
      }

      return this.success(output);
    } catch (error) {
      return this.error(error instanceof Error ? error.message : 'Set node failed');
    }
  }
}
