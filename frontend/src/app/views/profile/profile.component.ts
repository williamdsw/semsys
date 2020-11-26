import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { ImageUtilService } from 'src/app/services/image-util.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';
import { PersonService } from 'src/app/services/domain/person.service';

import { Person } from 'src/app/models/domain/person';
import { LocalUser } from 'src/app/models/local-user';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseTranslateComponent implements OnInit, OnDestroy {

  // FIELDS

  private subscription$: Subscription;
  private localUser: LocalUser = new LocalUser();
  public userType: string;
  public person: Person = {} as Person;
  public userImageFile: File;
  private userImageLabel: HTMLElement;
  public isLoading: boolean;
  public hasError: boolean;

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private personService: PersonService,
    private imageUtilService: ImageUtilService,
    private modalService: ModalService,
  ) {

    super(translateService, storageService);

    this.subscription$ = new Subscription();
    Object.assign(this.localUser, storageService.getLocalUser());
    this.userType = this.localUser.getType();
    this.isLoading = false;
    this.hasError = false;
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public loadData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.subscription$ = this.personService.findPersonById (this.localUser.getId ()).pipe (
      map (resultPerson => {
        this.isLoading = false;
        this.hasError = false;
        Object.assign (this.person, resultPerson);

        this.userImageLabel = document.getElementById ('userImageLabel');

        // bucket url
        const IMAGE_URL = `${environment.BUCKET_BASE_URL}/${this.imageUtilService.buildFileName(this.person.name)}.jpg`;
        this.person.imageUrl = IMAGE_URL;
        const IMG = document.createElement('img');
        IMG.src = IMAGE_URL;
        IMG.onerror = () => {
          this.person.imageUrl = environment.DEFAULT_AVATAR_IMG;
        };
    }), catchError (error => {
      this.isLoading = false;
      this.hasError = true;
      this.modalService.showAlertDanger('modal.titles.error!', 'global.messages.system-error');
      return EMPTY;
    })).subscribe();
  }

  public onChange(event): void {
    if (event.srcElement.files.length === 1) {
      this.userImageFile = event.srcElement.files[0] as File;
      this.userImageLabel.innerHTML = this.userImageFile.name;
    }
  }

  public onUploadImage(): void {
    if (this.userImageFile) {
      this.subscription$ = this.personService.updateUserImage (this.userImageFile).subscribe (
        response => {
          console.log (response);
          const LOCATION = response.headers.get ('Location');

          setTimeout(() => {
            const CURRENT_TIME = new Date ().getTime ();
            this.person.imageUrl = `${LOCATION}?${CURRENT_TIME}`;
            this.userImageFile = null;
            this.userImageLabel.innerHTML = 'Select File';
          }, 100);
         },
        error => {
          console.log (error);
          this.modalService.showAlertDanger('modal.titles.error!', 'global.messages.system-error');
        }
      );
    }
  }
}
