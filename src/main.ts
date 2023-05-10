import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TdFormComponent } from './template-driven/td-form.component';
import { RFormComponent } from './reactive/r-form.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TdFormComponent, RFormComponent],
  template: `
    <td-form />
    <r-form />
  `,
})
export class App {}

bootstrapApplication(App);
