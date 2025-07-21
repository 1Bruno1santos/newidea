"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, AlertTriangle, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

// Custom checkbox component that matches the design
const CustomCheckbox = ({
  checked,
  onChange,
  label,
  className,
  warning,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
  warning?: string
}) => {
  return (
    <div className="space-y-1">
      <div className={cn("flex items-center space-x-2", className)}>
        <Checkbox
          checked={checked}
          onCheckedChange={onChange}
          id={label}
          className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
        />
        <Label
          htmlFor={label}
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
        >
          {label}
        </Label>
      </div>
      {warning && <div className="text-xs text-zinc-500 pl-6">{warning}</div>}
    </div>
  )
}

// Custom radio component
const CustomRadio = ({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean
  onChange: () => void
  label: string
  className?: string
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <RadioGroupItem checked={checked} onCheckedChange={onChange} value={label} id={label} />
      <Label
        htmlFor={label}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
      >
        {label}
      </Label>
    </div>
  )
}

export default function EventosPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)

  // Labyrinth state
  const [labyrinthOptions, setLabyrinthOptions] = useState({
    attackLabyrinth: true,
    useStars: false,
    onlyFreeAttacks: true,
  })
  const [labyrinthType, setLabyrinthType] = useState<"normal" | "elite">("normal")

  // Magnates state
  const [magnatesOptions, setMagnatesOptions] = useState({
    attackMagnates: true,
    useLuckyCoins: false,
    onlyFreeAttacksMagnates: true,
  })

  // Miscellaneous Events state
  const [miscEvents, setMiscEvents] = useState({
    monthlyLottery: true,
    onlyFreeAttempts: true,
    iceBreaking: true,
    collectIceRewards: true,
    paganiRace: true,
    collectPaganiRewards: true,
    pinballEvent: true,
    collectPinballRewards: true,
  })

  const updateLabyrinthOption = (key: keyof typeof labyrinthOptions) => {
    setLabyrinthOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const updateMagnatesOption = (key: keyof typeof magnatesOptions) => {
    setMagnatesOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const updateMiscEvent = (key: keyof typeof miscEvents) => {
    setMiscEvents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage, nextPage } = getNavigationLinks("eventos")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="eventos-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
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

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-center">Fichas & Estrelas</h2>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              {/* Labyrinth and Magnates Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-2">Labirinto e Magnatas</h3>
                <div className="space-y-3">
                  <CustomCheckbox
                    checked={labyrinthOptions.attackLabyrinth}
                    onChange={() => updateLabyrinthOption("attackLabyrinth")}
                    label="Atacar no Labirinto"
                  />
                  <CustomCheckbox
                    checked={labyrinthOptions.onlyFreeAttacks}
                    onChange={() => updateLabyrinthOption("onlyFreeAttacks")}
                    label="Usar Apenas Ataques Grátis no Labirinto"
                  />

                  <div className="pl-6 space-y-2">
                    <RadioGroup
                      value={labyrinthType}
                      onValueChange={(value) => setLabyrinthType(value as "normal" | "elite")}
                    >
                      <CustomRadio
                        checked={labyrinthType === "normal"}
                        onChange={() => setLabyrinthType("normal")}
                        label="Labirinto Normal"
                      />
                      <CustomRadio
                        checked={labyrinthType === "elite"}
                        onChange={() => setLabyrinthType("elite")}
                        label="Labirinto Elite"
                      />
                    </RadioGroup>
                  </div>
                  <CustomCheckbox
                    checked={labyrinthOptions.useStars}
                    onChange={() => updateLabyrinthOption("useStars")}
                    label="Usar Estrelas Sagradas"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-800">
                  <CustomCheckbox
                    checked={magnatesOptions.attackMagnates}
                    onChange={() => updateMagnatesOption("attackMagnates")}
                    label="Atacar Reino dos Magnatas"
                  />
                  <CustomCheckbox
                    checked={magnatesOptions.useLuckyCoins}
                    onChange={() => updateMagnatesOption("useLuckyCoins")}
                    label="Usar Moedas da Sorte"
                  />
                  <CustomCheckbox
                    checked={magnatesOptions.onlyFreeAttacksMagnates}
                    onChange={() => updateMagnatesOption("onlyFreeAttacksMagnates")}
                    label="Apenas Ataque Grátis no Reino dos Magnatas"
                  />
                </div>
              </div>

              {/* Miscellaneous Events Section */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-2">Eventos Diversos</h3>
                <div className="space-y-3">
                  <CustomCheckbox
                    checked={miscEvents.monthlyLottery}
                    onChange={() => updateMiscEvent("monthlyLottery")}
                    label="Jogar na Loteria do Evento Mensal"
                  />
                  <CustomCheckbox
                    checked={miscEvents.onlyFreeAttempts}
                    onChange={() => updateMiscEvent("onlyFreeAttempts")}
                    label="Somente tentativas grátis"
                    warning="(Obs.: Requer a opção anterior)"
                  />
                  <CustomCheckbox
                    checked={miscEvents.iceBreaking}
                    onChange={() => updateMiscEvent("iceBreaking")}
                    label="Evento de quebrar gelo"
                  />
                  <CustomCheckbox
                    checked={miscEvents.collectIceRewards}
                    onChange={() => updateMiscEvent("collectIceRewards")}
                    label="Coletar Recompensas"
                    warning="(Obs.: Requer a opção anterior)"
                  />
                  <CustomCheckbox
                    checked={miscEvents.paganiRace}
                    onChange={() => updateMiscEvent("paganiRace")}
                    label="Evento corrida Pagani"
                  />
                  <CustomCheckbox
                    checked={miscEvents.collectPaganiRewards}
                    onChange={() => updateMiscEvent("collectPaganiRewards")}
                    label="Coletar Recompensas"
                    warning="(Obs.: Requer a opção anterior)"
                  />
                  <CustomCheckbox
                    checked={miscEvents.pinballEvent}
                    onChange={() => updateMiscEvent("pinballEvent")}
                    label="Evento Pinball"
                  />
                  <CustomCheckbox
                    checked={miscEvents.collectPinballRewards}
                    onChange={() => updateMiscEvent("collectPinballRewards")}
                    label="Coletar Recompensas"
                    warning="(Obs.: Requer a opção anterior)"
                  />
                </div>
              </div>

              {/* Update Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 sm:py-4 text-sm sm:text-base">
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

