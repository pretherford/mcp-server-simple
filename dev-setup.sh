#!/bin/bash

# Simple MCP Server Development Helper Script
# This script helps with common development tasks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Simple MCP Server - Development Helper${NC}"
echo "========================================"

# Function to print status
print_status() {
    echo -e "${YELLOW}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Install dependencies
print_status "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Lint the code
print_status "Linting code..."
if npm run lint; then
    print_success "Code linting passed"
else
    print_error "Code linting failed"
    exit 1
fi

# Build the project
print_status "Building project..."
if npm run build; then
    print_success "Build successful"
else
    print_error "Build failed"
    exit 1
fi

# Test the server startup
print_status "Testing server startup..."
if timeout 3s npm start >/dev/null 2>&1; then
    print_success "Server starts successfully"
else
    # Check if timeout occurred (expected behavior)
    if [ $? -eq 124 ]; then
        print_success "Server starts successfully (timed out as expected)"
    else
        print_error "Server failed to start"
        exit 1
    fi
fi

# Test MCP protocol
print_status "Testing MCP protocol..."
MCP_RESPONSE=$(echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | timeout 5s npm start 2>/dev/null || true)
if [[ $MCP_RESPONSE == *"tools"* ]]; then
    print_success "MCP protocol working correctly"
    print_status "Available tools: hello, time, calculator"
else
    print_error "MCP protocol test failed"
    exit 1
fi

# Display next steps
echo ""
echo -e "${GREEN}Development setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure Claude Desktop with the provided configuration files"
echo "2. Update the path in the configuration to point to:"
echo "   $(pwd)/dist/index.js"
echo "3. Restart Claude Desktop"
echo "4. Test the tools in Claude Desktop"
echo ""
echo "Development commands:"
echo "  npm run dev    - Watch mode for development"
echo "  npm run build  - Build the project"
echo "  npm run lint   - Check code quality"
echo "  npm start      - Run the server"