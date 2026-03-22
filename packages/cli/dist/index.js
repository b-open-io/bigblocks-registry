#!/usr/bin/env node

// src/index.ts
import { execSync } from "node:child_process";
var REGISTRY_URL = "https://registry.bigblocks.dev/r";
var DOCS_URL = "https://bigblocks.dev/docs/blocks";
var VERSION = "1.0.0";
var BLOCKS = {
  "connect-wallet": { title: "Connect Wallet", category: "wallet" },
  "send-bsv": { title: "Send BSV", category: "wallet" },
  "receive-address": { title: "Receive Address", category: "wallet" },
  "wallet-overview": { title: "Wallet Overview", category: "wallet" },
  "transaction-history": { title: "Transaction History", category: "wallet" },
  "token-list": { title: "Token List", category: "wallet" },
  "send-bsv21": { title: "Send BSV21", category: "wallet" },
  "lock-bsv": { title: "Lock BSV", category: "wallet" },
  "sweep-wallet": { title: "Sweep Wallet", category: "wallet" },
  "unlock-wallet": { title: "Unlock Wallet", category: "wallet" },
  "mnemonic-flow": { title: "Mnemonic Flow", category: "wallet" },
  "post-button": { title: "Post Button", category: "social" },
  "like-button": { title: "Like Button", category: "social" },
  "follow-button": { title: "Follow Button", category: "social" },
  "friend-button": { title: "Friend Button", category: "social" },
  "social-feed": { title: "Social Feed", category: "social" },
  "inscribe-file": { title: "Inscribe File", category: "market" },
  "deploy-token": { title: "Deploy Token", category: "market" },
  "create-listing": { title: "Create Listing", category: "market" },
  "buy-listing": { title: "Buy Listing", category: "market" },
  "ordinals-grid": { title: "Ordinals Grid", category: "market" },
  "market-grid": { title: "Market Grid", category: "market" },
  "bitcoin-avatar": { title: "Bitcoin Avatar", category: "identity" },
  "profile-card": { title: "Profile Card", category: "identity" },
  "identity-selector": { title: "Identity Selector", category: "identity" },
  "opns-manager": { title: "OpNS Manager", category: "identity" },
  "sync-terminal": { title: "Sync Terminal", category: "developer" },
  "theme-token-provider": { title: "Theme Token Provider", category: "developer" },
  "bigblocks-provider": { title: "BigBlocks Provider", category: "developer" },
  "step-indicator": { title: "Step Indicator", category: "ui" }
};
function bold(s) {
  return `\x1B[1m${s}\x1B[0m`;
}
function dim(s) {
  return `\x1B[2m${s}\x1B[0m`;
}
function cyan(s) {
  return `\x1B[36m${s}\x1B[0m`;
}
function green(s) {
  return `\x1B[32m${s}\x1B[0m`;
}
function detectPackageManager() {
  const ua = process.env.npm_config_user_agent ?? "";
  if (ua.startsWith("bun"))
    return "bun";
  if (ua.startsWith("pnpm"))
    return "pnpm";
  if (ua.startsWith("yarn"))
    return "yarn";
  return "npm";
}
function runnerPrefix() {
  const pm = detectPackageManager();
  switch (pm) {
    case "bun":
      return "bunx";
    case "pnpm":
      return "pnpm dlx";
    case "yarn":
      return "npx";
    default:
      return "npx";
  }
}
function printHelp() {
  console.log(`
${bold("BigBlocks")} ${dim(`v${VERSION}`)} — Bitcoin UI blocks for shadcn projects
${dim("https://bigblocks.dev")}

${bold("Usage:")}

  ${cyan("npx bigblocks")} add <block> [block...]   Install blocks into your project
  ${cyan("npx bigblocks")} list                     List all available blocks
  ${cyan("npx bigblocks")} list <category>           List blocks in a category
  ${cyan("npx bigblocks")} info <block>              Show block details
  ${cyan("npx bigblocks")} help                     Show this help

${bold("Alternatively, use shadcn directly:")}

  ${cyan(`${runnerPrefix()} shadcn@latest`)} add ${REGISTRY_URL}/<block>.json

${bold("Examples:")}

  ${dim("# Add the connect-wallet block")}
  npx bigblocks add connect-wallet

  ${dim("# Add multiple blocks at once")}
  npx bigblocks add connect-wallet send-bsv wallet-overview

  ${dim("# List all wallet blocks")}
  npx bigblocks list wallet

${bold("Categories:")} wallet, social, market, identity, developer, ui
${bold("Docs:")} ${DOCS_URL}
`);
}
function listBlocks(category) {
  const entries = Object.entries(BLOCKS);
  const filtered = category ? entries.filter(([, b]) => b.category === category) : entries;
  if (filtered.length === 0) {
    console.error(`No blocks found for category "${category}".`);
    console.error(`Available categories: wallet, social, market, identity, developer, ui`);
    process.exit(1);
  }
  const grouped = new Map;
  for (const entry of filtered) {
    const cat = entry[1].category;
    const existing = grouped.get(cat) ?? [];
    existing.push(entry);
    grouped.set(cat, existing);
  }
  console.log(`
${bold("BigBlocks")} — ${filtered.length} blocks available
`);
  for (const [cat, items] of grouped) {
    console.log(`  ${bold(cat.charAt(0).toUpperCase() + cat.slice(1))}`);
    for (const [name, block] of items) {
      console.log(`    ${cyan(name.padEnd(24))} ${dim(block.title)}`);
    }
    console.log();
  }
  console.log(`${dim("Install:")} npx bigblocks add <block>
`);
}
function showInfo(name) {
  const block = BLOCKS[name];
  if (!block) {
    console.error(`Unknown block: "${name}"`);
    console.error(`Run ${cyan("npx bigblocks list")} to see available blocks.`);
    process.exit(1);
  }
  console.log(`
${bold(block.title)} ${dim(`(${name})`)}
Category: ${block.category}

${bold("Install:")}
  npx bigblocks add ${name}
  ${dim("or")}
  ${runnerPrefix()} shadcn@latest add ${REGISTRY_URL}/${name}.json

${bold("Docs:")} ${DOCS_URL}/${name}
`);
}
function addBlocks(names) {
  if (names.length === 0) {
    console.error("No block names provided.");
    console.error(`Run ${cyan("npx bigblocks list")} to see available blocks.`);
    process.exit(1);
  }
  const invalid = names.filter((n) => !BLOCKS[n]);
  if (invalid.length > 0) {
    console.error(`Unknown block(s): ${invalid.map((n) => `"${n}"`).join(", ")}`);
    console.error(`Run ${cyan("npx bigblocks list")} to see available blocks.`);
    process.exit(1);
  }
  const runner = runnerPrefix();
  const urls = names.map((n) => `${REGISTRY_URL}/${n}.json`).join(" ");
  const cmd = `${runner} shadcn@latest add ${urls}`;
  console.log(`
${green("+")} Installing ${names.length} block(s): ${names.map(cyan).join(", ")}`);
  console.log(`${dim(`  ${cmd}`)}
`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}
var args = process.argv.slice(2);
var command = args[0];
switch (command) {
  case undefined:
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  case "--version":
  case "-v":
    console.log(VERSION);
    break;
  case "list":
  case "ls":
    listBlocks(args[1]);
    break;
  case "info":
    if (!args[1]) {
      console.error("Usage: npx bigblocks info <block>");
      process.exit(1);
    }
    showInfo(args[1]);
    break;
  case "add":
  case "install":
  case "i":
    addBlocks(args.slice(1));
    break;
  default:
    if (BLOCKS[command]) {
      addBlocks([command, ...args.slice(1)]);
    } else {
      console.error(`Unknown command: "${command}"`);
      printHelp();
      process.exit(1);
    }
}
