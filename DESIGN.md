---
name: Magic Moment
description: Designer bridal gowns to rent, fitted by appointment at a Portland studio.
colors:
  parchment: "#f2ece0"
  sand: "#e6dcc6"
  sand-hover: "#dcd0b6"
  sage-olive: "#8a9a5b"
  olive-ink: "#23261a"
  antique-gold: "#c49a45"
  antique-gold-hover: "#d4ad5c"
  parchment-muted: "#cfc7b2"
  ink-muted: "#57553f"
  ink-soft: "#2b2e1c"
typography:
  display:
    fontFamily: "Fraunces, ui-serif, Georgia, serif"
    fontSize: "6.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100, 'WONK' 1"
  headline:
    fontFamily: "Cormorant Garamond, ui-serif, Georgia, serif"
    fontSize: "3.25rem"
    fontWeight: 500
    lineHeight: 1.05
  title:
    fontFamily: "Cormorant Garamond, ui-serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.33
  lead:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "0.025em"
rounded:
  card: "1.5rem"
  card-inner: "1rem"
  pill: "9999px"
spacing:
  card: "0.5rem"
  gutter: "1.5rem"
  gutter-lg: "2.5rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.antique-gold}"
    textColor: "{colors.olive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.antique-gold-hover}"
  button-primary-lg:
    backgroundColor: "{colors.antique-gold}"
    textColor: "{colors.olive-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px 0 28px"
    height: "56px"
  gown-card:
    backgroundColor: "{colors.olive-ink}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  testimonial-card:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.olive-ink}"
    rounded: "{rounded.card}"
    padding: "2rem"
  header-solid:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.olive-ink}"
---

# Design System: Magic Moment

## Overview

**Creative North Star: "The Heirloom Atelier"**

Magic Moment should feel like stepping into a dressmaker's studio that has been in the family for decades: parchment walls, a brass rail, a soft 1970s serif on the shop sign, and light that has been through a few photographs already. The mood is warm, vintage and intimate. It is a personal appointment, not a store. Nothing hurries the visitor, and every detail is something you would want to touch.

The page is spacious and photographic. Large, graded photographs carry the emotion; type is set big and close; surfaces are flat sheets of paper in two tones, with grain over the photographs rather than shadows under the cards. Gold is precious and rare. It is reserved for the one thing the visitor should do next.

This system must never read as a glossy bridal megastore (white and blush pink, script fonts, sparkle, discount banners), as a generic startup page (icon cards, gradient blobs, metric tiles, sans-serif everything), or as cold luxury minimalism (stark black and white, distant and expensive-feeling).

**Key Characteristics:**
- Parchment, olive ink and sage, with antique gold only on actions.
- Fraunces in its soft, "wonky" cut for display; Cormorant Garamond for headings; Jost for reading.
- Flat, tonal surfaces; depth comes from photographs, shading and film grain.
- Fully rounded "brass" buttons and generously rounded paper cards.
- Slow, exponential motion that reveals content once and then gets out of the way.

## Colors

An earthy, low-chroma palette of paper, olive and sage, lifted by a single antique gold.

### Primary
- **Antique Gold** (antique-gold): the brass of the primary button and nothing else. It marks the action ("Book a fitting", "Choose a time"). Its hover is **Polished Gold** (antique-gold-hover).

### Secondary
- **Sage Olive** (sage-olive): the colour of the hand-drawn brush stroke that runs behind "How it works". It is a mid-tone tint, never used for text, and dark text on it keeps 5:1 contrast.

### Neutral
- **Parchment** (parchment): the page itself, and the text colour on dark sections and photographs.
- **Sand** (sand): cards sitting on the page (gowns, testimonials). Its hover is **Deep Sand** (sand-hover).
- **Olive Ink** (olive-ink): body text on light surfaces (13:1 on parchment), the dark footer and hero ground, and the shade laid over photographs behind text.
- **Ink Muted** (ink-muted): secondary text on parchment and sand (6.4:1 and 5.5:1).
- **Ink Soft** (ink-soft): secondary text on sage (4.5:1).
- **Parchment Muted** (parchment-muted): secondary text on olive ink and shaded photographs (9.1:1).

