import { useCallback, useMemo, useState } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Possible states of the cloud backup flow */
type CloudBackupStatus = "idle" | "saving" | "success" | "error"

/** Password validation result */
interface PasswordValidation {
  /** Whether the password meets all requirements */
  isValid: boolean
  /** Whether the password meets the minimum length */
  meetsLength: boolean
  /** Whether the password and confirmation match */
  matchesConfirmation: boolean
  /** Strength score from 0 to 4 */
  strength: PasswordStrength
  /** Human-readable strength label */
  strengthLabel: string
}

/** Password strength as a numeric score (0 = empty, 4 = strong) */
type PasswordStrength = 0 | 1 | 2 | 3 | 4

/** Options for the useCloudBackup hook */
export interface UseCloudBackupOptions {
  /** Callback that performs the actual encryption + upload */
  onSave: (password: string) => Promise<void>
  /** Called on successful save */
  onSuccess?: () => void
  /** Called on error */
  onError?: (error: Error) => void
  /** Minimum password length (default: 8) */
  minPasswordLength?: number
}

/** Return type of the useCloudBackup hook */
export interface UseCloudBackupReturn {
  /** Current status of the backup flow */
  status: CloudBackupStatus
  /** Password value */
  password: string
  /** Confirmation password value */
  confirmPassword: string
  /** Set the password value */
  setPassword: (value: string) => void
  /** Set the confirmation password value */
  setConfirmPassword: (value: string) => void
  /** Password validation result */
  validation: PasswordValidation
  /** Error from the save operation */
  error: Error | null
  /** Execute the save operation */
  save: () => Promise<void>
  /** Reset the hook state */
  reset: () => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STRENGTH_LABELS: Record<PasswordStrength, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
}

/**
 * Calculate password strength on a 0-4 scale.
 *
 * Criteria:
 * - Length >= minLength  (+1)
 * - Has uppercase and lowercase  (+1)
 * - Has at least one digit  (+1)
 * - Has at least one special character  (+1)
 */
function calculateStrength(
  password: string,
  minLength: number,
): PasswordStrength {
  if (password.length === 0) return 0

  let score = 0
  if (password.length >= minLength) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  return score as PasswordStrength
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCloudBackup({
  onSave,
  onSuccess,
  onError,
  minPasswordLength = 8,
}: UseCloudBackupOptions): UseCloudBackupReturn {
  const [status, setStatus] = useState<CloudBackupStatus>("idle")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<Error | null>(null)

  const validation = useMemo<PasswordValidation>(() => {
    const meetsLength = password.length >= minPasswordLength
    const matchesConfirmation =
      confirmPassword.length > 0 && password === confirmPassword
    const strength = calculateStrength(password, minPasswordLength)

    return {
      isValid: meetsLength && matchesConfirmation,
      meetsLength,
      matchesConfirmation,
      strength,
      strengthLabel: STRENGTH_LABELS[strength],
    }
  }, [password, confirmPassword, minPasswordLength])

  const save = useCallback(async () => {
    if (!validation.isValid) return

    setStatus("saving")
    setError(null)

    try {
      await onSave(password)
      setStatus("success")
      onSuccess?.()
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      setStatus("error")
      onError?.(err)
    }
  }, [validation.isValid, onSave, password, onSuccess, onError])

  const reset = useCallback(() => {
    setStatus("idle")
    setPassword("")
    setConfirmPassword("")
    setError(null)
  }, [])

  return {
    status,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    validation,
    error,
    save,
    reset,
  }
}
