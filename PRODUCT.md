# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three kinds of customer, all renting a gown for one important day:

- **High school seniors** looking for a prom dress.
- **Local brides** looking for a wedding gown.
- **Maternity brides** who need a wedding gown that works with a pregnancy.

All are local to the studio and visit in person to try gowns on.

## Product Purpose

Magic Moment is a gown rental studio. Customers choose from the collection online, try gowns on at a free private fitting, have their choice tailored to fit, and return it after the event. The site's job is to help a visitor find gowns worth trying on and book a fitting.

## Positioning

A designer gown for an occasion that matters, rented rather than bought, and tailored to the wearer rather than taken off the rack. Alterations and cleaning are included in the rental.

## Operating Context

- Booking is by appointment for an in-person fitting at the studio; guests can come along.
- The rental flow is three visits: fitting, final alterations about two weeks before, then collection shortly before the event and return afterwards.

## Capabilities and Constraints

- Built with Next.js; all content currently lives in `src/data/landing.ts` as mock data until a backend exists.
- Planned routes: the collection (`/collection`), a page per gown (`/collection/[slug]`) and booking (`/book`).
- Undecided: the studio's real city and address, the real gown count, prices, size ranges, fitting length, rental window and guest limit. The figures in the code are placeholders.

## Brand Commitments

- Name: Magic Moment.
- The visual identity in DESIGN.md is approved; copy, images and contact details will be replaced with real ones once the design is settled.

## Evidence on Hand

- Seven Unsplash photos in `src/assets/images/` (five gowns, a veil, a ring); more stock gown photos will be sourced for the mock collection.
- No real reviews, ratings, customer counts or studio details yet. Everything shown is mock data and must stay clearly marked as such in the code; do not present invented figures as verified.

## Product Principles

1. The fitting is the goal: every page leads toward booking one.
2. Fit and price are decided early, so a visitor should always see sizes and prices without digging.
3. Each customer type should find their gowns quickly without wading through the others.
4. Personal and unhurried: it should feel like an appointment, never like a sale.
