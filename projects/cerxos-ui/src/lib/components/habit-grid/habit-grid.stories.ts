import type { Meta, StoryObj } from '@storybook/angular';

import { CxsHabitGridComponent } from './habit-grid.component';

function datesBetween(from: string, to: string, keep: (index: number) => boolean): string[] {
  const dates: string[] = [];
  for (let time = Date.parse(from), i = 0; time <= Date.parse(to); time += 86_400_000, i++) {
    if (keep(i)) {
      dates.push(new Date(time).toISOString().slice(0, 10));
    }
  }
  return dates;
}

const FROM = '2026-01-05';
const TODAY = '2026-10-04';

const meta: Meta<CxsHabitGridComponent> = {
  title: 'Cerxos UI/Habit Grid',
  component: CxsHabitGridComponent,
  args: {
    from: FROM,
    to: TODAY,
    today: TODAY,
    startDate: '2026-01-12',
    doneDates: datesBetween(FROM, TODAY, (i) => i % 5 !== 0 && i % 7 !== 3),
    scheduledDays: null,
    weeklyTarget: null,
    accentColor: null,
    interactive: false,
    ariaLabel: '10K Steps a day history'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-habit-grid
        [from]="from"
        [to]="to"
        [today]="today"
        [startDate]="startDate"
        [doneDates]="doneDates"
        [scheduledDays]="scheduledDays"
        [weeklyTarget]="weeklyTarget"
        [accentColor]="accentColor"
        [interactive]="interactive"
        [ariaLabel]="ariaLabel"
      ></cxs-habit-grid>
    `
  })
};

export default meta;
type Story = StoryObj<CxsHabitGridComponent>;

export const Daily: Story = {};

export const Weekdays: Story = {
  args: {
    scheduledDays: [1, 3, 5],
    ariaLabel: 'Gym history'
  }
};

export const TimesPerWeek: Story = {
  args: {
    from: '2026-07-06',
    weeklyTarget: 3,
    doneDates: datesBetween('2026-07-06', TODAY, (i) => i % 3 === 0),
    ariaLabel: 'Running history'
  }
};

export const AccentColor: Story = {
  args: {
    accentColor: '#22c55e'
  }
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      from: '2026-08-31',
      doneDates: [...datesBetween('2026-08-31', TODAY, (i) => i % 2 === 0)],
      toggle(event: { date: string; done: boolean }) {
        const self = this as unknown as { doneDates: string[] };
        self.doneDates = event.done
          ? [...self.doneDates, event.date]
          : self.doneDates.filter((date) => date !== event.date);
      }
    },
    template: `
      <cxs-habit-grid
        [from]="from"
        [to]="to"
        [today]="today"
        [doneDates]="doneDates"
        [interactive]="true"
        ariaLabel="Click or press Space to toggle a day"
        (dayToggle)="toggle($event)"
      ></cxs-habit-grid>
    `
  })
};
