"use client";

import { Check, Plus } from "lucide-react";
import { announce, TRY_ON_LIMIT, useTryOn } from "@/lib/try-on";

// Adds the gown to (or removes it from) the visitor's try-on list, on the
// dark gown page. When the list is full it stays focusable and says why.
export function TryOnToggle({ slug, name }: { slug: string; name: string }) {
  const { list, has, full, toggle } = useTryOn();
  const on = has(slug);
  const blocked = full && !on;

  const onClick = () => {
    if (blocked) return;
    toggle(slug);
    const count = list.length + (on ? -1 : 1);
    announce(on ? `${name} lekerült a próbalistádról.` : `${name} felkerült a próbalistádra (${count}/${TRY_ON_LIMIT}).`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={on}
        aria-disabled={blocked || undefined}
        aria-describedby={`try-on-note-${slug}`}
        className={`inline-flex h-14 items-center gap-1.5 rounded-full px-6 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
          on
            ? "border border-inverse-fg bg-inverse-fg text-inverse"
            : blocked
              ? "cursor-not-allowed border border-inverse-fg/25 text-inverse-fg/60"
              : "border border-inverse-fg/40 text-inverse-fg hover:border-inverse-fg hover:bg-inverse-fg/10"
        }`}
      >
        {on ? <Check aria-hidden size={16} strokeWidth={1.75} /> : <Plus aria-hidden size={16} strokeWidth={1.75} />}
        {on ? "A próbalistádon" : blocked ? "Megtelt a listád" : "Próbalistára teszem"}
      </button>
      <p id={`try-on-note-${slug}`} className="mt-3 max-w-xs text-sm text-pretty text-inverse-fg-muted">
        {blocked
          ? "Vegyél le egy ruhát a lenti listáról, hogy helyet csinálj neki."
          : `Legfeljebb ${TRY_ON_LIMIT} ruhát választhatsz a ruhapróbára. A listád ebben a böngészőben megmarad.`}
      </p>
    </div>
  );
}
