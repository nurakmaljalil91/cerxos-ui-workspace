import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsAccordionComponent,
  CxsAccordionItemComponent,
  CxsAvatarComponent,
  CxsBadgeComponent,
  CxsBreadcrumbComponent,
  CxsButtonComponent,
  CxsDialogComponent,
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
    CxsAvatarComponent,
    CxsBadgeComponent,
    CxsBreadcrumbComponent,
    CxsButtonComponent,
    CxsDialogComponent,
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
  dialogOpen = false;
  avatarImage =
    'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27128%27 height=%27128%27 viewBox=%270 0 128 128%27%3E%3Crect width=%27128%27 height=%27128%27 fill=%27%23e2e8f0%27/%3E%3Ccircle cx=%2764%27 cy=%2752%27 r=%2722%27 fill=%27%2394a3b8%27/%3E%3Cpath d=%27M20 116c10-26 31-40 44-40s34 14 44 40%27 fill=%27%2394a3b8%27/%3E%3C/svg%3E';
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
