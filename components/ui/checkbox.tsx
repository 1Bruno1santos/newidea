"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center text-sm text-white">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-emerald-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-primary-foreground",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label className="ml-2 text-sm text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
    </div>
  ),
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

