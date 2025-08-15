# Example Usage Scenarios

This document provides examples of how to use the Simple MCP Server tools with Claude Desktop.

## Getting Started

Once you have configured Claude Desktop to use the MCP server (see README.md), you can start using the tools in your conversations with Claude.

## Hello Tool Examples

### Basic greeting
**Prompt:** "Use the hello tool to greet me"

**Expected Response:** Claude will use the hello tool and return something like:
> I'll use the hello tool to greet you!
> 
> Hello, World! 👋 Welcome to the Simple MCP Server!

### Personalized greeting
**Prompt:** "Use the hello tool to say hello to Alice"

**Expected Response:** 
> Hello, Alice! 👋 Welcome to the Simple MCP Server!

## Time Tool Examples

### Current time (default format)
**Prompt:** "What's the current time?"

**Expected Response:** Claude will use the time tool and return something like:
> Current time: December 15, 2024 at 10:30:45 AM EST

### ISO format time
**Prompt:** "Get the current time in ISO format"

**Expected Response:**
> Current time: 2024-12-15T15:30:45.123Z

### Time in specific timezone
**Prompt:** "What time is it in Tokyo?"

**Expected Response:**
> Current time: December 16, 2024 at 12:30:45 AM JST

### Unix timestamp
**Prompt:** "Get the current time as a Unix timestamp"

**Expected Response:**
> Current time: 1734273045

## Calculator Tool Examples

### Basic arithmetic
**Prompt:** "Calculate 15 + 27"

**Expected Response:**
> Result: 15 + 27 = 42

### Division
**Prompt:** "What's 144 divided by 12?"

**Expected Response:**
> Result: 144 ÷ 12 = 12

### Square root
**Prompt:** "Calculate the square root of 64"

**Expected Response:**
> Result: √64 = 8

### Power operations
**Prompt:** "Compute 2 to the power of 8"

**Expected Response:**
> Result: 2 ^ 8 = 256

### Complex calculations
**Prompt:** "What's 5 times 7, then add 3 to that result?"

Claude might use multiple tool calls:
1. First: Calculate 5 × 7 = 35
2. Then: Calculate 35 + 3 = 38

## Natural Language Integration

One of the benefits of MCP is that Claude can naturally integrate tool usage into conversations:

### Example Conversation 1
**You:** "I need to calculate how much tip to leave on a $85 bill with 18% tip rate, and also tell me what time it is."

**Claude might respond:**
> I'll help you calculate the tip and get the current time.
> 
> *Uses calculator tool: 85 × 0.18 = 15.3*
> *Uses time tool*
> 
> For an $85 bill with 18% tip, you should leave $15.30 as a tip, making the total $100.30.
> 
> The current time is December 15, 2024 at 10:35:22 AM EST.

### Example Conversation 2
**You:** "Greet my friend Bob and tell him what the square root of his lucky number 49 is."

**Claude might respond:**
> *Uses hello tool with name "Bob"*
> *Uses calculator tool for square root of 49*
> 
> Hello, Bob! 👋 Welcome to the Simple MCP Server!
> 
> Your lucky number 49 has a perfect square root of 7!

## Error Handling Examples

The tools include robust error handling:

### Division by zero
**Prompt:** "Divide 10 by 0"

**Expected Response:**
> Error: Cannot divide by zero

### Invalid timezone
**Prompt:** "What time is it in InvalidTimezone?"

**Expected Response:**
> Error: Invalid timezone: InvalidTimezone

### Negative square root
**Prompt:** "What's the square root of -25?"

**Expected Response:**
> Error: Cannot calculate square root of negative number

## Tips for Best Results

1. **Be specific**: Instead of "do some math", say "calculate 15 + 27"
2. **Use natural language**: Claude understands context, so you can say "What's 5 times that result?" after a previous calculation
3. **Combine tools**: Ask for multiple things in one request, like time and calculations
4. **Check results**: The tools provide detailed output showing the operation performed

## Troubleshooting

If tools aren't working:
1. Ensure Claude Desktop has been completely restarted after configuration
2. Check that the path in your Claude Desktop config is correct
3. Verify the MCP server builds without errors (`npm run build`)
4. Look for error messages in Claude Desktop's developer console

## Extending These Examples

You can use these examples as templates for:
- Creating test cases for your own MCP servers
- Understanding the expected input/output format
- Learning how to structure tool interactions
- Building more complex multi-step workflows