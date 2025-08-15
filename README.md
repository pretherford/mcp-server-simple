# MCP Server Simple

A simple Model Context Protocol (MCP) server that demonstrates basic MCP functionality with example tools. This server is designed to work seamlessly with Claude Desktop and provides a foundation for building your own MCP servers.

## Features

- 🏠 **Hello Tool**: Returns friendly greeting messages
- ⏰ **Time Tool**: Provides current date and time in various formats
- 🧮 **Calculator Tool**: Performs basic mathematical operations
- 📋 **Easy Configuration**: Ready-to-use Claude Desktop configuration files
- 🔧 **TypeScript**: Fully typed implementation with modern JavaScript features
- 📚 **Extensible**: Clean, well-documented code structure for easy customization

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Claude Desktop application

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pretherford/mcp-server-simple.git
   cd mcp-server-simple
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the server:**
   ```bash
   npm run build
   ```

### Claude Desktop Configuration

1. **Locate your Claude Desktop config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add the MCP server configuration:**
   ```json
   {
     "mcpServers": {
       "simple-mcp-server": {
         "command": "node",
         "args": ["/absolute/path/to/mcp-server-simple/dist/index.js"]
       }
     }
   }
   ```

3. **Update the path** to match your installation directory

4. **Restart Claude Desktop** completely

## Available Tools

### Hello Tool
Returns a personalized greeting message.

**Parameters:**
- `name` (optional): Name to include in the greeting

**Example usage:**
- "Use the hello tool to greet me"
- "Say hello to Alice using the hello tool"

### Time Tool
Provides the current date and time in various formats.

**Parameters:**
- `format` (optional): Output format - "iso", "locale", or "unix" (default: "locale")
- `timezone` (optional): Timezone specification (e.g., "UTC", "America/New_York")

**Example usage:**
- "What's the current time?"
- "Get the current time in ISO format"
- "What time is it in Tokyo?"

### Calculator Tool
Performs basic mathematical calculations.

**Parameters:**
- `operation` (required): "add", "subtract", "multiply", "divide", "power", "sqrt"
- `a` (required): First number
- `b` (optional): Second number (not required for square root)

**Example usage:**
- "Calculate 15 + 27"
- "What's 144 divided by 12?"
- "Calculate the square root of 64"
- "Compute 2 to the power of 8"

## Development

### Project Structure
```
mcp-server-simple/
├── src/
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript output
├── examples/
│   └── claude-desktop/   # Claude Desktop configuration examples
├── package.json          # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm start` - Run the compiled server
- `npm run lint` - Check code style with ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run clean` - Remove compiled files

### Development Workflow

1. **Make changes** to `src/index.ts`
2. **Build the project:** `npm run build`
3. **Restart Claude Desktop** to pick up changes
4. **Test your changes** in Claude Desktop

### Testing the Server

You can test the MCP server independently using the MCP client tools:

```bash
# Install MCP CLI tools (if available)
npm install -g @modelcontextprotocol/cli

# Test the server
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | npm start
```

## Extending the Server

### Adding New Tools

1. **Add the tool definition** in `setupTools()`:
   ```typescript
   {
     name: 'my-new-tool',
     description: 'Description of what the tool does',
     inputSchema: {
       type: 'object',
       properties: {
         // Define your parameters here
       }
     }
   }
   ```

2. **Add the handler** in the `CallToolRequestSchema` handler:
   ```typescript
   case 'my-new-tool':
     return await this.handleMyNewTool(args);
   ```

3. **Implement the handler method:**
   ```typescript
   private async handleMyNewTool(args: any) {
     // Your tool implementation
     return {
       content: [
         {
           type: 'text',
           text: 'Tool result',
         },
       ],
     };
   }
   ```

### Error Handling

The server includes comprehensive error handling:
- Input validation for all tools
- Graceful error messages returned to Claude
- Process cleanup on shutdown signals
- Structured error responses with clear descriptions

## Troubleshooting

### Common Issues

1. **Server not appearing in Claude Desktop:**
   - Verify the path in `claude_desktop_config.json` is correct
   - Ensure Claude Desktop has been completely restarted
   - Check that the server builds without errors (`npm run build`)

2. **Tools not working:**
   - Check the Claude Desktop logs for error messages
   - Verify Node.js version is 18 or higher
   - Ensure all dependencies are installed (`npm install`)

3. **Permission errors:**
   - Make sure the server file is executable
   - Check file permissions on the installation directory
   - On macOS/Linux, you may need to run `chmod +x dist/index.js`

### Debug Mode

Enable debug logging by setting the environment variable:
```bash
NODE_ENV=development npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk)
- Designed for [Claude Desktop](https://claude.ai/download)
- Inspired by the MCP community and examples

## Support

If you encounter issues or have questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review the [MCP documentation](https://modelcontextprotocol.io/)
3. Open an issue on GitHub

---

**Happy building with MCP! 🚀**
