import { cn } from "@/lib/utils"

const variants = {
  default: "bg-primary text-primary-foreground hover:brightness-110",
  outline: "border border-border text-muted-foreground hover:bg-card",
  ghost: "text-muted-foreground hover:bg-card",
}

export function Button({ className, variant = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default"|"outline"|"ghost" }) {
  return <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-all disabled:opacity-50 disabled:pointer-events-none", variants[variant], className)} {...props} />
}
