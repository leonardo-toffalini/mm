---
version: 1
slug: "src-app-book-page-tsx"
primary_target: "src/app/book/page.tsx"
related_targets: []
---

# Book a fitting: /book

**Mode:** Operate (she completes a booking).

**Audience and job:** a bride, prom senior or maternity bride who has decided the studio is worth a visit; she books a free 90-minute fitting, ideally bringing the gowns from her try-on list.

**Content:** her try-on list (from `?gowns=` or the saved list), mock availability Tue–Sat for two weeks, her name and email; occasion, event date, usual size and notes are optional.

**Constraints:** no backend: the flow ends on a mock confirmation and sends nothing (marked in code). The user picked the Three Steps workflow, the colours of "Your Gowns First" and the week calendar of "The Appointment Card", and asked that "About you" stay quiet: personal details beyond name and email are optional extras, never pushed.

## Direction contract

THESIS: Booking is the first visit's doorway, not a form. Her chosen gowns stand on the dark stage at the top like the stylist's rail, already waiting; below, three calm steps on parchment: choose a time, how to reach you, confirm. It refuses the long single form and the pushy multi-field signup.

OWN-WORLD: DESIGN.md "The Heirloom Atelier": olive-ink stage with film grain carrying the gowns and a sage progress line; parchment panel; sand day cards holding slot pills; Cormorant for step titles and times, Fraunces only for the page title and the confirmation; gold only on the step's one forward action.

STORY: She sees her gowns already set aside, picks a day and time from the week, leaves her name and email (adding more only if she wants), checks the summary, and books; the confirmation names the day and lets her add it to her calendar.

FIRST VIEWPORT: Solid header. A dark band: "Book your fitting" in Fraunces at display size on the left with "Free, 90 minutes, up to 3 guests"; her gowns as tall photos with names on the right (or, with none, a quiet line that her stylist will help and a link to the collection); a three-part progress line across the band's foot, step 1 lit in sage. Below on parchment: "Choose a time" in Cormorant, the week's dates with previous/next week, five sand day cards (Tue–Sat) each with its open slot pills, and the gold "Continue" under them.

FORM: "Three Steps" (position 2 on my list), merged by the user with the colours of "Your Gowns First" (position 6) and the calendar of "The Appointment Card" (position 1). seed:7c81d721ef170e5d

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Real availability, booking backend and confirmation email.
- Whether booking should clear the try-on list.
