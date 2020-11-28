import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from 'src/app/services/storage.service';
import { ModalService } from 'src/app/services/modal.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { EmailDTO } from 'src/app/models/domain/dto/email.dto';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent extends BaseFormComponent<EmailDTO> implements OnInit, OnDestroy {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected modalService: ModalService,
    private authenticationService: AuthenticationService
  ) {
    super(translateService, storageService, formBuilder, router);

    this.showModal = true;
    this.model = new EmailDTO();
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected submit(): void {
    this.model = Object.assign(this.model, this.form.value) as EmailDTO;
    const waitModal = this.modalService.showWaitModal();

    setTimeout(() => {
      this.subscription$ = this.authenticationService.forgotPassword(this.model).subscribe(
        () => {
          this.modalService.hideModal (waitModal);
          this.modalService.showAlertSuccess ('modal.titles.success', 'modal.titles.check-your-email');
          this.router.navigate (['login']);
        },
        () => {
          this.modalService.hideModal (waitModal);
          this.modalService.showAlertDanger ('modal.titles.attention', 'modal.messages.post-error');
        }
      );
    }, 500);
  }

  protected showValidationModal(form: any): void {
    this.modalService.showAlertDanger('modal.titles.attention', 'modal.messages.enter-valid-email');
  }
}
