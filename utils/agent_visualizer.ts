export function printActivity(msg: any) {
  if (msg.type === "assistant") {
    const content = msg.message?.content;
    if (Array.isArray(content) && content.length > 0) {
      const firstBlock = content[0];
      if (firstBlock.type === "tool_use") {
        const input = JSON.stringify(firstBlock.input)
        console.log(`🤖 Using: ${firstBlock.name}(${input})`);
      } else {
        console.log("🤖 Thinking...");
      }
    }
  } else if (msg.type === "user") {
    console.log("✓ Tool completed");
  }
}

export function printFinalResult(messages: any[]) {
  // Get the result message (last message)
  const resultMsg = messages[messages.length - 1];

  // Find the last assistant message with actual text content
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.type === "assistant" && msg.message?.content) {
      const content = msg.message.content;
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === "text" && block.text) {
            console.log(`\n📝 Final Result:\n${block.text}`);
            break;
          }
        }
        break;
      }
    }
  }

  // Print cost if available
  if (resultMsg.total_cost_usd !== undefined) {
    console.log(`\n📊 Cost: $${resultMsg.total_cost_usd.toFixed(2)}`);
  }

  // Print duration if available
  if (resultMsg.duration_ms !== undefined) {
    console.log(`⏱️  Duration: ${(resultMsg.duration_ms / 1000).toFixed(2)}s`);
  }
}

export function visualizeConversation(messages: any[]) {
  console.log("\n" + "=".repeat(60));
  console.log("🤖 AGENT CONVERSATION TIMELINE");
  console.log("=".repeat(60) + "\n");

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const msgType = msg.type;

    if (msgType === "system") {
      console.log("⚙️  System Initialized");
      if (msg.session_id) {
        console.log(`   Session: ${msg.session_id.slice(0, 8)}...`);
      }
      console.log();
    } else if (msgType === "assistant") {
      console.log("🤖 Assistant:");
      const content = msg.message?.content;
      if (content && Array.isArray(content)) {
        for (const block of content) {
          if (block.type === "text" && block.text) {
            // Text response
            const text = block.text.length > 500 ? block.text.slice(0, 500) + "..." : block.text;
            console.log(`   💬 ${text}`);
          } else if (block.type === "tool_use" && block.name) {
            // Tool use
            const toolName = block.name;
            console.log(`   🔧 Using tool: ${toolName}`);

            // Show complete input for all tool calls
            if (block.input) {
              const inputStr = JSON.stringify(block.input);
              console.log(`      Input: ${inputStr}`);
            }
          }
        }
      }
      console.log();
    } else if (msgType === "user") {
      const content = msg.message?.content;
      if (content && Array.isArray(content)) {
        for (const result of content) {
          if (result.type === "tool_result") {
            console.log("👤 Tool Result Received");
            const toolId = result.tool_use_id || "unknown";
            console.log(`   ID: ${toolId.slice(0, 8)}...`);

            // Show result summary
            if (result.content) {
              const resultContent = result.content;
              if (typeof resultContent === "string") {
                const summary =
                  resultContent.length > 500
                    ? resultContent.slice(0, 500) + "..."
                    : resultContent;
                console.log(`   📥 ${summary}`);
              } else if (Array.isArray(resultContent)) {
                for (const contentBlock of resultContent) {
                  if (contentBlock.type === "text" && contentBlock.text) {
                    const summary =
                      contentBlock.text.length > 500
                        ? contentBlock.text.slice(0, 500) + "..."
                        : contentBlock.text;
                    console.log(`   📥 ${summary}`);
                  }
                }
              }
            }
          }
        }
      }
      console.log();
    } else if (msgType === "result") {
      console.log("✅ Conversation Complete");
      if (msg.num_turns !== undefined) {
        console.log(`   Turns: ${msg.num_turns}`);
      }
      if (msg.total_cost_usd !== undefined) {
        console.log(`   Cost: $${msg.total_cost_usd.toFixed(2)}`);
      }
      if (msg.duration_ms !== undefined) {
        console.log(`   Duration: ${(msg.duration_ms / 1000).toFixed(2)}s`);
      }
      if (msg.usage) {
        const totalTokens = (msg.usage.input_tokens || 0) + (msg.usage.output_tokens || 0);
        console.log(`   Tokens: ${totalTokens.toLocaleString()}`);
      }
      console.log();
    }
  }

  console.log("=".repeat(60) + "\n");
}
