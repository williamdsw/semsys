import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BaseTranslateComponent } from './base-translate.component';

@NgModule({
  declarations: [BaseTranslateComponent],
  imports: [CommonModule, TranslateModule]
})
export class BaseTranslateModule { }
