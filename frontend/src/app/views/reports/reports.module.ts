import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';

import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';

import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReportsListComponent, ReportsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    BootstrapModule,
    SharedModule,
  ]
})
export class ReportsModule { }
