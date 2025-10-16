import { IWorkflow } from '../types/workflow';
import { v4 as uuid } from 'uuid';

export class WorkflowStore {
  private workflows: Map<string, IWorkflow> = new Map();

  create(workflow: Omit<IWorkflow, 'id' | 'createdAt' | 'updatedAt'>): IWorkflow {
    const id = uuid();
    const now = new Date().toISOString();
    
    const newWorkflow: IWorkflow = {
      ...workflow,
      id,
      active: workflow.active ?? false,
      createdAt: now,
      updatedAt: now
    };

    this.workflows.set(id, newWorkflow);
    return newWorkflow;
  }

  findById(id: string): IWorkflow | undefined {
    return this.workflows.get(id);
  }

  findAll(): IWorkflow[] {
    return Array.from(this.workflows.values());
  }

  update(id: string, updates: Partial<IWorkflow>): IWorkflow | undefined {
    const workflow = this.workflows.get(id);
    if (!workflow) {
      return undefined;
    }

    const updated = {
      ...workflow,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    this.workflows.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.workflows.delete(id);
  }

  clear(): void {
    this.workflows.clear();
  }
}

// Singleton instance
export const workflowStore = new WorkflowStore();
