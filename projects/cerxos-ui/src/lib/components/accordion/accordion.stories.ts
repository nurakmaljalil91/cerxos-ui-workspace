import type { Meta, StoryObj } from '@storybook/angular';

import { CxsAccordionComponent } from './accordion.component';
import { CxsAccordionItemComponent } from './accordion-item.component';

const meta: Meta<CxsAccordionComponent> = {
  title: 'Cerxos UI/Accordion',
  component: CxsAccordionComponent,
  render: () => ({
    imports: [CxsAccordionComponent, CxsAccordionItemComponent],
    template: `
      <cxs-accordion>
        <cxs-accordion-item title="Security checks" [expanded]="true">
          We automatically assess device posture and session risk.
        </cxs-accordion-item>
        <cxs-accordion-item title="Conditional access">
          Set policies based on location, role, or SSO status.
        </cxs-accordion-item>
        <cxs-accordion-item title="Audit trail" [disabled]="true">
          View audit logs for every login event.
        </cxs-accordion-item>
      </cxs-accordion>
    `
  })
};

export default meta;
type Story = StoryObj<CxsAccordionComponent>;

export const Default: Story = {};
