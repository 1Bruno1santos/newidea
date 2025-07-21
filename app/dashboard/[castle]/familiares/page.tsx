"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Building2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

interface Familiar {
  id: string
  name: string
  stage: string
  level: number
  skills: string[]
  trainLevel: boolean
  evolveSkills: boolean
  useSkill: boolean
  trainSkill: boolean
  breakExtraRunes: boolean
  hoursXP: boolean
  className?: string
}

export default function FamiliaresPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("familiares")
  const [fragmentMin, setFragmentMin] = useState("15")
  const [expandedCards, setExpandedCards] = useState<string[]>([])
  const [familiars, setFamiliars] = useState<Familiar[]>([
    {
      id: "27",
      name: "Anão Domador",
      stage: "Ancião",
      level: 60,
      skills: ["Viagem: Apoio"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "28a",
      name: "Engenheiro",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Minério"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "24",
      name: "Gnomo",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Ouro"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "8",
      name: "Jester",
      stage: "Ancião",
      level: 60,
      skills: ["Armazenamento de Cofre"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "18",
      name: "Lorde da Magma",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Pedra"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "17",
      name: "Raiz de Carvalho",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Madeira"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "19",
      name: "Tempestinho",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Comida"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "10",
      name: "Yeti",
      stage: "Ancião",
      level: 60,
      skills: ["VG: Viagem Direta"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "29",
      name: "Aquífero",
      stage: "Ancião",
      level: 60,
      skills: ["Produção de Anima", "VG Gelo"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "55",
      name: "Boldur (2B)",
      stage: "Ancião",
      level: 60,
      skills: ["Prod. Pedra", "Ajudas Construção"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "13",
      name: "Cabeça Oca (2B)",
      stage: "Ancião",
      level: 60,
      skills: ["Armaz Anima", "Entradas Coliseu"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "54",
      name: "Carranca (2A)",
      stage: "Ancião",
      level: 60,
      skills: ["Prod. Madeira", "Navio extra"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "33",
      name: "Estige (2A)",
      stage: "Ancião",
      level: 60,
      skills: ["Vel. Cura", "Tempo Execução"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "12",
      name: "Feiticeiro (2A)",
      stage: "Ancião",
      level: 60,
      skills: ["Viagem Aliados", "Transmutação Inst."],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "53",
      name: "Gorgulho do Mal (2A)",
      stage: "Ancião",
      level: 60,
      skills: ["Prod. Comida", "4h Prod. Recursos"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "32",
      name: "Harpia (2B)",
      stage: "Ancião",
      level: 60,
      skills: ["Cap. Abrigo", "VIP extra"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "56",
      name: "Krabby (2B)",
      stage: "Ancião",
      level: 60,
      skills: ["Prod. Minério", "EXP"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "30",
      name: "Pedregulho (1A)",
      stage: "Ancião",
      level: 60,
      skills: ["Vel. Fusão", "Fragmentos extras"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
    },
    {
      id: "28b",
      name: "Garoa (2A)",
      stage: "Ancião",
      level: 60,
      skills: ["Def Muralha", "Recup. Energia", "T1 Gratis"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-blue-400",
    },
    {
      id: "52",
      name: "Goblin (3)",
      stage: "Ancião",
      level: 60,
      skills: ["Vel. Coleta", "Prod. de Ouro", "Ouro extra"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-blue-400",
    },
    {
      id: "59",
      name: "Gremlin Carregador (3)",
      stage: "Ancião",
      level: 60,
      skills: ["Vel. Construção", "Coleta Gemas", "Gemas Free"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-blue-400",
    },
    {
      id: "11",
      name: "Magus (3)",
      stage: "Ancião",
      level: 60,
      skills: ["Mais Pactos", "Tempo Altar", "Ajudas Pesquisa"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-blue-400",
    },
    {
      id: "44",
      name: "Noceronte (3)",
      stage: "Ancião",
      level: 60,
      skills: ["Cap. Exército", "ATQ Cavalaria", "Coleta Instantanea"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-blue-400",
    },
    {
      id: "38",
      name: "Besta da Neve (4)",
      stage: "Ancião",
      level: 60,
      skills: ["Velocidade Ninho", "Def Atiradores", "Cap Suprimentos"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-purple-400",
    },
    {
      id: "58",
      name: "Devorador (4)",
      stage: "Ancião",
      level: 60,
      skills: ["Gemas Tesouro", "Fusão Pedras", "Joias Gratis"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-purple-400",
    },
    {
      id: "40",
      name: "Grifo (3)",
      stage: "Ancião",
      level: 60,
      skills: ["Tropas Rally", "Vel. Treino", "Retirar Tropas Inst"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-purple-400",
    },
    {
      id: "41",
      name: "Megalarva (4)",
      stage: "Ancião",
      level: 60,
      skills: ["Capaciade Caserna", "Def Infantaria", "Produção Inimigo"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-purple-400",
    },
    {
      id: "46",
      name: "Presa Afiada (4)",
      stage: "Ancião",
      level: 60,
      skills: ["Viagem Caça", "Def Cavalaria", "Seq Caça"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-purple-400",
    },
    {
      id: "49",
      name: "Abelha Rainha (P2P)",
      stage: "Adulto",
      level: 48,
      skills: ["HP Cav", "ATQ Atiradores", "▲ Ferir Tropas"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "35",
      name: "Asa Gelada (P2P)",
      stage: "Adulto",
      level: 50,
      skills: ["DEF INF", "ATQ EXERCITO", "Viagem Inimigo"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "50",
      name: "Asa Negra (P2P)",
      stage: "Adulto",
      level: 50,
      skills: ["ATQ Exercito", "HP Exercito", "Mata Feridos"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "43",
      name: "Belzebaranha (4)",
      stage: "Ancião",
      level: 60,
      skills: ["HP inf", "Chance Líder Escapar", "T4 Gratis"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "48",
      name: "Bon Appeti (P2P)",
      stage: "Adulto",
      level: 50,
      skills: ["ATQ Inf", "ATQ EXERCITO", "Destrol Recursos"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "51",
      name: "Cavalo de Troia (4)",
      stage: "Ancião",
      level: 60,
      skills: ["HP Cav", "DEF Exercito", "Tam Coalizão"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "45",
      name: "Ceifadora (4)",
      stage: "Ancião",
      level: 60,
      skills: ["Vel Viagem", "HP Atirador", "Mata T5"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "57",
      name: "Coelhão (P2P)",
      stage: "Criança",
      level: 20,
      skills: ["DEF Atir", "HP Exercito", "▲ Líder Escapa 1x"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "36",
      name: "Gargantua (P2P)",
      stage: "Criança",
      level: 20,
      skills: ["DEF Cavalaria", "ATQ Cavalaria", "▲ Tempo Extra Missão FG"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "47",
      name: "Titã das Marés (4)",
      stage: "Ancião",
      level: 60,
      skills: ["HP Inf", "DEF Exercito", "Realoca Inimigo"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
    {
      id: "39",
      name: "Vorme Jade (P2P)",
      stage: "Criança",
      level: 20,
      skills: ["Contra Atq Inf", "Contra Atk Arq", "▲ Contra Atq Cav"],
      trainLevel: true,
      evolveSkills: true,
      useSkill: true,
      trainSkill: true,
      breakExtraRunes: false,
      hoursXP: false,
      className: "text-yellow-400",
    },
  ])

  const handleCheckboxChange = (id: string, field: keyof Familiar) => {
    setFamiliars((prevFamiliars) =>
      prevFamiliars.map((familiar) => (familiar.id === id ? { ...familiar, [field]: !familiar[field] } : familiar)),
    )
  }

  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="familiares-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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

          {/* Title Section */}
          <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
            <h2 className="text-xl font-semibold text-center">Familiares</h2>
          </div>

          <div className="max-w-7xl mx-auto space-y-6">
            {/* Pact Configuration */}
            <Card className="bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-cyan-500">Configuração de Pactos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Checkbox label="Fazer Pactos" defaultChecked className="text-emerald-500" />
                    <Checkbox label="Abrir Pactos" defaultChecked />
                    <Checkbox label="Distribuir Heroís no treino" defaultChecked />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Checkbox label="Pacto 1A" defaultChecked />
                    <Checkbox label="Pacto 2B" defaultChecked />
                    <Checkbox label="Pacto 1B" defaultChecked />
                    <Checkbox label="Pacto 2A" defaultChecked />
                    <Checkbox label="Pacto 3" defaultChecked />
                    <Checkbox label="Pacto 4" defaultChecked />
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <label className="text-sm sm:text-base text-zinc-400">Fragmentos a usar por dia:</label>
                    <Input
                      type="number"
                      value={fragmentMin}
                      onChange={(e) => setFragmentMin(e.target.value)}
                      className="w-full sm:w-32 bg-black/50 border-zinc-800 text-white"
                    />
                  </div>

                  <div className="bg-red-950/30 border border-red-500/20 p-4 rounded-lg text-red-500 text-sm sm:text-base">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <p>Infelizmente o bot não tem opção de fazer pedra de habilidades!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Familiars Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {familiars.map((familiar) => (
                <Card key={familiar.id} className="bg-black/90 border-zinc-800 p-2 sm:p-3">
                  <CardHeader className="p-2 pb-0 sm:p-3 sm:pb-1">
                    <CardTitle
                      className={cn(
                        "text-sm sm:text-base leading-tight flex justify-between items-center",
                        familiar.className || "text-emerald-500",
                      )}
                    >
                      <span>{familiar.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-white p-1 sm:p-2"
                        onClick={() => toggleCardExpansion(familiar.id)}
                      >
                        {expandedCards.includes(familiar.id) ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 sm:p-3 sm:pt-0 space-y-2">
                    <div className="text-zinc-400 text-sm leading-snug">
                      <div>{familiar.stage}</div>
                      <div>Nivel {familiar.level}</div>
                    </div>
                    <AnimatePresence>
                      {expandedCards.includes(familiar.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 pt-2"
                        >
                          <Checkbox
                            label="Treinar Familiar"
                            checked={familiar.trainLevel}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "trainLevel")}
                            className="text-sm text-zinc-300"
                          />
                          <Checkbox
                            label="Evoluir Skills"
                            checked={familiar.evolveSkills}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "evolveSkills")}
                            className="text-sm text-zinc-300"
                          />
                          <Checkbox
                            label="Usar Skills"
                            checked={familiar.useSkill}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "useSkill")}
                            className="text-sm text-zinc-300"
                          />
                          <Checkbox
                            label="Quebrar runas"
                            checked={familiar.breakExtraRunes}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "breakExtraRunes")}
                            className="text-sm text-zinc-300"
                          />
                          <Checkbox
                            label="Treinar Skills"
                            checked={familiar.trainSkill}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "trainSkill")}
                            className="text-sm text-zinc-300"
                          />
                          <Checkbox
                            label="Usar Items Exp."
                            checked={familiar.hoursXP}
                            onCheckedChange={() => handleCheckboxChange(familiar.id, "hoursXP")}
                            className="text-sm text-zinc-300"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

