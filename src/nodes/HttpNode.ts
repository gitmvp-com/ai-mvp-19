import { BaseNode } from './BaseNode';
import { INodeExecutionResult, IWorkflowExecutionData } from '../types/workflow';
import axios, { AxiosRequestConfig, Method } from 'axios';

export class HttpNode extends BaseNode {
  async execute(
    inputData: any,
    executionData: IWorkflowExecutionData
  ): Promise<INodeExecutionResult> {
    try {
      const method = this.getParameter('method', 'GET') as Method;
      const url = this.getParameter('url');
      const headers = this.getParameter('headers', {});
      const body = this.getParameter('body');
      const queryParameters = this.getParameter('queryParameters', {});

      if (!url) {
        return this.error('URL is required');
      }

      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        params: queryParameters
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.data = body;
      }

      const response = await axios(config);

      const output = {
        statusCode: response.status,
        headers: response.headers,
        body: response.data,
        requestData: {
          method,
          url,
          headers,
          body,
          queryParameters
        }
      };

      return this.success(output);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.error(
          `HTTP request failed: ${error.response?.status} ${error.response?.statusText || error.message}`
        );
      }
      return this.error(error instanceof Error ? error.message : 'HTTP request failed');
    }
  }
}
