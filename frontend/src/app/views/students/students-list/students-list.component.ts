import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/domain/student.service';
import { ImageUtilService } from 'src/app/services/image-util.service';
import { ModalService } from 'src/app/services/modal.service';

import { StudentDTO } from 'src/app/models/domain/dto/student.dto';

import { BaseCardListComponent } from 'src/app/shared/list-table/base-card-list/base-card-list.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html'
})
export class StudentsListComponent extends BaseCardListComponent<StudentDTO> implements OnInit {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private studentService: StudentService,
    private imageUtilService: ImageUtilService,
    protected modalService: ModalService,
  ) {
    super(translateService, storageService, modalService);
    this.globalHeader = 'global.menu-links.students';
  }

  ngOnInit(): void {
    this.params = this.params.set('name', '');
    this.records$ = this.loadData(this.params);
  }

  public onDelete(): void { }
  public onUpdate(): void { }
  public onSearch(): void {
    this.hasError = false;
    this.recordsCount = 0;

    let value = this.queryField.value;
    value = (value ? value : '');

    this.params = this.params.set('name', value);
    this.records$ = this.loadData(this.params);
  }

  protected loadData(params?: HttpParams): Observable<StudentDTO[]> {
    return this.studentService.findAllByName(params).pipe(
      map(students => {
        this.recordsCount = students.length;

        return students.map((student) => {
          this.hasError = false;

          const dto = new StudentDTO ();
          Object.assign(dto, student);

          // bucket url
          let imageUrl = environment.BUCKET_BASE_URL;
          imageUrl += `/${this.imageUtilService.buildFileName(dto.getName())}.jpg`;
          dto.setImageUrl(imageUrl);

          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.addEventListener('error', () => dto.setImageUrl(environment.DEFAULT_AVATAR_IMG));

          return dto;
        });
      }),

      catchError (() => {
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.modalTexts.error.title, this.modalTexts.loading.body);
        return EMPTY;
      })

    ) as Observable<StudentDTO[]>;
  }
}
