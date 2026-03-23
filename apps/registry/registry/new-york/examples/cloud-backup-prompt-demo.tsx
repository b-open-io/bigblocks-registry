"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CloudBackupPrompt } from "@/registry/new-york/blocks/cloud-backup-prompt"

export default function CloudBackupPromptDemo() {
  const [open, setOpen] = useState(false)

  async function handleSave(password: string): Promise<void> {
    // In a real application, you would:
    //
    // 1. Get the backup data from localStorage
    //    const backup = localStorage.getItem("encrypted-backup")
    //
    // 2. Re-encrypt with the user-chosen password
    //    const encrypted = await encryptBackup(backup, password)
    //
    // 3. Upload to your cloud backup API
    //    await fetch("/api/backup", {
    //      method: "POST",
    //      body: JSON.stringify({ data: encrypted }),
    //    })

    // Demo: simulate a 2-second save
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Uncomment to test error state:
    // throw new Error("Network error: could not reach backup server")

    console.log("Backup saved with password of length:", password.length)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)}>
        Open Backup Prompt
      </Button>
      <p className="text-sm text-muted-foreground">
        Click to open the cloud backup setup dialog
      </p>

      <CloudBackupPrompt
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
        onRemindLater={() => console.log("User chose remind later")}
        onSuccess={() => console.log("Backup enabled successfully")}
        onError={(error) => console.error("Backup error:", error)}
      />
    </div>
  )
}
