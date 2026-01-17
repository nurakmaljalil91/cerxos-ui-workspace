# Cxs Carousel

Simple carousel component for rotating content.

## Usage

```html
<cxs-carousel [items]="slides" [autoplay]="true" [interval]="5000"></cxs-carousel>
```

```ts
slides = [
  {
    title: 'Workspace analytics',
    description: 'Track adoption across teams.',
    image: 'https://picsum.photos/800/400?1'
  },
  {
    title: 'Security posture',
    description: 'Review access trends in minutes.',
    image: 'https://picsum.photos/800/400?2'
  }
];
```

## Inputs

- `items`: `CxsCarouselItem[]` (default: `[]`)
- `activeIndex`: number (default: `0`)
- `autoplay`: boolean (default: `false`)
- `interval`: number in ms (default: `4000`)
- `loop`: boolean (default: `true`)
- `showControls`: boolean (default: `true`)
- `showIndicators`: boolean (default: `true`)
- `ariaLabel`: string (default: `Carousel`)

## Outputs

- `activeIndexChange`: emits when the active slide changes

## Item shape

- `title`: string (optional)
- `description`: string (optional)
- `image`: string (optional)
- `alt`: string (optional)

## Tokens

- `--cxs-radius-md`
- `--cxs-color-focus`
- `--cxs-shadow-sm`
