import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MeetingSchedulesRoutingModule } from './meeting-schedules-routing.module';

import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MeetingSchedulesListComponent } from './meeting-schedules-list/meeting-schedules-list.component';
import { MeetingSchedulesFormComponent } from './meeting-schedules-form/meeting-schedules-form.component';

@NgModule({
  declarations: [MeetingSchedulesListComponent, MeetingSchedulesFormComponent],
  imports: [
    CommonModule,
    MeetingSchedulesRoutingModule,
    BootstrapModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MeetingSchedulesModule { }
