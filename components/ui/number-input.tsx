"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>}
        <input
          type="text"
          className={cn(
            "h-10 w-full rounded-md border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-white transition-colors",
            "placeholder:text-zinc-600",
            "focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    )
  },
)
NumberInput.displayName = "NumberInput"

export { NumberInput }

