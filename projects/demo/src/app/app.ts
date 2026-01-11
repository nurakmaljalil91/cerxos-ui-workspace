import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsBadgeComponent,
  CxsButtonComponent,
  CxsCheckboxComponent,
  CxsDatepickerComponent,
  CxsInputComponent,
  CxsRadioComponent,
  CxsSelectComponent
} from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CxsAlertComponent,
    CxsBadgeComponent,
    CxsButtonComponent,
    CxsCheckboxComponent,
    CxsDatepickerComponent,
    CxsInputComponent,
    CxsRadioComponent,
    CxsSelectComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tier = 'starter';
  newsletter = true;
  alerts = false;
  partial = true;
  selectedDate = '2024-04-01';
  customDate = '2024-03-10';
}
