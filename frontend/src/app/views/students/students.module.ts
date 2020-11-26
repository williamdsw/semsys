import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentsListComponent } from './students-list/students-list.component';

@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BootstrapModule,
    SharedModule
  ]
})
export class StudentsModule { }
