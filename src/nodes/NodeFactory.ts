import { INode } from '../types/workflow';
import { BaseNode } from './BaseNode';
import { StartNode } from './StartNode';
import { SetNode } from './SetNode';
import { HttpNode } from './HttpNode';
import { IfNode } from './IfNode';

export function createNode(node: INode): BaseNode {
  switch (node.type.toLowerCase()) {
    case 'start':
      return new StartNode(node);
    case 'set':
      return new SetNode(node);
    case 'http':
      return new HttpNode(node);
    case 'if':
      return new IfNode(node);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}
