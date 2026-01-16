# Cxs Accordion

Disclosure-style accordion with token-based styling.

## Usage

```html
<cxs-accordion>
  <cxs-accordion-item title="First" [expanded]="true">
    Content for the first item.
  </cxs-accordion-item>
  <cxs-accordion-item title="Second">
    Content for the second item.
  </cxs-accordion-item>
</cxs-accordion>
```

Custom title slot:

```html
<cxs-accordion-item>
  <span cxsAccordionTitle>Custom heading</span>
  Custom body content.
</cxs-accordion-item>
```

## Inputs

`cxs-accordion`
- `spacing`: `sm` | `md` | `lg` (default: `md`)

`cxs-accordion-item`
- `title`: string (optional)
- `expanded`: boolean (default: `false`)
- `disabled`: boolean (default: `false`)
- `size`: `sm` | `md` | `lg` (default: `md`)

## Outputs

`cxs-accordion-item`
- `expandedChange`: emits boolean when toggled

## Tokens

- `--cxs-color-border`
- `--cxs-color-focus`
- `--cxs-color-on-surface`
- `--cxs-color-on-surface-muted`
- `--cxs-color-surface`
- `--cxs-color-surface-hover`
- `--cxs-radius-md`
