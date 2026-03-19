---
paths:
  - "ui/src/components/**"
  - "ui/src/app/**"
---

# UI System & Styling

## Primitives

- UI primitives live in `ui/src/components/ui/`, built with Shadcn/ui (Radix + Tailwind + CVA).
- Check what exists before creating new components.
- Icons: `lucide-react`. Import individual icons, never the entire library.

## Color System

Use semantic theme tokens — never raw colors (`#fff`, `rgb(...)`, `red-500`):

`background`, `foreground`, `card`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `border`, `input`, `ring` — each with a `/foreground` counterpart where applicable.

## Tailwind Class Order

Order classes by category, most structural first:

1. **Layout**: `flex`, `flex-row`, `flex-1`, `items-center`, `justify-between`, `gap-*`
2. **Sizing**: `w-*`, `h-*`, `min-h-*`, `max-w-*`
3. **Spacing**: `p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `my-*`
4. **Position**: `absolute`, `relative`, `top-*`, `left-*`, `z-*`
5. **Background**: `bg-*`, `opacity-*`
6. **Border**: `border`, `border-*`, `rounded-*`
7. **Typography**: `text-*`, `font-*`, `leading-*`
8. **Effects**: `shadow-*`, `overflow-*`

## Rules

- Always pass `className` through `cn()` to merge base + consumer overrides.
- No inline `style` except for dynamic JS values.
- UI primitives go in `ui/src/components/ui/`. Domain components go in `ui/src/components/{domain}/`.
