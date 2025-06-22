#!/usr/bin/env bun
import { query, type SDKMessage, type ClaudeCodeOptions } from "@anthropic-ai/claude-code";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";

interface ComponentGenerationOptions {
  name: string;
  category: "authentication" | "wallet" | "social" | "market" | "ui-components";
  description: string;
  dependencies?: string[];
  interactive?: boolean;
  outputDir?: string;
}

interface GenerationPhase {
  name: string;
  promptFile: string;
  maxTurns?: number;
  requiresUserInput?: boolean;
}

const PHASES: GenerationPhase[] = [
  {
    name: "Planning",
    promptFile: "phase1-planning.md",
    maxTurns: 3,
  },
  {
    name: "Questions",
    promptFile: "phase2-questions.md",
    maxTurns: 2,
    requiresUserInput: true,
  },
  {
    name: "Implementation",
    promptFile: "phase3-implementation.md",
    maxTurns: 5,
  },
  {
    name: "Review",
    promptFile: "phase4-review.md",
    maxTurns: 3,
  },
  {
    name: "Finalize",
    promptFile: "phase5-finalize.md",
    maxTurns: 2,
  },
];

async function loadPrompt(filename: string): Promise<string> {
  const promptPath = join(process.cwd(), ".claude", "prompts", filename);
  if (!existsSync(promptPath)) {
    throw new Error(`Prompt file not found: ${promptPath}`);
  }
  return readFile(promptPath, "utf-8");
}

async function loadSharedContext(): Promise<string> {
  const contexts = [
    "shared-context.md",
    "bitcoin-patterns.md",
    "sensible-defaults.md",
  ];
  
  const loadedContexts = await Promise.all(
    contexts.map(ctx => loadPrompt(ctx).catch(() => ""))
  );
  
  return loadedContexts.filter(Boolean).join("\n\n---\n\n");
}

function formatPhasePrompt(
  phase: GenerationPhase,
  phasePrompt: string,
  options: ComponentGenerationOptions,
  previousResults?: string
): string {
  let prompt = `# Component Generation - ${phase.name} Phase\n\n`;
  prompt += `Component Name: ${options.name}\n`;
  prompt += `Category: ${options.category}\n`;
  prompt += `Description: ${options.description}\n\n`;
  
  if (previousResults) {
    prompt += `## Previous Phase Results\n${previousResults}\n\n`;
  }
  
  prompt += `## Phase Instructions\n${phasePrompt}\n`;
  
  return prompt;
}

async function executePhase(
  phase: GenerationPhase,
  options: ComponentGenerationOptions,
  sharedContext: string,
  previousResults?: string
): Promise<string> {
  console.log(`\n🚀 Starting ${phase.name} phase...`);
  
  // Skip interactive phases in non-interactive mode
  if (phase.requiresUserInput && !options.interactive) {
    console.log(`⏭️  Skipping ${phase.name} (non-interactive mode)`);
    return previousResults || "";
  }
  
  const phasePrompt = await loadPrompt(phase.promptFile);
  const fullPrompt = formatPhasePrompt(phase, phasePrompt, options, previousResults);
  
  const messages: SDKMessage[] = [];
  const results: string[] = [];
  
  const queryOptions: ClaudeCodeOptions = {
    maxTurns: phase.maxTurns || 3,
    systemPrompt: sharedContext,
  };
  
  for await (const message of query({
    prompt: fullPrompt,
    options: queryOptions,
  })) {
    messages.push(message);
    
    if (message.type === "assistant") {
      results.push(message.message.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n")
      );
    }
  }
  
  console.log(`✅ Completed ${phase.name} phase`);
  return results.join("\n\n");
}

async function saveGeneratedComponent(
  componentName: string,
  content: string,
  outputDir: string
): Promise<void> {
  const componentPath = join(outputDir, `${componentName}.tsx`);
  await mkdir(dirname(componentPath), { recursive: true });
  await writeFile(componentPath, content);
  console.log(`\n💾 Component saved to: ${componentPath}`);
}

async function extractComponentCode(results: string): Promise<string> {
  // Extract TypeScript code from the results
  const codeMatch = results.match(/```(?:typescript|tsx)\n([\s\S]+?)```/);
  if (codeMatch) {
    return codeMatch[1].trim();
  }
  
  // If no code block found, try to extract component definition
  const componentMatch = results.match(/export\s+(?:function|const)\s+\w+[\s\S]+/);
  if (componentMatch) {
    return componentMatch[0];
  }
  
  throw new Error("Could not extract component code from results");
}

export async function generateComponent(
  options: ComponentGenerationOptions
): Promise<void> {
  console.log("🎨 BigBlocks Component Generator");
  console.log("================================\n");
  
  try {
    // Load shared context
    const sharedContext = await loadSharedContext();
    
    // Execute each phase
    let cumulativeResults = "";
    
    for (const phase of PHASES) {
      cumulativeResults = await executePhase(
        phase,
        options,
        sharedContext,
        cumulativeResults
      );
      
      // Add a small delay between phases
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Extract and save the component
    const componentCode = await extractComponentCode(cumulativeResults);
    const outputDir = options.outputDir || join(
      process.cwd(),
      "apps",
      "registry",
      "registry",
      "new-york",
      "ui"
    );
    
    await saveGeneratedComponent(options.name, componentCode, outputDir);
    
    console.log("\n✨ Component generation complete!");
    console.log("\nNext steps:");
    console.log("1. Review the generated component");
    console.log("2. Run type checking: bunx tsc --noEmit");
    console.log("3. Add to registry.json");
    console.log("4. Create documentation in showcase");
    console.log("5. Build registry: bun registry:build");
    
  } catch (error) {
    console.error("\n❌ Error generating component:", error);
    process.exit(1);
  }
}

// CLI interface
if (import.meta.main) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log("Usage: bun generate-component.ts <name> <category> <description> [--interactive]");
    console.log("\nCategories: authentication, wallet, social, market, ui-components");
    console.log("\nExample:");
    console.log('  bun generate-component.ts "send-token-button" wallet "Button to send BSV tokens"');
    process.exit(1);
  }
  
  const [name, category, description, ...flags] = args;
  const interactive = flags.includes("--interactive");
  
  generateComponent({
    name,
    category: category as ComponentGenerationOptions["category"],
    description,
    interactive,
  });
}