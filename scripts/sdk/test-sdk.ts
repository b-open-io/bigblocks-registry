#!/usr/bin/env bun
import { query, type SDKMessage } from "@anthropic-ai/claude-code";

async function testSDK() {
  console.log("🧪 Testing Claude Code SDK...\n");
  
  const messages: SDKMessage[] = [];
  
  try {
    const result = query({
      prompt: "Say 'Hello from Claude Code SDK!' and nothing else.",
      options: {
        maxTurns: 1,
      }
    });
    
    for await (const message of result) {
      messages.push(message);
      
      if (message.type === "assistant") {
        const content = message.message.content
          .filter(block => block.type === "text")
          .map(block => block.text)
          .join("\n");
        console.log("Claude says:", content);
      } else if (message.type === "result") {
        console.log("\n✅ SDK test successful!");
        console.log(`Duration: ${message.duration_ms}ms`);
        console.log(`API calls: ${message.duration_api_ms}ms`);
        console.log(`Turns: ${message.num_turns}`);
      }
    }
  } catch (error) {
    console.error("❌ SDK test failed:", error);
    process.exit(1);
  }
}

testSDK();