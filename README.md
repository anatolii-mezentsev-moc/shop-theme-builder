# *Jurni Frontend Assignment: Shop Theme Builder*

*Replicate the [shadcn/ui Create](https://ui.shadcn.com/create) experience with a shop theme builder. Reference the shadcn create page for layout, flow, and UX patterns.*

## *What to Build*

*A single-page app with two main areas:*

- **Left side:** Configuration steps (colors, typography, radius, etc.)
- **Right side:** Live preview of a **mini shop website** that updates as the user changes the theme

*The right-side preview should be a polished e-commerce store that looks like a real shop—not a bare-bones mock. We want to evaluate design skills: the preview should feel professional, visually appealing, and production-ready.*

*Differences from shadcn/ui Create*


| *shadcn Create*                               | *This Assignment*                                                                                                                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *Pick style (Default, New York, etc.)*        | **Omit** – no style selection                                                                                                                                                                                                                                                                              |
| *Pick component library (Radix UI / Base UI)* | **Omit** – no library selection                                                                                                                                                                                                                                                                            |
| *Pick icon library*                           | **Omit** – no icon library selection                                                                                                                                                                                                                                                                       |
| *Right side: Component preview*               | Right side: **Polished shop preview** (real-store quality, not a bare mock—design skills matter)                                                                                                                                                                                                           |
| *Font: Limited selection*                     | **Font: All Google fonts** – use the [Google Fonts API](https://developers.google.com/fonts/docs/css2) to populate the dropdown with every available font. Each option in the dropdown should display a **preview rendered in its own font family** so users can see how each font looks before selecting. |
| *—*                                           | **Bonus:** Shuffle button to randomize theme                                                                                                                                                                                                                                                               |


## *Configuration Steps (Left Side)*

*Include steps for:*

1. **Base color** – e.g. Neutral, Slate, Gray, Zinc, Stone
2. *Theme – Color theme - e.g Amber, Blue, Cyan, Rose etc.*
3. **Font** – Unlike shadcn, include **all Google fonts** in the select dropdown. Use the [Google Fonts API](https://developers.google.com/fonts/docs/css2) to fetch the full catalog. Each font option in the dropdown should show a **nice preview** with the font name (or sample text) rendered in that font’s own family so users can see how it looks before selecting.
4. **Radius** – e.g. None, Small, Medium, Large
5. **Menu color** and **Menu accent**

*Order and grouping can follow shadcn create. Do not add style, library, or icon library steps.*

## Right Side: Shop Preview

Build a shop preview that looks **very nice**—like a real e-commerce site, not just a small mock. We use this to assess design skills, so aim for a professional, polished result:

- Header (logo, nav, cart)
- Hero or banner
- Product grid (2–4 product cards)
- Buttons, links, and typography that use the theme
- *Optional ideas:* footer, newsletter signup, product quick-view or hover states, badges/labels, reviews or ratings, breadcrumbs, search bar, category filters

All theme changes (colors, fonts, radius, etc.) should update the preview in real time. The preview should feel like something you’d see on a real online store.

## *Bonus: Shuffle*

*Add a **Shuffle** control that randomizes the theme (colors, radius, font) so users can explore different combinations quickly.*

## *Tech Stack*

- *Next.js (App Router)*
- *React*
- *TypeScript*
- *Tailwind CSS*
- shadcn/ui components

## *Time Frame*

We estimate this assignment takes about 8 hours. We value your time—if you reach the 8-hour mark and aren't finished, please submit what you have.

## *Git*

*Use Git with meaningful commits throughout your work. We use commit history to understand your process and approach.*

## *Evaluation*

*We will evaluate your submission on:*

- **Implementation** – Code structure, state management, API usage, and how well theme changes propagate to the preview
- **Design** – Visual hierarchy, layout, and polish. The shop preview should look like a real, professional store—we use this to evaluate design skills
- **UX** – Flow of the configuration steps, responsiveness of the live preview, and clarity of controls
- **Completeness** – All configuration steps working and reflected in the preview

