"use client"

import { useState } from "react"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"
import { ArrowLeft, AlertCircle, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Tab = "coletar" | "opcoes"

export default function ColetaPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("coleta")
  const [activeTab, setActiveTab] = useState<Tab>("coletar")
  const [marchCount, setMarchCount] = useState("0")

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="coleta-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
            {/* Title Section */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 text-center mt-4">
              <h2 className="text-xl font-semibold">Coleta</h2>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4">
            {/* Quick Jump Navigation */}
            <div className="bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg mb-6">
              <h3 className="text-white font-semibold mb-2">Navegação Rápida</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: "coletar", label: "Coletar" },
                  { id: "opcoes", label: "Opções" },
                ].map((section) => (
                  <Button
                    key={section.id}
                    variant={activeTab === section.id ? "default" : "outline"}
                    size="sm"
                    className="flex-grow sm:flex-grow-0"
                    onClick={() => setActiveTab(section.id as Tab)}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-zinc-900/50 rounded-lg p-6">
              <AnimatePresence mode="wait">
                {activeTab === "coletar" && (
                  <motion.div key="coletar" {...fadeAnimation} transition={{ duration: 0.3 }}>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <Checkbox label="Activar Coleta?" className="text-blue-400" />
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                          <label className="text-sm text-zinc-400 whitespace-nowrap">
                            Marchas a Coletar (0 = Todos)
                          </label>
                          <Input
                            type="number"
                            value={marchCount}
                            onChange={(e) => setMarchCount(e.target.value)}
                            className="w-full sm:w-20 bg-black/50 border-zinc-800 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Tipo de Coleta</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                          <Checkbox label="Comida" />
                          <Checkbox label="Minério" />
                          <Checkbox label="Pedra" />
                          <Checkbox label="Ouro" />
                          <Checkbox label="Madeira" defaultChecked />
                          <Checkbox label="Gemas" defaultChecked />
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Nivel desejado</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                          <Checkbox label="nível 1" />
                          <Checkbox label="nível 2" />
                          <Checkbox label="nível 3" defaultChecked />
                          <Checkbox label="nível 4" defaultChecked />
                          <Checkbox label="nível 5 (Perigoso!)" className="text-amber-500" />
                          <Checkbox label="nível 6 (Evento)" className="text-red-500" />
                        </div>
                        <div className="bg-blue-950/30 border border-blue-500/20 p-3 sm:p-4 rounded-lg text-blue-400 text-xs sm:text-sm">
                          <div className="flex gap-2">
                            <Info className="h-5 w-5 flex-shrink-0" />
                            <p>
                              Obs.: Em caso de missão de coleta no FG, o bot prioriza
                              <br /> campos de comida mesmo que não selecionados.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === "opcoes" && (
                  <motion.div key="opcoes" {...fadeAnimation} transition={{ duration: 0.3 }}>
                    <div className="space-y-2 sm:space-y-4">
                      <Checkbox label="Coletar Apenas campos finalizáveis (Sem restos)" defaultChecked />
                      <Checkbox label="Usar Set de Coleta" />
                      <Checkbox label="Retornar Acampamentos e tropas no Wonder (Sempre)" />
                      <Checkbox label="Priorizar coleta de nível maior em vez das mais próximas" />
                      <Checkbox label="Coletar gemas de todos os niveis" />
                      <div className="space-y-2 mt-4">
                        <Checkbox label="Voltar coletas quando atacado." defaultChecked className="text-blue-400" />
                        <Checkbox
                          label="Voltar coletas quando sondadas. ( não recomendado )"
                          className="text-red-500"
                        />
                        <Checkbox
                          label="Voltar coletas em caso de conflito de seta."
                          defaultChecked
                          className="text-blue-400"
                        />
                      </div>
                      <div className="space-y-2 mt-4">
                        <label className="block text-sm text-zinc-400">
                          Tempo para coletar novamente quando atacado:
                        </label>
                        <Input
                          type="number"
                          defaultValue={30}
                          className="w-full sm:w-32 bg-black/50 border-zinc-800 text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Update Button */}
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

