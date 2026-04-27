import type { Meta, StoryObj } from '@storybook/angular';

import { CxsSkeletonComponent } from './skeleton.component';

const meta: Meta<CxsSkeletonComponent> = {
  title: 'Cerxos UI/Skeleton',
  component: CxsSkeletonComponent,
  args: {
    variant: 'line',
    size: 'md',
    animated: true
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <cxs-skeleton
          [variant]="variant"
          [size]="size"
          [animated]="animated"
          [width]="width"
          [height]="height"
          [ariaLabel]="ariaLabel"
        ></cxs-skeleton>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsSkeletonComponent>;

export const Line: Story = {};

export const Block: Story = {
  args: {
    variant: 'block'
  }
};

export const Circle: Story = {
  args: {
    variant: 'circle'
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex max-w-md flex-col gap-4">
        <cxs-skeleton size="sm"></cxs-skeleton>
        <cxs-skeleton size="md"></cxs-skeleton>
        <cxs-skeleton size="lg"></cxs-skeleton>
      </div>
    `
  })
};

export const Composition: Story = {
  render: () => ({
    template: `
      <div class="flex max-w-md items-start gap-3">
        <cxs-skeleton variant="circle" size="lg"></cxs-skeleton>
        <div class="flex flex-1 flex-col gap-2">
          <cxs-skeleton width="40%"></cxs-skeleton>
          <cxs-skeleton width="100%"></cxs-skeleton>
          <cxs-skeleton width="75%"></cxs-skeleton>
        </div>
      </div>
    `
  })
};

export const Static: Story = {
  args: {
    animated: false,
    variant: 'block',
    height: '5rem'
  }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-md"
        style="
          --cxs-color-skeleton-base: #dbeafe;
          --cxs-color-skeleton-highlight: rgba(255, 255, 255, 0.8);
        "
      >
        <div class="flex flex-col gap-3">
          <cxs-skeleton></cxs-skeleton>
          <cxs-skeleton width="70%"></cxs-skeleton>
          <cxs-skeleton variant="block" height="5rem"></cxs-skeleton>
        </div>
      </div>
    `
  })
};
