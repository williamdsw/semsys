import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolClassesListComponent } from './school-classes-list/school-classes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolClassesFormComponent } from './school-classes-form/school-classes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';

@NgModule({
  declarations: [SchoolClassesListComponent, SchoolClassesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BootstrapModule,
    SharedModule,
  ]
})
export class SchoolClassesModule { }
