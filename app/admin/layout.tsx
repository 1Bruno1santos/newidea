"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Users, 
  Bot, 
  Bell, 
  Settings, 
  BarChart3, 
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Clientes",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Notificações",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in and is admin
    const userStr = localStorage.getItem("clientInfo")
    if (!userStr) {
      router.push("/")
      return
    }

    const user = JSON.parse(userStr)
    // For development, we'll check if username is 'admin' or 'demo'
    if (user.username !== 'admin' && user.username !== 'demo') {
      router.push("/dashboard")
      return
    }

    setCurrentUser(user)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("clientInfo")
    router.push("/")
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-zinc-800 px-6">
              <h1 className="text-xl font-bold text-emerald-500">
                DieselBot Admin
              </h1>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>

            {/* User section */}
            <div className="border-t border-zinc-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-black">
                      {currentUser.nome?.[0] || currentUser.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {currentUser.nome || currentUser.username}
                    </p>
                    <p className="text-xs text-zinc-400">Administrador</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}