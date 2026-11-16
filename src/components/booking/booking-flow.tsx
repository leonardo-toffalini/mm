"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { dayParts, endOf, openDays, todayISO } from "@/data/availability";
import { findGown, type Gown } from "@/data/gowns";
import { studio } from "@/data/landing";
import { routes } from "@/lib/routes";
import { TRY_ON_LIMIT, useTryOn } from "@/lib/try-on";
import { WeekCalendar, WeekNav, type Slot } from "./week-calendar";

type Step = 1 | 2 | 3 | "done";
type Details = { name: string; email: string; occasion: string; eventDate: string; size: string; notes: string };

const steps = ["Időpont", "Elérhetőség", "Ellenőrzés"];
const occasions = ["Esküvő", "Szalagavató", "Kismama esküvő"];
const emptyDetails: Details = { name: "", email: "", occasion: "", eventDate: "", size: "", notes: "" };

// The optional details as one line for the summary: "Esküvő · június 12., péntek · méret: 38".
const extras = (d: Details) =>
  [d.occasion, d.eventDate && dayParts(d.eventDate).long, d.size && `méret: ${d.size}`].filter(Boolean).join(" · ");

const noop = () => () => {};
// Read in the browser only: dates depend on the visitor's today, and the
// gowns on her ?gowns= link or saved try-on list.
const useToday = () => useSyncExternalStore(noop, todayISO, () => null);
const useGownsParam = () => useSyncExternalStore(noop, () => new URLSearchParams(location.search).get("gowns"), () => null);

/**
 * Booking a fitting in three steps: choose a time, how to reach you, confirm.
 * Her chosen gowns stand on the dark band at the top throughout.
 *
 * Mock: there's no booking backend yet, so confirming only shows the
 * confirmation; nothing is sent or stored.
 */
