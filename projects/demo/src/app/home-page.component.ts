import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsAccordionComponent,
  CxsAccordionItemComponent,
  CxsBadgeComponent,
  CxsBreadcrumbComponent,
  CxsButtonComponent,
  CxsCheckboxComponent,
  CxsDatepickerComponent,
  CxsInputComponent,
  CxsMenubarComponent,
  CxsRadioComponent,
  CxsSelectComponent
} from 'cerxos-ui';

@Component({
  selector: 'demo-home-page',
  imports: [
    FormsModule,
    CxsAlertComponent,
    CxsAccordionComponent,
    CxsAccordionItemComponent,
    CxsBadgeComponent,
    CxsBreadcrumbComponent,
    CxsButtonComponent,
    CxsCheckboxComponent,
    CxsDatepickerComponent,
    CxsInputComponent,
    CxsMenubarComponent,
    CxsRadioComponent,
    CxsSelectComponent
  ],
  templateUrl: './home-page.html'
})
export class HomePageComponent {
  menubarItems = [
    { label: 'Overview', href: '#', active: true },
    { label: 'People', href: '#' },
    { label: 'Billing', href: '#' },
    { label: 'Create' },
    { label: 'Disabled', href: '#', disabled: true }
  ];
  breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Accounts', href: '#' },
    { label: 'Growth' }
  ];
  breadcrumbMuted = [
    { label: 'Workspace', href: '#' },
    { label: 'Settings' }
  ];
  tier = 'starter';
  newsletter = true;
  alerts = false;
  partial = true;
  selectedDate = '2024-04-01';
  customDate = '2024-03-10';
}
