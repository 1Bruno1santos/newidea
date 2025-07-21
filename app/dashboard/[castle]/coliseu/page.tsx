"use client"

import { useState } from "react"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

interface Hero {
  id: string
  name: string
  rarity: string
  type: "physical" | "magical" | "tank"
  checked: boolean
}

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
    <div className={cn("flex items-center space-x-2", className)}>
      <RadioGroupItem value={label} id={label} checked={checked} />
      <Label
        htmlFor={label}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
      >
        {label}
      </Label>
    </div>
  )
}

export default function ColiseuPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [mainEnabled, setMainEnabled] = useState(true)
  const [attackGuildMembers, setAttackGuildMembers] = useState(false)
  const [collectGems, setCollectGems] = useState(true)
  const [buyExtraAttempts, setBuyExtraAttempts] = useState(false)
  const [extraAttemptsCount, setExtraAttemptsCount] = useState("0")
  const [attackMode, setAttackMode] = useState("auto")
  const [selectedHeroesCount, setSelectedHeroesCount] = useState(0)

  const [heroes, setHeroes] = useState<Hero[]>([
    // Physical Heroes
    { id: "1", name: "Arqueira da Morte", rarity: "Lendário", type: "physical", checked: false },
    { id: "2", name: "Corvo Negro", rarity: "Lendário", type: "physical", checked: false },
    { id: "3", name: "Corvo Noturno", rarity: "Lendário", type: "physical", checked: false },
    { id: "4", name: "Lobo Sombrio", rarity: "Comum", type: "physical", checked: false },
    { id: "5", name: "Matador de Demônios", rarity: "Lendário", type: "physical", checked: false },
    { id: "6", name: "Mestre Cuca", rarity: "Comum", type: "physical", checked: false },
    { id: "7", name: "Perseguidora", rarity: "Lendário", type: "physical", checked: false },
    { id: "8", name: "Raio Escarlate", rarity: "Lendário", type: "physical", checked: false },
    { id: "9", name: "Sombra", rarity: "Lendário", type: "physical", checked: false },
    { id: "10", name: "Trapaceiro", rarity: "Lendário", type: "physical", checked: false },

    // Magical Heroes
    { id: "11", name: "Bruxa Boneca", rarity: "Comum", type: "magical", checked: false },
    { id: "12", name: "Bruxa Onírica", rarity: "Comum", type: "magical", checked: false },
    { id: "13", name: "Diabinha", rarity: "Comum", type: "magical", checked: false },
    { id: "14", name: "Dono dos Mares", rarity: "Lendário", type: "magical", checked: false },
    { id: "15", name: "Elementarista", rarity: "Lendário", type: "magical", checked: false },
    { id: "16", name: "Goblin Bombardeiro", rarity: "Lendário", type: "magical", checked: false },
    { id: "17", name: "Incineradora", rarity: "Lendário", type: "magical", checked: false },
    { id: "18", name: "Prima Donna", rarity: "Lendário", type: "magical", checked: false },
    { id: "19", name: "Rainha da Neve", rarity: "Lendário", type: "magical", checked: false },
    { id: "20", name: "Sábio da Tempestade", rarity: "Lendário", type: "magical", checked: false },
    { id: "21", name: "Seguidor das Trevas", rarity: "Comum", type: "magical", checked: false },

    // Tank Heroes
    { id: "22", name: "Arauto da Luz", rarity: "Lendário", type: "tank", checked: false },
    { id: "23", name: "Cavaleira da Rosa", rarity: "Lendário", type: "tank", checked: false },
    { id: "24", name: "Cavaleiro da Morte", rarity: "Lendário", type: "tank", checked: false },
    { id: "25", name: "Cavaleiro de Pegasus", rarity: "Comum", type: "tank", checked: false },
    { id: "26", name: "Dragão do Caos", rarity: "Incomum", type: "tank", checked: false },
    { id: "27", name: "Forjador de Almas", rarity: "Lendário", type: "tank", checked: false },
    { id: "28", name: "Homem de Palavra", rarity: "Lendário", type: "tank", checked: false },
    { id: "29", name: "Mestre Boom", rarity: "Épico", type: "tank", checked: false },
    { id: "30", name: "SteamBot", rarity: "Comum", type: "tank", checked: false },
    { id: "31", name: "Vigilante", rarity: "Lendário", type: "tank", checked: false },
  ])

  const toggleHero = (heroId: string) => {
    setHeroes(
      heroes.map((hero) => {
        if (hero.id === heroId) {
          if (!hero.checked && selectedHeroesCount >= 5) {
            return hero // Don't allow more than 5 selections
          }
          const newChecked = !hero.checked
          setSelectedHeroesCount((prev) => (newChecked ? prev + 1 : prev - 1))
          return { ...hero, checked: newChecked }
        }
        return hero
      }),
    )
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Lendário":
        return "text-yellow-400"
      case "Épico":
        return "text-purple-400"
      case "Incomum":
        return "text-emerald-400"
      default:
        return "text-zinc-400"
    }
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage, nextPage } = getNavigationLinks("coliseu")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="coliseu-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <CastlePageNavigation castle={params.castle} prevPage={prevPage} nextPage={nextPage} />
            <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mb-4">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <h1 className="text-xl font-semibold text-center">{castleName}</h1>
              </div>
            </div>

            {/* Title Section */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500">
              <h2 className="text-xl font-semibold text-center">Coliseu</h2>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              {/* Main Configuration */}
              <div className="space-y-4">
                <CustomCheckbox
                  checked={mainEnabled}
                  onChange={(checked) => setMainEnabled(checked)}
                  label="Atacar no Coliseu"
                  className="text-base font-medium"
                />
                <CustomCheckbox
                  checked={attackGuildMembers}
                  onChange={(checked) => setAttackGuildMembers(checked)}
                  label="Atacar colegas de guilda"
                />
                <CustomCheckbox
                  checked={collectGems}
                  onChange={(checked) => setCollectGems(checked)}
                  label="Coletar Gemas"
                />
                <CustomCheckbox
                  checked={buyExtraAttempts}
                  onChange={(checked) => setBuyExtraAttempts(checked)}
                  label="Comprar tentativas extras (usa gemas)"
                />

                <div className="space-y-2">
                  <Label htmlFor="extraAttemptsCount" className="text-sm text-zinc-400">
                    Comprar Tentativas Extras (x5):
                  </Label>
                  <Input
                    id="extraAttemptsCount"
                    type="number"
                    value={extraAttemptsCount}
                    onChange={(e) => setExtraAttemptsCount(e.target.value)}
                    className="w-full sm:w-32 bg-black/50 border-zinc-800 text-white"
                  />
                </div>
              </div>

              {/* Attack Mode */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Modo de Ataque:</h3>
                <RadioGroup value={attackMode} onValueChange={setAttackMode} className="space-y-2">
                  <CustomRadio
                    checked={attackMode === "auto"}
                    onChange={() => setAttackMode("auto")}
                    label="Seleção automática (bot decide)"
                  />
                  <CustomRadio
                    checked={attackMode === "best"}
                    onChange={() => setAttackMode("best")}
                    label="Melhores Heróis"
                  />
                  <CustomRadio
                    checked={attackMode === "manual"}
                    onChange={() => setAttackMode("manual")}
                    label="Heróis Selecionados (Abaixo)"
                  />
                </RadioGroup>
              </div>

              {/* Heroes Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Heróis de Ataque (seleção manual):</h3>
                {selectedHeroesCount >= 5 && (
                  <p className="text-amber-500 text-sm mb-2">Limite máximo de 5 heróis atingido.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {heroes.map((hero) => (
                    <div key={hero.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={hero.checked}
                        onCheckedChange={() => toggleHero(hero.id)}
                        id={hero.id}
                        disabled={!hero.checked && selectedHeroesCount >= 5}
                      />
                      <Label htmlFor={hero.id} className={cn("text-sm cursor-pointer", getRarityColor(hero.rarity))}>
                        {hero.name}
                      </Label>
                    </div>
                  ))}
                </div>
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

