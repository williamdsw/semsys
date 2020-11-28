import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ForgotPasswordModule { }
