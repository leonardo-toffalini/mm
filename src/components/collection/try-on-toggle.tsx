"use client";

import { Check, Plus, X } from "lucide-react";
import { findGown } from "@/data/gowns";
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
          ? "Vegyél le egy ruhát a listádról, hogy helyet csinálj neki:"
          : `Legfeljebb ${TRY_ON_LIMIT} ruhát választhatsz a ruhapróbára. A listád ebben a böngészőben megmarad.`}
      </p>
      {/* Right here, because on phones the docked list shows only the count. */}
      {blocked && (
        <ul className="mt-3 flex max-w-md flex-wrap gap-2">
          {list.map((s) => {
            const gownName = findGown(s)?.name ?? s;
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    toggle(s);
                    announce(`${gownName} lekerült a próbalistádról.`);
                  }}
                  aria-label={`${gownName} levétele a próbalistádról`}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full border border-inverse-fg/25 px-4 text-sm text-inverse-fg transition-colors hover:border-inverse-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {gownName}
                  <X aria-hidden size={14} strokeWidth={1.75} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
