"use client"

import * as React from "react"

export function useMetaColor() {
  const [metaColor, setMetaColor] = React.useState("#ffffff")

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setMetaColor(isDark ? "#09090b" : "#ffffff")

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          setMetaColor(isDark ? "#09090b" : "#ffffff")
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return { metaColor, setMetaColor }
}