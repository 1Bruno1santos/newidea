"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

// Custom checkbox component that matches the design
const CustomCheckbox = ({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-3 rounded transition-colors hover:bg-zinc-800/50",
        className,
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded flex items-center justify-center",
          checked ? "bg-emerald-500" : "border-2 border-zinc-700",
        )}
      >
        {checked && (
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-zinc-300 text-base">{label}</span>
    </button>
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
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-3 rounded transition-colors hover:bg-zinc-800/50",
        className,
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center",
          checked && "border-emerald-500",
        )}
      >
        {checked && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
      </div>
      <span className="text-zinc-300 text-base">{label}</span>
    </button>
  )
}

// Custom number input component
const NumberInput = ({
  value,
  onChange,
  min = 0,
  max,
}: {
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
}) => {
  const handleIncrement = () => {
    const num = Number.parseInt(value)
    if (!isNaN(num) && (max === undefined || num < max)) {
      onChange((num + 1).toString())
    }
  }

  const handleDecrement = () => {
    const num = Number.parseInt(value)
    if (!isNaN(num) && num > min) {
      onChange((num - 1).toString())
    }
  }

  return (
    <div className="relative w-full sm:w-32">
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          const val = e.target.value
          if (/^\d*$/.test(val)) {
            onChange(val)
          }
        }}
        className="w-full h-12 bg-black/50 border-zinc-800 text-white text-center pr-12 text-lg"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <button
          onClick={handleIncrement}
          className="text-zinc-400 hover:text-white focus:outline-none p-1"
          type="button"
        >
          ▲
        </button>
        <button
          onClick={handleDecrement}
          className="text-zinc-400 hover:text-white focus:outline-none p-1"
          type="button"
        >
          ▼
        </button>
      </div>
    </div>
  )
}

export default function NinhosPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [enableNests, setEnableNests] = useState(true)

  // Nest levels
  const [nestLevels, setNestLevels] = useState({
    level1: true,
    level2: true,
    level3: true,
    level4: true,
    level5: true,
    level6: true,
  })

  // Troop deployment strategy
  const [troopStrategy, setTroopStrategy] = useState("t5-t4")

  // Numeric inputs
  const [minEssenceLevel, setMinEssenceLevel] = useState("10")
  const [marchLimit, setMarchLimit] = useState("20")
  const [simultaneousNests, setSimultaneousNests] = useState("3")
  const [waitTimeAfterKick, setWaitTimeAfterKick] = useState("5")

  // Additional options
  const [additionalOptions, setAdditionalOptions] = useState({
    skipFullLab: true,
    dontFillNest: true,
    keepOneSlot: true,
    dontSendT5: true,
    dontSendSiege: true,
  })

  const troopStrategyOptions = [
    { value: "lowest-tier", label: "Enviar apenas 1 tropa" },
    { value: "highest-tier", label: "Enviar tropas recomendadas" },
  ]

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage, nextPage } = getNavigationLinks("ninhos")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="ninhos-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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

          <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
            <h2 className="text-xl font-semibold text-center">Ninhos</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6 overflow-y-auto">
              {/* Main Toggle */}
              <div className="border-b border-zinc-800 pb-4">
                <CustomCheckbox
                  checked={enableNests}
                  onChange={setEnableNests}
                  label="Participar de ninhos"
                  className="text-lg font-medium text-white"
                />
              </div>
              {/* Nest Levels */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-2">Níveis de Ninho:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(nestLevels).map(([key, value]) => (
                    <CustomCheckbox
                      key={key}
                      checked={value}
                      onChange={() => setNestLevels((prev) => ({ ...prev, [key]: !prev[key] }))}
                      label={`Nv. ${key.replace("level", "")}`}
                    />
                  ))}
                </div>
              </div>
              {/* Troop Deployment Strategy */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-2">Tropas a enviar:</h3>
                <div className="space-y-2">
                  {troopStrategyOptions.map((option) => (
                    <CustomRadio
                      key={option.value}
                      checked={troopStrategy === option.value}
                      onChange={() => setTroopStrategy(option.value)}
                      label={option.label}
                    />
                  ))}
                </div>
              </div>
              {/* Numeric Inputs */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <CustomCheckbox checked={true} onChange={() => {}} label="Deletar essências inferiores a nv:" />
                  <NumberInput value={minEssenceLevel} onChange={setMinEssenceLevel} />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <CustomCheckbox checked={true} onChange={() => {}} label="Max Ninhos em simultâneo:" />
                  <NumberInput value={simultaneousNests} onChange={setSimultaneousNests} />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <CustomCheckbox checked={true} onChange={() => {}} label="Tempo max de viagem (minutos):" />
                  <NumberInput value={marchLimit} onChange={setMarchLimit} />
                </div>
              </div>
              {/* Additional Options */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <CustomCheckbox
                  checked={additionalOptions.skipFullLab}
                  onChange={() => setAdditionalOptions((prev) => ({ ...prev, skipFullLab: !prev.skipFullLab }))}
                  label="Não participar quando laboratório estiver cheio"
                />
                <CustomCheckbox
                  checked={additionalOptions.dontFillNest}
                  onChange={() => setAdditionalOptions((prev) => ({ ...prev, dontFillNest: !prev.dontFillNest }))}
                  label="Não lotar Ninho (deixar vagas para outros)"
                />
                <CustomCheckbox
                  checked={additionalOptions.keepOneSlot}
                  onChange={() => setAdditionalOptions((prev) => ({ ...prev, keepOneSlot: !prev.keepOneSlot }))}
                  label="Deixar 1 Slot Livre no Lab (deleta menor essência)"
                />
                <CustomCheckbox
                  checked={additionalOptions.dontSendT5}
                  onChange={() => setAdditionalOptions((prev) => ({ ...prev, dontSendT5: !prev.dontSendT5 }))}
                  label="Não enviar T5"
                />
                <CustomCheckbox
                  checked={additionalOptions.dontSendSiege}
                  onChange={() => setAdditionalOptions((prev) => ({ ...prev, dontSendSiege: !prev.dontSendSiege }))}
                  label="Não enviar tropas de Cerco"
                />
              </div>
              {/* Update Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 text-lg">Salvar</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

