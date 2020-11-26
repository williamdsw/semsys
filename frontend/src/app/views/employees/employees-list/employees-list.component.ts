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

import { EmployeeDTO } from 'src/app/models/domain/employee.dto';

import { BaseCardListComponent } from 'src/app/shared/list-table/base-card-list/base-card-list.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styles: ['.card-container { max-height: 21rem; }']
})
export class EmployeesListComponent extends BaseCardListComponent<EmployeeDTO> implements OnInit {

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private employeeService: EmployeeService,
    private imageUtilService: ImageUtilService,
    protected modalService: ModalService,
    private router: Router
  ) {
    super(translateService, storageService, modalService);

    // default config
    this.globalHeader = 'global.menu-links.employees';
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    // Monta parametros da URL
    this.params = this.params.set('name', '');
    this.records$ = this.loadData(this.params);
  }

  // OVERRIDED FUNCTIONS

  public onDelete(): void { }
  public onUpdate(): void { }
  public onSearch(): void {
    this.hasError = false;

    let value = this.queryField.value;
    value = (value ? value : '');

    // Monta parametros da URL
    this.params = this.params.set('name', value);
    this.records$ = this.loadData(this.params);
  }

  protected loadData(params?: HttpParams) {

    return this.employeeService.findAllByName(params).pipe(
      map(employees => {
        return employees.map((employee) => {

          this.hasError = false;

          const DTO = new EmployeeDTO();
          Object.assign(DTO, employee);

          // bucket url
          const IMAGE_URL = `${environment.BUCKET_BASE_URL}/${this.imageUtilService.buildFileName(DTO.getName())}.jpg`;
          DTO.setImageUrl(IMAGE_URL);

          const IMAGE_ELEMENT = document.createElement('img');
          IMAGE_ELEMENT.src = IMAGE_URL;

          IMAGE_ELEMENT.onerror = () => {
            DTO.setImageUrl(environment.DEFAULT_AVATAR_IMG);
          };

          return DTO;
        });
      }),

      catchError (error => {
        console.log (error);
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.loadingErrorTitle, this.loadingErrorMessage);
        return EMPTY;
      })

    ) as Observable<EmployeeDTO[]>;
  }

  // HELPER FUNCTIONS

  public redirectToNewEmployee() {
    this.router.navigateByUrl ('employees/new');
  }
}
