import { Component } from '@angular/core';
import {FormConfigInterface} from "./components/dynamic-form/form-config.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myform: FormConfigInterface[] = [
    { label: 'Full name', type: 'text', placeholder: 'John Do', options: { placeholder: 'John Do' } },
    { label: 'Zipcode', type: 'text', options: { length: 5, valueType: 'numeric' } },
    { label: 'Address', type: 'address' }, // this is a complex type with multiple fields (it doesn't really matter which ones)
  ];

  consoleLog(event: any): void {
    console.log(event);
  }
}
