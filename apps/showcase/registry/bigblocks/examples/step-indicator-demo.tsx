"use client"

import { useState } from "react"
import { StepIndicator } from "@/registry/bigblocks/ui/step-indicator"

export default function StepIndicatorDemo() {
  const [activeStep, setActiveStep] = useState(1)
  
  const getStatus = (stepIndex: number): "complete" | "active" | "pending" => {
    if (activeStep > stepIndex) return "complete"
    if (activeStep === stepIndex) return "active"
    return "pending"
  }
  
  const steps = [
    { id: "1", label: "Account", status: getStatus(0) },
    { id: "2", label: "Profile", status: getStatus(1) },
    { id: "3", label: "Settings", status: getStatus(2) },
    { id: "4", label: "Complete", status: getStatus(3) }
  ]

  return (
    <div className="w-full">
      <StepIndicator steps={steps} />
      <div className="mt-8 flex gap-2">
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
    </div>
  )
}