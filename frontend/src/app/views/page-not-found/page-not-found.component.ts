import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: ['h1 { font-size: 10rem; }']
})
export class PageNotFoundComponent extends BaseTranslateComponent implements OnInit {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService
    ) {
    super(translateService, storageService);
  }

  ngOnInit(): void { }
}
