# Cxs Alert

Token-driven alert component for Cerxos UI.

## Usage

```html
<cxs-alert title="Update available">
  A new version is ready to install. Please refresh the page.
</cxs-alert>

<cxs-alert variant="danger" [dismissible]="true">
  Action required to restore access.
</cxs-alert>
```

## Inputs

- `variant`: `info` | `neutral` | `danger` (default: `info`)
- `title`: string | undefined
- `dismissible`: boolean (default: `false`)

## Outputs

- `closed`: emits when the alert is dismissed
