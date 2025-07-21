"use client"

import { useState } from "react"
import { ArrowLeft, Building2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

interface TroopInput {
  infantry: string
  ranged: string
  cavalry: string
  siege: string
}

interface TierConfig {
  tier: number
  troops: TroopInput
  enabled: boolean
}

const TroopInput = ({
  label,
  value,
  onChange,
}: { label: string; value: string; onChange: (value: string) => void }) => {
  const formatNumber = (num: string) => {
    const numbers = num.replace(/[^\d]/g, "")
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPos = input.selectionStart || 0
    const prevValue = input.value
    const rawValue = prevValue.replace(/\s/g, "")
    const formattedValue = formatNumber(rawValue)

    const addedSpaces = (formattedValue.substring(0, cursorPos).match(/\s/g) || []).length
    const removedSpaces = (prevValue.substring(0, cursorPos).match(/\s/g) || []).length
    const newPosition = cursorPos + (addedSpaces - removedSpaces)

    onChange(formattedValue)

    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = newPosition
    })
  }

  return (
    <div className="space-y-1">
      <label className="text-xs sm:text-sm font-medium text-zinc-300">{label}</label>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        className="bg-black border-zinc-800 text-emerald-500 h-8 sm:h-10 text-xs sm:text-sm placeholder:text-zinc-700"
      />
    </div>
  )
}

export default function TropasPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("tropas")
  const [expandedCards, setExpandedCards] = useState<number[]>([])
  const [tiers, setTiers] = useState<TierConfig[]>([
    { tier: 1, troops: { infantry: "0", ranged: "0", cavalry: "0", siege: "0" }, enabled: false },
    { tier: 2, troops: { infantry: "0", ranged: "0", cavalry: "0", siege: "0" }, enabled: false },
    { tier: 3, troops: { infantry: "0", ranged: "0", cavalry: "0", siege: "0" }, enabled: false },
    { tier: 4, troops: { infantry: "0", ranged: "0", cavalry: "0", siege: "0" }, enabled: false },
    { tier: 5, troops: { infantry: "0", ranged: "0", cavalry: "0", siege: "0" }, enabled: false },
  ])
  const [troopOptions, setTroopOptions] = useState({
    trainTroops: false,
    healInfirmary: false,
    healSanctuary: false,
    forgeLuminous: false,
    rotativeTraining: false,
  })

  const toggleCardExpansion = (tier: number) => {
    setExpandedCards((prev) => (prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]))
  }

  const handleTroopChange = (tier: number, troopType: keyof TroopInput, value: string) => {
    setTiers((prevTiers) =>
      prevTiers.map((t) => (t.tier === tier ? { ...t, troops: { ...t.troops, [troopType]: value } } : t)),
    )
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="tropas-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <CastlePageNavigation castle={params.castle} prevPage="diversos" nextPage="envio-recursos" />
            <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-center">{castleName}</h1>
              </div>
            </div>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            {/* Title Section */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 text-center">
              <h2 className="text-xl font-semibold">Tropas</h2>
            </div>

            {/* Troop Management Options */}
            <Card className="bg-black border-zinc-800">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-emerald-500 text-center">Opções de Tropas</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trainTroops"
                    checked={troopOptions.trainTroops}
                    onCheckedChange={(checked) =>
                      setTroopOptions((prev) => ({ ...prev, trainTroops: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="trainTroops"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Treinar Tropas
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="healInfirmary"
                    checked={troopOptions.healInfirmary}
                    onCheckedChange={(checked) =>
                      setTroopOptions((prev) => ({ ...prev, healInfirmary: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="healInfirmary"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Curar Tropas (Enfermaria)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="healSanctuary"
                    checked={troopOptions.healSanctuary}
                    onCheckedChange={(checked) =>
                      setTroopOptions((prev) => ({ ...prev, healSanctuary: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="healSanctuary"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Curar Tropas (Santuário)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="forgeLuminous"
                    checked={troopOptions.forgeLuminous}
                    onCheckedChange={(checked) =>
                      setTroopOptions((prev) => ({ ...prev, forgeLuminous: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="forgeLuminous"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Forjar Equipamentos Luminosos (bagulho das T5)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rotativeTraining"
                    checked={troopOptions.rotativeTraining}
                    onCheckedChange={(checked) =>
                      setTroopOptions((prev) => ({ ...prev, rotativeTraining: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="rotativeTraining"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Treino rotativo de tropas
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Troops Cards */}
            <div className="grid grid-cols-1 gap-4">
              {tiers.map((tier) => (
                <Card key={tier.tier} className="bg-black/90 border-zinc-800 p-2 sm:p-3">
                  <CardHeader className="p-2 pb-0 sm:p-3 sm:pb-1">
                    <CardTitle className="text-sm sm:text-base leading-tight flex justify-between items-center text-emerald-500">
                      <span>Tropas T{tier.tier}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-white p-1 sm:p-2"
                        onClick={() => toggleCardExpansion(tier.tier)}
                      >
                        {expandedCards.includes(tier.tier) ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 sm:p-3 sm:pt-0 space-y-2">
                    <div className="text-zinc-400 text-xs sm:text-sm leading-snug">
                      <div>Nivel {tier.level}</div>
                    </div>
                    <AnimatePresence>
                      {expandedCards.includes(tier.tier) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 pt-2"
                        >
                          <TroopInput
                            label="Infantaria"
                            value={tier.troops.infantry}
                            onChange={(value) => handleTroopChange(tier.tier, "infantry", value)}
                          />
                          <TroopInput
                            label="Arqueiros"
                            value={tier.troops.ranged}
                            onChange={(value) => handleTroopChange(tier.tier, "ranged", value)}
                          />
                          <TroopInput
                            label="Cavalaria"
                            value={tier.troops.cavalry}
                            onChange={(value) => handleTroopChange(tier.tier, "cavalry", value)}
                          />
                          <TroopInput
                            label="Cerco"
                            value={tier.troops.siege}
                            onChange={(value) => handleTroopChange(tier.tier, "siege", value)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 sm:py-4 text-sm sm:text-base">
              Salvar
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

