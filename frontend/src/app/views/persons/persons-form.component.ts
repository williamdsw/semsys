import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { CountryService } from 'src/app/services/domain/country.service';
import { StateService } from 'src/app/services/domain/state.service';
import { CityService } from 'src/app/services/domain/city.service';
import { StorageService } from 'src/app/services/storage.service';
import { PersonService } from 'src/app/services/domain/person.service';

import { CountryDTO } from 'src/app/models/domain/country.dto';
import { StateDTO } from 'src/app/models/domain/state.dto';
import { CityDTO } from 'src/app/models/domain/city.dto';
import { PersonDTO } from 'src/app/models/domain/person.dto';

import { FormValidators } from 'src/app/shared/utils/form-validators';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
    selector: 'app-persons-form',
    template: '<div></div>'
})
export abstract class PersonsFormComponent<T> extends BaseFormComponent<T> implements OnInit, OnDestroy {

    // FIELDS

    protected currentCountryId = 0;
    protected currentStateAbbreviation = '';
    protected currentCityName = '';

    public countries$: Observable<CountryDTO[]>;
    protected countries: CountryDTO[] = [];
    public states: StateDTO[] = [];
    public cities: CityDTO[] = [];

    private previousSocialSecurityNumber = '';
    private previousEmail = '';
    protected socialSecurityNumberExists = false;
    protected emailExists = false;

    // CONSTRUCTOR

    constructor(
        protected translateService: TranslateService,
        protected storageService: StorageService,
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected modalService: ModalService,
        protected zipCodeService: ZipCodeService,
        protected countryService: CountryService,
        protected stateService: StateService,
        protected cityService: CityService,
        protected personService: PersonService,
    ) {
        super(translateService, storageService, formBuilder, router);
        this.showModal = true;
    }

    // LIFECYCLE HOOKS

    ngOnInit(): void {

        // default values
        this.countries$ = this.loadCountries ();
        this.form = this.buildForm ();
        this.form.valueChanges.subscribe (response => { Object.assign (this.model, response); });

        this.form.get ('countryId').valueChanges.subscribe (
            countryId => {
                if (countryId !== null && countryId !== '') {
                    this.loadStates (countryId);
                } else {
                    this.states = [];
                    this.cities = [];
                }
            },
            error => this.states = []
        );

        this.form.get ('stateId').valueChanges.subscribe (
            stateId => {
                if (this.currentCountryId !== null && this.currentCountryId !== 0 && stateId !== null && stateId !== '') {
                    this.loadCities (stateId);
                } else {
                    this.cities = [];
                }
            },
            error => this.cities = []
        );

        this.form.get ('zipCode').statusChanges.pipe (
            distinctUntilChanged (),
            switchMap (status => {
                return status === 'VALID' ? this.zipCodeService.searchZipCode (this.form.get ('zipCode').value) : EMPTY;
            })
        ).subscribe (data => data ? this.loadAddressData (data) : {});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe ();
    }

    // OVERRIDED FUNCTIONS

    protected showValidationModal(currentForm: FormGroup) {

        const FIELDS: string[] = [];
        Object.keys (currentForm.controls).forEach (field => { FIELDS.push (field); });

        FIELDS.map ((name, index) => {
          if (name.endsWith ('Id')) {
            name = name.replace ('Id', '');
          }

          name = name.split ('').map (char => char === char.toUpperCase () ? ` ${char}` : char).join('');
          name = (name.substring (0, 1).toUpperCase () + name.substring (1, name.length));
          FIELDS[index] = name;
        });

        this.modalService.showValidations (FIELDS);
      }

    // HELPER FUNCTIONS

    private loadCountries() {
        return this.countryService.listCountries ().pipe (
            map (countries => {
                return countries.map (country => {
                    const DTO = new CountryDTO ();
                    Object.assign (DTO, country);
                    this.countries.push (DTO);
                    return DTO;
                });
            })
        );
    }

    private loadStates(countryId: string) {
        this.currentCountryId = parseInt (countryId, 10);
        this.subscription = this.stateService.listStates (parseInt (countryId, 10)).subscribe (
            (loadedStates: StateDTO[]) => {
                this.states = loadedStates.map (state => {
                    const DTO = new StateDTO ();
                    Object.assign (DTO, state);
                    return DTO;
                });

                setTimeout (() => {
                    if (this.currentStateAbbreviation !== '') {
                        const STATE = this.states.filter (state => state.getAbbreviation () === this.currentStateAbbreviation)[0];
                        if (STATE != null) {
                            this.form.patchValue ({ stateId: STATE.getId () });
                        } else {
                            this.currentStateAbbreviation = '';
                        }
                    }
                }, 100);
            },
            error => this.states = []
        );
    }

