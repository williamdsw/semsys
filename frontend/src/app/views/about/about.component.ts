import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseTranslateComponent implements OnInit {

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService
    ) {
    super(translateService, storageService);
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void { }
}
