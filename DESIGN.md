```markdown
# Design System Document: Industrial Precision

## 1. Overview & Creative North Star: "The Industrial Architect"
The design system for OFAT.UZ moves beyond the generic "B2B Template" to embrace a philosophy of **Industrial Precision**. We treat the interface not as a webpage, but as a high-end architectural blueprint. 

The Creative North Star is **"The Industrial Architect"**: an aesthetic that balances the raw power of heavy industry with the surgical precision of global logistics. We achieve this through:
*   **Intentional Asymmetry:** Breaking the standard 12-column rigidity to create editorial-style layouts that guide the eye toward key technical specs.
*   **Tonal Authority:** Using deep, heavy blues juxtaposed with surgical yellow accents to signal reliability.
*   **Aerospace Breathability:** Using extreme white space (80px–120px section gaps) to suggest a premium, unhurried service model.

## 2. Colors: Tonal Depth & The "No-Line" Mandate
We avoid the "box-within-a-box" look of entry-level B2B sites. Our depth comes from color shifts, not lines.

### Palette Strategy
*   **Primary (`#002068` to `#003399`):** Represents the "Heavy Metal" of the brand. Use `primary_container` for hero backgrounds and `primary` for high-level interaction.
*   **Secondary (`#fcd400`):** The "Industrial Warning" yellow. Used sparingly for high-intent CTAs and data highlights.
*   **Surface Tiers:** We use the `surface` tokens to define content blocks.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. 
*   **Sectioning:** Boundaries must be defined by shifting from `surface` (#f7f9fb) to `surface_container_low` (#f2f4f6). 
*   **Visual Soul:** Use a subtle linear gradient on the Hero background from `primary` (#002068) to `primary_container` (#003399) at a 135-degree angle. This adds a "machined" metallic sheen that flat hex codes lack.

### The "Glass & Texture" Rule
For floating navigational elements or spec cards, use **Glassmorphism**. Apply `surface_container_lowest` (#ffffff) at 80% opacity with a `20px` backdrop-blur. This ensures the industrial imagery beneath "bleeds through," grounding the UI in the physical world.

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) for its geometric, engineered feel with **Inter** (Body) for maximum readability.

*   **Display-LG (Manrope, 3.5rem):** Reserved for hero headlines. Use tight letter-spacing (-0.02em) to mimic high-end engineering magazines.
*   **Headline-MD (Manrope, 1.75rem):** Used for section headers. Always paired with a `secondary` (Yellow) accent—either a small lead-in line or a highlight.
*   **Body-LG (Inter, 1rem):** Set at a generous 1.6 line-height. Information density is the enemy of premium perception.
*   **Label-MD (Inter, 0.75rem):** Used for technical specs and part numbers. Should be uppercase with +0.05em tracking for a "stamped" industrial look.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We use **Ambient Occlusion** logic.

*   **The Layering Principle:** To lift a card, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#eceef0) background. The contrast provides the lift.
*   **Ambient Shadows:** If a floating action button or "Request Quote" modal requires a shadow, use: `0px 20px 40px rgba(0, 32, 104, 0.08)`. This tints the shadow with our `primary` blue, making it feel like light reflecting off industrial surfaces rather than "gray dirt."
*   **The "Ghost Border" Fallback:** For input fields or cards where separation is mandatory, use `outline_variant` (#c4c5d5) at **20% opacity**. It should be barely visible—a "suggestion" of a boundary.

## 5. Components: Precision Primitive

### Buttons: The Kinetic Trigger
*   **Primary:** `primary_container` (#003399) background with `on_primary` text. Border-radius: `lg` (0.5rem). Use a 2px `secondary` (Yellow) bottom-border on hover to simulate a "machine button" press.
*   **Tertiary:** No background. Use `primary` text with a `label-md` uppercase style. 

### Cards: The Spec Container
*   **Style:** No borders. Use `surface_container_low`. 
*   **Interaction:** On hover, the card should transition to `surface_container_lowest` and gain an Ambient Shadow. **Never use divider lines** inside cards; use 24px of vertical white space to separate the product title from the technical specs.

### Inputs: The Data Port
*   **Style:** `surface_container_highest` background. Sharp `md` (0.375rem) corners.
*   **Active State:** The background remains static, but a 2px `secondary` (Yellow) "focus ring" appears only on the bottom edge.

### Additional Component: "Industrial Data Strips"
Instead of standard tables, use "Strips." A horizontal row using `surface_container_low` with `primary` bold text for the value and `on_surface_variant` for the label. This mimics the look of shipping manifests and industrial labels.

## 6. Do's and Don'ts

### Do:
*   **DO** use oversized imagery of WD-40 products, cropped aggressively to show texture (metal, spray, valves).
*   **DO** use "Ghost Borders" for technical spec tables to maintain the "Architectural" vibe.
*   **DO** leave at least 120px of `surface` background between the "Hero" and "Product Grid" sections.

### Don't:
*   **DON'T** use 100% black text. Always use `on_surface` (#191c1e) for a softer, more professional slate-gray feel.
*   **DON'T** use standard 45-degree angle shadows. Keep them vertical (Y-axis) to mimic overhead warehouse lighting.
*   **DON'T** use rounded corners larger than `xl` (0.75rem). This is an industrial site, not a consumer social app; it needs to feel sturdy and "machined," not bubbly.

---
**Director's Note:** Every pixel should feel like it was placed there with a torque wrench. If a layout feels "crowded," add 24px of padding. If it feels "generic," remove a border and replace it with a background color shift.