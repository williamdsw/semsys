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

  // CONSTRUCTOR

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
    this.subscription = new Subscription();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // OVERRIDED FUNCTIONS

  protected submit() {
    this.model = Object.assign(this.model, this.form.value) as EmailDTO;
    const WAIT_MODAL = this.modalService.showWaitModal ();

    this.subscription = this.authenticationService.forgotPassword(this.model).subscribe(
      res => {
        this.modalService.hideModal (WAIT_MODAL);
        this.modalService.showAlertSuccess ('modal.titles.success', 'modal.titles.check-your-email');
        this.router.navigate (['login']);
      },
      err => {
        this.modalService.hideModal (WAIT_MODAL);
        this.modalService.showAlertDanger ('modal.titles.attention', 'modal.messages.post-error');
      }
    );
  }

  protected showValidationModal(form: any) {
    this.modalService.showAlertDanger('modal.titles.attention', 'modal.messages.enter-valid-email');
  }

  // HELPER FUNCTIONS

  public onCancel(): void {
    this.router.navigate(['login']);
  }
}