export function BookingFlow() {
  const today = useToday();
  const days = today ? openDays(today) : null;
  const param = useGownsParam();
  const { list } = useTryOn();
  const gowns = (param ? param.split(",") : list).map(findGown).filter((g) => g !== undefined);

  const [step, setStep] = useState<Step>(1);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [week, setWeek] = useState(0);
  const [details, setDetails] = useState<Details>(emptyDetails);

  // Move focus to the new step's heading, so keyboard and screen-reader users
  // start at the top of it (not on first load).
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) heading.current?.focus();
    moved.current = true;
  }, [step]);

  const done = step === "done";
  const when = slot && `${dayParts(slot.date).long}, ${slot.time}–${endOf(slot.time)}`;

  return (
    <>
      <section data-tone="dark" className="film-grain relative isolate bg-inverse text-inverse-fg">
        <Container className="pt-28 lg:pt-24">
          <div className="grid items-end gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h1 className="-ml-[0.04em] font-display text-[2.75rem] leading-none font-normal tracking-[-0.02em] text-balance sm:text-7xl">
                {done ? "Megvan az időpontod" : "Ruhapróba foglalása"}
              </h1>
              <p className="mt-4 max-w-md text-pretty text-inverse-fg-muted sm:mt-5 sm:text-lead">
                {done
                  ? when
                  : `Ingyenes, ${studio.fittingMinutes} perces ruhapróba, ahová legfeljebb ${studio.guests} főt hozhatsz. A kiválasztott ruhákat előkészítjük.`}
              </p>
            </div>
            <GownRail gowns={gowns} />
          </div>
          <ol className="mt-8 grid grid-cols-3 gap-3 text-sm sm:pb-8 lg:mt-6">
            {steps.map((label, i) => {
              const n = i + 1;
              const state = done || (typeof step === "number" && n < step) ? "done" : step === n ? "current" : "next";
              return (
                <li
                  key={label}
                  aria-current={state === "current" ? "step" : undefined}
                  className={`border-t-2 pt-3 ${state === "next" ? "border-inverse-fg/20 text-inverse-fg-muted" : "border-tint text-inverse-fg"}`}
                >
                  <span className="sr-only sm:not-sr-only">
                    <span className="tabular-nums">{n}</span> · {label}
                  </span>
                  {state === "done" && <span className="sr-only"> (kész)</span>}
                </li>
              );
            })}
          </ol>
          {/* Phones show the bars alone, with the current step named beneath. */}
          <p aria-hidden className="pt-3 pb-6 text-sm sm:hidden">
            {done ? "Lefoglalva" : `${step} · ${steps[(step as number) - 1]}`}
          </p>
        </Container>
      </section>

      <section className="py-10 lg:pt-10 lg:pb-12">
        <Container>
          {/* The calendar spans the page; the form and summary keep a reading width. */}
          <div className={step === 1 ? undefined : "max-w-5xl"}>
            {step === 1 && (
              <StepFrame title="Válassz időpontot" heading={heading} aside={<WeekNav days={days} week={week} onWeek={setWeek} />}>
                <WeekCalendar days={days} week={week} selected={slot} onSelect={setSlot} />
                <Actions>
                  <Button
                    size="lg"
                    aria-disabled={!slot || undefined}
                    onClick={() => slot && setStep(2)}
                    className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  >
                    Tovább
                  </Button>
                  <p className="text-sm text-fg-muted" aria-live="polite">
                    {when ?? "Válassz egy időpontot a folytatáshoz"}
                  </p>
                </Actions>
              </StepFrame>
            )}

            {step === 2 && (
              <ReachYou
                heading={heading}
                details={details}
                onChange={setDetails}
                onBack={() => setStep(1)}
                onContinue={() => setStep(3)}
              />
            )}

            {step === 3 && slot && (
              <StepFrame title="Ellenőrizd a foglalást" heading={heading}>
                <dl className="divide-y divide-fg/10 border-y border-fg/10">
                  <Row label="Időpont" onChange={() => setStep(1)}>
                    {when}
                  </Row>
                  <Row label="Ruhák" onChange={() => (location.href = routes.collection)} changeLabel="Ruhák módosítása">
                    {gowns.length ? gowns.map((g) => g.name).join(", ") : "Még nincs, a próbán segítünk választani"}
                  </Row>
                  <Row label="Adataid" onChange={() => setStep(2)}>
                    {details.name}, {details.email}
                    {extras(details) && <span className="block text-fg-muted">{extras(details)}</span>}
                    {details.notes && <span className="block text-fg-muted">&bdquo;{details.notes}&rdquo;</span>}
                  </Row>
                </dl>
                <Actions>
                  <Button size="lg" onClick={() => setStep("done")}>
                    Lefoglalom
                  </Button>
                  <BackButton onClick={() => setStep(2)} />
                </Actions>
              </StepFrame>
            )}

            {done && slot && (
              <StepFrame title="Szeretettel várunk" heading={heading}>
                <p className="font-serif text-2xl font-medium text-pretty">
                  A szalonban: {studio.address}, {studio.city}
                </p>
                <p className="mt-4 max-w-xl text-lead text-pretty text-fg-muted">
                  A megerősítést elküldjük ide: {details.email}. Legfeljebb {studio.guests} főt hozhatsz magaddal, és ha
                  teheted, hozz egy olyan sarkú cipőt, amilyet a nagy napon viselsz majd.
                </p>
                <Actions>
                  <button
                    type="button"
                    onClick={() => downloadIcs(slot)}
                    className="inline-flex h-14 items-center rounded-full border border-fg/30 px-6 font-medium transition-colors hover:border-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    Hozzáadom a naptáramhoz
                  </button>
                  <TextLink href={routes.collection}>Vissza a kollekcióhoz</TextLink>
                </Actions>
              </StepFrame>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

const railItem = "w-20 shrink-0 sm:w-28 lg:w-40";

// Her chosen gowns, standing on the dark band like the studio's rail, with
// an empty dashed place after them while there's room for another.
function GownRail({ gowns }: { gowns: Gown[] }) {
  return (
    <div className="flex items-end gap-6">
      {!gowns.length && (
        <p className="max-w-xs text-sm text-pretty text-inverse-fg-muted lg:text-right">
          Még nem választottál ruhát? Semmi gond, a próbán segítünk.
        </p>
      )}
      <ul aria-label="A ruháid" className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0">
        {gowns.map((g) => (
          <li key={g.slug} className={railItem}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-card-inner bg-shade">
              <Image src={g.image} alt="" fill sizes="(min-width: 1024px) 160px, 112px" className="object-cover" style={{ objectPosition: g.focus }} />
            </div>
            <p className="mt-2 font-serif text-lg font-medium sm:text-xl">{g.name}</p>
          </li>
        ))}
        {gowns.length < TRY_ON_LIMIT && (
          <li className={railItem}>
            <Link href={routes.collection} className="group block rounded-card-inner focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
              <span className="grid aspect-[3/4] place-items-center rounded-card-inner border-2 border-dashed border-inverse-fg/25 text-inverse-fg-muted transition-colors group-hover:border-inverse-fg/60 group-hover:text-inverse-fg">
                <Plus aria-hidden size={24} strokeWidth={1.5} />
              </span>
              <span className="mt-2 block font-serif text-base font-medium whitespace-nowrap text-inverse-fg-muted transition-colors group-hover:text-inverse-fg sm:text-xl">
                {gowns.length ? "Még egy ruha" : "Válassz ruhát"}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

type FrameProps = { title: string; heading: RefObject<HTMLHeadingElement | null>; aside?: ReactNode; children: ReactNode };

function StepFrame({ title, heading, aside, children }: FrameProps) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <h2 ref={heading} tabIndex={-1} className="font-serif text-title font-medium outline-none lg:text-title-lg">
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-6 sm:mt-8 lg:mt-6">{children}</div>
    </div>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-medium underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
    >
      Vissza
    </button>
  );
}

type RowProps = { label: string; onChange: () => void; changeLabel?: string; children: ReactNode };

function Row({ label, onChange, changeLabel = "Módosítás", children }: RowProps) {
  return (
    <div className="grid gap-1 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:gap-6">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className="text-pretty">{children}</dd>
      <dd>
        <button
          type="button"
          onClick={onChange}
          className="text-sm font-medium underline decoration-current/30 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          {changeLabel}
          <span className="sr-only"> ({label.toLowerCase()})</span>
        </button>
      </dd>
    </div>
  );
}

type ReachProps = {
  heading: FrameProps["heading"];
  details: Details;
  onChange: (details: Details) => void;
  onBack: () => void;
  onContinue: () => void;
};

// Only a name and an email are needed; everything else is an optional extra
// about her and the occasion, folded away so it never feels like a sign-up form.
function ReachYou({ heading, details, onChange, onBack, onContinue }: ReachProps) {
  const [errors, setErrors] = useState<Partial<Record<"name" | "email", string>>>({});
  const set = (key: keyof Details) => (e: { target: { value: string } }) => onChange({ ...details, [key]: e.target.value });
  const hasExtras = Boolean(details.occasion || details.eventDate || details.size || details.notes);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!details.name.trim()) next.name = "Add meg a neved.";
    if (!/^\S+@\S+\.\S+$/.test(details.email.trim())) next.email = "Adj meg egy e-mail-címet, ahová a megerősítést küldhetjük.";
    setErrors(next);
    if (next.name) document.getElementById("name")?.focus();
    else if (next.email) document.getElementById("email")?.focus();
    else onContinue();
  };

  return (
    <StepFrame title="Hogyan érünk el?" heading={heading}>
      <form noValidate onSubmit={submit}>
        <p className="max-w-lg text-pretty text-fg-muted">Csak a neved és az e-mail-címed kell, hogy megerősíthessük a ruhapróbát.</p>
        <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
          <Field id="name" label="Név" error={errors.name}>
            <input id="name" autoComplete="name" value={details.name} onChange={set("name")} className={input} {...errorProps("name", errors.name)} />
          </Field>
          <Field id="email" label="E-mail-cím" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={details.email}
              onChange={set("email")}
              className={input}
              {...errorProps("email", errors.email)}
            />
          </Field>
        </div>

        <details open={hasExtras} className="group mt-10 max-w-2xl border-t border-fg/10 pt-6">
          <summary className="cursor-pointer list-none font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
            <span className="underline decoration-current/30 underline-offset-[6px] group-hover:decoration-current">Mesélj magadról és az alkalomról</span>
            <span className="text-fg-muted"> (nem kötelező)</span>
          </summary>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">Az alkalom</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <label
                    key={o}
                    className="cursor-pointer rounded-full border border-fg/25 px-4 py-2.5 text-sm transition-colors hover:border-fg has-checked:border-fg has-checked:bg-fg has-checked:text-page has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
                  >
                    <input type="radio" name="occasion" value={o} checked={details.occasion === o} onChange={set("occasion")} className="sr-only" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field id="eventDate" label="Az alkalom dátuma">
              <input id="eventDate" type="date" value={details.eventDate} onChange={set("eventDate")} className={input} />
            </Field>
            <Field id="size" label="A szokásos méreted">
              <input id="size" placeholder="pl. 38" value={details.size} onChange={set("size")} className={input} />
            </Field>
            <Field id="notes" label="Bármi más" className="sm:col-span-2">
              <textarea
                id="notes"
                rows={3}
                placeholder="Kedvenc fazonok, a szülés várható ideje, bármi, ami segít"
                value={details.notes}
                onChange={set("notes")}
                className={`${input} h-auto py-3`}
              />
            </Field>
          </div>
        </details>

        <Actions>
          <Button size="lg" type="submit">
            Tovább
          </Button>
          <BackButton onClick={onBack} />
        </Actions>
      </form>
    </StepFrame>
  );
}

const input =
  "h-12 w-full rounded-xl border border-fg/25 bg-page px-4 text-fg transition-colors placeholder:text-fg-muted/70 hover:border-fg/50 focus-visible:border-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-error";

const errorProps = (id: string, error?: string) =>
  error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};

type FieldProps = { id: string; label: string; error?: string; className?: string; children: ReactNode };

function Field({ id, label, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

// Mock booking: offer the fitting as a calendar file so "Hozzáadom a naptáramhoz"
// still works without a backend.
function downloadIcs(slot: Slot) {
  const stamp = (date: string, time: string) => `${date.replaceAll("-", "")}T${time.replace(":", "").padStart(4, "0")}00`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Magic Moment//Fitting//EN",
    "BEGIN:VEVENT",
    `UID:${slot.date}-${slot.time}@magicmoment`,
    `DTSTART:${stamp(slot.date, slot.time)}`,
    `DTEND:${stamp(slot.date, endOf(slot.time))}`,
    "SUMMARY:Ruhapróba – Magic Moment",
    `LOCATION:${studio.address}, ${studio.city}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "magic-moment-ruhaproba.ics" });
  a.click();
  URL.revokeObjectURL(url);
}
