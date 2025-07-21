"use client"

import { useState } from "react"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

type Tab = "security-options" | "prison" | "anti-scouting" | "shelter"

export default function ShieldsPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [activeTab, setActiveTab] = useState<Tab>("security-options")
  const [shieldDuration, setShieldDuration] = useState("24h")
  const [safetyMargin, setSafetyMargin] = useState("4h")
  const [shelterMode, setShelterMode] = useState("attack")

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { nextPage } = getNavigationLinks("escudos")

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <CastlePageNavigation castle={params.castle} nextPage={nextPage} />
        <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
          <div className="flex items-center justify-center gap-2">
            <Building2 className="h-5 w-5" />
            <h1 className="text-xl font-semibold text-center">{castleName}</h1>
          </div>
        </div>
        <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mt-4">
          <h2 className="text-xl font-semibold text-center">Escudos</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Quick Jump Navigation */}
        <div className="bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg mb-6">
          <h3 className="text-white font-semibold mb-2">Navegação Rápida</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: "security-options", label: "Opções de Escudo" },
              { id: "prison", label: "Prisão" },
              { id: "anti-scouting", label: "Anti-sondagem" },
              { id: "shelter", label: "Abrigo" },
            ].map((section) => (
              <Button
                key={section.id}
                variant={activeTab === section.id ? "default" : "outline"}
                size="sm"
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
            {activeTab === "security-options" && (
              <motion.div key="security-options" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="always-shield" />
                      <label htmlFor="always-shield" className="text-white text-sm sm:text-base">
                        Sempre de Escudo?
                      </label>
                    </div>
                    <div className="space-y-1 pl-7">
                      <Checkbox label="Escudar só em caso de Rally" />
                      <p className="text-sm text-zinc-500">( Não se responsabilizamos )</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Shield Duration Column */}
                    <div className="flex flex-col space-y-3 sm:space-y-[1.125rem]">
                      <h4 className="text-white h-8 text-sm sm:text-base">Escudo preferido:</h4>
                      <RadioGroup
                        value={shieldDuration}
                        onValueChange={setShieldDuration}
                        className="space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="24h" id="shield-24h" />
                          <label htmlFor="shield-24h" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            24 horas (Recomendado)
                          </label>
                        </div>
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="3d" id="shield-3d" />
                          <label htmlFor="shield-3d" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            3 dias (A Melhor escolha)
                          </label>
                        </div>
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="7d" id="shield-7d" />
                          <label htmlFor="shield-7d" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            7 dias
                          </label>
                        </div>
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="14d" id="shield-14d" />
                          <label htmlFor="shield-14d" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            14 dias
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Safety Margin Column */}
                    <div className="flex flex-col space-y-3 sm:space-y-[1.125rem]">
                      <h4 className="text-white h-8 text-sm sm:text-base mt-0 sm:mt-0">
                        Margem de Segurança do Escudo:
                      </h4>
                      <RadioGroup
                        value={safetyMargin}
                        onValueChange={setSafetyMargin}
                        className="space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="4h" id="margin-4h" />
                          <label htmlFor="margin-4h" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            4 horas (Recomendado)
                          </label>
                        </div>
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="8h" id="margin-8h" />
                          <label htmlFor="margin-8h" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            8 horas (Otima opção para escudos 3D)
                          </label>
                        </div>
                        <div className="flex items-center h-6">
                          <RadioGroupItem value="12h" id="margin-12h" />
                          <label htmlFor="margin-12h" className="ml-2 text-zinc-400 text-sm sm:text-base">
                            12 horas (Melhor escolha)
                          </label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "prison" && (
              <motion.div key="prison" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white mb-2">Configurações da Prisão:</h4>
                    <div className="space-y-2">
                      <Checkbox label="Executar Automaticamente" />
                      <Checkbox label="Executar apenas prisioneiros de alto valor" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "anti-scouting" && (
              <motion.div key="anti-scouting" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Checkbox label="Sempre usar Anti-Sondagem" />
                    <Checkbox label="Usar maiores anti-sondagem disponíveis primeiro" />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Margem de Segurança para Anti-Sondagem (minutos):</label>
                    <Input type="number" defaultValue={5} className="w-20 bg-black/50 border-zinc-800" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "shelter" && (
              <motion.div key="shelter" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white mb-2">Modo do Abrigo:</h4>
                    <RadioGroup value={shelterMode} onValueChange={setShelterMode} className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="none" id="none" />
                        <label htmlFor="none" className="ml-2 text-zinc-400">
                          Não usar Abrigo
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="always" id="always" />
                        <label htmlFor="always" className="ml-2 text-zinc-400">
                          Sempre Abrigar
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <h4 className="text-white mb-2">O que Proteger no Abrigo?</h4>
                    <RadioGroup value="best" className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="leader" id="leader" />
                        <label htmlFor="leader" className="ml-2 text-zinc-400">
                          Abrigar líder e 1 tropa
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="best" id="best" />
                        <label htmlFor="best" className="ml-2 text-zinc-400">
                          Abrigar líder e melhores tropas
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Checkbox label="Não Abrigar tropas de Cerco" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 sm:h-14 text-base sm:text-lg font-medium mt-4">
          Salvar
        </Button>
      </div>
    </div>
  )
}

