import type { Meta, StoryObj } from '@storybook/angular';

import { CxsCarouselComponent, CxsCarouselItem } from './carousel.component';

const items: CxsCarouselItem[] = [
  {
    title: 'Workspace analytics',
    description: 'Track adoption across teams.',
    image: 'https://picsum.photos/900/400?1',
    alt: 'Analytics preview'
  },
  {
    title: 'Security posture',
    description: 'Review access trends in minutes.',
    image: 'https://picsum.photos/900/400?2',
    alt: 'Security preview'
  },
  {
    title: 'Automations',
    description: 'Save time with reusable workflows.',
    image: 'https://picsum.photos/900/400?3',
    alt: 'Automation preview'
  }
];

const meta: Meta<CxsCarouselComponent> = {
  title: 'Cerxos UI/Carousel',
  component: CxsCarouselComponent,
  args: {
    items,
    activeIndex: 0,
    autoplay: false,
    interval: 4000,
    loop: true,
    showControls: true,
    showIndicators: true
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-carousel
        [items]="items"
        [activeIndex]="activeIndex"
        [autoplay]="autoplay"
        [interval]="interval"
        [loop]="loop"
        [showControls]="showControls"
        [showIndicators]="showIndicators"
      ></cxs-carousel>
    `
  })
};

export default meta;
type Story = StoryObj<CxsCarouselComponent>;

export const Default: Story = {};

export const AutoPlay: Story = {
  args: {
    autoplay: true
  }
};

export const Minimal: Story = {
  args: {
    showControls: false,
    showIndicators: false
  }
};
