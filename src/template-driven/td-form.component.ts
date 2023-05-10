import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { AddressFormComponent } from './address-form.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  template: `
    <h1>TEMPLATE DRIVEN FORM</h1>
    <ng-container *ngIf="{
      isNew: isNewChange$ | async
    }"/>
    <form #form="ngForm">
      <span>new ?</span>
        <input type="checkbox" name="isNew" [(ngModel)]="isNewModel" #isNew="ngModel" /><br/>
      <span>email</span>  
        <input [(ngModel)]="email" name="email" required/><br/>
      <span>name</span>  
        <input [(ngModel)]="name" name="name" #nameRef="ngModel" [required]="isNewModel"/><br/>
      <span>lastname</span> 
        <input [(ngModel)]="lastname" name="lastname" #lastnameRef="ngModel" [required]="isNewModel"/><br/>
      <address-form [disabled]="addressFormDisabled$ | async"/>
      <button [disabled]="form.invalid">Submit</button>
    </form>
  `,
  imports: [FormsModule, AddressFormComponent, CommonModule],
  selector: 'td-form',
})
export class TdFormComponent implements AfterViewInit {
  name;
  email;
  lastname;
  isNewModel = true;
  @ViewChild('form') form: NgForm;
  @ViewChild('isNew') isNew: NgControl;
  @ViewChild('nameRef') nameRef: NgControl;
  @ViewChild('lastnameRef') lastnameRef: NgControl;
  @ViewChild('addressForm') addressForm: NgControl;
  isNewChange$: Observable<boolean>;
  addressFormDisabled$: Observable<boolean>;

  ngAfterViewInit(): void {
    this.isNewChange$ = this.isNew.valueChanges.pipe(
      tap((val) => {
        console.log(this.form);
        if (!val) {
          this.nameRef.control.disable({ emitEvent: false });
          this.lastnameRef.control.disable({ emitEvent: false });
          return;
        }
        this.nameRef.control.enable({ emitEvent: false });
        this.lastnameRef.control.enable({ emitEvent: false });
      }),
      shareReplay()
    );
    this.addressFormDisabled$ = this.isNewChange$.pipe(map((val) => !val));
  }
}
