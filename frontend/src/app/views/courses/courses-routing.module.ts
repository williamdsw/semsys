import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';

const ROUTES: Routes = [
    { path: '', component: CoursesListComponent }
];

@NgModule({
    imports: [RouterModule.forChild (ROUTES)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {}
