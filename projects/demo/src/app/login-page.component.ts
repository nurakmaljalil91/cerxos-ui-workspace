import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsBadgeComponent,
  CxsBreadcrumbComponent,
  CxsButtonComponent,
  CxsCardComponent,
  CxsCheckboxComponent,
  CxsDatepickerComponent,
  CxsInputComponent,
  CxsRadioComponent,
  CxsSelectComponent
} from 'cerxos-ui';

@Component({
  selector: 'demo-login-page',
  imports: [
    FormsModule,
    CxsAlertComponent,
    CxsBadgeComponent,
    CxsBreadcrumbComponent,
    CxsButtonComponent,
    CxsCardComponent,
    CxsCheckboxComponent,
    CxsDatepickerComponent,
    CxsInputComponent,
    CxsRadioComponent,
    CxsSelectComponent
  ],
  templateUrl: './login-page.html'
})
export class LoginPageComponent {
  loginEmail = '';
  loginPassword = '';
  loginRegion = '';
  loginAccountType = 'personal';
  loginStartDate = '2024-03-10';
  loginRemember = true;
  loginAgree = false;
  loginBreadcrumbs = [
    { label: 'Cerxos', href: '#' },
    { label: 'Access', href: '#' },
    { label: 'Sign in' }
  ];
}
