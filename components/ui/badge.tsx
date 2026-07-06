import { cn } from "@/lib/utils"
const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-muted-foreground",
  outline: "border border-border text-foreground",
}
export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default"|"secondary"|"outline" }) {
  return <div className={cn("inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
}
