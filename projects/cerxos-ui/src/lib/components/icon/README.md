# Cxs Icon

Token-friendly SVG icon component for Cerxos UI.

## Usage

```html
<cxs-icon name="user" label="User profile"></cxs-icon>
```

Decorative icon:

```html
<cxs-icon name="search"></cxs-icon>
```

## Inputs

- `name`: `bell` | `chevron-down` | `chevron-left` | `chevron-right` | `chevron-up` | `plus` | `search` | `user` | `x`
- `size`: `sm` | `md` | `lg` (default: `md`)
- `label`: string | undefined. Provide this when the icon should be announced by assistive technology.

## Notes

- Icons use `currentColor`, so they inherit text color from their parent.
- Omit `label` for decorative icons.
