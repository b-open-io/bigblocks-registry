#!/usr/bin/env bun

/**
 * Publish BigBlocks components to ClawNet registry as on-chain packages.
 *
 * Each registry item gets a generated SKILL.md (required by the ClawNet API)
 * plus all of its source files, then is published via POST /api/v1/skills.
 *
 * Usage:
 *   bun scripts/publish-onchain.ts                    # publish all
 *   bun scripts/publish-onchain.ts bitcoin-avatar     # publish one
 *   bun scripts/publish-onchain.ts --dry-run          # preview
 */

import { readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

const REGISTRY_PATH = join(import.meta.dir, "../apps/registry/registry.json");
const REGISTRY_ROOT = join(import.meta.dir, "../apps/registry");
const CLAWNET_API = process.env.CLAWNET_REGISTRY || "https://clawnet.sh";

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  author: string;
  categories?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

interface RegistryJson {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

function readRegistry(): RegistryJson {
  return JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
}

function readSourceFile(source: string): string {
  const filePath = isAbsolute(source) ? source : join(REGISTRY_ROOT, source);
  return readFileSync(filePath, "utf-8");
}

/**
 * Generate a SKILL.md for a registry item.
 * The ClawNet API requires every published package to include a SKILL.md
 * with name/description frontmatter.
 */
function generateSkillMd(item: RegistryItem, homepage: string): string {
  const lines = [
    "---",
    `name: ${item.name}`,
    `description: ${item.description}`,
    "---",
    "",
    `# ${item.title}`,
    "",
    item.description,
    "",
    `Type: \`${item.type}\``,
    `Author: ${item.author}`,
    `Homepage: ${homepage}`,
  ];

  if (item.dependencies && item.dependencies.length > 0) {
    lines.push("", "## Dependencies", "");
    for (const dep of item.dependencies) {
      lines.push(`- \`${dep}\``);
    }
  }

  if (item.registryDependencies && item.registryDependencies.length > 0) {
    lines.push("", "## Registry Dependencies", "");
    for (const dep of item.registryDependencies) {
      lines.push(`- ${dep}`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

async function publishItem(
  item: RegistryItem,
  homepage: string,
  dryRun: boolean
): Promise<boolean> {
  console.log(`\n--- ${item.name} (${item.type}) ---`);

  // Collect source files with content
  const files: { path: string; content: string }[] = [];
  for (const file of item.files) {
    try {
      const content = readSourceFile(file.path);
      files.push({ path: file.path, content });
    } catch (err) {
      console.error(
        `  Skip file ${file.path}: ${err instanceof Error ? err.message : err}`
      );
    }
  }

  if (files.length === 0) {
    console.error("  No files found, skipping");
    return false;
  }

  // Generate and prepend SKILL.md (required by ClawNet API)
  const skillMd = generateSkillMd(item, homepage);
  files.unshift({ path: "SKILL.md", content: skillMd });

  console.log(`  Files: ${files.length} (including generated SKILL.md)`);
  for (const f of files) {
    console.log(`    ${f.path} (${f.content.length} bytes)`);
  }

  if (dryRun) {
    console.log(
      `  [dry-run] Would publish ${item.name} with ${files.length} files`
    );
    return true;
  }

  // Publish to ClawNet registry API
  const payload = {
    slug: item.name,
    name: item.name,
    description: item.description,
    version: "1.0.0",
    tags: item.categories,
    homepage,
    files,
    packageType: item.type,
  };

  try {
    const res = await fetch(`${CLAWNET_API}/api/v1/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      console.error(
        `  Publish failed (${res.status}): ${(body as { error?: string }).error || res.statusText}`
      );
      return false;
    }

    const result = (await res.json()) as { slug: string; version: string };
    console.log(`  Published: ${result.slug}@${result.version}`);
    return true;
  } catch (err) {
    console.error(
      `  Error: ${err instanceof Error ? err.message : err}`
    );
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const filterName = args.find((a) => !a.startsWith("--"));

  const registry = readRegistry();
  let items = registry.items;

  if (filterName) {
    items = items.filter((i) => i.name === filterName);
    if (items.length === 0) {
      console.error(`Component not found: ${filterName}`);
      console.error(
        `Available: ${registry.items.map((i) => i.name).join(", ")}`
      );
      process.exit(1);
    }
  }

  console.log("BigBlocks -> ClawNet Publisher");
  console.log(`Registry: ${registry.name} (${registry.items.length} items)`);
  console.log(`Target: ${CLAWNET_API}`);
  if (dryRun) console.log("Mode: DRY RUN");
  console.log(`Publishing ${items.length} item(s)...`);

  let success = 0;
  let failed = 0;

  for (const item of items) {
    const ok = await publishItem(item, registry.homepage, dryRun);
    if (ok) success++;
    else failed++;
  }

  console.log(`\nDone: ${success} published, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
