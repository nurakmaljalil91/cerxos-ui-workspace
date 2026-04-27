# Cxs Skeleton

Token-driven skeleton placeholder component for Cerxos UI.

## Usage

```html
<cxs-skeleton></cxs-skeleton>
<cxs-skeleton variant="circle" size="lg"></cxs-skeleton>
<cxs-skeleton variant="block" height="6rem"></cxs-skeleton>
```

## Inputs

- `variant`: `line` | `block` | `circle` (default: `line`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `animated`: boolean (default: `true`)
- `width`: string | undefined
- `height`: string | undefined
- `ariaLabel`: string | undefined. When omitted, the skeleton is decorative.

## Tokens

- `--cxs-color-skeleton-base`
- `--cxs-color-skeleton-highlight`
- `--cxs-radius-md`
