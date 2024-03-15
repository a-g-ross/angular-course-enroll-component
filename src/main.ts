import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { ClassEnrollComponent } from './app/components/class-enroll/class-enroll.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClassEnrollComponent, HttpClientModule],
  template: `
    <app-class-enroll [courseId]="1"></app-class-enroll>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
