import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { formViewProvider } from './form-view-provider';

@Component({
  standalone: true,
  template: `
  <fieldset ngModelGroup="addressForm" #addressGrp="ngModelGroup" [disabled]="disabled">
    <span>city</span>
    <input [(ngModel)]="city" name="city" #cityRef="ngModel" required/><br/>
    <span>zip</span> 
    <input [(ngModel)]="zip" name="zip" #zipRef="ngModel" required/><br/>
  </fieldset>
  `,
  imports: [FormsModule],
  selector: 'address-form',
  viewProviders: [formViewProvider],
})
export class AddressFormComponent {
  city: string;
  @ViewChild('cityRef') cityRef: NgControl;
  zip: string;
  @ViewChild('zipRef') zipRef: NgControl;
  @Input() disabled = false;
}
