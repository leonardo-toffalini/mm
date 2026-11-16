---
version: 1
slug: "src-app-collection-page-tsx"
primary_target: "src/app/collection/page.tsx"
related_targets: ["src/app/collection/[slug]/page.tsx"]
---

# Collection: /collection and /collection/[slug]

**Mode:** Experience. The gowns lead; the interface recedes.

**Audience and job:** prom seniors, local brides and maternity brides deciding whether the studio is worth a fitting, and arriving at it with gowns in mind. Bridal leads.

**Action:** open a gown for a closer look, then book a fitting.

**Content:** mock gowns in `src/data/gowns.ts` with sourced Unsplash photos; names, prices and sizes are placeholders.

**Constraints:** occasion first; sortable by price, ascending or descending. The gown page shows only name, silhouette, price and sizes for now (the user will iterate on it later).

## Direction contract

THESIS: The collection is the studio walked room by room. Bridal, then Prom, then Maternity each open on one full-bleed photograph with its name set huge, followed by every gown in that room as a sand swatch. Opening a gown steps up to the fitting mirror: one gown, full height, on a dark stage. It refuses the filter-sidebar product grid.

OWN-WORLD: DESIGN.md "The Heirloom Atelier": parchment ground, olive-ink openers and stage with film grain, sand gown cards with concentric corners, Cormorant names, tabular prices, gold only on booking.

STORY: She sees the whole range at a glance, jumps to her room, sorts by price, opens a gown, sees it large with its price and sizes, steps through its neighbours, and books a fitting knowing which gowns she wants to try.

FIRST VIEWPORT: /collection: the Bridal opener fills about three quarters of the screen, the lace photograph shaded from the left; bottom-left a small line of facts (gown count, starting price), "Bridal" in Fraunces at display size, one lead sentence. The fixed header sits transparent over it with the gold Book button. A sticky room bar (Bridal, Prom, Maternity with counts; price sort on the right) begins at the opener's foot, with the first row of bridal cards rising into view. /collection/[slug]: a full-screen olive stage; from 1024px the details stack on the left (name in Fraunces at display size, sized to its column; silhouette; price, sizes and the large gold "Book a fitting") and the gown photo stands on the right at nearly full height, with previous and next arrows beside it that never move between gowns; phones stack photo first; a strip of the room's gowns along the bottom. (Changed from price-right after names overflowed into the photo on mid-width screens.)

FORM: "Three Rooms" (position 2 on my list) for the collection, the user's own merge with "The Fitting Mirror" (position 7) for each gown page. seed:b7c929e5a4e6a49c

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisions after the first critique (made without the user, at their request)

- Try-on list: a "Try this on" toggle on every card and on the gown page; up to five gowns (a fitting covers five), kept in the browser (localStorage, no accounts). A tray docks at the bottom once it has a gown and becomes the booking action (/book?gowns=…); other gold booking buttons hide while it shows.
- The chosen sort lives in the URL (?sort=) and carries through cards, the gown page arrows and strip, and the back link, which returns to the gown's own card.
- The gown page header is solid from the start; the price is smaller; the photo reaches about 77% of the screen height.

## Unresolved

- Real gowns, photos, prices and sizes.
- Whether the gown page gains fabric details, more photos, retail value or similar gowns.
- The landing page still speaks only to brides and names Portland.
