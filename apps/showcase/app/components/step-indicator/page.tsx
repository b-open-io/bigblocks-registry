"use client";

import { useState } from "react";

// For now, we'll include the component inline. Later we'll import from registry
function StepIndicator({ steps, className = "", variant = "horizontal" }: any) {
  const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");
  
  if (variant === "vertical") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {steps.map((step: any, index: number) => (
          <div key={step.id} className="flex items-start gap-3">
            <div
              className={cn(
                "min-w-[32px] h-8 rounded-full flex items-center justify-center font-bold text-sm",
                step.status === "complete" && "bg-green-600 text-white",
                step.status === "active" && "bg-blue-600 text-white",
                step.status === "pending" && "bg-gray-200 text-gray-600"
              )}
            >
              {step.status === "complete" ? "✓" : index + 1}
            </div>
            <div className="flex-1">
              <p className={cn("font-medium", step.status === "pending" && "text-gray-500")}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-sm text-gray-500">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step: any, index: number) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                step.status === "complete" && "bg-green-600 text-white",
                step.status === "active" && "bg-blue-600 text-white shadow-lg",
                step.status === "pending" && "bg-gray-200 text-gray-600"
              )}
            >
              {step.status === "complete" ? "✓" : index + 1}
            </div>
            <p className={cn("text-xs mt-2", step.status === "pending" && "text-gray-500")}>
              {step.label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-20 h-0.5 mx-3 transition-colors",
                steps[index + 1]?.status !== "pending" ? "bg-blue-600" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function StepIndicatorPage() {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    { id: "1", label: "Account", status: activeStep > 0 ? "complete" : activeStep === 0 ? "active" : "pending" },
    { id: "2", label: "Profile", status: activeStep > 1 ? "complete" : activeStep === 1 ? "active" : "pending" },
    { id: "3", label: "Settings", status: activeStep > 2 ? "complete" : activeStep === 2 ? "active" : "pending" },
    { id: "4", label: "Complete", status: activeStep > 3 ? "complete" : activeStep === 3 ? "active" : "pending" }
  ];

  const verticalSteps = [
    { 
      id: "1", 
      label: "Create Account", 
      description: "Enter your email and password",
      status: activeStep > 0 ? "complete" : activeStep === 0 ? "active" : "pending" 
    },
    { 
      id: "2", 
      label: "Verify Email", 
      description: "Check your inbox for verification",
      status: activeStep > 1 ? "complete" : activeStep === 1 ? "active" : "pending" 
    },
    { 
      id: "3", 
      label: "Complete Profile", 
      description: "Add your personal information",
      status: activeStep > 2 ? "complete" : activeStep === 2 ? "active" : "pending" 
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Step Indicator</h1>
        <p className="text-xl text-muted-foreground">
          Display progress through multi-step processes with horizontal and vertical variants
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Horizontal Variant</h2>
          <div className="border rounded-lg p-8 bg-gray-50">
            <StepIndicator steps={steps} />
          </div>
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Previous
            </button>
            <button 
              onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Vertical Variant</h2>
          <div className="border rounded-lg p-8 bg-gray-50 max-w-md">
            <StepIndicator steps={verticalSteps} variant="vertical" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <code>bunx shadcn@latest add http://localhost:3002/r/step-indicator.json</code>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`import { StepIndicator } from "@/components/ui/step-indicator"

const steps = [
  { id: "1", label: "Account", status: "complete" },
  { id: "2", label: "Profile", status: "active" },
  { id: "3", label: "Settings", status: "pending" }
];

<StepIndicator steps={steps} />
<StepIndicator steps={steps} variant="vertical" />`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}