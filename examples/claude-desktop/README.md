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

3. Update the path in the configuration to point to your actual installation directory:
   ```json
   "args": ["/absolute/path/to/mcp-server-simple/dist/index.js"]
   ```

### macOS

1. Locate your Claude Desktop configuration file:
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. Copy the content from `claude_desktop_config_mac.json` and merge it into your existing configuration file.

3. Update the path in the configuration to point to your actual installation directory.

## Testing the Configuration

After updating your Claude Desktop configuration:

1. Restart Claude Desktop completely
2. Start a new conversation
3. The MCP tools should be available automatically
4. Try using one of the tools by asking Claude to use the hello, time, or calculator tools

## Example Usage

Once configured, you can ask Claude to:

- "Use the hello tool to greet me"
- "What's the current time?"
- "Calculate 15 + 27 using the calculator tool"
- "What's the square root of 144?"