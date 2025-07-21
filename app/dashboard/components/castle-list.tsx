'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Castle {
  igg_id: string
  name: string
  level: number
  power: number
  troops: number
}

export function CastleList() {
  const router = useRouter()
  const [castles, setCastles] = useState<Castle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCastles = async () => {
      try {
        // Get client data from localStorage
        const clientStr = localStorage.getItem('client')
        if (!clientStr) {
          router.push('/')
          return
        }

        const client = JSON.parse(clientStr)

        const response = await fetch('/api/castles/list', {
          headers: {
            'x-client-data': JSON.stringify(client)
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch castles')
        }

        const data = await response.json()
        setCastles(data.castles || [])
      } catch (err) {
        console.error('Error fetching castles:', err)
        setError('Erro ao carregar castelos')
      } finally {
        setLoading(false)
      }
    }

    fetchCastles()
  }, [router])

  if (loading) {
    return (
      <aside className="w-80 flex-shrink-0">
        <h2 className="text-white mb-4">Os meus castelos:</h2>
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      </aside>
    )
  }

  if (error) {
    return (
      <aside className="w-80 flex-shrink-0">
        <h2 className="text-white mb-4">Os meus castelos:</h2>
        <div className="text-red-500 text-sm">{error}</div>
      </aside>
    )
  }

  if (castles.length === 0) {
    return (
      <aside className="w-80 flex-shrink-0">
        <h2 className="text-white mb-4">Os meus castelos:</h2>
        <div className="text-zinc-400 text-sm">Nenhum castelo encontrado</div>
      </aside>
    )
  }

  return (
    <aside className="w-80 flex-shrink-0">
      <h2 className="text-white mb-4">Os meus castelos:</h2>
      <div className="space-y-2">
        {castles.map((castle) => (
          <button
            key={castle.igg_id}
            onClick={() => router.push(`/dashboard/${castle.igg_id}`)}
            className="w-full p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/50 transition-colors text-left"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-emerald-500">{castle.name}</span>
              <span className="text-zinc-500">Lvl {castle.level}</span>
            </div>
            <div className="text-sm text-zinc-400">
              <div>IGG: {castle.igg_id}</div>
              <div>Power: {castle.power.toLocaleString()} | Troops: {castle.troops.toLocaleString()}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

