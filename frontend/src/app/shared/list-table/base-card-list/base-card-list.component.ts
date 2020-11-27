import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ModalService } from '../../../services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { BaseListComponent } from '../base-list/base-list.component';

@Component({
  selector: 'app-base-card-list',
  template: '<div></div>'
})
export abstract class BaseCardListComponent<T = any> extends BaseListComponent<T> {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected modalService: ModalService) {
    super(translateService, storageService, modalService);
  }

  public abstract onDelete(model: T): void;
  public abstract onSearch(): void;
}
