"use client"

import { useState } from "react"
import { StepIndicator } from "@/registry/bigblocks/ui/step-indicator"
import { Button } from "@/components/ui/button"

export default function StepIndicatorVertical() {
  const [activeStep, setActiveStep] = useState(1)
  
  const getStatus = (stepIndex: number): "complete" | "active" | "pending" => {
    if (activeStep > stepIndex) return "complete"
    if (activeStep === stepIndex) return "active"
    return "pending"
  }
  
  const steps = [
    { 
      id: "1", 
      label: "Generate Identity", 
      status: getStatus(0) 
    },
    { 
      id: "2", 
      label: "Set Password", 
      status: getStatus(1) 
    },
    { 
      id: "3", 
      label: "Create Profile", 
      status: getStatus(2) 
    },
    { 
      id: "4", 
      label: "Save Backup", 
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
          {activeStep === 3 ? "Complete Setup" : "Continue"}
        </Button>
      </div>
    </div>
  )
}