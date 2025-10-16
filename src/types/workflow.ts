export interface INodePosition {
  x: number;
  y: number;
}

export interface INodeParameters {
  [key: string]: any;
}

export interface INode {
  id: string;
  type: string;
  name?: string;
  position?: INodePosition;
  parameters?: INodeParameters;
}

export interface IConnection {
  sourceNode: string;
  targetNode: string;
}

export interface IWorkflow {
  id: string;
  name: string;
  nodes: INode[];
  connections: { [sourceNodeId: string]: string[] };
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IWorkflowExecutionData {
  [nodeId: string]: any;
}

export interface IWorkflowExecutionResult {
  success: boolean;
  data: IWorkflowExecutionData;
  error?: string;
  executionTime?: number;
}

export interface INodeExecutionResult {
  success: boolean;
  data: any;
  error?: string;
}
