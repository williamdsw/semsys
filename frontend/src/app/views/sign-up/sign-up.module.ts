import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { BootstrapModule } from 'src/app/shared/bootstrap/bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
  CommonModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    BootstrapModule,
    SharedModule
  ]
})
export class SignUpModule { }
