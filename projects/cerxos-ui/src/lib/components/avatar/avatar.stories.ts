import type { Meta, StoryObj } from '@storybook/angular';

import { CxsAvatarComponent } from './avatar.component';

const avatarSrc =
  'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27128%27 height=%27128%27 viewBox=%270 0 128 128%27%3E%3Crect width=%27128%27 height=%27128%27 fill=%27%23e2e8f0%27/%3E%3Ccircle cx=%2764%27 cy=%2752%27 r=%2722%27 fill=%27%2394a3b8%27/%3E%3Cpath d=%27M20 116c10-26 31-40 44-40s34 14 44 40%27 fill=%27%2394a3b8%27/%3E%3C/svg%3E';

const meta: Meta<CxsAvatarComponent> = {
  title: 'Cerxos UI/Avatar',
  component: CxsAvatarComponent,
  args: {
    name: 'Ada Lovelace',
    size: 'md',
    shape: 'circle'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-avatar
        [src]="src"
        [name]="name"
        [alt]="alt"
        [size]="size"
        [shape]="shape"
      ></cxs-avatar>
    `
  })
};

export default meta;
type Story = StoryObj<CxsAvatarComponent>;

export const Default: Story = {};

export const Image: Story = {
  args: {
    src: avatarSrc,
    alt: 'Ada Lovelace'
  }
};

export const Fallback: Story = {
  args: {
    name: 'Grace Hopper'
  }
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-3">
        <cxs-avatar name="Circle"></cxs-avatar>
        <cxs-avatar name="Square" shape="square"></cxs-avatar>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    props: { avatarSrc },
    template: `
      <div class="flex items-center gap-3">
        <cxs-avatar name="Small" size="sm"></cxs-avatar>
        <cxs-avatar [src]="avatarSrc" name="Medium" size="md"></cxs-avatar>
        <cxs-avatar [src]="avatarSrc" name="Large" size="lg"></cxs-avatar>
      </div>
    `
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    props: { avatarSrc },
    template: `
      <div
        class="flex items-center gap-3"
        style="
          --cxs-color-primary: #2563eb;
          --cxs-color-primary-ghost: rgba(37, 99, 235, 0.12);
          --cxs-color-border: #93c5fd;
          --cxs-radius-md: 12px;
        "
      >
        <cxs-avatar [src]="avatarSrc" name="Theme"></cxs-avatar>
        <cxs-avatar name="Theme" shape="square"></cxs-avatar>
      </div>
    `
  })
};
