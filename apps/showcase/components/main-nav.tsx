"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BBMark } from "@/components/bb-mark"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 mr-4">
        <span className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#FCC800]">
            <BBMark className="w-5 text-[#0A0A0A]" />
          </span>
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </span>
      </Link>
      {siteConfig.navItems.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm">
          <Link
            href={item.href}
            className={cn(pathname === item.href && "text-primary")}
          >
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