### Named Rules
**The Brass Only Rule.** Antique gold appears only on primary actions. Never on text, borders, icons, highlights or decoration; its rarity is what makes the button the next step.

**The Two Layer Rule.** Raw colour values live only in the palette; components use role names (page, surface, tint, inverse, accent, and their foreground and muted variants). Re-theming means changing the palette, never a component.

**The Measured Contrast Rule.** Every text role keeps at least 4.5:1 against the surface it sits on. Mark dark areas with `data-tone="dark"` so focus rings switch from olive ink to gold.

## Typography

**Display Font:** Fraunces (with ui-serif, Georgia)
**Headline Font:** Cormorant Garamond 500 (with ui-serif, Georgia)
**Body Font:** Jost (with ui-sans-serif, system-ui)

**Character:** Fraunces with its SOFT and WONK axes switched on gives the wordmark and big headlines a rounded, slightly eccentric 70s warmth; Cormorant brings an old-world, bookish elegance to section headings and names; Jost is a clean geometric sans that stays out of the way for reading and labels.

### Hierarchy
- **Display** (Fraunces 400, 3.25rem on phones, 4.5rem from 640px, 6.5rem from 1024px, line-height 1, -0.02em): the hero headline and the closing call to action (3rem to 4.5rem there). Also the wordmark (1.5rem to 2.25rem, scaled up at the top of the page).
- **Headline** (Cormorant Garamond 500, 2.25rem, 3.25rem from 1024px, line-height 1.1 to 1.05, lining numerals): section headings.
- **Title** (Cormorant Garamond 500, 1.5rem; 1.875rem for the featured gown): gown names, step titles, and testimonial quotes.
- **Lead** (Jost 400, 1.1875rem, line-height 1.6, max 32rem wide): the intro paragraph under a headline.
- **Body** (Jost 400, 1rem, line-height 1.625, max 20rem in step columns): running text.
- **Label** (Jost 500, 0.875rem, 0.025em tracking): buttons and small captions; prices and dates use tabular numerals.

### Named Rules
**The Three Voices Rule.** Fraunces speaks only at display size: the hero, the closing statement, the wordmark. Cormorant names things: sections, gowns, steps, quotes. Jost explains. Never swap their jobs.

**The Close Set Rule.** Display type is set tight (-0.02em, line-height 1) and balanced across lines, with a small negative left indent so its edge lines up optically with the text below.

## Layout

A centred container (max 80rem) with a 1.5rem gutter, widening to 2.5rem from 1024px. Sections breathe: 6rem of vertical padding, 8rem from 1024px. The hero fills the first screen and sits its copy at the bottom left over the photograph. Breakpoints are Tailwind's (640, 768, 1024, 1280px), plus a 375px step that sets the wordmark one size up on all but the narrowest phones.

Grids are content-driven rather than uniform. The gown collection leads with one large featured gown (two columns wide, two rows tall from 1024px) beside four smaller ones in a two-column grid that becomes four columns from 1024px. "How it works" is a single column until 1280px, then three. Testimonials are one column, then three from 768px. Headings sit beside their action (a "See all gowns" text link) on wider screens and stack above it on phones.

The header is fixed and transparent over the hero; once the hero has gone it turns into a solid, slightly blurred parchment bar. On phones its booking button appears only at that point, labelled "Book".

## Elevation & Depth

Flat by default. Depth comes from tonal layering (sand cards on a parchment page), from photographs shaded with olive-ink gradients behind text, and from a faint static film grain over photographic sections. There are no drop shadows on cards or surfaces.

### Shadow Vocabulary
- **Brass bevel** (`box-shadow: inset 0 1px 0 color-mix(in oklab, var(--color-page) 60%, transparent), inset 0 -1px 0 color-mix(in oklab, var(--color-fg) 30%, transparent)`): the only shadow in the system, an inner highlight and lowlight that make the primary button read as polished metal.

### Named Rules
**The Paper Not Plastic Rule.** Surfaces never float. If something needs to stand apart, give it a different paper tone or a photograph, not a shadow.

