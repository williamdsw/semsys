import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
  private localUser = new LocalUser();
  public userType: string;
  public person = {} as Person;
  public userImageFile: File;
  public isLoading: boolean;
  public hasError: boolean;
  public blob: string;

  @ViewChildren('userImage')
  public userImageRef: QueryList<ElementRef<HTMLImageElement>>;

  private userImage: HTMLImageElement;

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

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  public loadData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.subscription$ = this.personService.findPersonById (this.localUser.getId ()).pipe (
      map (resultPerson => {
        this.isLoading = false;
        this.hasError = false;
        Object.assign (this.person, resultPerson);

        // bucket url
        const imageUrl = `${environment.BUCKET_BASE_URL}/${this.imageUtilService.buildFileName(this.person.name)}.jpg`;
        this.person.imageUrl = imageUrl;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.addEventListener('error', () => this.person.imageUrl = environment.DEFAULT_AVATAR_IMG);
      }),
    catchError(() => {
      this.isLoading = false;
      this.hasError = true;
      this.modalService.showAlertDanger('modal.titles.error!', 'global.messages.system-error');
      return EMPTY;
    })).subscribe();
  }

  public onChange(event): void {
    if (event.srcElement.files.length === 1) {
      this.userImageFile = event.srcElement.files[0] as File;
      this.blob = URL.createObjectURL(this.userImageFile);
      this.userImage = (this.userImageRef.first as ElementRef<HTMLImageElement>).nativeElement;
      this.userImage.src = this.blob;
    }
  }

  public onUploadImage(): void {
    if (this.userImageFile) {
      const waitModal = this.modalService.showWaitModal();

      setTimeout(() => {
        this.subscription$ = this.personService.updateUserImage(this.userImageFile).subscribe(
          (response) => {
            const location = response.headers.get('Location');

            setTimeout(() => {
              const currentTime = new Date().getTime();
              this.person.imageUrl = `${location}?${currentTime}`;
              URL.revokeObjectURL(this.blob);
              this.userImageFile = null;

              this.modalService.hideModal(waitModal);
              this.modalService.showAlertSuccess('modal.titles.success', 'modal.messages.operation-succeed');

            }, 100);
          },
          () => {
            this.modalService.hideModal(waitModal);
            this.modalService.showAlertDanger('modal.titles.error!', 'global.messages.system-error');
          }
        );
      }, 500);
    }
  }
}
