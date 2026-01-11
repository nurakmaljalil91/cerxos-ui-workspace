import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CxsAlertComponent,
  CxsButtonComponent,
  CxsCheckboxComponent,
  CxsInputComponent,
  CxsRadioComponent,
  CxsSelectComponent
} from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CxsAlertComponent,
    CxsButtonComponent,
    CxsCheckboxComponent,
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
}
