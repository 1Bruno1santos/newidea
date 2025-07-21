"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Zap, Target, Gift, Crown, Scroll, Gem, Package, Users, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
      <label
        htmlFor={label}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
      >
        {label}
      </label>
    </div>
  )
}

export default function DiversosPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("diversos")
  const [options, setOptions] = useState({
    // Production Bonuses
    useFoodBonus: true,
    useStoneBonus: true,
    useWoodBonus: true,
    useOreBonus: true,
    useGoldBonus: true,
    useGatheringBonus: true,
    reducedMaintenance: true,

    // Daily Missions
    collectDailyMissions: true,
    sendMissionEmoji: true,
    attackLabyrinth: true,
    playMagnates: true,
    shelterTroops: false,

    // Miscellaneous Missions
    adventureDiary: false,
    dailyLoginBonus: true,
    vipMissions: true,
    territoryMissions: false,
    openMysteryBoxes: true,
    adminMissions: true,
    resetAdminMissions: false,
    guildMissions: true,
    resetGuildMissions: false,

    // Artifacts
    collectArtifacts: true,
    buyArtifacts: false,
    appreciateArtifacts: true,
    weeklyArtifactChallenge: true,

    // Additional Options
    useVipItems: true,
    useExpItems: true,
    openAllBags: false,
    attackCastleTerritories: true,
    returnTroopsForTerritory: false,
    returnWonderCamps: true,
    useBackpackResources: true,
    investGemsInTreasury: true,
    useStarScrolls: false,
    attackFireChallenge: false,

    // Guild Options
    sendHelp: true,
    openGuildGifts: true,
    openFortunePacks: true,
    participateGuildConfrontation: true,
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

  const diversosItems = [
    {
      id: 1,
      title: "Bonus de produção",
      items: [
        { label: "Usar Bônus de Comida", key: "useFoodBonus" },
        { label: "Usar Bônus de Pedra", key: "useStoneBonus" },
        { label: "Usar Bônus de Madeira", key: "useWoodBonus" },
        { label: "Usar Bônus de Minério", key: "useOreBonus" },
        { label: "Usar Bônus de Ouro", key: "useGoldBonus" },
        { label: "Usar Bônus de Coleta", key: "useGatheringBonus" },
        { label: "Manutenção Reduzida", key: "reducedMaintenance" },
      ],
      icon: Zap,
      iconColor: "text-yellow-500",
    },
    {
      id: 2,
      title: "Missões Diárias",
      items: [
        { label: "Coletar Missões Diárias", key: "collectDailyMissions" },
        { label: "Enviar Emoji (missão)", key: "sendMissionEmoji" },
        { label: "Atacar Labirinto (gasta 100 estrelas sagradas/dia)", key: "attackLabyrinth" },
        { label: "Jogar Magnatas (gasta 1 ficha)", key: "playMagnates" },
        { label: "Abrigar Tropas (apenas para missão)", key: "shelterTroops" },
      ],
      icon: Target,
      iconColor: "text-emerald-500",
    },
    {
      id: 3,
      title: "Missões Diversas",
      items: [
        { label: "Diário de Aventura", key: "adventureDiary" },
        { label: "Bônus de Login diário", key: "dailyLoginBonus" },
        { label: "Missões VIP", key: "vipMissions" },
        { label: "Abrir Missões de Território (Cuidado!!)", key: "territoryMissions" },
        { label: "Abrir Caixas Misteriosas", key: "openMysteryBoxes" },
        { label: "Fazer Missões Admin (não usa da bolsa)", key: "adminMissions" },
        { label: "Abrir todas missões Admin", key: "resetAdminMissions" },
        { label: "Fazer Missões da Guilda (não usa da bolsa)", key: "guildMissions" },
        { label: "Abrir todas missões de Guilda", key: "resetGuildMissions" },
      ],
      icon: Gift,
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      title: "Artefatos",
      items: [
        { label: "Coletar Artefatos (Grátis)", key: "collectArtifacts" },
        { label: "Comprar Artefatos (Todos)", key: "buyArtifacts" },
        { label: "Apreciar Artefatos", key: "appreciateArtifacts" },
        { label: "Desafio Semanal de Artefatos", key: "weeklyArtifactChallenge" },
      ],
      icon: Crown,
      iconColor: "text-amber-500",
    },
    {
      id: 5,
      title: "Opções Adicionais",
      items: [
        { label: "Usar Itens de pontos VIP", key: "useVipItems" },
        { label: "Usar Itens de EXP (comidas dos heróis)", key: "useExpItems" },
        { label: "Abrir todos os baús (mochila)", key: "openAllBags" },
        { label: "Usar recursos da mochila", key: "useBackpackResources" },
        { label: "Investir Gemas no Tesouro", key: "investGemsInTreasury" },
        { label: "Usar Pergaminhos de Estrela", key: "useStarScrolls" },
        { label: "Atacar Desafio de Fogo", key: "attackFireChallenge" },
      ],
      icon: Settings,
      iconColor: "text-blue-500",
    },
    {
      id: 6,
      title: "Guilda",
      items: [
        { label: "Enviar Ajudas", key: "sendHelp" },
        { label: "Abrir Presentes da Guilda", key: "openGuildGifts" },
        { label: "Abrir Pacotes da Fortuna", key: "openFortunePacks" },
        { label: "Participar do Confronto de Guildas", key: "participateGuildConfrontation" },
      ],
      icon: Users,
      iconColor: "text-indigo-500",
    },
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div key="diversos-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
            <h2 className="text-xl font-semibold text-center">Diversos</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {diversosItems.map((item) => (
              <div key={item.id} className="bg-zinc-900/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <item.icon className={`mr-2 h-5 w-5 ${item.iconColor}`} />
                  {item.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {item.items.map((checkboxItem) => (
                    <CustomCheckbox
                      key={checkboxItem.key}
                      label={checkboxItem.label}
                      checked={options[checkboxItem.key]}
                      onChange={() => handleChange(checkboxItem.key)}
                    />
                  ))}
                </div>
              </div>
            ))}
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 mt-6">Salvar</Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

