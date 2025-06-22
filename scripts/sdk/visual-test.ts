#!/usr/bin/env bun
import { query, type ClaudeCodeOptions } from "@anthropic-ai/claude-code";
import { readFile } from "fs/promises";
import { join } from "path";

interface VisualTestOptions {
  componentName: string;
  themes?: ("light" | "dark")[];
  viewports?: ("mobile" | "tablet" | "desktop")[];
  outputDir?: string;
}

async function loadPrompt(filename: string): Promise<string> {
  const promptPath = join(process.cwd(), ".claude", "prompts", filename);
  return readFile(promptPath, "utf-8");
}

export async function visualTestComponent(options: VisualTestOptions): Promise<void> {
  console.log("📸 BigBlocks Visual Testing");
  console.log("===========================\n");
  
  const {
    componentName,
    themes = ["light", "dark"],
    viewports = ["mobile", "desktop"],
    outputDir = "./screenshots"
  } = options;
  
  try {
    // Create visual test prompt
    const prompt = `
Using the Playwright MCP server, generate screenshots of the ${componentName} component.

Requirements:
1. Navigate to the component demo page
2. Test in ${themes.join(" and ")} themes
3. Test in ${viewports.join(", ")} viewports
4. Capture loading, empty, and error states if applicable
5. Save screenshots to ${outputDir}

Use these viewport sizes:
- mobile: 375x667 (iPhone SE)
- tablet: 768x1024 (iPad)
- desktop: 1920x1080 (Full HD)

For each screenshot, name it: ${componentName}-{theme}-{viewport}-{state}.png

Steps:
1. Start the showcase dev server if not running
2. Navigate to /components/${componentName}
3. For each theme:
   - Toggle theme using theme switcher
   - For each viewport:
     - Set viewport size
     - Take screenshot of default state
     - If interactive, capture hover/active states
     - If form component, capture filled state
4. Generate a summary report of all screenshots taken
`;

    const queryOptions: ClaudeCodeOptions = {
      maxTurns: 10,
      allowedTools: ["mcp__playwright__screenshot", "mcp__playwright__navigate", "mcp__playwright__click", "mcp__filesystem__write_file"],
    };
    
    console.log(`Testing component: ${componentName}`);
    console.log(`Themes: ${themes.join(", ")}`);
    console.log(`Viewports: ${viewports.join(", ")}`);
    console.log(`Output: ${outputDir}\n`);
    
    const messages = [];
    
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
          
        if (content.includes("screenshot")) {
          console.log("📸", content.split("\n")[0]);
        }
      }
    }
    
    console.log("\n✅ Visual testing complete!");
    console.log(`\nScreenshots saved to: ${outputDir}`);
    
  } catch (error) {
    console.error("\n❌ Error during visual testing:", error);
    process.exit(1);
  }
}

// CLI interface
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log("Usage: bun visual-test.ts <component-name> [options]");
    console.log("\nOptions:");
    console.log("  --themes light,dark       Themes to test (default: light,dark)");
    console.log("  --viewports mobile,desktop   Viewports to test (default: mobile,desktop)");
    console.log("  --output ./screenshots    Output directory (default: ./screenshots)");
    console.log("\nExample:");
    console.log('  bun visual-test.ts auth-button --themes light --viewports mobile,tablet,desktop');
    process.exit(1);
  }
  
  const componentName = args[0];
  const options: VisualTestOptions = { componentName };
  
  // Parse CLI options
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    
    switch (flag) {
      case "--themes":
        options.themes = value.split(",") as ("light" | "dark")[];
        break;
      case "--viewports":
        options.viewports = value.split(",") as ("mobile" | "tablet" | "desktop")[];
        break;
      case "--output":
        options.outputDir = value;
        break;
    }
  }
  
  visualTestComponent(options);
}