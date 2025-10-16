import { INode, INodeExecutionResult, IWorkflowExecutionData } from '../types/workflow';

export abstract class BaseNode {
  protected node: INode;

  constructor(node: INode) {
    this.node = node;
  }

  abstract execute(
    inputData: any,
    executionData: IWorkflowExecutionData
  ): Promise<INodeExecutionResult>;

  protected getParameter(name: string, defaultValue?: any): any {
    return this.node.parameters?.[name] ?? defaultValue;
  }

  protected success(data: any): INodeExecutionResult {
    return {
      success: true,
      data
    };
  }

  protected error(message: string): INodeExecutionResult {
    return {
      success: false,
      data: null,
      error: message
    };
  }
}
