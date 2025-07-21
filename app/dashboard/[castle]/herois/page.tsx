"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn("flex items-center gap-2 w-full text-left", className)}
      >
        <div
          className={cn(
            "w-5 h-5 rounded flex items-center justify-center",
            checked ? "bg-emerald-500" : "border-2 border-zinc-700",
          )}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-zinc-300">{label}</span>
      </button>
      {warning && <div className="text-sm text-zinc-500 pl-7">{warning}</div>}
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
    <button type="button" onClick={onChange} className={cn("flex items-center gap-2 w-full text-left py-1", className)}>
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 border-zinc-700 flex items-center justify-center",
          checked && "border-emerald-500",
        )}
      >
        {checked && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
      </div>
      <span className="text-zinc-300">{label}</span>
    </button>
  )
}

export default function HeroisPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)

  // Main toggle state
  const [enableHeroPhases, setEnableHeroPhases] = useState(true)

  // Bot functions state
  const [botFunctions, setBotFunctions] = useState({
    recruitNewHeroes: false,
    equipAndEvolve: false,
    useExpItems: true,
    evolveHeroClass: true,
    reviveDeadLeader: true,
    useBraveHearts: false,
    attackLimitedChallenges: false,
  })

  // Chapter settings state
  const [chapterType, setChapterType] = useState<"sequential" | "custom">("sequential")
  const [sequentialStageType, setSequentialStageType] = useState("normal")
  const [farmingStageType, setFarmingStageType] = useState("normal")
  const [selectedChapter, setSelectedChapter] = useState("chapter-2")

  const updateBotFunction = (key: keyof typeof botFunctions) => {
    setBotFunctions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="herois-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              <Link href={`/dashboard/${params.castle}`}>
                <Button variant="ghost" className="text-zinc-400 hover:text-white">
                  Menu
                </Button>
              </Link>
              <div className="flex justify-center gap-2">
                <Link href={`/dashboard/${params.castle}/eventos`}>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/dashboard/${params.castle}/diversos`}>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-center">{castleName}</h1>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
              <h2 className="text-xl font-semibold text-center">Heróis</h2>
            </div>
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Main Toggle */}
                <div className="border-b border-zinc-800 pb-4">
                  <CustomCheckbox
                    checked={enableHeroPhases}
                    onChange={() => setEnableHeroPhases(!enableHeroPhases)}
                    label="Ativar Fases do Herói"
                    className="text-lg font-medium"
                  />
                </div>

                {/* Bot Functions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Funções do Bot:</h3>
                  <div className="space-y-4">
                    <CustomCheckbox
                      checked={botFunctions.recruitNewHeroes}
                      onChange={() => updateBotFunction("recruitNewHeroes")}
                      label="Recrutar Novos Heróis"
                    />
                    <CustomCheckbox
                      checked={botFunctions.equipAndEvolve}
                      onChange={() => updateBotFunction("equipAndEvolve")}
                      label="Equipar Heróis/Evoluir Grau"
                    />
                    <CustomCheckbox
                      checked={botFunctions.useExpItems}
                      onChange={() => updateBotFunction("useExpItems")}
                      label="Usar Itens de EXP (comidas dos heróis)"
                    />
                    <CustomCheckbox
                      checked={botFunctions.evolveHeroClass}
                      onChange={() => updateBotFunction("evolveHeroClass")}
                      label="Evoluir Classe dos Heróis"
                    />
                    <CustomCheckbox
                      checked={botFunctions.reviveDeadLeader}
                      onChange={() => updateBotFunction("reviveDeadLeader")}
                      label="Reviver Líder Morto"
                    />
                    <CustomCheckbox
                      checked={botFunctions.useBraveHearts}
                      onChange={() => updateBotFunction("useBraveHearts")}
                      label="Usar Corações Valentes"
                    />
                    <CustomCheckbox
                      checked={botFunctions.attackLimitedChallenges}
                      onChange={() => updateBotFunction("attackLimitedChallenges")}
                      label="Atacar Desafios Limitados (Ex.: Lobo Sombrio)"
                    />
                  </div>
                </div>

                {/* Chapters Section */}
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <h3 className="text-lg font-semibold text-white">Capítulos a lutar:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CustomRadio
                        checked={chapterType === "sequential"}
                        onChange={() => setChapterType("sequential")}
                        label="Estágios de ataque sequencial"
                      />
                      <div className="flex gap-1">
                        <CustomRadio
                          checked={sequentialStageType === "normal"}
                          onChange={() => setSequentialStageType("normal")}
                          label="Normal"
                        />
                        <CustomRadio
                          checked={sequentialStageType === "elite"}
                          onChange={() => setSequentialStageType("elite")}
                          label="Elite"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <CustomRadio
                        checked={chapterType === "custom"}
                        onChange={() => setChapterType("custom")}
                        label="Farmar medalhas"
                      />
                      <div className="flex gap-1">
                        <CustomRadio
                          checked={farmingStageType === "normal"}
                          onChange={() => setFarmingStageType("normal")}
                          label="Normal"
                        />
                        <CustomRadio
                          checked={farmingStageType === "elite"}
                          onChange={() => setFarmingStageType("elite")}
                          label="Elite"
                        />
                      </div>
                      <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                        <SelectTrigger className="w-full max-w-[240px] bg-black/50 border-zinc-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chapter-1">Capítulo 1 (Ataque dos Heróis)</SelectItem>
                          <SelectItem value="chapter-2">Capítulo 2 (Reino dos Anões)</SelectItem>
                          <SelectItem value="chapter-3">Capítulo 3 (Vale Espectral)</SelectItem>
                          <SelectItem value="chapter-4">Capítulo 4 (Duelo com os Orcs)</SelectItem>
                          <SelectItem value="chapter-5">Capítulo 5 (Maldição Negra)</SelectItem>
                          <SelectItem value="chapter-6">Capítulo 6 (Sonhos Partidos)</SelectItem>
                          <SelectItem value="chapter-7">Capítulo 7 (Caminho do Fogo)</SelectItem>
                          <SelectItem value="chapter-8">Capítulo 8 (Prova da Deusa)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Update Button */}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

