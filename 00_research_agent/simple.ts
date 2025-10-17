import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { printActivity, printFinalResult, visualizeConversation } from "../utils/agent_visualizer";

async function main() {
  const messages: any[] = [];

  for await (const msg of query({
    prompt: "Research the latest trends in AI agents and give me a brief summary",
    options: {
      model: "claude-sonnet-4-20250514",
      allowedTools: ["WebSearch"],
    },
  })) {
    printActivity(msg);
    messages.push(msg);
  }

  printFinalResult(messages);
  visualizeConversation(messages);
}

main();
