# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript port of the Claude Agent SDK Cookbook, demonstrating how to build autonomous AI agents using the [@anthropic-ai/claude-agent-sdk](https://github.com/anthropics/claude-agent-sdk-typescript). The repository provides practical examples that showcase core SDK patterns and capabilities.

The main reference docs for the Agent SDK can be found in `docs/agent-sdk-typescript.md`.

## Repository Structure

```
claude-agent-sdk-cookbook/
├── 00_research_agent/          # Research agent examples
│   ├── simple.ts              # Basic single-query research agent
│   ├── advanced.ts            # Multi-turn conversation with image analysis
│   ├── projects_claude.png    # Sample chart for multimodal analysis
│   └── README.md              # Detailed explanation and examples
├── utils/
│   └── agent_visualizer.ts    # Shared utilities for message visualization
├── docs/
│   └── agent-sdk-typescript.md # Complete SDK reference documentation
├── package.json               # Scripts and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Main project documentation
```

## Environment Setup

Create a `.env` file with your Anthropic API key:
```
ANTHROPIC_API_KEY=your_key_here
```

Get your API key from console.anthropic.com.

## Development Commands

### Running Examples
```bash
# Simple research agent (single query with WebSearch)
pnpm start_research_agent_simple

# Advanced research agent (multi-turn with image analysis)
pnpm start_research_agent_advanced

# Run any specific TypeScript file
tsx <filename>.ts
```

### Building
```bash
# Compile TypeScript to JavaScript (outputs to ./dist)
pnpm build
```

## Core Architecture Patterns

### 1. Simple Agent Pattern (simple.ts)

Single-query agent that demonstrates basic SDK usage:

```typescript
async function main() {
  const messages = [];

  for await (const msg of query({
    prompt: "Your task description",
    options: {
      model: "claude-sonnet-4-20250514",
      allowedTools: ["WebSearch"],
    },
  })) {
    printActivity(msg);
    messages.push(msg);
  }

  printFinalResult(messages);
}
```

**Key concepts:**
- Single `query()` call with string prompt
- AsyncIterator pattern with `for await...of`
- Message collection and visualization

### 2. Multi-Turn Conversation Pattern (advanced.ts)

Maintains conversation context across multiple queries using async generators:

```typescript
async function* multiTurnPrompts() {
  yield {
    type: "user",
    message: { role: "user", content: "First query..." },
    session_id: "",
    parent_tool_use_id: null,
  };

  yield {
    type: "user",
    message: { role: "user", content: "Follow-up query..." },
    session_id: "",
    parent_tool_use_id: null,
  };
}

for await (const msg of query({
  prompt: multiTurnPrompts(),
  options: { ... }
})) {
  // Process messages
}
```

**This is the TypeScript equivalent of Python's `ClaudeSDKClient` pattern:**

```python
# Python
async with ClaudeSDKClient(options=...) as research_agent:
    await research_agent.query("First query")
    async for msg in research_agent.receive_response(): ...

    await research_agent.query("Second query")
    async for msg in research_agent.receive_response(): ...
```

The async generator approach maintains full conversation context within a single session.

### 3. Message Types

The SDK returns different message types during execution:

- **`type: "assistant"`** - Claude's responses with content blocks (text or tool_use)
- **`type: "user"`** - User messages and tool results
- **`type: "result"`** - Final result with metadata (cost, duration, turns)
- **`type: "system"`** - System initialization messages

### 4. Options Configuration

Key options for `query()`:

```typescript
{
  model: "claude-sonnet-4-20250514",      // Which Claude model to use
  systemPrompt: "Custom instructions",     // System prompt for the agent
  allowedTools: ["WebSearch", "Read"],    // Which tools the agent can use
  disallowedTools: ["FileWrite"],         // Block specific tools
  cwd: "/path/to/working/dir",            // Working directory for file operations
  maxTurns: 20,                           // Limit conversation turns
  maxThinkingTokens: 10000,               // Enable extended thinking
  permissionMode: "bypassPermissions",    // Permission handling mode
}
```

### 5. Available Tools

Common tools used in examples:

- **WebSearch** - Search the web for information
- **Read** - Read files from filesystem (supports images, PDFs, etc.)
- **FileWrite** / **FileEdit** - Modify files
- **Bash** - Execute shell commands
- **Glob** / **Grep** - Find and search files
- **TodoWrite** - Task management

## Utility Functions (utils/agent_visualizer.ts)

### printActivity(msg)
Displays real-time activity during agent execution:
- Shows "🤖 Thinking..." for assistant text responses
- Shows "🤖 Using: ToolName()" for tool usage
- Shows "✓ Tool completed" for tool results

### printFinalResult(messages)
Displays the final agent response and statistics:
- Extracts the last assistant text message
- Shows cost and duration information

### visualizeConversation(messages)
Creates a complete timeline view of the entire conversation:
- Shows all message types with appropriate formatting
- Displays tool parameters for key tools (WebSearch, TodoWrite)
- Includes session summary at the end

## TypeScript SDK vs Python SDK

The TypeScript SDK does **not** have a `ClaudeSDKClient` class like Python. Instead:

| Feature | Python | TypeScript |
|---------|--------|-----------|
| Session management | Explicit `ClaudeSDKClient` class | Built into `query()` function |
| Multi-turn conversations | Multiple `await query()` calls | Async generator pattern |
| Interrupts | `client.interrupt()` | `query.interrupt()` |
| Hooks | Supported via client | `hooks` option |
| Custom tools | `@tool` decorator | `tool()` + `createSdkMcpServer()` |

**Why no client class?** The TypeScript SDK achieves the same functionality more idiomatically through:
1. Async generator patterns (functional style)
2. Single `query()` function that handles both simple and complex workflows
3. All features available through options and the Query interface

See `00_research_agent/README.md` for detailed comparison and examples.

## File Naming Convention

Examples are numbered with a `00_`, `01_`, etc. prefix to indicate learning progression. Each directory contains:
- Simple examples demonstrating basic patterns
- Advanced examples showing multi-turn conversations and complex features
- README with detailed explanations and output examples