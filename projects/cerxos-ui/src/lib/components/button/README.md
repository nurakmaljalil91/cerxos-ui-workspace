# Cxs Button

Token-driven button component for Cerxos UI.

## Usage

```html
<cxs-button variant="primary" size="md">Save</cxs-button>
```

With named icon:

```html
<cxs-button variant="secondary" icon="user">Profile</cxs-button>
```

Circle icon button:

```html
<cxs-button icon="search" iconOnly ariaLabel="Search"></cxs-button>
```

With projected SVG icon:

```html
<cxs-button variant="secondary">
  <svg cxsButtonIcon aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
  </svg>
  Continue
</cxs-button>
```

## Inputs

- `variant`: `primary` | `secondary` | `ghost` | `danger` | `outline` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `disabled`: boolean (default: `false`)
- `loading`: boolean (default: `false`)
- `type`: `button` | `submit` | `reset` (default: `button`)
- `icon`: `bell` | `chevron-down` | `chevron-left` | `chevron-right` | `chevron-up` | `plus` | `search` | `user` | `x`
- `iconPosition`: `start` | `end` (default: `start`)
- `iconOnly`: boolean (default: `false`)
- `ariaLabel`: string | undefined. Required when `iconOnly` is `true`.

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-hover`
- `--cxs-color-primary-ghost`
- `--cxs-color-on-primary`
- `--cxs-color-danger`
- `--cxs-color-danger-surface`
- `--cxs-color-danger-surface-hover`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
