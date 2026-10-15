# Cxs Dialog

Token-driven dialog component with focus management and basic accessibility.

## Usage

```html
<cxs-dialog
  [(open)]="dialogOpen"
  title="Invite teammates"
  description="Share access with your team."
>
  <p>Add up to 20 people at a time.</p>
  <div cxsDialogActions>
    <cxs-button variant="secondary" (click)="dialogOpen = false">Cancel</cxs-button>
    <cxs-button>Send invites</cxs-button>
  </div>
</cxs-dialog>
```

## Inputs

- `open`: boolean (default: `false`)
- `title`: string | undefined
- `description`: string | undefined
- `ariaLabel`: string (default: `Dialog`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `dismissible`: boolean (default: `true`)
- `closeOnBackdrop`: boolean (default: `true`)
- `closeOnEscape`: boolean (default: `true`)

## Closing behavior

- **Backdrop**: when `closeOnBackdrop` is `true`, the dialog closes only when the pointer press
  *and* its release both land on the backdrop. A press that starts inside the panel (for example,
  selecting text in an input) and is released over the backdrop does not close the dialog.
- **Escape**: when `closeOnEscape` is `true`, pressing Escape while focus is in the dialog closes it.
- **Close button**: rendered when `dismissible` is `true`.

For dialogs that contain a form, set `[closeOnBackdrop]="false"` so an accidental click outside
cannot discard what the user typed. Keep `closeOnEscape` enabled so keyboard users can still
dismiss the dialog.

```html
<cxs-dialog [(open)]="formOpen" title="Add transaction" [closeOnBackdrop]="false">
  <!-- form fields -->
</cxs-dialog>
```

## Outputs

- `openChange`: emits `false` when the dialog requests close
- `closed`: emits close reason (`dismiss`, `backdrop`, `escape`)

## Tokens

- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-radius-md`
- `--cxs-shadow-sm`
