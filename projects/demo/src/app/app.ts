import { Component } from '@angular/core';
import {CxsButtonComponent, CxsInputComponent} from 'cerxos-ui';

@Component({
  selector: 'app-root',
  imports: [CxsButtonComponent, CxsInputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
