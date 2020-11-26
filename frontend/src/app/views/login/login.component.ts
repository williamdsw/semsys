import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/domain/person.service';
import { StorageService } from 'src/app/services/storage.service';

import { CredentialsDTO } from 'src/app/models/domain/credentials.dto';
import { LocalUser } from 'src/app/models/local-user';
import { PersonDTO } from 'src/app/models/domain/person.dto';
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

    this.subscription = this.route.params.subscribe (
      (params: any) => {
        const KEY = 'socialSecurityNumber';
        const SOCIAL_SECURITY_NUMBER = params[KEY];

        if (SOCIAL_SECURITY_NUMBER != null) {
          this.form.patchValue ({ socialSecurityNumber: SOCIAL_SECURITY_NUMBER });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // HELPER FUNCTIONS

  protected submit(): void {

    this.model = Object.assign(this.model, this.form.value);
    const WAIT_MODAL = this.modalService.showWaitModal ();

    this.subscription = this.authenticationService.authenticate(this.model).subscribe(
      response => {
        const AUTHOTIZATION_BEARER = response.headers.get('Authorization');
        this.authenticationService.successfulLogin(AUTHOTIZATION_BEARER);

        // Check user and SSN
        const LOCAL_USER = new LocalUser();
        Object.assign(LOCAL_USER, this.storageService.getLocalUser());

        const URL = `${environment.API}/v1/public/persons/ssn`;
        this.subscription = this.personService.findPersonBySSN (URL, LOCAL_USER.getSocialSecurityNumber()).subscribe(
          (childResponse) => {
            this.modalService.hideModal (WAIT_MODAL);

            const PERSON = new PersonDTO ();
            Object.assign (PERSON, childResponse);

            LOCAL_USER.setId (PERSON.getId ());
            LOCAL_USER.setType (PERSON.getType ());
            LOCAL_USER.setProfiles (PERSON.getProfiles ());

            this.storageService.setLocalUser (LOCAL_USER);
            this.router.navigate (['home']);
          },
          error => {
            this.modalService.hideModal (WAIT_MODAL);
            this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.ssn-not-found');
          }
        );
      },
      error => {

        this.modalService.hideModal (WAIT_MODAL);

        if (error.error.message) {
          const STANDARD_ERROR: StandardError = JSON.parse (error.error) as StandardError;
          this.modalService.showAlertDanger (STANDARD_ERROR.error, STANDARD_ERROR.message);
          return;
        }

        this.modalService.showAlertDanger ('modal.titles.error', 'global.messages.system-error');

      }
    );
  }

  protected showValidationModal() {}

  // HELPER FUNCTIONS

  public onSignUp(): void {
    this.router.navigate(['sign-up']);
  }
}
