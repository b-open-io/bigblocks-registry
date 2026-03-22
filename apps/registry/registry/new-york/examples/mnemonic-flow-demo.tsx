"use client"

import { useCallback, useState } from "react"
import { MnemonicFlow, type MnemonicFlowMode } from "@/registry/new-york/blocks/mnemonic-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_WORDS = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident",
]

type DemoState =
  | { view: "picker" }
  | { view: "flow"; mode: MnemonicFlowMode }
  | { view: "done"; words: string[] }

export default function MnemonicFlowDemo() {
  const [state, setState] = useState<DemoState>({ view: "picker" })

  const handleComplete = useCallback((words: string[]) => {
    setState({ view: "done", words })
  }, [])

  const handleCancel = useCallback(() => {
    setState({ view: "picker" })
  }, [])

  if (state.view === "done") {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 py-8">
        <Badge variant="outline" className="text-sm">
          Flow complete
        </Badge>
        <p className="text-sm text-muted-foreground">
          {state.words.length} words confirmed
        </p>
        <Button variant="outline" onClick={() => setState({ view: "picker" })}>
          Try Another Mode
        </Button>
      </div>
    )
  }

  if (state.view === "flow") {
    const needsWords =
      state.mode === "display" ||
      state.mode === "create" ||
      state.mode === "verify"

    return (
      <div className="mx-auto w-full max-w-xl">
        <MnemonicFlow
          mode={state.mode}
          words={needsWords ? MOCK_WORDS : undefined}
          wordCount={12}
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  // Picker view
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <p className="text-center text-sm text-muted-foreground">
        Choose a mode to preview the mnemonic flow block.
      </p>
      {(
        [
          { mode: "create" as const, label: "Create", desc: "Generate + confirm" },
          { mode: "display" as const, label: "Display", desc: "Read-only grid" },
          { mode: "import" as const, label: "Import", desc: "Enter words" },
          { mode: "verify" as const, label: "Verify", desc: "Fill 2 blanks" },
        ] as const
      ).map((item) => (
        <Button
          key={item.mode}
          variant="outline"
          className="justify-between"
          onClick={() => setState({ view: "flow", mode: item.mode })}
        >
          <span>{item.label}</span>
          <Badge variant="secondary">{item.desc}</Badge>
        </Button>
      ))}
    </div>
  )
}
