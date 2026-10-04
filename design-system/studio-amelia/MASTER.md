# Design System Master File — Studio Amelia

> Brand-locked to the provided logo. Pink/lavender tokens from the auto-generator are **rejected**.

**Project:** Studio Amelia  
**Category:** Luxury hair salon  
**Design Dials:** Variance 7/10 | Motion 9/10 | Density 3/10 (Spacious)

---

## Color Palette

Warm beige salon — no black-and-gold. The supplied logo stays untouched; motion is applied to the PNG.

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#F3EBE1` | `--color-ink` |
| Surface | `#FFF8F2` | `--color-surface` |
| Studio taupe | `#8B7E74` | `--color-studio` |
| Foreground | `#2C241E` | `--color-ivory` |
| Muted | `#7A6F66` | `--color-muted` |
| Accent / CTA | `#9A534C` | `--color-accent` |
| On accent | `#FFF8F2` | `--color-on-accent` |
| Border | `rgba(44,36,30,0.12)` | `--color-line` |
| Destructive | `#B42318` | `--color-danger` |

## Typography

Logo pairing, not generic Playfair-only luxury.

- **Display (STUDIO):** Bebas Neue — condensed, heavy, tight tracking
- **Script (Amelia):** Great Vibes — thin calligraphy overlay
- **Body / UI:** Outfit — geometric, modern, highly legible

## Motion

- Preloader: exact logo PNG fades, sharpens, and scales in
- Page overlay wipe (`yPercent`) 400–600ms, `power2.inOut`
- Scroll reveals: 400–600ms, `expo.out`, stagger ≤ 8 children
- Magnetic CTA on one focal button per view
- Respect `prefers-reduced-motion`
- No neon, no bounce, no infinite decorative loops

## Page Pattern

1. Intro / hero (vertical)
2. Services as a horizontal journey (desktop) / stacked cards (mobile)
3. Atelier + gallery detail
4. Testimonials + booking CTA
5. Vertical footer
6. Dedicated `/book` scheduler (Acuity-style: service → date → time → details)

## Anti-patterns

- Pink / lavender luxury palettes
- Emoji icons
- Scroll-jacking without a reduced-motion fallback
- Horizontal overflow on mobile
