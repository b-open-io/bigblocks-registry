"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { cn } from "@/lib/utils";

export interface Step {
	id: string;
	label: string;
	description?: string;
	status: "pending" | "active" | "complete";
}

export interface StepIndicatorProps {
	steps: Step[];
	className?: string;
	variant?: "horizontal" | "vertical";
}

export function StepIndicator({
	steps,
	className = "",
	variant = "horizontal",
}: StepIndicatorProps) {
	if (variant === "vertical") {
		return (
			<div className={cn("flex flex-col gap-4", className)}>
				{steps.map((step, index) => (
					<div key={step.id} className="flex items-start gap-3">
						<div
							className={cn(
								"min-w-[32px] h-8 rounded-full flex items-center justify-center font-bold text-sm",
								step.status === "complete" &&
									"bg-accent text-accent-foreground ring-2 ring-accent",
								step.status === "active" &&
									"bg-primary text-primary-foreground ring-2 ring-offset-2 ring-ring",
								step.status === "pending" && "bg-muted text-muted-foreground",
							)}
						>
							{step.status === "complete" ? (
								<CheckIcon className="h-4 w-4" aria-label="Complete" />
							) : (
								<span>{index + 1}</span>
							)}
						</div>
						<div className="flex-1">
							<p
								className={cn(
									"font-medium",
									step.status === "pending" && "text-muted-foreground",
								)}
							>
								{step.label}
							</p>
							{step.description && (
								<p className="text-sm text-muted-foreground">
									{step.description}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		);
	}

	// Horizontal variant
	return (
		<div className={cn("flex items-center", className)}>
			{steps.map((step, index) => (
				<React.Fragment key={step.id}>
					<div className="flex flex-col items-center">
						<div
							className={cn(
								"w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
								step.status === "complete" &&
									"bg-accent text-accent-foreground ring-2 ring-accent",
								step.status === "active" &&
									"bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-2 ring-offset-2 ring-ring",
								step.status === "pending" && "bg-muted text-muted-foreground",
							)}
						>
							{step.status === "complete" ? (
								<CheckIcon className="h-5 w-5" aria-label="Complete" />
							) : (
								<span>{index + 1}</span>
							)}
						</div>
						<p
							className={cn(
								"text-xs mt-2",
								step.status === "pending" && "text-muted-foreground",
							)}
						>
							{step.label}
						</p>
					</div>
					{index < steps.length - 1 && (
						<div
							className={cn(
								"flex-1 h-0.5 mx-3 transition-colors",
								steps[index + 1]?.status !== "pending"
									? "bg-primary"
									: "bg-border",
							)}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	);
}