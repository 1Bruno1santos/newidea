import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CastlePageNavigationProps {
  castle: string
  prevPage?: string | null
  nextPage?: string | null
}

export function CastlePageNavigation({ castle, prevPage, nextPage }: CastlePageNavigationProps) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`/dashboard/${castle}`}>
        <Button variant="ghost" className="text-zinc-400 hover:text-white">
          Menu
        </Button>
      </Link>
      <div className="flex justify-center gap-2">
        {prevPage && (
          <Link href={`/dashboard/${castle}/${prevPage}`}>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        {nextPage && (
          <Link href={`/dashboard/${castle}/${nextPage}`}>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

