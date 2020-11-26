import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees-routing.module';
import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

@NgModule({
  declarations: [EmployeesListComponent, EmployeesFormComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BootstrapModule,
    SharedModule,
  ]
})
export class EmployeesModule { }
