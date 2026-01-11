# CxsRadioComponent

Accessible radio control with token-driven styling.

## Usage

```html
<cxs-radio name="plan" value="basic" [(ngModel)]="selectedPlan">Basic</cxs-radio>
<cxs-radio name="plan" value="pro" [(ngModel)]="selectedPlan">Pro</cxs-radio>
```

## Inputs

- `value`: option value represented by the radio.
- `name`: shared name for grouping.
- `variant`: `primary` | `secondary`.
- `size`: `sm` | `md` | `lg`.
- `disabled`: disables interaction.
- `required`: marks as required.
- `invalid`: sets invalid styling and `aria-invalid`.
- `autofocus`: focuses on load.
- `id`, `ariaLabel`, `ariaDescribedby`: accessibility hooks.

## Outputs

- `valueChange`: emits the selected option value when checked.

## Theming

Uses tokens: `--cxs-color-primary`, `--cxs-color-on-surface`, `--cxs-color-on-surface-muted`,
`--cxs-color-border`, `--cxs-color-surface`, `--cxs-color-focus`, `--cxs-color-danger`.