    private loadCities(stateId: string) {
        this.subscription = this.cityService.listCities (this.currentCountryId, parseInt (stateId, 10)).subscribe (
            (loadedCities: CityDTO[]) => {
                this.cities = loadedCities.map (city => {
                    const DTO = new CityDTO ();
                    Object.assign (DTO, city);
                    return DTO;
                });

                setTimeout (() => {
                    if (this.currentCityName !== '') {
                        const CITY = this.cities.filter (
                            city => city.getName ().toLowerCase () === this.currentCityName.toLowerCase ())[0];

                        if (CITY != null) {
                            this.form.patchValue ({ cityId: CITY.getId () });
                        } else {
                            this.currentCityName = '';
                        }
                    }
                }, 100);
            },
            error => this.cities = []
        );
    }

    private buildForm() {
        return this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength (5), Validators.maxLength (120)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength (30)]],
            socialSecurityNumber: [null, [Validators.required, Validators.minLength (11), Validators.maxLength (11)]],
            password: [null, [Validators.required, Validators.minLength (10), Validators.maxLength (20)]],
            confirmPassword: [null, [Validators.required, FormValidators.equalsTo ('password')]],
            phoneNumbers: this.formBuilder.group({
                phoneNumber0: [null, [Validators.required, Validators.minLength (12), Validators.maxLength (12)]],
                phoneNumber1: [null, [Validators.minLength (12), Validators.maxLength (12)]],
                phoneNumber2: [null, [Validators.minLength (12), Validators.maxLength (12)]],
            }),
            street: [null, [Validators.required, Validators.minLength (5), Validators.maxLength (120)]],
            number: [null, [Validators.required, Validators.minLength (1), Validators.maxLength (5)]],
            complement: [null],
            zipCode: [null, [Validators.required, Validators.minLength(5), Validators.maxLength (10), FormValidators.zipCode]],
            countryId: [null, [Validators.required]],
            stateId: [null, [Validators.required]],
            cityId: [null, [Validators.required]],
        });
    }

    private loadAddressData(data: any) {

        if (!('error' in data)) {

            const CURRENT_COUNTRY = this.countries.filter (country => country.getAbbreviation ().includes (data.country))[0];
            if (CURRENT_COUNTRY != null) {
                this.currentCountryId = CURRENT_COUNTRY.getId ();
                this.currentStateAbbreviation = data.state;
                this.currentCityName = data.city;
                this.form.patchValue ({ countryId: CURRENT_COUNTRY.getId () });
            }
        } else {
            this.modalService.showAlertDanger ('modal.titles.attention', 'modal.messages.zipcode-not-found');
        }
    }

    private searchSocialSecurityNumber(socialSecurityNumber: string) {
        if (this.form.get('socialSecurityNumber').valid) {
            if (this.previousSocialSecurityNumber !== socialSecurityNumber) {
                const URL = `${environment.API}/v1/public/persons/ssn`;
                this.subscription = this.personService.findPersonBySSN(URL, socialSecurityNumber).subscribe(
                    response => {
                        const DTO = response as PersonDTO;
                        if (DTO != null) {
                            this.socialSecurityNumberExists = true;
                            this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.ssn-found');
                        }
                    },
                    error => {
                        console.log (error);
                        this.socialSecurityNumberExists = false;
                        this.previousSocialSecurityNumber = socialSecurityNumber;
                    }
                );
            }
        }
    }

    private searchEmail(email: string) {
        if (this.form.get('email').valid) {
            if (this.previousEmail !== email) {
                const URL = `${environment.API}/v1/public/persons/email`;
                this.subscription = this.personService.findPersonByEmail(URL, email).subscribe(
                    response => {
                        const DTO = response as PersonDTO;
                        if (DTO != null) {
                            this.emailExists = true;
                            this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.email-found');
                        }
                    },
                    error => {
                        console.log (error);
                        this.emailExists = false;
                        this.previousEmail = email;
                    }
                );
            }
        }
    }

    public onSocialSecurityNumberFocusOut(value: string): void {
        this.searchSocialSecurityNumber (value);
    }

    public onEmailFocusOut(value: string): void {
        this.searchEmail (value);
    }
}
