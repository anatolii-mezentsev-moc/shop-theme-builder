# *Jurni Frontend Assignment: Shop Theme Builder*

*Replicate the [shadcn/ui Create](https://ui.shadcn.com/create) experience with a shop theme builder. Reference the shadcn create page for layout, flow, and UX patterns.*

## *What to Build*

*A single-page app with two main areas:*

- **Left side:** Configuration steps (colors, typography, radius, etc.)
- **Right side:** Live preview of a **mini shop website** that updates as the user changes the theme

*The right-side preview should be a small e-commerce store mock (header, product cards, buttons, etc.), not a component showcase like shadcn’s.*

  
*Differences from shadcn/ui Create*


| *shadcn Create*                               | *This Assignment*                            |
| --------------------------------------------- | -------------------------------------------- |
| *Pick style (Default, New York, etc.)*        | **Omit** – no style selection                |
| *Pick component library (Radix UI / Base UI)* | **Omit** – no library selection              |
| *Pick icon library*                           | **Omit** – no icon library selection         |
| *Right side: Component preview*               | Right side: **Mini shop website preview**    |
| *—*                                           | **Bonus:** Shuffle button to randomize theme |


## *Configuration Steps (Left Side)*

*Include steps for:*

1. **Base color** – e.g. Neutral, Slate, Gray, Zinc, Stone
2. *Theme – Color theme*
3. **Font** – All Google fonts, e.g. Inter, Geist
4. **Radius** – e.g. None, Small, Medium, Large
5. **Menu color** and **Menu accent** (optional)

*Order and grouping can follow shadcn create. Do not add style, library, or icon library steps.*

## *Right Side: Mini Shop Preview*

*Build a compact store mock that reflects the theme:*

- *Header (logo, nav, cart)*
- *Hero or banner*
- *Product grid (2–4 product cards)*
- *Buttons, links, and typography that use the theme*

*All theme changes (colors, fonts, radius, etc.) should update the preview in real time.*

## *Bonus: Shuffle*

*Add a **Shuffle** control that randomizes the theme (colors, radius, font) so users can explore different combinations quickly.*

## *Tech Stack*

- *Next.js (App Router)*
- *React*
- *TypeScript*
- *Tailwind CSS*
- shadcn/ui components

## *Time Frame*

We estimate this assignment takes about 8 hours. We value your time—if you reach the 8-hour mark and aren’t finished, please submit what you have.

## *Git*

*Use Git with meaningful commits throughout your work. We use commit history to understand your process and approach.*

## *Evaluation*

*We will evaluate your submission on:*

- **Implementation** – Code structure, state management, API usage, and how well theme changes propagate to the preview
- **Design** – Visual hierarchy, layout, and polish of both the configuration UI and the shop preview
- **UX** – Flow of the configuration steps, responsiveness of the live preview, and clarity of controls
- **Completeness** – All configuration steps working and reflected in the preview

