# Shop Theme Builder

Single-page theme builder inspired by shadcn/ui Create, adapted for an e-commerce storefront preview.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## How To Run The Project Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:5173
```

4. Optional checks:

```bash
npm run build
npm run lint
```

## Shareable URL Approach

The theme is stored in a single client-side state object and serialized into URL query params. This allows exact theme restoration without a backend.

### Decisions made

1. Compact URL keys are used for readability and shorter links:
   - `b` (baseColor)
   - `t` (themeColor)
   - `h` (headingFont)
   - `f` (bodyFont)
   - `r` (radius)
   - `m` (menuColor)
   - `a` (menuAccent)
2. URL is updated via `history.replaceState` on each theme change.
3. On app load, params are parsed and validated against known option sets.
4. Invalid or missing values fall back to defaults.

### Trade-offs considered

1. `replaceState` avoids polluting browser history, but users cannot step through each edit with Back/Forward.
2. Fonts in URL are user-friendly and explicit, but can make links longer than token IDs.
3. No backend means no shared account-level storage; URL is the primary sharing mechanism.

## Feature: Theme Presets (Save / Load / Rename / Delete)

### What it is

A local preset manager that lets users save successful combinations and reuse them later.

### User problem it solves

While exploring many combinations (especially with Shuffle), users can lose good results. Presets make experimentation safe and repeatable.

### Why this feature was chosen

1. Directly improves the core workflow: explore -> compare -> keep.
2. Complements Shuffle and Share URL naturally.
3. High practical value with manageable implementation complexity.

### Implementation notes

1. Presets are stored in `localStorage`.
2. CRUD operations are implemented:
   - Save current theme with a name
   - Load preset
   - Rename preset
   - Delete preset
3. Presets are sorted by `updatedAt` (latest first).
4. Preset limit is set to `8` to control list size and keep UX clean.

### Trade-offs made

1. `localStorage` is simple and fast, but presets are device/browser local.
2. Native prompt/confirm dialogs are quick to build, but less polished than custom modals.
3. Hard preset limit improves usability, but constrains power users.
