"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"

export default function StepIndicatorWithDescriptions() {
  const [activeStep, setActiveStep] = useState(0)
  
  const getStatus = (stepIndex: number): "complete" | "active" | "pending" => {
    if (activeStep > stepIndex) return "complete"
    if (activeStep === stepIndex) return "active"
    return "pending"
  }
  
  const steps = [
    { 
      id: "1", 
      label: "Create Identity", 
      description: "Generate your Bitcoin keypair",
      status: getStatus(0) 
    },
    { 
      id: "2", 
      label: "Secure Account", 
      description: "Set encryption password",
      status: getStatus(1) 
    },
    { 
      id: "3", 
      label: "Download Backup", 
      description: "Save encrypted recovery file",
      status: getStatus(2) 
    },
    { 
      id: "4", 
      label: "Connect OAuth", 
      description: "Optional cloud backup",
      status: getStatus(3) 
    }
  ]

  return (
    <div className="w-full max-w-md">
      <StepIndicator steps={steps} variant="vertical" />
      <div className="mt-8 flex gap-2">
        <Button 
          variant="outline"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button 
          onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
          disabled={activeStep === 3}
        >
          {activeStep === 3 ? "Complete" : "Continue"}
        </Button>
      </div>
    </div>
  )
}