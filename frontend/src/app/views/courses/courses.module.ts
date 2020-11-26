import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';

@NgModule({
  declarations: [CoursesListComponent, CoursesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
