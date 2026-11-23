import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Container } from "@/components/ui/container";
import { studio } from "@/data/landing";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató és impresszum – Magic Moment",
  description: "Hogyan kezeljük a ruhapróba foglalásakor megadott adataidat, és ki üzemelteti az oldalt.",
};

// From the company registry (ceginfo.hu, November 2026).
const legal = {
  company: "Magic Moment Esküvői Ruhakölcsönző és Party Service Kft.",
  seat: "1015 Budapest, Batthyány utca 1. 3. em. 1.",
  registration: "Cg. 01-09-463116 (Fővárosi Törvényszék Cégbírósága)",
  taxNumber: "12064957-1-41",
  retention: "a ruhapróba után egy évig",
};

const updated = "2026. november 23.";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader intro={false} solid />
      <main id="main">
        <Container className="pt-32 pb-24">
          <div className="max-w-2xl leading-relaxed text-pretty">
            <h1 className="-ml-[0.04em] font-display text-[2.75rem] leading-none font-normal tracking-[-0.02em] text-balance sm:text-6xl">
              Adatvédelmi tájékoztató
            </h1>
            <p className="mt-4 text-fg-muted">Hatályos: {updated}</p>

            <Section title="Ki kezeli az adataidat?">
              <p>
                {legal.company} ({legal.seat}), a Magic Moment szalon üzemeltetője. Kérdéseiddel írj nekünk:{" "}
                <Mail />, vagy hívj: {studio.phone}.
              </p>
            </Section>

            <Section title="Milyen adatokat kérünk, és miért?">
              <p>Amikor ruhapróbát foglalsz, ezeket az adatokat kezeljük:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Név, e-mail-cím, a választott időpont és ruhák:</strong> hogy lefoglaljuk neked az időpontot, és
                  megerősítést küldjünk. Jogalap: a szerződéskötést megelőző lépések (GDPR 6. cikk (1) b) pont).
                </li>
                <li>
                  <strong>Az alkalom, a dátuma, a méreted és a megjegyzésed (nem kötelező):</strong> hogy a megfelelő
                  ruhákkal készüljünk. Ha a megjegyzésben egészségi adatot is megadsz (például várandósságot), azt a
                  kifejezett hozzájárulásod alapján kezeljük (GDPR 6. cikk (1) a) pont és 9. cikk (2) a) pont).
                </li>
                <li>
                  <strong>IP-cím:</strong> a foglalási űrlap visszaélés elleni védelméhez (naponta legfeljebb néhány
                  foglalás egy címről). Jogalap: jogos érdek (GDPR 6. cikk (1) f) pont).
                </li>
              </ul>
              <p className="mt-3">
                Hozzájárulásodat bármikor visszavonhatod egy e-mailben; ez nem érinti a visszavonás előtti adatkezelést.
              </p>
            </Section>

            <Section title="Meddig őrizzük?">
              <p>Az adataidat {legal.retention} őrizzük, utána töröljük.</p>
            </Section>

            <Section title="Kik férnek hozzá?">
              <p>Az adataidat nem adjuk el, és nem használjuk hirdetésre. Az oldal működéséhez ezeket a szolgáltatókat (adatfeldolgozókat) használjuk:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Vercel Inc. (USA): az oldal tárhelye és a látogatottsági statisztika.</li>
                <li>Neon Inc. (USA): a foglalások adatbázisa.</li>
                <li>Resend Inc. (USA): a megerősítő e-mailek küldése.</li>
              </ul>
              <p className="mt-3">
                Az Egyesült Államokba történő adattovábbítás az Európai Bizottság által elfogadott általános szerződési
                feltételek, illetve az EU–USA adatvédelmi keretrendszer alapján történik.
              </p>
            </Section>

            <Section title="Sütik és statisztika">
              <p>
                Az oldal nem használ sütiket. A látogatottságot a Vercel Web Analytics méri, sütik nélkül és anonim módon:
                nem azonosít téged, és nem követ más oldalakon.
              </p>
            </Section>

            <Section title="A jogaid">
              <p>
                Kérheted, hogy hozzáférj az adataidhoz, kijavítsuk vagy töröljük őket, korlátozzuk a kezelésüket, vagy
                géppel olvasható formában kiadjuk őket. Tiltakozhatsz a jogos érdeken alapuló adatkezelés ellen. Írj
                nekünk: <Mail />; egy hónapon belül válaszolunk.
              </p>
              <p className="mt-3">
                Panaszoddal fordulhatsz a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest,
                Falk Miksa utca 9–11., <a href="https://naih.hu" className={link}>naih.hu</a>), vagy bírósághoz.
              </p>
            </Section>

            <h2 id="impresszum" className="mt-20 scroll-mt-28 font-display text-4xl font-normal">
              Impresszum
            </h2>
            <dl className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
              <Row label="Üzemeltető">{legal.company}</Row>
              <Row label="Székhely">{legal.seat}</Row>
              <Row label="Cégjegyzékszám">{legal.registration}</Row>
              <Row label="Adószám">{legal.taxNumber}</Row>
              <Row label="Szalon">
                {studio.address}, {studio.city}
              </Row>
              <Row label="Telefon">{studio.phone}</Row>
              <Row label="E-mail">
                <Mail />
              </Row>
              <Row label="Tárhelyszolgáltató">
                Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,{" "}
                <a href="https://vercel.com" className={link}>vercel.com</a>
              </Row>
            </dl>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const link = "underline decoration-current/30 underline-offset-4 hover:decoration-current";

const Mail = () => (
  <a href={`mailto:${studio.email}`} className={link}>
    {studio.email}
  </a>
);

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-normal">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <dt className="font-medium">{label}</dt>
      <dd className="text-fg-muted">{children}</dd>
    </>
  );
}
