#!/usr/bin/env bun
import { query, type SDKMessage, type Options } from "@anthropic-ai/claude-code";
import { readFile } from "fs/promises";
import { join } from "path";

async function testSinglePhase() {
  console.log("🧪 Testing single phase generation...\n");
  
  // Load the planning phase prompt
  const promptPath = join(process.cwd(), ".claude", "prompts", "phase1-planning.md");
  const phasePrompt = await readFile(promptPath, "utf-8");
  
  const prompt = `
# Component Generation - Planning Phase

Component Name: test-button
Category: authentication
Description: A simple authentication button

## Phase Instructions
${phasePrompt}

Please provide a concise plan for this component.
`;
  
  const messages: SDKMessage[] = [];
  
  try {
    const queryOptions: Options = {
      maxTurns: 2,
      appendSystemPrompt: "Be concise and focus on the key aspects only.",
    };
    
    for await (const message of query({
      prompt,
      options: queryOptions,
    })) {
      messages.push(message);
      
      if (message.type === "assistant") {
        const content = message.message.content
          .filter(block => block.type === "text")
          .map(block => block.text)
          .join("\n");
        console.log("=== PLANNING OUTPUT ===");
        console.log(content);
        console.log("======================\n");
      } else if (message.type === "result") {
        console.log("✅ Phase completed!");
        console.log(`Duration: ${message.duration_ms}ms`);
        console.log(`Turns: ${message.num_turns}`);
      }
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testSinglePhase();