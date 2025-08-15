#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * Simple MCP Server with example tools
 */
class SimpleMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server({
      name: 'simple-mcp-server',
      version: '1.0.0',
    });

    this.setupTools();
    this.setupErrorHandling();
  }

  private setupTools(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'hello',
            description: 'Returns a friendly greeting message',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name to greet (optional)',
                },
              },
            },
          },
          {
            name: 'time',
            description: 'Returns the current date and time',
            inputSchema: {
              type: 'object',
              properties: {
                format: {
                  type: 'string',
                  description: 'Time format: "iso", "locale", or "unix" (default: locale)',
                  enum: ['iso', 'locale', 'unix'],
                },
                timezone: {
                  type: 'string',
                  description: 'Timezone (e.g., "UTC", "America/New_York")',
                },
              },
            },
          },
          {
            name: 'calculator',
            description: 'Performs basic mathematical calculations',
            inputSchema: {
              type: 'object',
              properties: {
                operation: {
                  type: 'string',
                  description: 'Mathematical operation to perform',
                  enum: ['add', 'subtract', 'multiply', 'divide', 'power', 'sqrt'],
                },
                a: {
                  type: 'number',
                  description: 'First number',
                },
                b: {
                  type: 'number',
                  description: 'Second number (not required for sqrt)',
                },
              },
              required: ['operation', 'a'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'hello':
            return await this.handleHello(args);
          case 'time':
            return await this.handleTime(args);
          case 'calculator':
            return await this.handleCalculator(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async handleHello(args?: Record<string, unknown>) {
    const name = args?.name || 'World';
    const greeting = `Hello, ${name}! 👋 Welcome to the Simple MCP Server!`;
    
    return {
      content: [
        {
          type: 'text',
          text: greeting,
        },
      ],
    };
  }

  private async handleTime(args?: Record<string, unknown>) {
    const format = args?.format || 'locale';
    const timezone = args?.timezone;
    const now = new Date();

    let timeString: string;

    try {
      switch (format) {
        case 'iso':
          timeString = now.toISOString();
          break;
        case 'unix':
          timeString = Math.floor(now.getTime() / 1000).toString();
          break;
        case 'locale':
        default: {
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
          };
          
          if (timezone && typeof timezone === 'string') {
            options.timeZone = timezone;
          }
          
          timeString = now.toLocaleString('en-US', options);
          break;
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `Current time: ${timeString}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
  }

  private async handleCalculator(args?: Record<string, unknown>) {
    const { operation, a, b } = args || {};

    if (typeof a !== 'number') {
      throw new Error('Parameter "a" must be a number');
    }

    let result: number;

    switch (operation) {
      case 'add':
        if (typeof b !== 'number') {
          throw new Error('Parameter "b" must be a number for addition');
        }
        result = a + b;
        break;
      case 'subtract':
        if (typeof b !== 'number') {
          throw new Error('Parameter "b" must be a number for subtraction');
        }
        result = a - b;
        break;
      case 'multiply':
        if (typeof b !== 'number') {
          throw new Error('Parameter "b" must be a number for multiplication');
        }
        result = a * b;
        break;
      case 'divide':
        if (typeof b !== 'number') {
          throw new Error('Parameter "b" must be a number for division');
        }
        if (b === 0) {
          throw new Error('Cannot divide by zero');
        }
        result = a / b;
        break;
      case 'power':
        if (typeof b !== 'number') {
          throw new Error('Parameter "b" must be a number for power operation');
        }
        result = Math.pow(a, b);
        break;
      case 'sqrt':
        if (a < 0) {
          throw new Error('Cannot calculate square root of negative number');
        }
        result = Math.sqrt(a);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    const operationText = operation === 'sqrt' 
      ? `√${a} = ${result}`
      : `${a} ${this.getOperationSymbol(operation)} ${b} = ${result}`;

    return {
      content: [
        {
          type: 'text',
          text: `Result: ${operationText}`,
        },
      ],
    };
  }

  private getOperationSymbol(operation: string): string {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'power': return '^';
      default: return operation;
    }
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      console.log('\nShutting down MCP server...');
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Simple MCP Server running on stdio');
  }
}

// Start the server
const server = new SimpleMCPServer();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});