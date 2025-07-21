"use client"

import { useState } from "react"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

export default function ConstrucoesPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("construcoes")

  const [settings, setSettings] = useState({
    autoBuild: false,
    upgrade: false,
    lowestLevelFirst: false,
    ignoreSpamTarget: true,
  })

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="construcoes-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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

          <div className="max-w-xl mx-auto space-y-6">
            {/* Title Section */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-center">Construções</h2>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              {/* Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="autoBuild"
                    checked={settings.autoBuild}
                    onCheckedChange={() => handleSettingChange("autoBuild")}
                  />
                  <label
                    htmlFor="autoBuild"
                    className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Construção Automática
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="upgrade"
                    checked={settings.upgrade}
                    onCheckedChange={() => handleSettingChange("upgrade")}
                  />
                  <label
                    htmlFor="upgrade"
                    className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Melhorar
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="lowestLevelFirst"
                    checked={settings.lowestLevelFirst}
                    onCheckedChange={() => handleSettingChange("lowestLevelFirst")}
                  />
                  <label
                    htmlFor="lowestLevelFirst"
                    className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Nível Mais Baixo Primeiro
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="ignoreSpamTarget"
                    checked={settings.ignoreSpamTarget}
                    onCheckedChange={() => handleSettingChange("ignoreSpamTarget")}
                  />
                  <label
                    htmlFor="ignoreSpamTarget"
                    className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                  >
                    Ignorar Alvo de Spam
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 sm:py-4 text-sm sm:text-base">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

