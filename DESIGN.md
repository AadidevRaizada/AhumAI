---
name: AhumAI
description: Building the Maritime Software Ecosystem
colors:
  signal-amber: "#D97A0B"
  signal-amber-deep: "#B5670A"
  deep-hull: "#080809"
  hull-plate: "#0E0E0F"
  rust-line: "#1C1C1D"
  warm-chalk: "#EDEBE6"
  fog-gray: "#85827E"
  bilge: "#141415"
typography:
  display:
    fontFamily: "Quicksand, Inter, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Quicksand, Inter, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Quicksand, Inter, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Quicksand, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Quicksand, Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.deep-hull}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-amber-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.warm-chalk}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.rust-line}"
  input:
    backgroundColor: "{colors.deep-hull}"
    textColor: "{colors.warm-chalk}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: AhumAI

## 1. Overview

**Creative North Star: "The Dry Dock"**

AhumAI's visual system is an industrial honesty machine. Every element is exposed structure — nothing hidden, nothing decorative. Like a ship in dry dock, the site shows its seams: visible grid lines, hairline dividers, explicit before-and-after transformations. The visitor should feel they are looking at something built by engineers who understand maritime, not something styled by a marketing agency that read about ships.

The system rejects the entire Novu-style tech-marketing lane: no sparkles, no purple glows, no glassmorphism, no gradient text, no "ship faster" aesthetic cosplaying maritime colors. It also rejects the AI-startup clichés of neural-network visuals and glowing icons. The differentiation is specificity — real numbers, real products, real outcomes — carried through a visual language that trusts the content to do the work.

Density is high. Whitespace is earned, not automatic. Sections are separated by visible rules, not by decorative spacing. The palette is near-black + near-white + one signal amber accent, used at functional emphasis points only (≤10% of any given view). Typography does the heavy lifting of hierarchy; color is reserved for action.

**Key Characteristics:**
- Structure-exposed: visible dividers, grid lines, hairline rules. Nothing floats.
- Monochrome foundation with one signal accent. The accent is functional, never decorative.
- Zero glassmorphism, zero gradient text, zero decorative blurs or glow effects.
- Typography carries hierarchy; color carries action.
- High contrast for readability in bright (deck) and dim (bridge) maritime environments.

## 2. Colors

The palette is built around a single industrial truth: the dry dock is steel, shadow, and warning lamps. One signal color. Everything else is neutral.

