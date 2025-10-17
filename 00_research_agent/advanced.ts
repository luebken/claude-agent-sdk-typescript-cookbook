import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { printActivity, printFinalResult } from "../utils/agent_visualizer";
import path from "path";

// Multi-turn prompt generator - equivalent to Python's ClaudeSDKClient pattern
async function* multiTurnPrompts() {
  // First query: Analyze the chart
  // Note: Path is relative to cwd (00_research_agent)
  yield {
    type: "user" as const,
    message: {
      role: "user" as const,
      content: "Analyze the chart in projects_claude.png",
    },
    session_id: "",
    parent_tool_use_id: null,
  };

  // Second query: Use websearch to investigate insights from the chart
  yield {
    type: "user" as const,
    message: {
      role: "user" as const,
      content: "Use a single websearch to investigate the insights from the chart.",
    },
    session_id: "",
    parent_tool_use_id: null,
  };
}

async function main() {
  const messages: any[] = [];

  // TypeScript equivalent of Python's:
  // async with ClaudeSDKClient(options=...) as research_agent:
  //     await research_agent.query(...)
  //     async for msg in research_agent.receive_response(): ...
  for await (const msg of query({
    prompt: multiTurnPrompts(),
    options: {
      model: "claude-sonnet-4-20250514",
      systemPrompt: "You are a research agent specialized in AI",
      allowedTools: ["WebSearch", "Read"],
      cwd: path.join(process.cwd(), "00_research_agent"),
    },
  })) {
    printActivity(msg);
    messages.push(msg);
  }

  printFinalResult(messages);
}

main();
