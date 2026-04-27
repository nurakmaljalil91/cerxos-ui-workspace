import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  CxsActionMenuComponent,
  CxsActionMenuItem,
  CxsAlertComponent,
  CxsAccordionComponent,
  CxsAccordionItemComponent,
  CxsAvatarComponent,
  CxsBadgeComponent,
  CxsBreadcrumbComponent,
  CxsButtonComponent,
  CxsDialogComponent,
  CxsCheckboxComponent,
  CxsCarouselComponent,
  CxsDatepickerComponent,
  CxsDataTableComponent,
  CxsIconComponent,
  CxsInputComponent,
  CxsMenubarComponent,
  CxsMultiSelectComponent,
  CxsRadioComponent,
  CxsSelectComponent,
  CxsTabLabelDirective,
  CxsTabPanelComponent,
  CxsTabsComponent,
  CxsTableComponent,
  CxsToggleComponent,
  CxsToastComponent,
  CxsTooltipComponent,
  CxsTableColumn,
  CxsDataTableColumn
} from 'cerxos-ui';

@Component({
  selector: 'demo-home-page',
  imports: [
    FormsModule,
    CxsActionMenuComponent,
    CxsAlertComponent,
    CxsAccordionComponent,
    CxsAccordionItemComponent,
    CxsAvatarComponent,
    CxsBadgeComponent,
    CxsBreadcrumbComponent,
    CxsButtonComponent,
    CxsDialogComponent,
    CxsCheckboxComponent,
    CxsCarouselComponent,
    CxsDatepickerComponent,
    CxsDataTableComponent,
    CxsIconComponent,
    CxsInputComponent,
    CxsMenubarComponent,
    CxsMultiSelectComponent,
    CxsRadioComponent,
    CxsSelectComponent,
    CxsTabLabelDirective,
    CxsTabPanelComponent,
    CxsTabsComponent,
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
    {key: 'team', label: 'Team', sortable: true, filterable: true, pinned: 'left', minWidth: 160},
    {key: 'owner', label: 'Owner', filterable: true},
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      filterType: 'select',
      filterOptions: [
        {label: 'Active', value: 'Active'},
        {label: 'Paused', value: 'Paused'}
      ]
    },
    {key: 'updated', label: 'Updated', align: 'right', sortable: true, filterable: true}
  ];
  dataTableRows = [
    {id: 1, team: 'Platform', owner: 'Avery', status: 'Active', updated: 'Just now'},
    {id: 2, team: 'Design', owner: 'Blake', status: 'Paused', updated: '1h ago'},
    {id: 3, team: 'Product', owner: 'Casey', status: 'Active', updated: 'Yesterday'},
    {id: 4, team: 'Growth', owner: 'Devin', status: 'Active', updated: '2d ago'},
    {id: 5, team: 'Sales', owner: 'Emery', status: 'Paused', updated: 'Last week'}
  ];
  dataTableTitle = 'Team ownership';
  dataTableSubtitle = 'Monitor active projects and assignments.';
  multiSelectOptions = [
    {label: 'Platform', value: 'platform'},
    {label: 'Design', value: 'design'},
    {label: 'Product', value: 'product'},
    {label: 'Sales', value: 'sales'},
    {label: 'Growth', value: 'growth'}
  ];
  selectedTeams = ['platform', 'design'];
  selectedTeamsLimited = ['platform'];
  dataTableBulkActions = [{id: 'archive', label: 'Archive'}, {id: 'share', label: 'Share'}];
  carouselItems = [
    {
      title: 'Workspace analytics',
      description: 'Track adoption across teams.',
      image: 'https://picsum.photos/900/400?4',
      alt: 'Analytics preview'
    },
    {
      title: 'Security posture',
      description: 'Review access trends in minutes.',
      image: 'https://picsum.photos/900/400?5',
      alt: 'Security preview'
    },
    {
      title: 'Automations',
      description: 'Save time with reusable workflows.',
      image: 'https://picsum.photos/900/400?6',
      alt: 'Automation preview'
    }
  ];
  actionMenuItems: CxsActionMenuItem[] = [
    {label: 'Edit user', value: 'edit-user'},
    {label: 'Edit roles', value: 'edit-roles'},
    {label: 'Edit groups', value: 'edit-groups'},
    {label: 'Delete user', value: 'delete-user', tone: 'danger'}
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
