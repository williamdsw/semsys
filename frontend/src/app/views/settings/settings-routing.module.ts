import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

const ROUTES: Routes = [
    { path: '', component: SettingsComponent }
];

@NgModule({
    imports: [RouterModule.forChild (ROUTES)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
