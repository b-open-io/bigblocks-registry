import { AppSidebar } from "@/components/app-sidebar"
import { BBMark } from "@/components/bb-mark"
import { ModeSwitcher } from "@/components/mode-switcher"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex flex-1 items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-md bg-[#FCC800]">
                <BBMark className="w-5 text-[#0A0A0A]" />
              </span>
              <span className="font-semibold tracking-tight">BigBlocks</span>
            </span>
            <ModeSwitcher />
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
