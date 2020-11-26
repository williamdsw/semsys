import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsFormComponent } from './reports-form/reports-form.component';

const ROUTES: Routes = [
  { path: '', component: ReportsListComponent },
  { path: 'new', component: ReportsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
