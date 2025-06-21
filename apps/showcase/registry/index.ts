export const registry = {
  name: "bigblocks",
  items: [
    {
      name: "step-indicator",
      type: "registry:ui",
      title: "Step Indicator",
      description: "Display progress through multi-step processes with horizontal and vertical variants",
      categories: ["ui-components"],
      files: [
        {
          path: "ui/step-indicator.tsx",
          type: "registry:ui",
        },
      ],
      dependencies: ["@radix-ui/react-icons"],
    },
  ],
}