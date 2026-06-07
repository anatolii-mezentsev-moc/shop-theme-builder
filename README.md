# Jurni Assignment: Shop Theme Builder

Replicate the [shadcn/ui Create](https://ui.shadcn.com/create) experience — but for a shop theme builder.

Use that page as your reference for layout, flow, and UX patterns.

---

## What to Build

A single-page app with two main areas:

- **Left side:** Configuration steps (colors, typography, radius, etc.)

- **Right side:** Live preview of a mini shop website that updates in real time as the user changes the theme

The right-side preview should look like a real e-commerce store — polished, professional, and production-ready. We use this to evaluate design skills, so aim high.

---

## Configuration Steps (Left Side)

1. **Base color** — e.g. Neutral, Slate, Gray, Zinc, Stone

2. **Theme color** — e.g. Amber, Blue, Cyan, Rose

3. **Heading Font** — Populate the dropdown with all Google fonts via the [Google Fonts API](https://developers.google.com/fonts/docs/css2). Each option should render a preview in its own font family so users can see how it looks before selecting.

4. **Body Font** - Same as above

5. **Radius** — None, Small, Medium, Large

6. **Menu color** and **Menu accent**

Do not add style, library, or icon library steps (unlike shadcn/ui Create).

---

## Right Side: Shop Preview

Build something that looks like a real online store:

- Header (logo, nav, cart icon)

- Hero or banner

- Featured Product section

- Product grid (2–4 product cards)

- Buttons, links, and typography that reflect the active theme

etc.

All theme changes must update the preview in real time.

---

## Bonus: Shuffle

Add a **Shuffle** button that randomizes the theme (colors, font, radius) so users can explore combinations quickly.

---

## Shareable Theme URL

Make any theme instantly shareable by a URL, so copying the link and opening it in a new tab restores the exact theme in the builder.

You don't need a database. The goal is clean, well-reasoned client-side state that survives a page load.

---

## Your Feature

Identify **one feature** that would make this product meaningfully more useful to a real user.

Build it, then add a short section to your README:

> **Feature: [Name]**

> What user problem does it solve? Why did you choose this over other ideas? What tradeoffs did you make in the implementation?

We're looking for product instinct here — not just execution. A well-scoped feature with clear reasoning will impress us more than a complex one with no explanation.

---

## Tech Stack

- React

- TypeScript

- Tailwind CSS

- shadcn/ui components

---

## Time Frame

We estimate this assignment takes **4–6 hours**. We value your time — if you reach the limit and aren't finished, submit what you have. Partial submissions are fine; we'd rather see your best work on fewer things than rushed work on everything.

---

## Git

Use Git with meaningful commits throughout. We use commit history to understand your process and approach, not just the final result.

---

## Evaluation

**Implementation** - Code structure, state management, API usage, how theme changes propagate to the preview 

**Design** - Visual hierarchy, layout, and polish — the shop preview should look like a real store

**UX** - Flow of configuration steps, responsiveness of the live preview, clarity of controls

**Full-stack thinking** - How you approached the shareable URL — serialization decisions, edge cases, fallback behavior

**Product thinking** - Quality of your chosen feature, the reasoning behind it, and how well you communicated the tradeoffs

**Completeness** - All configuration steps working and reflected in the preview

---

## Submission

When you're done, share a link to your repository. Include a README section covering:

1. How to run the project locally

2. Your approach to the shareable URL (decisions made, tradeoffs considered)

3. Your chosen feature — what it is, why you built it, and any implementation notes
