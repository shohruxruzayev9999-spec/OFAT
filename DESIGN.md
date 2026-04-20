# Design System Document: Cinematic Logistics

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Global Architect."** 

This is not a standard logistics template; it is a high-end editorial experience that treats global distribution as an art form. We are moving away from the "industrial warehouse" aesthetic and toward a "luxury command center" vibe. The design breaks the traditional grid through intentional asymmetry, where large-scale cinematic photography is anchored by precise, technical UI elements. By layering glassmorphism over high-contrast imagery and using expansive white space, we create a sense of "Airborne Precision"—a feeling that the company is both massive in scale and meticulously detail-oriented.

---

## 2. Colors & Surface Philosophy
The palette is rooted in high-contrast authority. Our primary red is used as a "laser-focus" accent against a deep, nocturnal foundation.

### The Palette (Material Design Tokens)
*   **Primary Container (`#e80000`):** The brand's heartbeat. Use for high-impact CTAs and critical status indicators.
*   **Surface (`#131313`):** The primary canvas. A deep, near-black that provides the "Cinematic" backdrop.
*   **On-Surface (`#e5e2e1`):** The primary text color, providing high legibility against dark backgrounds.
*   **Outline-Variant (`#5f3f39`):** Used exclusively for "Ghost Borders" and decorative grid lines.

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Tonal Transitions:** Using depth to imply containment rather than drawing a box around it.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. 
*   **Base:** `surface` (The floor)
*   **Lower Level:** `surface-container-low` (Nested content areas)
*   **Floating Level:** `surface-container-high` (Interactive cards/modals)
*   **The Glass & Gradient Rule:** For elements sitting atop photography, use **Glassmorphism**. Apply `surface-container-low` at 60% opacity with a `20px` backdrop-blur. To add "soul," incorporate a subtle radial gradient of `primary-container` at 5% opacity in the corner of dark sections to mimic a red light leak or "glow."

---

## 3. Typography: The Editorial Scale
We use **Inter** exclusively. The hierarchy is designed to feel like a high-end business journal—authoritative, clean, and spacious.

*   **Display-LG (3.5rem / Bold):** Used for hero statements. Tracking should be set to `-0.02em` to feel tighter and more "custom."
*   **Headline-MD (1.75rem / Semi-Bold):** Used for section starts. Always pair with generous top-margin to allow the layout to "breathe."
*   **Body-LG (1rem / Regular):** The workhorse for storytelling. Line height should be generous (1.6) to ensure international readability.
*   **Label-MD (0.75rem / Bold / All-Caps):** Used for "Overlines" (the small text above headlines). This is where we inject the `primary` red to categorize content.

**Visual Identity through Type:** Use wide letter-spacing on Labels and tight letter-spacing on Display headings to create a sophisticated, intentional contrast.

---

## 4. Elevation & Depth
We eschew traditional "drop shadows" in favor of **Tonal Layering.**

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in hex value creates a soft, natural lift.
*   **Ambient Shadows:** If an element must float (e.g., a floating navigation bar), use a shadow with a `40px` blur at 4% opacity. The shadow color must be a tinted version of the background, never pure black.
*   **The "Ghost Border":** If a container requires a boundary (e.g., an input field), use the `outline-variant` token at 20% opacity. 
*   **Decorative Grids:** To lean into the "Logistics" theme, use `outline-variant` at 10% opacity to create thin, 1px horizontal or vertical "technical lines" that span the background, mimicking architectural blueprints.

---

## 5. Components

### Buttons
*   **Primary:** `primary-container` fill with `on-primary-container` text. **Corner Radius: 0px.** Sharp corners communicate "Industrial Precision."
*   **Secondary:** `surface-variant` fill with a `primary` 2px bottom-border (underline) that expands on hover.
*   **Hover State:** Subtle `scale(1.02)` and an increase in the red "light leak" glow behind the button.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Separate list items using vertical white space (32px minimum) or by alternating background tones between `surface-container-low` and `surface-container-lowest`. 
*   **Photography Cards:** Content should be housed in a Glassmorphic pane that overlaps the edge of the photo, breaking the internal grid.

### Input Fields
*   **Styling:** No background fill. Only a 1px "Ghost Border" at the bottom.
*   **Focus State:** The bottom border transforms into the `primary` red, with a subtle red glow (`primary` at 10% opacity) appearing behind the input area.

### Signature Component: The "Global Path" Breadcrumb
A custom component for this system: A thin, diagonal red accent line (`primary`) that connects the page title to the body content, symbolizing shipping routes and movement.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts where text sits on one side and a cinematic photo bleeds off the other.
*   **Do** use "Diagonal Accents." A 45-degree red line can be used as a decorative element to lead the eye toward CTAs.
*   **Do** prioritize high-quality, high-contrast imagery. If the photo is low-res, the entire premium feel collapses.

### Don't:
*   **Don't** use rounded corners. Everything in this system is `0px` radius to maintain a powerful, corporate, and architectural edge.
*   **Don't** use standard "Maersk Blue" or "DHL Yellow." We are a boutique alternative; stick to the Red/Black/White/Glass palette.
*   **Don't** use icons with fills. Use thin-stroke (1px) linear icons to match the "technical grid" aesthetic.
*   **Don't** crowd the interface. If a section feels "busy," add 40px of white space.