import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-base-translate',
  template: '<div></div>'
})
export class BaseTranslateComponent {

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService) {
    translateService.addLangs(['en', 'pt-br']);
    translateService.setDefaultLang (storageService.getDefaultLanguage ());
    //console.log (storageService);
    //translateService.setDefaultLang ('en');

  
  }

  // HELPER FUNCTIONS

  protected setDefaultLanguage(language: string): void {
    console.log ('set language?');
    this.storageService.setDefaultLanguage (language);
  }

}
