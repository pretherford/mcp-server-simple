# Claude Desktop Configuration for MCP Simple Server

This directory contains example configuration files for integrating the Simple MCP Server with Claude Desktop.

## Files

- `claude_desktop_config.json` - Configuration for Claude Desktop on Windows/Linux
- `claude_desktop_config_mac.json` - Configuration for Claude Desktop on macOS

## Setup Instructions

### Windows/Linux

1. Locate your Claude Desktop configuration file:
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Copy the content from `claude_desktop_config.json` and merge it into your existing configuration file.

3. **Build the project first** (required):
   ```bash
   cd /path/to/mcp-server-simple
   npm install
   npm run build
   ```

4. Update the path in the configuration to point to your actual installation directory:
   ```json
   "args": ["/absolute/path/to/mcp-server-simple/dist/index.js"]
   ```
   
   **Important**: Make sure the path points to `dist/index.js` (the compiled JavaScript), not `src/index.ts` (the TypeScript source).

### macOS

1. Locate your Claude Desktop configuration file:
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. Copy the content from `claude_desktop_config_mac.json` and merge it into your existing configuration file.

3. **Build the project first** (required):
   ```bash
   cd /path/to/mcp-server-simple
   npm install
   npm run build
   ```

4. Update the path in the configuration to point to your actual installation directory.

   **Important**: Make sure the path points to `dist/index.js` (the compiled JavaScript), not `src/index.ts` (the TypeScript source).

## Testing the Configuration

After updating your Claude Desktop configuration:

1. **Ensure the project is built**: Run `npm run build` in the project directory if you haven't already
2. Restart Claude Desktop completely
3. Start a new conversation
4. The MCP tools should be available automatically
5. Try using one of the tools by asking Claude to use the hello, time, or calculator tools

## Troubleshooting

If you get "Cannot find module" errors:
- Verify the path in your configuration points to `dist/index.js`, not `src/index.ts`
- Make sure you've run `npm run build` to compile the TypeScript source
- Check that the file exists at the specified path
- Restart Claude Desktop after making configuration changes

## Example Usage

Once configured, you can ask Claude to:

- "Use the hello tool to greet me"
- "What's the current time?"
- "Calculate 15 + 27 using the calculator tool"
- "What's the square root of 144?"