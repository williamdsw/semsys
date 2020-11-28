import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/domain/person.service';
import { StorageService } from 'src/app/services/storage.service';

import { CredentialsDTO } from 'src/app/models/domain/dto/credentials.dto';
import { LocalUser } from 'src/app/models/local-user';
import { PersonDTO } from 'src/app/models/domain/dto/person.dto';

import { StandardError } from 'src/app/models/standard-error';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseFormComponent<CredentialsDTO> implements OnInit, OnDestroy {

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected modalService: ModalService,
    private authenticationService: AuthenticationService,
    private personService: PersonService,
    private route: ActivatedRoute,
  ) {
    super(translateService, storageService, formBuilder, router);
    this.model = new CredentialsDTO ();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      socialSecurityNumber: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.subscription$ = this.route.params.subscribe (
      (params: any) => {
        const key = 'socialSecurityNumber';
        const socialSecurityNumber = params[key];

        if (socialSecurityNumber != null) {
          this.form.patchValue ({ socialSecurityNumber });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  // HELPER FUNCTIONS

  protected submit(): void {

    this.model = Object.assign(this.model, this.form.value);
    const waitModal = this.modalService.showWaitModal();

    setTimeout(() => {
      this.subscription$ = this.authenticationService.authenticate(this.model).subscribe(
        (response) => {
          const bearer = response.headers.get('Authorization');
          this.authenticationService.successfulLogin(bearer);
          const localUser = new LocalUser();
          Object.assign(localUser, this.storageService.getLocalUser());
          this.findLoggedUserInfo(localUser, waitModal);
        },
        (error) => {

          this.modalService.hideModal(waitModal);

          if (error.error.message) {
            const standardError = JSON.parse(error.error) as StandardError;
            this.modalService.showAlertDanger(standardError.error, standardError.message);
            return;
          }

          this.modalService.showAlertDanger('modal.titles.attention', 'modal.messages.wrong-data');
        }
      );
    }, 500);
  }

  protected showValidationModal(): void {}

  public onSignUp(): void {
    this.router.navigate(['sign-up']);
  }

  private findLoggedUserInfo(localUser: LocalUser, waitModal: BsModalRef): void {
    const url = `${environment.API}/v1/public/persons/ssn`;
    this.subscription$ = this.personService.findPersonBySSN(url, localUser.getSocialSecurityNumber())
      .subscribe((res) => {
        this.modalService.hideModal(waitModal);

        // Updating data
        const person = new PersonDTO();
        Object.assign(person, res);

        localUser.setId(person.getId());
        localUser.setType(person.getType());
        localUser.setProfiles(person.getProfiles());

        this.storageService.setLocalUser(localUser);
        this.router.navigate(['home']);
      },
      () => {
        this.modalService.hideModal(waitModal);
        this.modalService.showAlertDanger('modal.titles.error', 'modal.messages.ssn-not-found');
      }
    );
  }
}
