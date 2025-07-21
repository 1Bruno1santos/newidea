"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Info, ArrowUpDown, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

interface TradeOption {
  id: string
  label: string
  enabled: boolean
  min: string
  max: string
}

export default function TrocasExtravagantePage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("trocas-extravagante")
  const [enableFunctions, setEnableFunctions] = useState(false)
  const [filterMissions, setFilterMissions] = useState(false)
  const [autoSelect, setAutoSelect] = useState(true)
  const [sortColumn, setSortColumn] = useState<"min" | "max" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [checkboxSort, setCheckboxSort] = useState<"asc" | "desc" | null>(null)

  const [tradeOptions, setTradeOptions] = useState<TradeOption[]>([
    { id: "1", label: "Abrir Artefatos", enabled: false, min: "1", max: "2" },
    { id: "2", label: "Aumentar poder (artefatos)", enabled: false, min: "1", max: "2" },
    { id: "3", label: "Aumente o poder total", enabled: false, min: "1", max: "2" },
    { id: "4", label: "Batalhas de Coliseu", enabled: false, min: "1", max: "2" },
    { id: "5", label: "Completar Eventos Infernais", enabled: false, min: "1", max: "2" },
    { id: "6", label: "Completar Missões Admin", enabled: false, min: "1", max: "2" },
    { id: "7", label: "Completar Missões de Guilda", enabled: false, min: "1", max: "2" },
    { id: "8", label: "Comprar pacotes", enabled: false, min: "1", max: "2" },
    { id: "9", label: "Encontrar Gremmlin Gemólogo", enabled: false, min: "1", max: "2" },
    { id: "10", label: "Encontrar Guardião", enabled: false, min: "1", max: "2" },
    { id: "11", label: "Encontrar Guardião (Elite/10x)", enabled: false, min: "1", max: "2" },
    { id: "12", label: "Fazer Pactos", enabled: false, min: "1", max: "2" },
    { id: "13", label: "Forjar Equipamentos", enabled: false, min: "1", max: "2" },
    { id: "14", label: "Forjar Pedras de Habilidade", enabled: false, min: "1", max: "2" },
    { id: "15", label: "Ganhar XP de familiar ", enabled: false, min: "1", max: "2" },
    { id: "16", label: "Gastar Energia ", enabled: false, min: "1", max: "2" },
    { id: "17", label: "Gastar Fichas (Magnatas)", enabled: false, min: "1", max: "2" },
    { id: "18", label: "Gastar HP Estágios de Herói", enabled: false, min: "1", max: "2" },
    { id: "19", label: "Matar monstros nv 4+", enabled: false, min: "1", max: "2" },
    { id: "20", label: "Usar Acelerador de Fusão", enabled: false, min: "1", max: "2" },
    { id: "21", label: "Usar aceleradores", enabled: false, min: "1", max: "2" },
    { id: "22", label: "Treinar Tropas", enabled: false, min: "1", max: "2" },
    { id: "23", label: "Use estrelas Sagradas", enabled: false, min: "1", max: "2" },
    { id: "24", label: "Use Pergaminhos de Estrelas", enabled: false, min: "1", max: "2" },
  ])

  const updateTradeOption = (id: string, field: keyof TradeOption, value: string | boolean) => {
    setTradeOptions((prev) => prev.map((option) => (option.id === id ? { ...option, [field]: value } : option)))
  }

  const handleSort = (column: "checkbox" | "min" | "max") => {
    if (column === "checkbox") {
      const newDirection = checkboxSort === "asc" ? "desc" : "asc"
      setCheckboxSort(newDirection)
      setSortColumn(null)
      setSortDirection("asc")

      setTradeOptions((prev) =>
        [...prev].sort((a, b) => {
          if (a.enabled === b.enabled) return 0
          return (newDirection === "asc" ? 1 : -1) * (a.enabled ? -1 : 1)
        }),
      )
    } else {
      const newDirection = column === sortColumn && sortDirection === "asc" ? "desc" : "asc"
      setSortColumn(column)
      setSortDirection(newDirection)
      setCheckboxSort(null)

      setTradeOptions((prev) =>
        [...prev].sort((a, b) => {
          const aValue = Number.parseInt(column === "min" ? a.min : a.max)
          const bValue = Number.parseInt(column === "min" ? b.min : b.max)
          return (newDirection === "asc" ? 1 : -1) * (aValue - bValue)
        }),
      )
    }
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="trocas-extravagante-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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

          <div className="max-w-[95%] mx-auto">
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
              <h2 className="text-xl font-semibold text-center">Trocas Extravagantes</h2>
            </div>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle>Configurações</CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Main Options */}
                <div className="space-y-4 bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enableFunctions"
                      checked={enableFunctions}
                      onCheckedChange={(checked) => setEnableFunctions(checked as boolean)}
                    />
                    <label htmlFor="enableFunctions" className="text-sm font-medium leading-none text-zinc-300">
                      Activar Trocas Extravagantes
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="filterMissions"
                      checked={filterMissions}
                      onCheckedChange={(checked) => setFilterMissions(checked as boolean)}
                    />
                    <label htmlFor="filterMissions" className="text-sm font-medium leading-none text-zinc-300">
                      Remover Missões (Active as Trocas)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoSelect"
                      checked={autoSelect}
                      onCheckedChange={(checked) => setAutoSelect(checked as boolean)}
                    />
                    <label htmlFor="autoSelect" className="text-sm font-medium leading-none text-zinc-300">
                      Bot troca automaticamente (Tapetes e Botas)
                    </label>
                  </div>
                </div>

                {/* Trade Options */}
                <div className="relative overflow-hidden rounded-lg border border-zinc-800">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-zinc-900/50 border-b border-zinc-800">
                          <th
                            className="w-12 p-3 text-left text-sm font-medium text-zinc-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("checkbox")}
                          >
                            <div className="flex items-center gap-1">
                              <span className="sr-only">Select</span>
                              <ArrowUpDown
                                className={cn("h-4 w-4 transition-transform", checkboxSort === "desc" && "rotate-180")}
                              />
                            </div>
                          </th>
                          <th className="p-3 text-left text-sm font-medium text-zinc-400">Missão</th>
                          <th
                            className="w-24 p-3 text-left text-sm font-medium text-zinc-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("min")}
                          >
                            <div className="flex items-center gap-1">
                              Min. Pontos
                              <ArrowUpDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  sortColumn === "min" && sortDirection === "desc" && "rotate-180",
                                )}
                              />
                            </div>
                          </th>
                          <th
                            className="w-24 p-3 text-left text-sm font-medium text-zinc-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("max")}
                          >
                            <div className="flex items-center gap-1">
                              Max. Pontos
                              <ArrowUpDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  sortColumn === "max" && sortDirection === "desc" && "rotate-180",
                                )}
                              />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {tradeOptions.map((option) => (
                          <tr key={option.id} className="bg-black/20 hover:bg-zinc-800/30 transition-colors">
                            <td className="p-2">
                              <Checkbox
                                checked={option.enabled}
                                onCheckedChange={(checked) =>
                                  updateTradeOption(option.id, "enabled", checked as boolean)
                                }
                                className="mt-1 sm:mt-0"
                              />
                            </td>
                            <td className="p-2">
                              <span className="text-sm text-zinc-300">{option.label}</span>
                            </td>
                            <td className="p-2">
                              <div className="relative w-14">
                                <Input
                                  type="text"
                                  value={option.min}
                                  onChange={(e) => updateTradeOption(option.id, "min", e.target.value)}
                                  className="w-full h-8 bg-black/30 border-zinc-800 text-white text-sm pr-4 px-1"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                  <button
                                    onClick={() => {
                                      const newValue = Number.parseInt(option.min) + 1
                                      updateTradeOption(option.id, "min", newValue.toString())
                                    }}
                                    className="text-zinc-400 hover:text-white focus:outline-none"
                                    type="button"
                                  >
                                    ▲
                                  </button>
                                  <button
                                    onClick={() => {
                                      const newValue = Math.max(0, Number.parseInt(option.min) - 1)
                                      updateTradeOption(option.id, "min", newValue.toString())
                                    }}
                                    className="text-zinc-400 hover:text-white focus:outline-none"
                                    type="button"
                                  >
                                    ▼
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="relative w-14">
                                <Input
                                  type="text"
                                  value={option.max}
                                  onChange={(e) => updateTradeOption(option.id, "max", e.target.value)}
                                  className="w-full h-8 bg-black/30 border-zinc-800 text-white text-sm pr-4 px-1"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                  <button
                                    onClick={() => {
                                      const newValue = Number.parseInt(option.max) + 1
                                      updateTradeOption(option.id, "max", newValue.toString())
                                    }}
                                    className="text-zinc-400 hover:text-white focus:outline-none"
                                    type="button"
                                  >
                                    ▲
                                  </button>
                                  <button
                                    onClick={() => {
                                      const newValue = Math.max(0, Number.parseInt(option.max) - 1)
                                      updateTradeOption(option.id, "max", newValue.toString())
                                    }}
                                    className="text-zinc-400 hover:text-white focus:outline-none"
                                    type="button"
                                  >
                                    ▼
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Update Button */}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-11">Salvar Configurações</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

