// Fittings run Monday to Saturday: four 90-minute slots on weekdays (10–18),
// one on Saturday (open 10–13). Which ones are booked comes from /api/bookings.
export const SLOT_TIMES = ["10:00", "11:45", "13:30", "15:15"];
const SATURDAY_TIMES = ["10:00"];
export const FITTING_MINUTES = 90;

export type Day = { date: string; slots: { time: string; open: boolean }[] };

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The studio's open days (Mon–Sat) from tomorrow up to one month after `today` (YYYY-MM-DD); `taken` holds booked "YYYY-MM-DD HH:MM" slots. */
export function openDays(today: string, taken: string[] = []): Day[] {
  const start = new Date(`${today}T12:00:00`);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);
  if (end.getDate() !== start.getDate()) end.setDate(0); // Jan 31 → Feb 28, not Mar 3
  const days: Day[] = [];
  for (let i = 1; ; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d > end) break;
    if (d.getDay() === 0) continue; // closed Sunday
    const date = iso(d);
    const times = d.getDay() === 6 ? SATURDAY_TIMES : SLOT_TIMES;
    days.push({ date, slots: times.map((time) => ({ time, open: !taken.includes(`${date} ${time}`) })) });
  }
  return days;
}

export const todayISO = () => iso(new Date());

/** Hungarian parts for a YYYY-MM-DD date: "Sze", 18, "nov.", "november 18., szerda". */
export function dayParts(date: string) {
  const d = new Date(`${date}T12:00:00`);
  return {
    weekday: d.toLocaleDateString("hu-HU", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("hu-HU", { month: "short" }),
    long: d.toLocaleDateString("hu-HU", { weekday: "long", day: "numeric", month: "long" }),
  };
}

/** End time of a slot that starts at `time` (HH:MM). */
export function endOf(time: string) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + FITTING_MINUTES;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
