"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Loader2,
  Shield,
  Crosshair,
  Users,
  Trophy,
  Mountain,
  Building2,
  Telescope,
  Swords,
  Crown,
  Anchor,
  Timer,
  Shirt,
  Star,
  Sword,
  Settings,
  Users2,
  Send,
  Gem,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import GenericCard from "@/components/ui/generic-card"

// -- The array of action cards (same order, no changes) --
const actionCards = [
  { id: "escudos", component: GenericCard, label: "Escudos", variant: "success", href: "escudos", icon: Shield },
  { id: "coleta", component: GenericCard, label: "Coleta", variant: "success", href: "coleta", icon: Crosshair },
  { id: "caca", component: GenericCard, label: "Caça", variant: "success", href: "caca", icon: Crosshair },
  {
    id: "familiares",
    component: GenericCard,
    label: "Familiares",
    variant: "success",
    href: "familiares",
    icon: Users,
  },
  { id: "fg", component: GenericCard, label: "FG", variant: "success", href: "fg", icon: Trophy },
  {
    id: "reino-miragem",
    component: GenericCard,
    label: "Reino Miragem",
    variant: "success",
    href: "reino-miragem",
    icon: Mountain,
  },
  {
    id: "construcoes",
    component: GenericCard,
    label: "Construções",
    variant: "success",
    href: "construcoes",
    icon: Building2,
  },
  {
    id: "pesquisa",
    component: GenericCard,
    label: "Pesquisa",
    variant: "success",
    href: "pesquisa",
    icon: Telescope,
  },
  { id: "coliseu", component: GenericCard, label: "Coliseu", variant: "success", href: "coliseu", icon: Swords },
  { id: "ninhos", component: GenericCard, label: "Ninhos", variant: "success", href: "ninhos", icon: Crown },
  {
    id: "trocas-navio",
    component: GenericCard,
    label: "Trocas de Navio",
    variant: "success",
    href: "trocas-navio",
    icon: Anchor,
  },
  {
    id: "trocas-extravagante",
    component: GenericCard,
    label: "Trocas Extravagantes",
    variant: "success",
    href: "trocas-extravagante",
    icon: Gem,
  },
  {
    id: "aceleradores",
    component: GenericCard,
    label: "Aceleradores",
    variant: "success",
    href: "aceleradores",
    icon: Timer,
  },
  { id: "sets", component: GenericCard, label: "Sets", variant: "success", href: "sets", icon: Shirt },
  {
    id: "eventos",
    component: GenericCard,
    label: "Fichas & Estrelas",
    variant: "success",
    href: "eventos",
    icon: Star,
  },
  { id: "herois", component: GenericCard, label: "Heróis", variant: "success", href: "herois", icon: Sword },
  {
    id: "diversos",
    component: GenericCard,
    label: "Diversos",
    variant: "success",
    href: "diversos",
    icon: Settings,
  },
  { id: "tropas", component: GenericCard, label: "Tropas", variant: "success", href: "tropas", icon: Users2 },
  {
    id: "envio-recursos",
    component: GenericCard,
    label: "Envio de Recursos",
    variant: "success",
    href: "envio-recursos",
    icon: Send,
  },
  {
    id: "admin",
    component: GenericCard,
    label: "ADMIN",
    href: "admin",
    variant: "success",
    icon: Settings,
  },
]

const MotionButton = motion(Button)

// -- Example color mapping for variants (optional) --
const variantStyles = {
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  dark: "bg-zinc-700 hover:bg-zinc-800 text-white",
}

export default function CastlePage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("visao-geral")

  const handleNavigation = (href: string) => {
    setActiveTab(href || "visao-geral")
    router.push(`/dashboard/${params.castle}/${href}`)
  }

  return (
    <motion.div
      className="min-h-screen bg-black p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" aria-label="Go back">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-white text-center">{castleName}</h1>
      </div>

      {/* Action Cards Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {actionCards.map((card) => (
          <motion.div
            key={card.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="w-full"
          >
            <Suspense fallback={<LoadingCard label={card.label} />}>
              <card.component
                variant={card.variant as "success" | "danger" | "dark"}
                onClick={() => handleNavigation(card.href)}
                label={card.label}
                Icon={card.icon}
              />
            </Suspense>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// -- Loading fallback card with consistent styling --
const LoadingCard = ({ label }: { label: string }) => (
  <MotionButton
    variant="ghost"
    className="w-full h-24 flex flex-col items-center justify-center gap-2 text-sm bg-zinc-900/50
               hover:bg-zinc-800/50 text-zinc-500 border border-zinc-700 rounded-lg"
    disabled
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={`Loading ${label}`}
  >
    <Loader2 className="h-5 w-5 animate-spin" />
    <span className="text-center">{label}</span>
  </MotionButton>
)

