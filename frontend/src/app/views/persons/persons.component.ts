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

  ngOnInit(): void {
    this.loadData();
  }

  public onUpdate(): void {}
  public onSearch(): void {
    this.hasError = false;
    this.loadData ();
  }

  public onDelete(person: PersonDTO): void {
    this.selectedModel = person;

    const result$ = this.modalService.showConfirm (this.modalTitlesAndBodies.confirm.title, this.modalTitlesAndBodies.confirm.body);
    result$.asObservable ().pipe (
      take (1),
      switchMap (result => {
        return (result ? this.personService.deletePerson (person.getId ()) : EMPTY);
      })
    ).subscribe (
      () => {
        this.loadData ();
        this.modalService.showAlertSuccess(this.modalTitlesAndBodies.success.title, this.modalTitlesAndBodies.success.body);
      },
      () => this.modalService.showAlertDanger (this.modalTitlesAndBodies.error.title, this.modalTitlesAndBodies.error.body)
    );
  }

  protected loadData(): void {

    this.records$ = this.personService.findAllPersons ().pipe (
      map (persons => {
        return persons.map ((person) => {

          const dto = new PersonDTO ();
          Object.assign (dto, person);
          this.hasError = false;

          // bucket url
          let imageUrl = environment.BUCKET_BASE_URL;
          imageUrl += `${this.imageUtilService.buildFileName(dto.getName())}.jpg`;
          dto.setImageUrl (imageUrl);

          const imageElement = document.createElement ('img');
          imageElement.src = imageUrl;
          imageElement.addEventListener('error', () => dto.setImageUrl(environment.DEFAULT_AVATAR_IMG));

          return dto;
        });
      }),

      catchError (() => {
        this.error$.next (true);
        this.hasError = true;
        this.handleError (this.modalTitlesAndBodies.error.title, this.modalTitlesAndBodies.loading.body);
        return EMPTY;
      })
    ) as Observable<PersonDTO[]>;
  }
}
