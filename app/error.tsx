"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-white">Algo deu errado!</h2>
        <p className="text-zinc-400 text-sm">Ocorreu um erro no servidor. Nossa equipe foi notificada.</p>
        {error.digest && <p className="text-xs text-zinc-500">Digest: {error.digest}</p>}
        <div className="pt-4">
          <Button onClick={reset} className="bg-emerald-500 hover:bg-emerald-600">
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  )
}

