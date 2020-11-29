import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { BaseTranslateComponent } from '../../base-translate/base-translate.component';

@Component({
  selector: 'app-base-list',
  template: '<div></div>'
})
export abstract class BaseListComponent<T = any> extends BaseTranslateComponent implements OnInit {

  public globalHeader = 'header';
  public records$: Observable<T[]>;
  public error$ = new Subject<boolean>();
  public queryField = new FormControl();
  public hasError = false;
  protected params = new HttpParams();

  protected selectedModel: T;
  protected recordsCount = 0;

  // modal related
  protected modalTitlesAndBodies = {
    confirm: { title: 'modal.titles.confirmation', body: 'modal.messages.confirmation' },
    success: { title: 'modal.titles.success', body: 'modal.messages.delete-success' },
    error: { title: 'modal.titles.error', body: 'modal.messages.delete-error' },
    loading: { body: 'global.messages.system-error' }
  };

  protected confirmTitle = 'modal.titles.confirmation';
  protected confirmBody = 'modal.messages.confirmation';
  protected successTitle = 'modal.titles.success';
  protected successMessage = 'modal.messages.delete-success';
  protected errorTitle = 'modal.titles.error';
  protected errorMessage = 'modal.messages.delete-error';
  protected loadingErrorTitle = 'modal.titles.error';
  protected loadingErrorMessage = 'global.messages.system-error';

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected modalService: ModalService) {
    super(translateService, storageService);
  }

  ngOnInit(): void { }

  public abstract onUpdate(): void;
  public abstract onDelete(model: T);
  protected abstract loadData(): void;

  protected handleError(title: string, message: string): void {
    this.modalService.showAlertDanger(title, message);
  }

}
