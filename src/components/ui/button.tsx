import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { brass, BrassLayers, type Look } from "./brass";

// The same brass button for actions that aren't links (a form's next step).
export function Button({ variant, size, className = "", children, ...props }: ComponentProps<"button"> & Look) {
  return (
    <button className={brass({ variant, size }, className)} {...props}>
      <BrassLayers nudge={false} />
      {children}
      <ArrowRight aria-hidden size={18} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}
