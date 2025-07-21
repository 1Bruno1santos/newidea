"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin from localStorage
    const clientStr = localStorage.getItem("clientInfo")
    if (clientStr) {
      const client = JSON.parse(clientStr)
      // Check if user is admin by username or role
      if (client.username === 'admin' || client.username === 'demo' || client.role === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [])

  if (!isAdmin) {
    return null
  }

  return (
    <Link href="/admin">
      <Button variant="ghost" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
        <Shield className="h-5 w-5 mr-2" />
        Admin
      </Button>
    </Link>
  )
}