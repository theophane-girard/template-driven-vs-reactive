import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  template: `
    <fieldset [formGroup]="parentFormRef.form">
      <div formGroupName="address">
        <span>city</span>
        <input *ngIf="parentFormRef.form.controls.address" formControlName="city" /><br/>
        <span>zip</span> 
        <input [formControlName]="'zip'"/><br/>
      </div>
    </fieldset>
  `,
  selector: 'r-address-form',
  imports: [ReactiveFormsModule, NgIf],
})
export class RAddressFormComponent implements OnInit {
  protected parentFormRef = inject(FormGroupDirective);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.parentFormRef.form.addControl(
      'address',
      this.formBuilder.group({
        city: ['', Validators.required],
        zip: ['', Validators.required],
      })
    );
  }
}
