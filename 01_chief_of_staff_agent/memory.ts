import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import path from "path";
import { printActivity, printFinalResult, visualizeConversation } from "../utils/agent_visualizer";


async function main() {

  const messages: any[] = [];

  for await (const msg of query({
    prompt: "What's our current runway?",
    options: {
      model: "claude-sonnet-4-20250514",
      cwd: path.join(process.cwd(), "01_chief_of_staff_agent/work_dir"),
      allowedTools: ["Bash", "Read"],
    },
  }
  )) {
    printActivity(msg);
    messages.push(msg);
  }

  printFinalResult(messages);
  visualizeConversation(messages);
}

main();
