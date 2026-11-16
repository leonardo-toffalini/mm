"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { dayParts, type Day } from "@/data/availability";

export type Slot = { date: string; time: string };

/** The open days split into weeks of six (Mon–Sat). */
export const toWeeks = (days: Day[] | null) => (days ? [days.slice(0, 6), days.slice(6, 12)] : []);

/** Hungarian date range: "nov. 18–23." within a month, "nov. 30. – dec. 5." across two. */
export function range(from: string, to: string) {
  const a = dayParts(from);
  const b = dayParts(to);
  return a.month === b.month ? `${a.month} ${a.day}–${b.day}.` : `${a.month} ${a.day}. – ${b.month} ${b.day}.`;
}

type NavProps = { days: Day[] | null; week: number; onWeek: (week: number) => void };

/** The shown week's dates with previous and next week buttons. */
export function WeekNav({ days, week, onWeek }: NavProps) {
  const weeks = toWeeks(days);
  const shown = weeks[week];
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm font-medium tabular-nums" aria-live="polite">
        {shown?.length ? range(shown[0].date, shown[shown.length - 1].date) : ""}
      </p>
      <div className="flex gap-2">
        <WeekButton label="Előző hét" disabled={week === 0} onClick={() => onWeek(week - 1)} direction="prev" />
        <WeekButton label="Következő hét" disabled={week >= weeks.length - 1} onClick={() => onWeek(week + 1)} direction="next" />
      </div>
    </div>
  );
}

type Props = {
  days: Day[] | null; // null until the browser knows today's date
  week: number;
  selected: Slot | null;
  onSelect: (slot: Slot) => void;
};

/** A week of open days (Mon–Sat), each a sand card of its slot times. */
export function WeekCalendar({ days, week, selected, onSelect }: Props) {
  const shown = toWeeks(days)[week];

  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {(shown ?? Array.from({ length: 6 }, () => null)).map((day, i) => (
          <li key={day?.date ?? i} className="rounded-card bg-surface p-4 sm:min-h-52">
            {day ? (
              <fieldset>
                <legend className="w-full">
                  <span className="font-serif text-2xl font-medium">
                    {dayParts(day.date).weekday} {dayParts(day.date).day}
                  </span>
                  <span className="sr-only">, {dayParts(day.date).month}</span>
                </legend>
                {day.slots.some((s) => s.open) ? (
                  <div className="mt-3 flex flex-wrap gap-2 sm:flex-col">
                    {day.slots
                      .filter((s) => s.open)
                      .map((s) => {
                        const on = selected?.date === day.date && selected.time === s.time;
                        return (
                          <button
                            key={s.time}
                            type="button"
                            aria-pressed={on}
                            aria-label={`${dayParts(day.date).long}, ${s.time}`}
                            onClick={() => onSelect({ date: day.date, time: s.time })}
                            className={`h-11 rounded-full border px-4 font-serif text-lg font-medium lining-nums tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${on ? "border-fg bg-fg text-page" : "border-fg/25 hover:border-fg hover:bg-page"}`}
                          >
                            {s.time}
                          </button>
                        );
                      })}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-fg-muted">Minden időpont foglalt</p>
                )}
              </fieldset>
            ) : (
              <div aria-hidden className="h-8 w-20 rounded-full bg-surface-hover" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type WeekButtonProps = { label: string; disabled: boolean; onClick: () => void; direction: "prev" | "next" };

function WeekButton({ label, disabled, onClick, direction }: WeekButtonProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-fg/25 transition-colors hover:border-fg disabled:opacity-35 disabled:hover:border-fg/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <Icon aria-hidden size={18} strokeWidth={1.75} />
    </button>
  );
}
