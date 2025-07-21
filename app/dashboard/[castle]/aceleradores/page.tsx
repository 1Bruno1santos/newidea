"use client"

import { useState } from "react"
import { Building2, FastForward } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <div className={cn("flex items-center space-x-2", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-emerald-500 bg-black border-zinc-700 rounded focus:ring-emerald-500"
      />
      <label className="text-sm text-zinc-300">{label}</label>
    </div>
  )
}

export default function AceleradoresPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [options, setOptions] = useState({
    useAccelerators: false,
    construction: false,
    research: false,
    training: false,
    healing: false,
    pacts: false,
    walls: false,
    traps: false,
    trapRepair: false,
    useNormalForBuildings: false,
    waitForHelps: true,
  })

  const handleChange = (key: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage, nextPage } = getNavigationLinks("aceleradores")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="aceleradores-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
            <h2 className="text-xl font-semibold text-center flex items-center justify-center">
              <FastForward className="mr-2 h-6 w-6" />
              Aceleradores
            </h2>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              <CustomCheckbox
                label="Usar Aceleradores"
                checked={options.useAccelerators}
                onChange={() => handleChange("useAccelerators")}
                className="text-lg font-medium mb-4"
              />

              <div className="space-y-4">
                <CustomCheckbox
                  label="Construção"
                  checked={options.construction}
                  onChange={() => handleChange("construction")}
                />
                <CustomCheckbox label="Pesquisa" checked={options.research} onChange={() => handleChange("research")} />
                <CustomCheckbox
                  label="Treinamento"
                  checked={options.training}
                  onChange={() => handleChange("training")}
                />
                <CustomCheckbox label="Cura" checked={options.healing} onChange={() => handleChange("healing")} />
                <CustomCheckbox label="Pactos" checked={options.pacts} onChange={() => handleChange("pacts")} />
                <CustomCheckbox label="Muralhas" checked={options.walls} onChange={() => handleChange("walls")} />
                <CustomCheckbox label="Armadilhas" checked={options.traps} onChange={() => handleChange("traps")} />
                <CustomCheckbox
                  label="Reparo de Armadilhas"
                  checked={options.trapRepair}
                  onChange={() => handleChange("trapRepair")}
                />
                <CustomCheckbox
                  label="Aceleradores normais apenas para construções"
                  checked={options.useNormalForBuildings}
                  onChange={() => handleChange("useNormalForBuildings")}
                />
                <CustomCheckbox
                  label="Esperar Ajudas Estarem Completas"
                  checked={options.waitForHelps}
                  onChange={() => handleChange("waitForHelps")}
                />
              </div>

              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

