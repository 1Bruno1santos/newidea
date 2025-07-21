import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GenericCardProps {
  variant: "success" | "danger" | "dark"
  onClick: () => void
  label: string
  Icon: LucideIcon
}

export default function GenericCard({ variant, onClick, label, Icon }: GenericCardProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-24 flex flex-col items-center justify-center gap-2 p-2 text-sm relative overflow-hidden",
        "transition-colors duration-200 border",
        "after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_1px_0_0_rgba(24,24,27,0.1)]",
        {
          "bg-[#03140F] border-[#0B412D] hover:bg-[#051A16] text-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.1)]":
            variant === "success",
          "bg-[#1A0000] border-[#660000] hover:bg-[#2A0000] text-[#FF004D] shadow-[0_0_10px_rgba(255,0,77,0.1)]":
            variant === "danger",
          "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 text-zinc-400": variant === "dark",
        },
      )}
      onClick={onClick}
    >
      <Icon
        className={cn(
          "h-6 w-6",
          variant === "success" && "drop-shadow-[0_0_3px_rgba(0,255,157,0.3)]",
          variant === "danger" && "drop-shadow-[0_0_3px_rgba(255,0,77,0.3)]",
        )}
      />
      <span
        className={cn(
          "font-medium",
          variant === "success" && "drop-shadow-[0_0_3px_rgba(0,255,157,0.3)]",
          variant === "danger" && "drop-shadow-[0_0_3px_rgba(255,0,77,0.3)]",
        )}
      >
        {label}
      </span>
    </Button>
  )
}

