"use client"

import { useState } from "react"
import { ArrowLeft, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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
  )
}

interface ResearchOption {
  id: string
  label: string
  checked: boolean
}

export default function PesquisaPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [mainResearch, setMainResearch] = useState(true)

  const [options, setOptions] = useState<ResearchOption[]>([
    { id: "economia", label: "Economia", checked: false },
    { id: "defesa", label: "Defesa", checked: false },
    { id: "militar", label: "Militar", checked: false },
    { id: "caca-monstro", label: "Caça e Monstro", checked: false },
    { id: "evoluir-defesa", label: "Evoluir Defesa", checked: false },
    { id: "atualizar-forca", label: "Atualizar Força Militar", checked: true },
    { id: "lideranca", label: "Liderança do Exército", checked: true },
    { id: "comando", label: "Comando Militar", checked: true },
    { id: "familiares", label: "Familiares", checked: true },
    { id: "batalhas-familiar", label: "Batalhas de Familiar", checked: true },
    { id: "selos", label: "Selos", checked: false },
    { id: "batalhas-wonder", label: "Batalhas no Wonder", checked: false },
    { id: "equipamento", label: "Equipamento", checked: false },
    { id: "batalha-wonder-avancada", label: "Batalha Wonder Avançada", checked: false },
    { id: "despertar-magico", label: "Despertar Mágico", checked: true },
  ])

  const toggleOption = (id: string) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, checked: !option.checked } : option)))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="pesquisa-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
                <Link href={`/dashboard/${params.castle}/ninhos`}>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/dashboard/${params.castle}/coliseu`}>
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

          {/* Title Section */}
          <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500">
            <h2 className="text-xl font-semibold text-center">Pesquisas</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 rounded-lg p-6 space-y-6">
              {/* Main Research Checkbox */}
              <div className="border-b border-zinc-800 pb-4">
                <CustomCheckbox
                  checked={mainResearch}
                  onChange={setMainResearch}
                  label="Ativar Pesquisas"
                  className="text-lg font-medium"
                />
              </div>

              {/* Research Options */}
              <div className="space-y-4">
                {options.map((option) => (
                  <CustomCheckbox
                    key={option.id}
                    checked={option.checked}
                    onChange={() => toggleOption(option.id)}
                    label={option.label}
                  />
                ))}
              </div>

              {/* Update Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

