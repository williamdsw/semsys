import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

const ROUTES: Routes = [
  { path: '', component: EmployeesListComponent },
  { 
    path: 'new', 
    component: EmployeesFormComponent,
    /*resolve: {
      employee: null
    }*/
   }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
