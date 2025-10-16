import { BaseNode } from './BaseNode';
import { INodeExecutionResult, IWorkflowExecutionData } from '../types/workflow';
import { get } from 'lodash';

export class IfNode extends BaseNode {
  async execute(
    inputData: any,
    executionData: IWorkflowExecutionData
  ): Promise<INodeExecutionResult> {
    try {
      const conditions = this.getParameter('conditions', []);
      const combineOperation = this.getParameter('combineOperation', 'AND'); // AND or OR

      let result = combineOperation === 'AND' ? true : false;

      for (const condition of conditions) {
        const { field, operation, value } = condition;
        const fieldValue = get(inputData, field);
        const conditionMet = this.evaluateCondition(fieldValue, operation, value);

        if (combineOperation === 'AND') {
          result = result && conditionMet;
        } else {
          result = result || conditionMet;
        }
      }

      const output = {
        ...inputData,
        conditionResult: result
      };

      return this.success(output);
    } catch (error) {
      return this.error(error instanceof Error ? error.message : 'If node failed');
    }
  }

  private evaluateCondition(fieldValue: any, operation: string, expectedValue: any): boolean {
    switch (operation) {
      case 'equals':
        return fieldValue === expectedValue;
      case 'notEquals':
        return fieldValue !== expectedValue;
      case 'contains':
        return String(fieldValue).includes(String(expectedValue));
      case 'notContains':
        return !String(fieldValue).includes(String(expectedValue));
      case 'startsWith':
        return String(fieldValue).startsWith(String(expectedValue));
      case 'endsWith':
        return String(fieldValue).endsWith(String(expectedValue));
      case 'greaterThan':
        return Number(fieldValue) > Number(expectedValue);
      case 'lessThan':
        return Number(fieldValue) < Number(expectedValue);
      case 'isEmpty':
        return !fieldValue || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'isNotEmpty':
        return !!fieldValue && fieldValue !== '' && (!Array.isArray(fieldValue) || fieldValue.length > 0);
      default:
        return false;
    }
  }
}
