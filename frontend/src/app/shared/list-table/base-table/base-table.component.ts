import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../../services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { LocalUser } from 'src/app/models/local-user';

import { BaseListComponent } from '../base-list/base-list.component';

@Component({
  selector: 'app-base-table',
  template: '<div></div>'
})
export abstract class BaseTableComponent<T = any> extends BaseListComponent<T> {

  protected _localUser = new LocalUser ();
  public tableHeaders: string[] = [];

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected modalService: ModalService,
  ) {
    super(translateService, storageService, modalService);
  }

  protected abstract pipeFindAll(observable: Observable<any>): any;
  public abstract onReload(): void;
}
