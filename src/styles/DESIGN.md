---
name: Aureate Maestro
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#b1c7f2'
  on-secondary: '#193053'
  secondary-container: '#31476b'
  on-secondary-container: '#a0b6e0'
  tertiary: '#d0cdcd'
  on-tertiary: '#313030'
  tertiary-container: '#b4b2b2'
  on-tertiary-container: '#454544'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b1c7f2'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#31476b'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The brand personality is authoritative yet intimate, reflecting the discipline of a classical performer and the visionary nature of a composer. The target audience includes patrons of the arts, orchestral directors, and high-end collaborators who value precision, heritage, and artistic depth.

The design system employs a **Minimalist-Classical** style. It prioritizes expansive whitespace—reminiscent of sheet music margins—and high-quality editorial typography. Visual interest is generated through rhythmic alignment and subtle, light-reactive surfaces rather than decorative clutter. The emotional response should be one of "quiet luxury" and professional reverence.

## Colors

The palette is inspired by orchestral instruments and midnight concert halls:

- **Primary (Metallic Gold):** Used sparingly for highlights, active states, and signatures. It represents the "brass" element and should feel luminous against dark backgrounds.
- **Secondary (Midnight Navy):** The deep foundation for large surfaces and primary containers, providing more depth than pure black.
- **Tertiary (Warm Charcoal):** Used for elevated surfaces, section dividers, and subtle layering.
- **Neutral (Ivory/Off-white):** Reserved for primary legibility and high-contrast text to ensure accessibility and a premium "paper" feel for content.

The default mode is **Dark**, creating a focused, "lights-down" atmosphere that allows photography and typography to shine.

## Typography

This design system utilizes a high-contrast pairing to balance tradition with modern clarity.

- **Headlines:** Use **Bodoni Moda**. Its extreme stroke contrast and elegant serifs evoke the timeless nature of musical notation and formal programs. Tracking should be tightened slightly for large display sizes.
- **Body & Labels:** Use **Hanken Grotesk**. This contemporary sans-serif offers a clean, systematic counterpoint to the decorative serif. Its high x-height ensures legibility in technical descriptions or repertoire lists.
- **Labels:** Always use uppercase with increased letter-spacing to act as "metronome" markers for the content, guiding the eye without drawing excessive weight.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain "composed" compositions that feel intentional and architectural. 

- **Grid:** A 12-column grid with wide 32px gutters. This allows for asymmetrical layouts where text and imagery can "breathe," mirroring the silence between notes.
- **Vertical Rhythm:** Use increments of 8px. Large sections should be separated by significant padding (minimum 128px) to emphasize the premium, spacious brand identity.
- **Mobile Adaptation:** On mobile, margins reduce to 20px, and the layout collapses to a single-column fluid flow. Large display type should scale down to the defined `mobile` variables to maintain visual balance.

## Elevation & Depth

To maintain a sophisticated feel, the design system avoids heavy shadows, instead using **Tonal Layering** and **Soft Luminescence**:

- **Layers:** Use the Tertiary color (Warm Charcoal) for cards or floating panels against the Secondary (Midnight Navy) background.
- **Borders:** Instead of shadows, use 1px low-contrast outlines in a slightly lighter shade of navy or a muted gold for interactive elements.
- **Glow:** For primary buttons or active states, a very subtle, diffused gold outer glow (5% - 10% opacity) may be used to simulate the reflection of light off brass.
- **Glassmorphism:** Use sparingly for navigation bars (15% opacity Midnight Navy with a 20px backdrop blur) to maintain visibility of background imagery while scrolling.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding removes the clinical sharpness of pure 90-degree angles while maintaining a structured, formal appearance. 

- **Standard Elements:** Buttons, input fields, and small cards use the base `rounded` (4px).
- **Large Containers:** Images or full-bleed sections should remain sharp (0px) to anchor the layout to the grid.
- **Special Elements:** Avoid "pill" shapes; they are too casual for this aesthetic. Use the consistent 4px radius for all interactive components.

## Components

- **Buttons:** Primary buttons feature a solid Gold background with Navy text. Secondary buttons use a Navy background with a 1px Gold border. All buttons use uppercase labels with 0.1em letter spacing.
- **Inputs:** Dark Charcoal background with a subtle Navy-Gold border on focus. Labels should be placed above the field in the `label-lg` style.
- **Cards:** Minimalist design with no shadow. Use a 1px border of `Secondary-Lighter` to define edges. Content within cards should have generous internal padding (min 32px).
- **Chips/Tags:** Used for musical genres or instrument types. Small, monochromatic (Charcoal background, Neutral text), with the standard 4px corner radius.
- **Audio Player:** A custom, minimal component using Gold for progress bars and play/pause icons. The seek bar should be thin (2px) to reflect the precision of a professional tool.
- **Lists:** Repertoire or event lists should use a horizontal divider (0.5px Gold at 20% opacity) between items to maintain a rhythmic, legible flow.