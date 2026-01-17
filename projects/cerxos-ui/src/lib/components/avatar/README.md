# Cxs Avatar

Token-driven avatar component with image + initials fallback.

## Usage

```html
<cxs-avatar [src]="user.avatar" [name]="user.name"></cxs-avatar>
```

```html
<cxs-avatar name="Ada Lovelace" size="lg" shape="square"></cxs-avatar>
```

## Inputs

- `src`: string | undefined
- `name`: string | undefined (used for initials + aria label)
- `alt`: string | undefined (overrides name for image alt text)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `shape`: `circle` | `square` (default: `circle`)

## Tokens

- `--cxs-color-primary`
- `--cxs-color-primary-ghost`
- `--cxs-color-border`
- `--cxs-radius-md`
