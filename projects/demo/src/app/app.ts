import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CxsButtonComponent, CxsInputComponent, CxsRadioComponent, CxsSelectComponent } from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CxsButtonComponent, CxsInputComponent, CxsRadioComponent, CxsSelectComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tier = 'starter';
}
