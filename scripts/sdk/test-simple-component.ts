#!/usr/bin/env bun
import { generateComponent } from "./generate-component";

// Test with a simple component
generateComponent({
  name: "simple-test-button",
  category: "authentication",
  description: "A very simple button component for testing the generation system",
  interactive: false,
  outputDir: "./test-output"
}).catch(console.error);