"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

type Tab = "geral" | "monstros" | "herois"

export default function CacaPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("caca")
  const [activeTab, setActiveTab] = useState<Tab>("geral")
  const [huntMode, setHuntMode] = useState("complete-life")
  const [heroSelection, setHeroSelection] = useState("manual")

  const regularMonsters = [
    "Abelha Rainha",
    "Asa Negra",
    "Besta da Neve",
    "Cabana Assustadora",
    "Ceifadora",
    "Espinhorror",
    "Gargântua",
    "Gladiador Serpente",
    "Hardrox",
    "Necrosis (Zumbi)",
    "Presa Afiada",
    "Vodu Shamann",
    "Asa Gelada",
    "Belzebaranha",
    "Bon Appeti",
    "Cavalo de Troia",
    "Coruja",
    "Flipper do Ártico",
    "Gawrilla",
    "Grifo",
    "Mega Larva",
    "Noceronte",
    "Titan das Marés",
    "Vorme de Jade",
  ]

  const eventMonsters = [
    "Abóbora Assassina",
    "Animare",
    "Baú Devorador",
    "Carranca (madeira)",
    "Coelhão",
    "Espinhorror *filho*",
    "Orgulho do Mal (comida)",
    "krabby (minério)",
    "Trapaçeiros (estrelas sagradas)",
    "Alma Blindada",
    "Bandigol",
    "Boldur (pedra)",
    "Cavaleiro Fantasma",
    "Dragão da Fortuna",
    "Goblin (ouro)",
    "Gremlin",
    "Ogro Morto-vivo",
    "Vilaonilista",
  ]

  const heroes = [
    { name: "Arqueira da Morte", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Corvo Negro", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Corvo Noturno", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Lobo Sombrio", rarity: "Comum", color: "text-zinc-400" },
    { name: "Matador de Demônios", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Mestre Cuca", rarity: "Comum", color: "text-zinc-400" },
    { name: "Perseguidora", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Raio Escarlate", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Sombra", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Trapaceiro", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Arauto da Luz", rarity: "Lendário", color: "text-yellow-500" },
    { name: "Cavaleiro de Pegasus", rarity: "Comum", color: "text-zinc-400" },
    { name: "Dragão do Caos", rarity: "Incomum", color: "text-zinc-400" },
    { name: "Mestre Boom", rarity: "��pico", color: "text-purple-500" },
  ]

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <CastlePageNavigation castle={params.castle} prevPage={prevPage} nextPage={nextPage} />
        <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
          <div className="flex items-center justify-center gap-2">
            <Building2 className="h-5 w-5" />
            <h1 className="text-xl font-semibold text-center">{castleName}</h1>
          </div>
        </div>
        <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mt-4 mb-6">
          <h2 className="text-xl font-semibold text-center">Caça</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Quick Jump Navigation */}
        <div className="bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg mb-6">
          <h3 className="text-white font-semibold mb-2">Navegação Rápida</h3>
          <div className="flex gap-2">
            {[
              { id: "geral", label: "Geral" },
              { id: "monstros", label: "Monstros" },
              { id: "herois", label: "Heróis" },
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
        <div className="bg-zinc-900/50 rounded-lg px-4 py-6 sm:p-6">
          <AnimatePresence mode="wait">
            {activeTab === "geral" && (
              <motion.div key="geral" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Checkbox label="Caça automática?" defaultChecked className="text-emerald-500" />
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-zinc-400">Gatilho de início de caça (%):</label>
                      <Input type="number" defaultValue={90} className="w-20 bg-black/50 border-zinc-800 text-white" />
                    </div>
                  </div>

                  {/* Hunt Mode */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Modo de Caça</h3>
                    <RadioGroup value={huntMode} onValueChange={setHuntMode} className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="complete-life" id="complete-life" />
                        <label htmlFor="complete-life" className="ml-2 text-zinc-400">
                          Caçar Apenas Monstros com Vida Completa
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="steal" id="steal" />
                        <label htmlFor="steal" className="ml-2 text-zinc-400">
                          Roubar á descarada
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Monster Levels */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Níveis de Monstros para Caçar</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Checkbox key={level} label={`Nível ${level}`} defaultChecked={level === 2} />
                      ))}
                    </div>
                  </div>

                  {/* Other Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Outras Opções</h3>
                    <div className="space-y-2">
                      <Checkbox label="Enviar monstros não finalizados no chat" defaultChecked />
                      <Checkbox label="Usar Habilidade do Presa Afiada (se disponível)" defaultChecked />
                      <Checkbox label="Gastar TODA a Energia da Mochila" />
                      <Checkbox label="Parar de caçar após 1 kill" defaultChecked />
                      <Checkbox label="Usar previsão e bater full" />
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 text-sm">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <p>Algumas opções podem afetar o desempenho do bot ou aumentar o risco de detecção.</p>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
                </div>
              </motion.div>
            )}
            {activeTab === "monstros" && (
              <motion.div key="monstros" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Seleção de Monstros</h3>

                  {/* Regular Monsters */}
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Monstros Regulares</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {regularMonsters.map((monster) => (
                        <Checkbox key={monster} label={monster} defaultChecked />
                      ))}
                    </div>
                  </div>

                  {/* Event Monsters */}
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Monstros de Evento</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {eventMonsters.map((monster) => (
                        <Checkbox key={monster} label={monster} defaultChecked />
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
                </div>
              </motion.div>
            )}
            {activeTab === "herois" && (
              <motion.div key="herois" {...fadeAnimation} transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Configuração de Heróis</h3>

                  {/* Hero Type Selection */}
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Tipo de Herói</h4>
                    <RadioGroup value={heroSelection} onValueChange={setHeroSelection} className="space-y-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="auto" id="auto" />
                        <label htmlFor="auto" className="ml-2 text-zinc-400">
                          Seleção automática (bot decide)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="manual" id="manual" />
                        <label htmlFor="manual" className="ml-2 text-zinc-400">
                          Seleção manual (selecionar abaixo)
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Hero Selection */}
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Heróis para ATK Físico (monstros mágicos) - escolha 5:</h4>
                    <div className="bg-zinc-900/50 p-4 rounded text-sm text-zinc-400 mb-4">
                      Recomendado: Corvo Negro, Matador de Demônios, Perseguidora, Raio Escarlate e Trapaceiro
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {heroes.map((hero) => (
                        <Checkbox
                          key={hero.name}
                          label={hero.name}
                          className={hero.color}
                          defaultChecked={hero.name === "Trapaceiro"}
                        />
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Salvar</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

