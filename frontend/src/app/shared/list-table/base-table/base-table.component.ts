import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '../../../services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { LocalUser } from 'src/app/models/local-user';

import { BaseListComponent } from '../base-list/base-list.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base-table',
  template: '<div></div>'
})
export abstract class BaseTableComponent<T = any> extends BaseListComponent<T> {

  // FIELDS

  protected _localUser = new LocalUser ();

  public tableHeaders: string[] = [];

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected modalService: ModalService,
  ) {
    super(translateService, storageService, modalService);
  }

  // ABSTRACT FUNCTIONS

  protected abstract pipeFindAll(observable: Observable<any>);
  public abstract onReload(): void;
}
