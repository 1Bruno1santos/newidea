'use client'

import { useRouter } from 'next/navigation'

const castles = [
  {
    name: 'Castelo_Imperial',
    level: 35,
    power: 1000000,
    troops: 50000
  },
  {
    name: 'Fortaleza_Negra',
    level: 28,
    power: 800000,
    troops: 40000
  },
  {
    name: 'Torre_do_Dragão',
    level: 42,
    power: 1200000,
    troops: 60000
  },
  {
    name: 'Cidadela_Real',
    level: 31,
    power: 900000,
    troops: 45000
  },
  {
    name: 'Bastião_Sombrio',
    level: 25,
    power: 700000,
    troops: 35000
  },
  {
    name: 'bola1',
    level: 30,
    power: 850000,
    troops: 42500
  },
  {
    name: 'xsultal',
    level: 33,
    power: 950000,
    troops: 47500
  }
]

export function CastleList() {
  const router = useRouter()

  return (
    <aside className="w-80 flex-shrink-0">
      <h2 className="text-white mb-4">Os meus castelos:</h2>
      <div className="space-y-2">
        {castles.map((castle) => (
          <button
            key={castle.name}
            onClick={() => router.push(`/dashboard/${encodeURIComponent(castle.name)}`)}
            className="w-full p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-800/50 transition-colors text-left"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-emerald-500">{castle.name}</span>
              <span className="text-zinc-500">Lvl {castle.level}</span>
            </div>
            <div className="text-sm text-zinc-400">
              <div>Power: {castle.power.toLocaleString()} | Troops: {castle.troops.toLocaleString()}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

