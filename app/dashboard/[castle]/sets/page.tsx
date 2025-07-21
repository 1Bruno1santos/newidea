"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Building2, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

export default function SetsPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const { prevPage, nextPage } = getNavigationLinks("sets")
  const [activeSet, setActiveSet] = useState<string>("wood")
  const [quickSwitchSet, setQuickSwitchSet] = useState("")

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="sets-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
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
            <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mt-4">
              <h2 className="text-xl font-semibold text-center">Sets</h2>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            {" "}
            {/* Adjusted max-width for better mobile layout */}
            <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 space-y-6">
              {/* Set Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Selecione o Set:</h3>
                <RadioGroup value={activeSet} onValueChange={setActiveSet} className="space-y-3">
                  {" "}
                  {/* Increased spacing */}
                  <div className="flex items-center">
                    <RadioGroupItem value="dynamic-food" id="dynamic-food" />
                    <div className="ml-2 text-zinc-400">
                      <div className="text-sm sm:text-base">Set de Comida</div> {/* Responsive font size */}
                      <div className="text-xs sm:text-sm text-zinc-500"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="stone" id="stone" />
                    <label htmlFor="stone" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Pedra
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="wood" id="wood" />
                    <label htmlFor="wood" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Madeira
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="ore" id="ore" />
                    <label htmlFor="ore" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Minério
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="gold" id="gold" />
                    <label htmlFor="gold" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Ouro
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="speed" id="speed" />
                    <label htmlFor="speed" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Velocidade
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="gathering" id="gathering" />
                    <label htmlFor="gathering" className="ml-2 text-zinc-400 text-sm sm:text-base">
                      Set de Coleta
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="quick-switch" id="quick-switch" />
                      <label htmlFor="quick-switch" className="ml-2 text-zinc-400 text-sm sm:text-base">
                        Set de troca rápida
                      </label>
                    </div>
                    <Input
                      type="text"
                      maxLength={10}
                      className="w-full sm:w-32 bg-black/50 border-zinc-800 text-white text-sm"
                      placeholder="Max 10 chars"
                      value={quickSwitchSet}
                      onChange={(e) => setQuickSwitchSet(e.target.value)}
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* Info Box */}
              <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-lg text-blue-400 text-xs sm:text-sm">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 flex-shrink-0" />
                  <p>
                    Obs. Usar sets de caça, não adanta pois a cada ação
                    <br /> o bot troca de set resetando a energia
                  </p>
                </div>
              </div>

              {/* Update Button */}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 sm:py-3 text-sm sm:text-base">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

