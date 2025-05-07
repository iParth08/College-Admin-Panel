"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, Users, Flag, Calendar, Settings, Menu, LogOut, UserPlus, Building2 } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function AdminSidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [setIsCollapsed])

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: BarChart3,
    },
    {
      title: "Registered Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Club Applications",
      href: "/admin/clubs",
      icon: Building2,
    },
    {
      title: "Events & Workshops",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      title: "Flagged Content",
      href: "/admin/flagged",
      icon: Flag,
    },
    {
      title: "Admin Management",
      href: "/admin/admins",
      icon: Settings,
    },
    {
      title: "Alumni Registration",
      href: "/admin/alumni",
      icon: UserPlus,
    },
  ]

  const Sidebar = (
    <div className={cn("flex flex-col h-screen", className)}>
      <div className="px-3 py-4">
        <div className="mb-4 flex items-center px-2">
          {!isCollapsed && <h2 className="text-lg font-semibold tracking-tight">Club Connect</h2>}
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  isCollapsed ? "justify-center" : "",
                )}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className={cn("w-full", isCollapsed ? "justify-center px-0" : "")}>
          <LogOut className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )

  // If mobile, use a sheet for the sidebar
  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            {Sidebar}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div
      className={cn(
        "hidden border-r bg-background md:block",
        isCollapsed ? "w-16" : "w-64",
        "transition-width duration-300",
      )}
    >
      {Sidebar}
    </div>
  )
}
