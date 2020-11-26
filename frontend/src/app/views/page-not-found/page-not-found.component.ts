import { Component, OnInit } from '@angular/core';
import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: ['h1 { font-size: 10rem; }', 'h1, h2 { text-align: center; }']
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
