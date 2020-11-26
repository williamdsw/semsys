import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsListComponent } from './students-list/students-list.component';

const ROUTES: Routes = [
  {
    path: '',
    component: StudentsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
