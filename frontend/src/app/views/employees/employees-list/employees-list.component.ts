import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

import { EmployeeService } from 'src/app/services/domain/employee.service';
import { ImageUtilService } from 'src/app/services/image-util.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';

import { BaseCardListComponent } from 'src/app/shared/list-table/base-card-list/base-card-list.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent extends BaseCardListComponent<EmployeeDTO> implements OnInit {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private employeeService: EmployeeService,
    private imageUtilService: ImageUtilService,
    protected modalService: ModalService,
    private router: Router
  ) {
    super(translateService, storageService, modalService);
    this.globalHeader = 'global.menu-links.employees';
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

  protected loadData(params?: HttpParams): Observable<EmployeeDTO[]> {
    return this.employeeService.findAllByName(params).pipe(
      map(employees => {
        this.recordsCount = employees.length;
        return employees.map((employee) => {
          this.hasError = false;

          const dto = new EmployeeDTO();
          Object.assign(dto, employee);

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
        this.recordsCount = 0;
        this.error$.next (true);
        this.handleError (this.modalTitlesAndBodies.error.title, this.modalTitlesAndBodies.loading.body);
        return EMPTY;
      })

    ) as Observable<EmployeeDTO[]>;
  }

  public redirectToNewEmployee(): void {
    this.router.navigateByUrl ('employees/new');
  }
}
