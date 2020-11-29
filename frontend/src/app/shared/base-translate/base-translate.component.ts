import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-base-translate',
  template: '<div></div>'
})
export class BaseTranslateComponent {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService) {
    translateService.addLangs(['en', 'pt-br']);
    translateService.setDefaultLang(storageService.getDefaultLanguage());
  }

  protected setDefaultLanguage(language: string): void {
    this.storageService.setDefaultLanguage (language);
  }

}
