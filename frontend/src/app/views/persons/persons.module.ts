import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';

import { PersonsComponent } from './persons.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PersonsComponent],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule
  ]
})
export class PersonsModule { }
