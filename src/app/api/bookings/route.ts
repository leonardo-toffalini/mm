import { neon } from "@neondatabase/serverless";
import { connection } from "next/server";
import { dayParts, endOf, openDays } from "@/data/availability";
import { findGown } from "@/data/gowns";
import { studio } from "@/data/landing";

// One booking per slot: the unique (date, time) key is what stops two people
// taking the same fitting. Created lazily so builds don't need the database.
let ready: Promise<unknown> | undefined;
async function db() {
  const sql = neon(process.env.DATABASE_URL!);
  ready ??= sql`
  CREATE TABLE IF NOT EXISTS bookings (
    id serial PRIMARY KEY,
    date date NOT NULL,
    time text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    occasion text,
    event_date date,
    size text,
    notes text,
    gowns text[] NOT NULL DEFAULT '{}',
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (date, time)
  )`.then(() => sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS ip text`).catch((e) => {
    ready = undefined;
    throw e;
  });
  await ready;
  return sql;
}

// The studio's today, whatever timezone the server runs in.
const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Budapest" });

/** Booked slots from tomorrow on, as "YYYY-MM-DD HH:MM". */
export async function GET() {
  await connection();
  const sql = await db();
  const rows = await sql`SELECT to_char(date, 'YYYY-MM-DD') || ' ' || time AS slot FROM bookings WHERE date > ${today()}`;
  return Response.json(rows.map((r) => r.slot));
}

// A real visitor rarely books more than once a day; this caps slot-hogging and email spam.
const MAX_PER_DAY = 3;

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "invalid" }, { status: 400 });
  // Honeypot filled: pretend it worked so the bot has nothing to adapt to, but save and send nothing.
  if (text(body.website, 200)) return Response.json({ id: 0 }, { status: 201 });

  const date = text(body.date, 10);
  const time = text(body.time, 5);
  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const occasion = text(body.occasion, 40) || null;
  const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(text(body.eventDate, 10)) ? text(body.eventDate, 10) : null;
  const size = text(body.size, 20) || null;
  const notes = text(body.notes, 2000) || null;
  const gowns = Array.isArray(body.gowns) ? [...new Set(body.gowns.filter((g: unknown) => typeof g === "string" && findGown(g)))] as string[] : [];

  const bookable = openDays(today()).some((d) => d.date === date && d.slots.some((s) => s.time === time));
  if (!bookable || !name || !/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: "invalid" }, { status: 400 });

  // Vercel sets x-forwarded-for itself, so the first entry is the real client.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;
  const sql = await db();
  // shortcut: count-then-insert can let a burst of parallel requests slip one or two past the cap; move to an atomic limiter (e.g. Upstash) if that matters.
  const [{ recent }] = await sql`
    SELECT count(*)::int AS recent FROM bookings
    WHERE created_at > now() - interval '1 day' AND (ip = ${ip} OR lower(email) = lower(${email}))`;
  if (recent >= MAX_PER_DAY) return Response.json({ error: "rate_limited" }, { status: 429 });

  const [row] = await sql`
    INSERT INTO bookings (date, time, name, email, occasion, event_date, size, notes, gowns, ip)
    VALUES (${date}, ${time}, ${name}, ${email}, ${occasion}, ${eventDate}, ${size}, ${notes}, ${gowns}, ${ip})
    ON CONFLICT (date, time) DO NOTHING
    RETURNING id`;
  if (!row) return Response.json({ error: "taken" }, { status: 409 });

  // The booking is saved; a failed email is logged, not shown to her as a failed booking.
  const when = `${dayParts(date).long}, ${time}–${endOf(time)}`;
  const gownNames = gowns.map((g) => findGown(g)!.name).join(", ") || "még nincs kiválasztva";
  await Promise.all([
    send(email, "Megvan az időpontod – Magic Moment", [
      `Kedves ${name}!`,
      "",
      `Szeretettel várunk a ruhapróbán: ${when}.`,
      `Cím: ${studio.address}, ${studio.city}`,
      `Ruhák: ${gownNames}`,
      "",
      `Legfeljebb ${studio.guests} főt hozhatsz magaddal. Ha teheted, hozz egy olyan sarkú cipőt, amilyet a nagy napon viselsz majd.`,
      `Ha módosítanál, hívj minket: ${studio.phone}, vagy válaszolj erre a levélre.`,
      "",
      "Magic Moment",
    ]),
    send(process.env.STUDIO_INBOX ?? studio.email, `Új ruhapróba: ${when} – ${name}`, [
      `Időpont: ${when}`,
      `Név: ${name}`,
      `E-mail: ${email}`,
      `Alkalom: ${occasion ?? "–"}`,
      `Az alkalom dátuma: ${eventDate ?? "–"}`,
      `Méret: ${size ?? "–"}`,
      `Ruhák: ${gownNames}`,
      `Megjegyzés: ${notes ?? "–"}`,
    ], email),
  ]).catch((e) => console.error("booking email failed", row.id, e));

  return Response.json({ id: row.id }, { status: 201 });
}

// Plain text only, so nothing she typed can turn into HTML in an inbox.
async function send(to: string, subject: string, lines: string[], replyTo = process.env.STUDIO_INBOX ?? studio.email) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.BOOKING_FROM, to, subject, text: lines.join("\n"), reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
