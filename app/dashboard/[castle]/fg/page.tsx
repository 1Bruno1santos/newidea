"use client"

import { useState } from "react"
import { ArrowLeft, AlertCircle, Building2, ArrowUpDown, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"
import { useParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
      <Label
        htmlFor={label}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
      >
        {label}
      </Label>
    </div>
  )
}

type Tab = "coletar" | "opcoes"

interface Mission {
  id: string
  name: string
  status: "Sim" | "Não" | "Parcialmente"
  minScore: string
  maxScore: string
  isEnabled: boolean
  type: "success" | "info" | "danger"
  warning?: string
  requiresAssistance?: boolean
}

interface ScoreInputProps {
  value: string
  onChange: (value: string) => void
}

const ScoreInput = ({ value, onChange }: ScoreInputProps) => {
  const handleIncrement = () => {
    const num = Number.parseInt(value)
    if (!isNaN(num)) {
      onChange((num + 1).toString())
    }
  }

  const handleDecrement = () => {
    const num = Number.parseInt(value)
    if (!isNaN(num)) {
      onChange((num - 1).toString())
    }
  }

  return (
    <div className="relative w-full sm:w-20">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black border-zinc-800 text-white text-center pr-6 text-xs sm:text-sm transition-colors hover:border-zinc-700 focus:border-emerald-500"
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
        <button onClick={handleIncrement} className="text-zinc-400 hover:text-white focus:outline-none" type="button">
          ▲
        </button>
        <button onClick={handleDecrement} className="text-zinc-400 hover:text-white focus:outline-none" type="button">
          ▼
        </button>
      </div>
    </div>
  )
}

