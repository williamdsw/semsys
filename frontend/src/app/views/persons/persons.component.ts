import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { PersonService } from 'src/app/services/domain/person.service';
import { ImageUtilService } from 'src/app/services/image-util.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { PersonDTO } from 'src/app/models/domain/dto/person.dto';

import { BaseCardListComponent } from 'src/app/shared/list-table/base-card-list/base-card-list.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent extends BaseCardListComponent<PersonDTO> implements OnInit {

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private personService: PersonService,
    private imageUtilService: ImageUtilService,
    protected modalService: ModalService,
  ) {
    super(translateService, storageService, modalService);

    // default config
    this.globalHeader = 'global.menu-links.persons';
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.loadData();
  }

  // OVERRIDED FUNCTIONS

  public onUpdate(): void {}
  public onSearch(): void {
    this.hasError = false;
    this.loadData ();
  }

  public onDelete(person: PersonDTO): void {
    this.selectedModel = person;

    const RESULT$ = this.modalService.showConfirm (this.confirmTitle, this.confirmBody);
    RESULT$.asObservable ().pipe (
      take (1),
      switchMap (result => {
        return (result ? this.personService.deletePerson (person.getId ()) : EMPTY);
      })
    ).subscribe (
      success => {
        this.loadData ();
        this.modalService.showAlertSuccess (this.successTitle, this.successMessage);
      },
      error => this.modalService.showAlertDanger (this.errorTitle, this.errorMessage)
    );
  }

  protected loadData(): void {

    this.records$ = this.personService.findAllPersons ().pipe (
      map (persons => {
        return persons.map ((person) => {

          const DTO = new PersonDTO ();
          Object.assign (DTO, person);
          this.hasError = false;

          // bucket url
          const IMAGE_URL = `${environment.BUCKET_BASE_URL}/${this.imageUtilService.buildFileName (DTO.getName ())}.jpg`;
          DTO.setImageUrl (IMAGE_URL);

          const IMAGE_ELEMENT = document.createElement ('img');
          IMAGE_ELEMENT.src = IMAGE_URL;

          IMAGE_ELEMENT.onerror = () => {
            DTO.setImageUrl (environment.DEFAULT_AVATAR_IMG);
          };

          return DTO;
        });
      }),

      catchError (error => {
        console.log (error);
        this.error$.next (true);
        this.hasError = true;
        this.handleError (this.loadingErrorTitle, this.loadingErrorMessage);
        return EMPTY;
      })
    ) as Observable<PersonDTO[]>;
  }
}
