"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Building2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"
import { Checkbox } from "@/components/ui/checkbox"

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
    <div className={cn("flex items-center space-x-3", className)}>
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
      <label className="text-sm sm:text-base text-zinc-300 cursor-pointer">{label}</label>
    </div>
  )
}

interface TradeOption {
  id: string
  label: string
  checked: boolean
}

export default function TrocasNavioPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [minStars, setMinStars] = useState("1")
  const [enableTrading, setEnableTrading] = useState(true)

  const [tradeOptions, setTradeOptions] = useState<TradeOption[]>([
    { id: "resources-only", label: "Trocar apenas por Recursos", checked: false },
    { id: "use-backpack", label: "Usar recursos da mochila, se necessário", checked: true },
    { id: "trade-food", label: "Trocar (sua) comida por...", checked: true },
    { id: "trade-stone", label: "Trocar (sua) pedra por...", checked: true },
    { id: "trade-wood", label: "Trocar (sua) madeira por...", checked: true },
    { id: "trade-ore", label: "Trocar (sua) minério por...", checked: true },
    { id: "trade-gold", label: "Trocar (sua) ouro por...", checked: true },
  ])

  const [ignoreOptions, setIgnoreOptions] = useState<TradeOption[]>([
    { id: "ignore-food", label: "Ignorar Comida (do Navio Cargueiro)", checked: false },
    { id: "ignore-stone", label: "Ignorar Pedra (do Navio Cargueiro)", checked: false },
    { id: "ignore-wood", label: "Ignorar Madeira (do Navio Cargueiro)", checked: false },
    { id: "ignore-ore", label: "Ignorar Minério (do Navio Cargueiro)", checked: false },
    { id: "ignore-gold", label: "Ignorar Ouro (do Navio Cargueiro)", checked: false },
    { id: "ignore-anima", label: "Ignorar Anima (do Navio Cargueiro)", checked: false },
    { id: "ignore-lunite", label: "Ignorar Lunita (do Navio Cargueiro)", checked: false },
    { id: "ignore-accelerators", label: "Ignorar Aceleradores (do Navio Cargueiro)", checked: false },
  ])

  const toggleTradeOption = (id: string) => {
    setTradeOptions((options) =>
      options.map((option) => (option.id === id ? { ...option, checked: !option.checked } : option)),
    )
  }

  const toggleIgnoreOption = (id: string) => {
    setIgnoreOptions((options) =>
      options.map((option) => (option.id === id ? { ...option, checked: !option.checked } : option)),
    )
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage, nextPage } = getNavigationLinks("trocas-navio")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="trocas-navio-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
            <h2 className="text-lg sm:text-xl font-semibold text-center">Navio Cargueiro</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              {/* Main Trading Toggle */}
              <div className="border-b border-zinc-800 pb-4">
                <CustomCheckbox
                  checked={enableTrading}
                  onChange={setEnableTrading}
                  label="Trocar itens do navio cargueiro"
                  className="text-base sm:text-lg font-medium"
                />
              </div>

              {/* Trading Options */}
              <div className="space-y-3 sm:space-y-4">
                {tradeOptions.map((option) => (
                  <CustomCheckbox
                    key={option.id}
                    checked={option.checked}
                    onChange={() => toggleTradeOption(option.id)}
                    label={option.label}
                  />
                ))}
              </div>

              {/* Ignore Options */}
              <div className="space-y-3 sm:space-y-4 pt-4 border-t border-zinc-800">
                {ignoreOptions.map((option) => (
                  <CustomCheckbox
                    key={option.id}
                    checked={option.checked}
                    onChange={() => toggleIgnoreOption(option.id)}
                    label={option.label}
                  />
                ))}
              </div>

              {/* Minimum Stars Input */}
              <div className="space-y-2 pt-4 border-t border-zinc-800">
                <label className="block text-sm sm:text-base text-zinc-400">Mínimo de Estrelas para trocar:</label>
                <Input
                  type="text"
                  value={minStars}
                  onChange={(e) => setMinStars(e.target.value)}
                  className="w-full sm:w-1/2 bg-black/50 border-zinc-800 text-white"
                />
              </div>

              {/* Update Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 sm:py-4 text-sm sm:text-base">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

