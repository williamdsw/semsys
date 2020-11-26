import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { ReportDetailsModalComponent } from './modals/report-details-modal/report-details-modal.component';
import { ValidationsModalComponent } from './modals/validations-modal/validations-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { WaitModalComponent } from './modals/wait-modal/wait-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent,
    ReportDetailsModalComponent,
    ValidationsModalComponent,
    ErrorMessageComponent,
    WaitModalComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
  ],
  exports: [
    AlertModalComponent,
    ConfirmModalComponent,
    ReportDetailsModalComponent,
    ValidationsModalComponent,
    ErrorMessageComponent,
    WaitModalComponent,
    NgxMaskModule,
    TranslateModule,
  ],
  providers: [TranslatePipe]
})
export class SharedModule { }

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
