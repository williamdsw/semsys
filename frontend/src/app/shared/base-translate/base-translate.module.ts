import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { BaseTranslateComponent } from './base-translate.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [BaseTranslateComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class BaseTranslateModule { }
