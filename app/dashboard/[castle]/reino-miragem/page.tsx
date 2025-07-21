"use client"

import { useState } from "react"
import { ArrowLeft, Mountain, Info, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

export default function ReinoMiragemPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("reino-miragem")
  const [huntInMirage, setHuntInMirage] = useState(false)
  const [dailyMonsterTarget, setDailyMonsterTarget] = useState("10")
  const [gatherInMirage, setGatherInMirage] = useState(false)
  const [useHighestTroops, setUseHighestTroops] = useState(false)
  const [leaveFreeMarches, setLeaveFreeMarches] = useState(false)
  const [freeMarches, setFreeMarches] = useState("0")

  const resourceTypes = [
    { id: "food", label: "Comida", color: "text-blue-400" },
    { id: "mineral", label: "Minério", color: "text-purple-400" },
    { id: "stone", label: "Pedra", color: "text-zinc-400" },
    { id: "gold", label: "Ouro", color: "text-yellow-400" },
    { id: "wood", label: "Madeira", color: "text-emerald-400" },
    { id: "lunite", label: "Lunita", color: "text-red-400" },
  ]

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <AnimatePresence mode="wait">
        <motion.div key="reino-miragem-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="mb-6">
            <CastlePageNavigation castle={params.castle} prevPage={prevPage} nextPage={nextPage} />
            <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-center">{castleName}</h1>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
            <h2 className="text-xl font-semibold text-center">Reino Miragem</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6 space-y-6">
                {/* Gather Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Coleta Reino Miragem</h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gatherInMirage"
                        checked={gatherInMirage}
                        onCheckedChange={(checked) => setGatherInMirage(checked as boolean)}
                      />
                      <label htmlFor="gatherInMirage" className="text-sm text-zinc-300">
                        Coletar no reino da Miragem
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useHighestTroops"
                        checked={useHighestTroops}
                        onCheckedChange={(checked) => setUseHighestTroops(checked as boolean)}
                      />
                      <label htmlFor="useHighestTroops" className="text-sm text-zinc-300">
                        Usar tropas de maior nível disponível
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="leaveFreeMarches"
                        checked={leaveFreeMarches}
                        onCheckedChange={(checked) => setLeaveFreeMarches(checked as boolean)}
                      />
                      <label htmlFor="leaveFreeMarches" className="text-sm text-zinc-300">
                        Deixar marchas livres
                      </label>
                    </div>
                    {leaveFreeMarches && (
                      <div className="ml-6">
                        <label htmlFor="freeMarches" className="text-sm text-zinc-400 block mb-1">
                          Quantas?
                        </label>
                        <Input
                          id="freeMarches"
                          type="number"
                          value={freeMarches}
                          onChange={(e) => setFreeMarches(e.target.value)}
                          className="w-24 bg-black/50 border-zinc-800 text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Resource Types */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Tipo de Coleta Reino Miragem</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {resourceTypes.map((resource) => (
                      <div key={resource.id} className="flex items-center space-x-2">
                        <Checkbox id={resource.id} defaultChecked />
                        <label htmlFor={resource.id} className={cn("text-sm", resource.color)}>
                          {resource.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hunt Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Caça no Reino Miragem</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="huntInMirage"
                        checked={huntInMirage}
                        onCheckedChange={(checked) => setHuntInMirage(checked as boolean)}
                      />
                      <label htmlFor="huntInMirage" className="text-sm text-zinc-300">
                        Caçar no reino da miragem
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="dailyMonsterTarget" className="text-sm text-zinc-400 block">
                        Meta diária de monstros:
                      </label>
                      <Input
                        id="dailyMonsterTarget"
                        type="number"
                        value={dailyMonsterTarget}
                        onChange={(e) => setDailyMonsterTarget(e.target.value)}
                        className="w-24 bg-black/50 border-zinc-800 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-lg text-blue-400 text-sm">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 flex-shrink-0" />
                    <p>
                      Obs.: As configurações de caça e coleta do reino normal
                      <br />
                      serão ignoradas se o reino da miragem estiver ativo.
                    </p>
                  </div>
                </div>

                {/* Update Button */}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 sm:py-3 text-sm sm:text-base">
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

