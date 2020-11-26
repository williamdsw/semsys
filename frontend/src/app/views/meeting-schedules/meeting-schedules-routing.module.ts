import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingSchedulesListComponent } from './meeting-schedules-list/meeting-schedules-list.component';
import { MeetingSchedulesFormComponent } from './meeting-schedules-form/meeting-schedules-form.component';

const ROUTES: Routes = [
  { path: '', component: MeetingSchedulesListComponent },
  { path: 'new', component: MeetingSchedulesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MeetingSchedulesRoutingModule { }
