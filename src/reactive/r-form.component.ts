import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { RAddressFormComponent } from './r-address-form.component';

@Component({
  selector: 'r-form',
  template: `
  <h1>REACTIVE FORM </h1>
  <ng-container *ngIf="{
    isNew: isNewChange$ | async
  }"/>
  <form [formGroup]="form">
    <span>new ?</span>
      <input type="checkbox" formControlName="isNewModel"/><br/>
    <span>email</span>
      <input formControlName="email"/><br/>
    <span>name</span>
      <input formControlName="name"/><br/>
    <span>lastname</span> 
      <input formControlName="lastname"/><br/>
    <r-address-form />
    <button [disabled]="form.invalid">Submit</button>
  </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RAddressFormComponent],
})
export class RFormComponent {
  form = inject(FormBuilder).group({
    isNewModel: [true, Validators.required],
    email: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
  });
  test = this.form.valueChanges.subscribe(() => console.log(this.form));
  isNewChange$: Observable<boolean> =
    this.form.controls.isNewModel.valueChanges.pipe(
      tap((val) => {
        if (!val) {
          this.form.controls.name.disable({ emitEvent: false });
          this.form.controls.lastname.disable({ emitEvent: false });
          this.form.controls['address'].disable();
          return;
        }
        this.form.controls.name.enable({ emitEvent: false });
        this.form.controls.lastname.enable({ emitEvent: false });
        this.form.get('address').enable();
      }),
      shareReplay()
    );
}
