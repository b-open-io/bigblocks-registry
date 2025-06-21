"use client"

import * as React from "react"
import { editInV0 } from "@/actions/edit-in-v0"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function OpenInV0Button({
  name,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  name: string
}) {
  const [url, setUrl] = React.useState("")

  React.useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <form
      action={async () => {
        try {
          const result = await editInV0({
            name,
            url,
          })

          if (result?.error) {
            throw new Error(result.error)
          }

          if (result?.url) {
            const popupOpened = window.open(result.url, "_blank")
            if (!popupOpened) {
              toast.warning("Pop-up window blocked.", {
                description:
                  "Click the pop-up button in your browser to continue.",
                duration: 5000,
              })
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message)
          }
        }
      }}
    >
      <Form className={className} {...props} />
    </form>
  )
}

function Form({
  className,
  ...props
}: Omit<React.ComponentProps<typeof OpenInV0Button>, "name">) {
  const { pending } = useFormStatus()

  return (
    <Button
      aria-label="Open in v0"
      size="sm"
      className={cn(
        "shadow-none bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black",
        className
      )}
      disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Opening...
        </>
      ) : (
        <>
          Open in{" "}
          <svg
            viewBox="0 0 40 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-current"
          >
            <path
              d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
              fill="currentColor"
            ></path>
            <path
              d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
              fill="currentColor"
            ></path>
          </svg>
        </>
      )}
    </Button>
  )
}