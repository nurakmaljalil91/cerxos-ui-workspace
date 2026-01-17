import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
  CxsDataTableComponent,
  CxsInputComponent,
  CxsMenubarComponent,
  CxsRadioComponent,
  CxsSelectComponent,
  CxsTableComponent,
  CxsToggleComponent,
  CxsToastComponent,
  CxsTooltipComponent, CxsTableColumn, CxsDataTableColumn
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
    CxsDataTableComponent,
    CxsInputComponent,
    CxsMenubarComponent,
    CxsRadioComponent,
    CxsSelectComponent,
    CxsTableComponent,
    CxsToggleComponent,
    CxsToastComponent,
    CxsTooltipComponent
  ],
  templateUrl: './home-page.html'
})
export class HomePageComponent {
  toastOpen = false;
  dialogOpen = false;
  notificationsEnabled = true;
  tableColumns: CxsTableColumn[] = [
    {key: 'name', label: 'Name'},
    {key: 'status', label: 'Status'},
    {key: 'updated', label: 'Updated', align: 'right'}
  ];
  tableRows = [
    {name: 'Alpha', status: 'Active', updated: '2h ago'},
    {name: 'Beta', status: 'Paused', updated: 'Yesterday'},
    {name: 'Gamma', status: 'Active', updated: 'Just now'}
  ];
  dataTableColumns: CxsDataTableColumn[] = [
    {key: 'team', label: 'Team', sortable: true},
    {key: 'owner', label: 'Owner'},
    {key: 'updated', label: 'Updated', align: 'right', sortable: true}
  ];
  dataTableRows = [
    {team: 'Platform', owner: 'Avery', updated: 'Just now'},
    {team: 'Design', owner: 'Blake', updated: '1h ago'},
    {team: 'Product', owner: 'Casey', updated: 'Yesterday'},
    {team: 'Growth', owner: 'Devin', updated: '2d ago'},
    {team: 'Sales', owner: 'Emery', updated: 'Last week'}
  ];

  showToast(): void {
    this.toastOpen = true;
  }

  avatarImage =
    'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27128%27 height=%27128%27 viewBox=%270 0 128 128%27%3E%3Crect width=%27128%27 height=%27128%27 fill=%27%23e2e8f0%27/%3E%3Ccircle cx=%2764%27 cy=%2752%27 r=%2722%27 fill=%27%2394a3b8%27/%3E%3Cpath d=%27M20 116c10-26 31-40 44-40s34 14 44 40%27 fill=%27%2394a3b8%27/%3E%3C/svg%3E';
  menubarItems = [
    {label: 'Overview', href: '#', active: true},
    {label: 'People', href: '#'},
    {label: 'Billing', href: '#'},
    {label: 'Create'},
    {label: 'Disabled', href: '#', disabled: true}
  ];
  breadcrumbs = [
    {label: 'Home', href: '#'},
    {label: 'Accounts', href: '#'},
    {label: 'Growth'}
  ];
  breadcrumbMuted = [
    {label: 'Workspace', href: '#'},
    {label: 'Settings'}
  ];
  tier = 'starter';
  newsletter = true;
  alerts = false;
  partial = true;
  selectedDate = '2024-04-01';
  customDate = '2024-03-10';
}
