"use client"

import { useState } from "react"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"

export default function StepIndicatorDemo() {
  const [activeStep, setActiveStep] = useState(1)
  
  const getStatus = (stepIndex: number): "complete" | "active" | "pending" => {
    if (activeStep > stepIndex) return "complete"
    if (activeStep === stepIndex) return "active"
    return "pending"
  }
  
  const steps = [
    { id: "1", label: "Account", status: getStatus(0) },
    { id: "2", label: "Security", status: getStatus(1) },
    { id: "3", label: "Backup", status: getStatus(2) },
    { id: "4", label: "Complete", status: getStatus(3) }
  ]

  return (
    <div className="w-full">
      <StepIndicator steps={steps} />
      <div className="mt-8 flex gap-2">
        <Button 
          variant="outline"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
          disabled={activeStep === 3}
        >
          {activeStep === 3 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}