### Primary
- **Signal Amber** (#D97A0B): The only accent. Used on primary CTAs, functional emphasis (prices, status indicators, live/draft badges), and the single most-important action on any page. Never used as decoration or background tint. Its ≤10% surface rule is enforced by rarity — when amber appears, it means "act here."

### Neutral
- **Deep Hull** (#080809): Main background. Near-black with a barely-perceptible cool shift so it never reads as pure #000. The canvas for everything.
- **Hull Plate** (#0E0E0F): Elevated surface. Used for cards, expanded sections, and content containers that need to separate from the background by the slightest tonal step.
- **Rust Line** (#1C1C1D): Borders, dividers, hairline rules. Named for the fine oxidation lines on exposed steel — visible structure, not decoration.
- **Warm Chalk** (#EDEBE6): Primary text. Near-white with a warm tint that softens high-contrast reading on dark backgrounds. Never pure #FFF.
- **Fog Gray** (#85827E): Secondary text, captions, metadata. Muted but readable at small sizes. Passes 4.5:1 contrast on Deep Hull.
- **Bilge** (#141415): Disabled states, inactive elements, very subtle tonal background variations. The darkest functional tone.

### Named Rules
**The One Signal Rule.** Signal Amber is used on ≤10% of any given view. Its power comes from scarcity. If a page has five amber elements, at least three are wrong. The primary CTA gets it. Critical status indicators get it. Nothing else.

**The Tinted Neutral Rule.** Never use #000 or #FFF. Every neutral is tinted toward the maritime environment: warm chalk for text (not cold white), cool-shifted near-blacks for backgrounds (not dead black), warm gray for secondaries.

## 3. Typography

**Display/Headline/Body Font:** Quicksand (with Inter, sans-serif fallback)
**Character:** Quicksand is a geometric sans with rounded terminals — warm and approachable without being soft. Its rounded geometry provides the humanity in an otherwise industrial system. At display sizes, its geometric construction reads as precise and engineered; at body sizes, its open apertures keep readability high.

### Hierarchy
- **Display** (600, clamp(2.5rem, 6vw, 4.5rem), 1.05): Hero headlines. Appears once per page maximum. Tight leading for impact. Use weight 600, not 700 — confident but not shouting.
- **Headline** (500, clamp(1.75rem, 3vw, 2.5rem), 1.15): Section titles. Used 2-3 times per page. Slight negative tracking.
- **Title** (500, clamp(1.25rem, 2vw, 1.5rem), 1.25): Card headings, feature titles, named sections.
- **Body** (400, 1rem, 1.6): Running text. Cap line length at 65–75ch. Colors: warm-chalk for primary text, fog-gray for secondary.
- **Label** (500, 0.75rem, 1.3, 0.04em): Buttons, tags, navigation items. Uppercase for buttons only when the word count is ≤3.

### Named Rules
**The Weight Economy Rule.** Only two weights are used: 400 (body, captions) and 500-600 (headings, labels). Weight 300 and 700 are available in the font but reserved for deliberate contrast moments — a single stat figure at 700, a quiet disclaimer at 300. Default to 400 and 500.

**The Case Restraint Rule.** Uppercase is reserved for button labels of ≤3 words. Never uppercase navigation, section headers, or body text. Lowercase is not a style choice; it is the absence of forced shouting.

## 4. Elevation

The system uses structure-exposed separation. No shadows. No blur effects. No glassmorphism. Depth is conveyed through three mechanisms: tonal layering (Deep Hull → Hull Plate → Rust Line), visible hairline dividers (1px border on Rust Line), and typographic hierarchy. Nothing floats. Every section sits on explicit structure.

### Shadow Vocabulary
This system has no shadow vocabulary. Shadows and blurs are prohibited. The system is flat by definition.

### Named Rules
**The Exposed Seam Rule.** Every visual transition between content areas is marked by a 1px hairline rule in Rust Line (#1C1C1D). If two sections need separation, draw the line. If they don't, removing the line is a deliberate choice — not an oversight.

**The No-Float Rule.** No element floats above the page via shadow, blur, or backdrop effect. Every element sits on the exposed structure of the grid. Hover states shift color or add an underline; they never lift.

## 5. Components

### Buttons
- **Shape:** Straight corners by default (rounded-sm, 2px — just enough to not look sharp). No pill shapes, no fully rounded.
- **Primary:** Signal Amber (#D97A0B) background, Deep Hull (#080809) text. Weight 500. Uppercase for ≤3-word labels. Border: none. Hover shifts to Signal Amber Deep (#B5670A). No shadow, no glow, no scale transform.
- **Ghost/Secondary:** Transparent background, Warm Chalk text, Rust Line border (1px). Hover fills background with Rust Line. Used for secondary actions on the same view.
- **Disabled:** Bilge background, Fog Gray text. No interaction.
- **Size:** Two sizes: default (10px 20px padding) and small (6px 12px padding). No large variant; if a button needs to be bigger, the heading above it is too small.

### Cards / Containers
- **Corner Style:** Rounded-sm (2px). Near-flat.
- **Background:** Hull Plate (#0E0E0F) if elevated. Deep Hull (#080809) if inline. Never transparent with backdrop-blur.
- **Border:** 1px Rust Line (#1C1C1D) on all sides. Full border, never a side-stripe.
- **Internal Padding:** spacing-lg (24px) default. spacing-md (16px) for dense info cards.
- **Anti-pattern:** Nested cards are prohibited. If a card contains another card, one of them does not need to be a card.

### Inputs / Fields
- **Style:** Deep Hull background, 1px Rust Line border (full, all sides). Rounded-sm (2px).
- **Focus:** Border shifts to Signal Amber. No glow, no ring, no box-shadow.
- **Error:** Border shifts to #D93838 (a desaturated red, never pure #FF0000).
- **Disabled:** Bilge background, Fog Gray text.

### Navigation
- **Style:** Deep Hull background (solid, not blurred). Bottom border: 1px Rust Line. No backdrop-blur, no glass effect.
- **Links:** Fog Gray at rest. Warm Chalk on hover. Signal Amber underline (2px) for active/current page.
- **Mobile:** Slide-in panel from right. Deep Hull background. Rust Line left border (full border only — no side-stripe accent).

### Chips / Tags
- **Style:** Straight corners (rounded-sm, 2px). Rust Line border (1px, full). Deep Hull background. Warm Chalk text. Weight 500, size 0.75rem. Padding: 2px 8px.
- **Live/Draft indicator:** Signal Amber dot (6px, rounded-full) + Fog Gray text for "Live" / "In Development" status. The dot is the only justified use of a filled circle in the system.

### Dividers
- **Section divider:** 1px horizontal rule, Rust Line color. Full width of the content area. No gradient fades, no decorative icons.
- **Inline divider:** 1px vertical rule, Rust Line color. Used between metadata items, navigation links.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Amber on the single most-important action per view. If you can't decide which action is primary, the layout is the problem.
- **Do** separate every content section with a 1px Rust Line divider. Omit it only when two sections are thematically continuous.
- **Do** use Warm Chalk (#EDEBE6) for all body text. Fog Gray (#85827E) for secondary information only.
- **Do** lead with specific numbers and before-and-after transformations. "A role that no longer exists" is a header. "500+ certificates processed daily" is a stat.
- **Do** use weight 500 for headings and 400 for body. 600 is for display only. 700 is for single-stat emphasis only.
- **Do** cap body text at 65-75 characters per line.
- **Do** use full borders (all four sides) on cards and inputs. Never a single-side accent stripe.

### Don't:
- **Don't** use gradient text (`background-clip: text`). Prohibited absolutely. Use a single solid color from the neutral scale.
- **Don't** use glassmorphism (backdrop-blur, translucent backgrounds). Prohibited absolutely. Use solid Hull Plate or Deep Hull backgrounds.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px as a colored accent). Rewrite with full borders or a leading indicator dot.
- **Don't** use Novu-style effects: sparkles, purple radial glows, "ship faster" tech-marketing aesthetic. AhumAI is maritime-native, not a dev-tool company.
- **Don't** use AI-startup clichés: neural network visuals, glowing brain icons, purple-to-cyan gradients, "revolutionizing X with AI."
- **Don't** use nested cards. If a card appears inside another card, restructure. One of them is unnecessary.
- **Don't** use identical card grids (icon + heading + text repeated). Vary the layout or replace with a different affordance.
- **Don't** use pure #000 or #FFF anywhere.
- **Don't** use shadows or blurs for depth. The system is flat. Separate with borders and tonal shifts.
- **Don't** use em dashes. Rewrite with commas, colons, or periods.
