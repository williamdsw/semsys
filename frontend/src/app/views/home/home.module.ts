import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BootstrapModule,
    SharedModule,
  ]
})
export class HomeModule { }
