// Mock availability until a booking backend exists: fittings run Tuesday to
// Saturday, four 90-minute slots a day, and some are shown as already taken.
export const SLOT_TIMES = ["10:00", "11:45", "13:30", "15:15"];
export const FITTING_MINUTES = 90;

export type Day = { date: string; slots: { time: string; open: boolean }[] };

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The studio's open days (Tue–Sat) for the given number of weeks after `today` (YYYY-MM-DD). */
export function openDays(today: string, weeks = 2): Day[] {
  const start = new Date(`${today}T12:00:00`);
  const days: Day[] = [];
  for (let i = 1; days.length < weeks * 5; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 1) continue; // closed Sunday and Monday
    const date = iso(d);
    days.push({ date, slots: SLOT_TIMES.map((time) => ({ time, open: !taken(date, time) })) });
  }
  return days;
}

// The same slots are always "taken" for a given day, so the calendar doesn't
// shuffle between visits.
function taken(date: string, time: string) {
  let h = 0;
  for (const c of date + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 3 === 0;
}

export const todayISO = () => iso(new Date());

/** "Wed 18 Nov"-style parts for a YYYY-MM-DD date. */
export function dayParts(date: string) {
  const d = new Date(`${date}T12:00:00`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    long: d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }),
  };
}

/** End time of a slot that starts at `time` (HH:MM). */
export function endOf(time: string) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + FITTING_MINUTES;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
