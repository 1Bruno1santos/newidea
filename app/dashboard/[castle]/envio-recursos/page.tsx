"use client"

import { useState } from "react"
import { Building2, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"
import { Label } from "@/components/ui/label"

interface ResourceConfig {
  enabled: boolean
  maxAmount: string
  minAmount: string
}

type ResourceType = "food" | "stone" | "wood" | "ore" | "gold"

interface Resources {
  [key: ResourceType]: ResourceConfig
}

function formatNumber(value: string): string {
  const numbers = value.replace(/\D/g, "")
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function validateResourceAmount(value: string): string {
  const formatted = formatNumber(value)
  const number = Number.parseInt(formatted.replace(/\./g, ""), 10)

  if (number > 999999999) {
    return "999.999.999"
  }

  return formatted
}

export default function EnvioDeRecursos({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("envio-recursos")
  const [target, setTarget] = useState("")
  const [autoSend, setAutoSend] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [resources, setResources] = useState<Resources>({
    food: {
      enabled: false,
      maxAmount: "",
      minAmount: "",
    },
    stone: {
      enabled: false,
      maxAmount: "",
      minAmount: "",
    },
    wood: {
      enabled: false,
      maxAmount: "",
      minAmount: "",
    },
    ore: {
      enabled: false,
      maxAmount: "",
      minAmount: "",
    },
    gold: {
      enabled: false,
      maxAmount: "",
      minAmount: "",
    },
  })

  const updateResource = (resource: ResourceType, field: keyof ResourceConfig, value: string | boolean) => {
    setResources((prev) => {
      const oldConfig = prev[resource]
      if (typeof value === "string") {
        return {
          ...prev,
          [resource]: {
            ...oldConfig,
            [field]: validateResourceAmount(value),
          },
        }
      } else {
        return {
          ...prev,
          [resource]: {
            ...oldConfig,
            [field]: value,
          },
        }
      }
    })
  }

  const isFormValid = (): boolean => {
    if (!target.trim()) return false

    const hasEnabledResource = Object.values(resources).some((config) => config.enabled)
    if (!hasEnabledResource) return false

    for (const [_, config] of Object.entries(resources)) {
      if (config.enabled) {
        if (!config.minAmount || !config.maxAmount) return false
      }
    }

    return true
  }

  const handleSave = async () => {
    if (!isFormValid()) {
      // You might want to add a toast notification here
      return
    }

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Add actual save logic here
    } catch (error) {
      // Handle error
    } finally {
      setIsSaving(false)
    }
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="envio-recursos-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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

          <div className="max-w-md mx-auto space-y-6">
            {/* Title Section */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-center">Envio de Recursos</h2>
            </div>

            {/* Form Content */}
            <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
              <div className="p-4 space-y-4">
                {/* Auto Send Toggle */}
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="autoSend"
                    checked={autoSend}
                    onCheckedChange={(checked) => setAutoSend(checked as boolean)}
                    className="h-5 w-5"
                  />
                  <Label htmlFor="autoSend" className="text-sm font-medium text-zinc-300">
                    Envio Automático
                  </Label>
                </div>

                {/* Target Selection */}
                <div className="space-y-2">
                  <Label htmlFor="targetInput" className="block text-sm font-medium text-zinc-400">
                    Enviar Recursos Para:
                  </Label>
                  <Input
                    id="targetInput"
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-black/50 border-zinc-800 text-white"
                  />
                </div>

                {/* Resources Configuration */}
                <div className="space-y-4">
                  {Object.entries(resources).map(([key, config]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={config.enabled}
                          onCheckedChange={(checked) =>
                            updateResource(key as ResourceType, "enabled", checked as boolean)
                          }
                          className="h-4 w-4"
                        />
                        <span className="text-zinc-300 capitalize text-sm">Enviar {key}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 pl-6">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor={`${key}-min`} className="text-emerald-400 text-xs">
                            Reserva No Castelo
                          </Label>
                          <Input
                            id={`${key}-min`}
                            type="text"
                            value={config.minAmount}
                            onChange={(e) => updateResource(key as ResourceType, "minAmount", e.target.value)}
                            className="bg-black/30 border-zinc-800 text-white text-sm w-full"
                          />
                        </div>
                        <div className="space-y-1 flex-1">
                          <Label htmlFor={`${key}-max`} className="text-blue-400 text-xs">
                            Envio Minimo
                          </Label>
                          <Input
                            id={`${key}-max`}
                            type="text"
                            value={config.maxAmount}
                            onChange={(e) => updateResource(key as ResourceType, "maxAmount", e.target.value)}
                            className="bg-black/30 border-zinc-800 text-white text-sm w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-lg text-blue-400 text-sm">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 flex-shrink-0" />
                    <p>Configure os valores mínimos de recursos que devem permanecer no castelo.</p>
                  </div>
                </div>

                {/* Update Button */}
                <Button
                  className={cn(
                    "w-full h-12 text-base font-medium",
                    isFormValid() ? "bg-emerald-500 hover:bg-emerald-600" : "bg-emerald-500/50 cursor-not-allowed",
                  )}
                  onClick={handleSave}
                  disabled={isSaving || !isFormValid()}
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Salvando...
                    </div>
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