export default function GuildFestPage() {
  const { castle } = useParams()
  const castleName = decodeURIComponent(castle as string)
  const { prevPage, nextPage } = getNavigationLinks("fg")
  const [emailAlert, setEmailAlert] = useState("")
  const [selectedItem, setSelectedItem] = useState<"pergaminho" | "bau-joias">("bau-joias")

  // Configuration state
  const [config, setConfig] = useState({
    doMissions: true,
    collectRewards: true,
    buyExtraMission: true,
    sendAlerts: true,
    alertOnlyNonAuto: true,
  })

  const updateConfig = (key: keyof typeof config) => {
    setConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const [missions, setMissions] = useState<Mission[]>([
    // Green/Success missions
    {
      id: "1",
      name: "Abrir Caixas Misteriosas",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2",
      name: "Coletar Recursos",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2a",
      name: "Coletar Comida",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2b",
      name: "Coletar Madeira",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2c",
      name: "Coletar Minério",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2d",
      name: "Coletar Ouro",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "2e",
      name: "Coletar Pedra",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "3",
      name: "Completar Missões Admin",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "4",
      name: "Completar Missões de Guilda",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    {
      id: "5",
      name: "Gastar Moedas da Guilda",
      status: "Sim",
      minScore: "190",
      maxScore: "350",
      isEnabled: true,
      type: "success",
    },
    // Blue/Info missions
    {
      id: "6",
      name: "Limpar Coletas Nível 5 (completas)",
      status: "Parcialmente",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "info",
      requiresAssistance: true,
    },
    {
      id: "7",
      name: "Mandar Ajudas para Colegas de Guilda",
      status: "Parcialmente",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "info",
      requiresAssistance: true,
    },
    {
      id: "8",
      name: "Obter Essências das Trevas (19+)",
      status: "Parcialmente",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "info",
      requiresAssistance: true,
    },
    // Red/Danger missions
    {
      id: "9",
      name: "Aprimorar Artefatos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "10",
      name: "Batalhas no Coliseu",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "11",
      name: "Completar Estágios de Herói",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "12",
      name: "Completar Missões VIP",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
      warning: undefined,
    },
    {
      id: "13",
      name: "Derrotar Ninhos das Trevas como Capitão",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "14",
      name: "Encontrar Gremlin no Reino dos Magnatas",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "15",
      name: "Encontrar Guardiões no Labirinto",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "16",
      name: "Encontrar Guardiões no Labirinto Elite",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "17",
      name: "Evoluir Artefatos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "18",
      name: "Executar Prisioneiros",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "19",
      name: "Forjar Equipamentos (Luminoso)",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "20",
      name: "Fundir Pactos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "21",
      name: "Fundir Pedras de Habilidade",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "22",
      name: "Gastar Fichas da Sorte (Reino Magnatas)",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "23",
      name: "Gastar Gemas",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "24",
      name: "Gastar Moedas de Artefato",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "25",
      name: "Obter XP de Familiar",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "26",
      name: "Perder Tropas Nível 4",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "27",
      name: "Pesquisar Tecnologias",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "28",
      name: "Rank Top 10 em Eventos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "29",
      name: "Rank Top 70 em Eventos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "30",
      name: "Subir Posições no Coliseu",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "31",
      name: "Tempo Reduzido usando Aceleradores",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "32",
      name: "Treinar Soldados",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "33",
      name: "Usar Fragmentos",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
    {
      id: "34",
      name: "Use Habilidades de Ataque de Familiares",
      status: "Não",
      minScore: "190",
      maxScore: "350",
      isEnabled: false,
      type: "danger",
    },
  ])

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const toggleMission = (missionId: string) => {
    setMissions(
      missions.map((mission) => (mission.id === missionId ? { ...mission, isEnabled: !mission.isEnabled } : mission)),
    )
  }

  const updateMissionScore = (missionId: string, field: "minScore" | "maxScore", value: string) => {
    setMissions(missions.map((mission) => (mission.id === missionId ? { ...mission, [field]: value } : mission)))
  }

  const [sortColumn, setSortColumn] = useState<"status" | "minScore">("status")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortMissions = (column: "status" | "minScore") => {
    const newDirection = column === sortColumn && sortDirection === "asc" ? "desc" : "asc"
    setSortColumn(column)
    setSortDirection(newDirection)

    setMissions((prevMissions) =>
      [...prevMissions].sort((a, b) => {
        if (column === "status") {
          const statusOrder = { Sim: 0, Parcialmente: 1, Não: 2 }
          return (statusOrder[a.status] - statusOrder[b.status]) * (newDirection === "asc" ? 1 : -1)
        } else {
          return (Number.parseInt(a.minScore) - Number.parseInt(b.minScore)) * (newDirection === "asc" ? 1 : -1)
        }
      }),
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="fg-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <CastlePageNavigation castle={castle as string} prevPage={prevPage} nextPage={nextPage} />
            <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-center">{castleName}</h1>
              </div>
            </div>
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mt-4">
              <h2 className="text-xl font-semibold text-center">Festival de Guildas</h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6 space-y-6">
                {/* Main Configuration */}
                <div className="space-y-4">
                  <div className="space-y-2 sm:space-y-1">
                    <CustomCheckbox
                      checked={config.doMissions}
                      onChange={() => updateConfig("doMissions")}
                      label="Fazer missões do FG"
                    />
                    <CustomCheckbox
                      checked={config.collectRewards}
                      onChange={() => updateConfig("collectRewards")}
                      label="Coletar Recompensas do FG"
                    />
                    <CustomCheckbox
                      checked={config.buyExtraMission}
                      onChange={() => updateConfig("buyExtraMission")}
                      label="Comprar missão extra no FG"
                    />
                  </div>
                </div>

                {/* Mission Alerts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Alertas de Missão:</h3>
                  <div className="space-y-2 sm:space-y-4">
                    <CustomCheckbox
                      checked={config.sendAlerts}
                      onChange={() => updateConfig("sendAlerts")}
                      label="Enviar E-mails de alerta de Missão"
                    />
                    <CustomCheckbox
                      checked={config.alertOnlyNonAuto}
                      onChange={() => updateConfig("alertOnlyNonAuto")}
                      label="Alertar apenas em missões Não-automatizadas"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailAlert" className="block text-sm text-zinc-400">
                      Enviar E-mails de Alertas de Missão para:
                    </Label>
                    <Input
                      id="emailAlert"
                      type="text"
                      value={emailAlert}
                      onChange={(e) => setEmailAlert(e.target.value)}
                      className="w-full bg-black/50 border-zinc-800 text-white"
                    />
                  </div>
                </div>

                {/* Guild Coins Item */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Item para missão de moedas da guilda</h3>
                  <div className="space-y-2">
                    <CustomCheckbox
                      checked={selectedItem === "pergaminho"}
                      onChange={() => setSelectedItem("pergaminho")}
                      label="Pergaminho de migração"
                    />
                    <CustomCheckbox
                      checked={selectedItem === "bau-joias"}
                      onChange={() => setSelectedItem("bau-joias")}
                      label="Baú de Jóias"
                    />
                  </div>

                  <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-lg text-blue-400 text-xs sm:text-sm">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 flex-shrink-0" />
                      <p>Bot pega missoes apenas se tiver itens ou as moedas para pegar os items</p>
                    </div>
                  </div>
                </div>

                {/* Missions Table */}
                <div className="space-y-2 sm:space-y-4">
                  <div className="grid grid-cols-[auto,1fr,auto,auto] gap-2 p-4 bg-zinc-800/50 rounded-lg items-center text-sm sticky top-0 z-10">
                    <div className="text-zinc-400 font-medium pl-2">
                      <span>Pegar</span>
                    </div>
                    <div className="text-zinc-400 font-medium text-left flex-1">
                      <span>Missão</span>
                    </div>
                    <div
                      className="text-zinc-400 font-medium text-center w-20 sm:w-28 flex items-center justify-center gap-1 cursor-pointer"
                      onClick={() => sortMissions("status")}
                    >
                      <span>Automatizada</span>
                      <ArrowUpDown
                        className={cn(
                          "h-4 w-4",
                          sortColumn === "status" &&
                            (sortDirection === "asc" ? "text-emerald-500" : "text-emerald-500 rotate-180"),
                        )}
                      />
                    </div>
                    <div
                      className="text-zinc-400 font-medium text-center w-20 sm:w-28 flex items-center justify-center gap-1 cursor-pointer"
                      onClick={() => sortMissions("minScore")}
                    >
                      <span>Pontos mínimos</span>
                      <ArrowUpDown
                        className={cn(
                          "h-4 w-4",
                          sortColumn === "minScore" &&
                            (sortDirection === "asc" ? "text-emerald-500" : "text-emerald-500 rotate-180"),
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    {missions.map((mission) => (
                      <div
                        key={mission.id}
                        className="grid grid-cols-[auto,1fr,auto,auto] gap-2 p-2 sm:p-4 rounded-lg transition-colors duration-200 hover:bg-zinc-800/70 items-center text-sm"
                      >
                        <CustomCheckbox
                          checked={mission.isEnabled}
                          onChange={() => toggleMission(mission.id)}
                          className="ml-2"
                        />
                        <div className="min-h-[2.5rem] flex items-center text-left">
                          <div className="text-white text-xs sm:text-sm">{mission.name}</div>
                          {mission.warning && (
                            <div className="text-xs sm:text-sm text-white mt-1 sm:mt-2 ml-2">{mission.warning}</div>
                          )}
                          {mission.requiresAssistance && (
                            <div className="text-xs sm:text-sm text-white mt-1 sm:mt-2 ml-2"></div>
                          )}
                        </div>
                        <div className={cn("text-center w-20 sm:w-28 text-white text-xs sm:text-sm")}>
                          {mission.status}
                        </div>
                        <div className="flex justify-center w-20 sm:w-28">
                          <ScoreInput
                            value={mission.minScore}
                            onChange={(value) => updateMissionScore(mission.id, "minScore", value)}
                          />
                        </div>
                      </div>
                    ))}
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