## Shapes

Soft and generous. Cards have rounded corners (1.5rem); anything nested inside a card uses the outer radius minus the card's padding (1rem inside 0.5rem of padding), so the corners stay concentric. Buttons are full pills. Photographs are clipped to their card's inner radius. The one free form is the sage brush stroke: a single even-width, round-capped line drawn through hand-placed points, which passes behind the cards rather than over them.

## Components

Tactile and precious: like polished brass hardware and fabric swatches. There are few components, each deliberate and satisfying to touch.

### Buttons
- **Shape:** full pill (rounded.pill), 44px tall, or 56px for the large hero and closing buttons.
- **Primary:** antique gold with olive-ink label text and a trailing arrow; the right padding is smaller than the left because the arrow sits optically closer to the edge.
- **Material:** a soft-light gradient (lighter at the top, deeper at the bottom) and the brass bevel make it read as metal.
- **Hover / Focus:** the gold lightens, a shine sweeps across and settles behind the arrow, and a hairline "engraved" inner frame fades in. Focus adds a 2px ring offset by 2px in the focus colour. Pressing scales it to 98%. While a link is navigating, the arrow becomes a spinner.
- **Nudge:** the header button occasionally sends a thin light once around its edge (at 10, 40, 120 and 240 seconds of visible time), and stops for the session once hovered or focused. It is off with reduced motion.
- **Text link:** a medium-weight underlined link with the same trailing arrow, used for secondary actions ("Browse all gowns"). The underline strengthens on hover.

### Cards / Containers
- **Corner Style:** rounded card corners (1.5rem); anything inset uses the inner radius (1rem).
- **Background:** sand on testimonial cards, deepening to deep sand on hover. Gown cards are the photograph itself (see Gown Card).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none.
- **Internal Padding:** 2rem on testimonial cards; 0.75rem to 1.25rem (2rem when featured) around the text on gown cards.

### Navigation
- **Style:** Jost at body size in parchment over the hero, olive ink once the header is solid. Links underline on hover with an 8px offset at 40% opacity.
- **Mobile:** below 768px the section links are hidden; the wordmark and, after the hero, the booking button remain.

### Gown Card (signature)
The photograph is the card: a tall (3:4) photo with rounded corners and film grain, shaded from the bottom with an olive-ink gradient, like the room openers. Over the shade, in parchment, sit the gown's name in Cormorant, a "from" price in tabular numerals, and the silhouette and size range in muted parchment. The shade reaches higher on narrow cards, keyed to the card's own width, so the text stays readable on bright photos. On hover the photo grows slightly. The first gown is featured at double size.

### Brush Stroke (signature)
A sage line drawn as you scroll past "How it works", entering from the left below the steps and leaving off the right edge. On wide screens it loops once beside the heading; below 1280px it runs up the right edge instead.

## Do's and Don'ts

### Do:
- **Do** keep antique gold for primary actions only, one per view where possible.
- **Do** set display type in Fraunces with SOFT 100 and WONK 1, tight (-0.02em, line-height 1) and balanced.
- **Do** use role colours (page, surface, tint, inverse, accent) in components, never palette values.
- **Do** shade photographs with olive-ink gradients wherever text sits on them, and add film grain to photographic sections.
- **Do** keep nested corners concentric: inner radius equals outer radius minus padding.
- **Do** make motion slow and exponential (expo.out), reveal each element once, and show everything immediately with reduced motion.
- **Do** mark dark sections with `data-tone="dark"` so focus rings stay visible.

### Don't:
- **Don't** drift toward a glossy bridal megastore: no white-and-blush pink, script fonts, sparkle or discount banners.
- **Don't** drift toward a generic startup page: no icon-card grids, gradient blobs, metric tiles or all-sans-serif type.
- **Don't** drift toward cold luxury minimalism: no stark black and white, no distant, expensive-feeling emptiness.
- **Don't** put drop shadows on cards or surfaces; the brass bevel is the only shadow.
- **Don't** use gold for text, borders, icons or decoration.
- **Don't** use Fraunces below display size other than the wordmark, or Jost for headings.
