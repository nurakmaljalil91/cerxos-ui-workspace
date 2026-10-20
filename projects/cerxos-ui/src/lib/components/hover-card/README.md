# Cxs Hover Card

Shows a rich preview when a user hovers over or focuses a trigger. Unlike a tooltip, the card can contain links and other content. Use a native link or button as the trigger so it remains keyboard accessible.

## Usage

```html
<cxs-hover-card [openDelay]="200" [closeDelay]="200">
  <a cxsHoverCardTrigger href="/people/amal">Amal</a>
  <div cxsHoverCardContent side="bottom" align="center" ariaLabel="Amal profile preview">
    <strong>Amal</strong>
    <p>View the profile and recent activity.</p>
    <a href="/people/amal/activity">Recent activity</a>
  </div>
</cxs-hover-card>
```

Import `CxsHoverCardComponent`, `CxsHoverCardTriggerDirective`, and `CxsHoverCardContentDirective` from `cerxos-ui`.

## Inputs

- `openDelay`: milliseconds before opening on hover (default: `200`)
- `closeDelay`: milliseconds before closing after pointer or focus leaves (default: `200`)
- `side` on content: `top` | `right` | `bottom` | `left` (default: `bottom`)
- `align` on content: `start` | `center` | `end` (default: `center`)
- `ariaLabel` on content: accessible name for the preview (default: `Preview`)

Focus opens the card immediately. Moving the pointer or focus into the card keeps it open. Escape closes it and returns focus to the trigger when pressed inside the card. The trigger exposes `aria-expanded` and `aria-controls`; closed content is hidden from keyboard navigation.

The card is positioned relative to the trigger. Keep it outside clipped or `overflow: hidden` containers when the preview needs to extend beyond them.

## Tokens

- `--cxs-color-surface`, `--cxs-color-on-surface`, `--cxs-color-border`
- `--cxs-color-focus`, `--cxs-radius-md`, `--cxs-shadow-sm`
