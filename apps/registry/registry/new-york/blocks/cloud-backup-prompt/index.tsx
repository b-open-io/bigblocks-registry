"use client"

import {
  CloudBackupPromptUi,
} from "./cloud-backup-prompt-ui"
import {
  useCloudBackup,
} from "./use-cloud-backup"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { CloudBackupPromptUi } from "./cloud-backup-prompt-ui"
export type { CloudBackupPromptUiProps } from "./cloud-backup-prompt-ui"
export { useCloudBackup } from "./use-cloud-backup"
export type {
  UseCloudBackupOptions,
  UseCloudBackupReturn,
} from "./use-cloud-backup"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CloudBackupPromptProps {
  /** Whether the dialog is open */
  open: boolean
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void
  /** Callback that performs the actual encryption + upload */
  onSave: (password: string) => Promise<void>
  /** Called when "Remind Me Later" is clicked */
  onRemindLater?: () => void
  /** Called on successful save */
  onSuccess?: () => void
  /** Called on error */
  onError?: (error: Error) => void
  /** Minimum password length (default: 8) */
  minPasswordLength?: number
  /** Optional CSS class for the dialog content */
  className?: string
}

// ---------------------------------------------------------------------------
// Composed component
// ---------------------------------------------------------------------------

/**
 * A dialog that prompts users to set up encrypted cloud backup after
 * first sign-in.
 *
 * The block is agnostic about how encryption and upload are performed --
 * the parent provides an `onSave` callback that receives the chosen
 * password and handles the rest.
 *
 * @example
 * ```tsx
 * import { CloudBackupPrompt } from "@/components/blocks/cloud-backup-prompt"
 *
 * function App() {
 *   const [open, setOpen] = useState(true)
 *
 *   return (
 *     <CloudBackupPrompt
 *       open={open}
 *       onOpenChange={setOpen}
 *       onSave={async (password) => {
 *         const backup = localStorage.getItem("encrypted-backup")
 *         if (!backup) throw new Error("No backup found")
 *         await uploadBackup(backup, password)
 *       }}
 *       onSuccess={() => console.log("Backup saved")}
 *     />
 *   )
 * }
 * ```
 */
export function CloudBackupPrompt({
  open,
  onOpenChange,
  onSave,
  onRemindLater,
  onSuccess,
  onError,
  minPasswordLength = 8,
  className,
}: CloudBackupPromptProps) {
  const hook = useCloudBackup({
    onSave,
    onSuccess,
    onError,
    minPasswordLength,
  })

  return (
    <CloudBackupPromptUi
      open={open}
      onOpenChange={onOpenChange}
      hook={hook}
      onRemindLater={onRemindLater}
      minPasswordLength={minPasswordLength}
      className={className}
    />
  )
}
