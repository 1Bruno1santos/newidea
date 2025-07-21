import { Inter } from "next/font/google"
import Image from "next/image"
import { Settings, LogOut, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-black ${inter.className}`}>
      {/* Top Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative w-[150px] h-[45px] pt-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sasd-tauwtoXB18tsVH5wvIk84nFsG5m8H0.png"
                alt="DieselBot"
                fill
                className="object-contain align-middle"
                priority
              />
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                  <Home className="h-5 w-5 mr-2" />
                  Inicio
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50">
              <Settings className="h-4 w-4 mr-1" />
              Config
            </Button>
            <Link href="/api/auth/signout">
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">{children}</div>
      </div>
    </div>
  )
}

