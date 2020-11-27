import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseTranslateComponent implements OnInit, OnDestroy {

  public languages: {};
  private defaultLanguage: string;
  public currentLanguage: string;
  private subscription$: Subscription;

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private dropdownService: DropdownService,
    private modalService: ModalService) {
      super (translateService, storageService);
      this.subscription$ = new Subscription();
      this.defaultLanguage = this.currentLanguage = '';
  }

  ngOnInit(): void {

    this.subscription$ = this.dropdownService.getLanguages ().subscribe (
      (response) => this.languages = response,
      () =>
        this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.unable-load')
    );

    this.defaultLanguage = this.currentLanguage = this.translateService.getDefaultLang ();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public onApply(): void {

    if (this.currentLanguage === '') {
      this.modalService.showAlertDanger ('modal.titles.attention', 'settings.choose-language');
      return;
    }

    if (this.currentLanguage === this.defaultLanguage) {
      this.modalService.showAlertDanger ('modal.titles.attention', 'settings.choose-different-language');
      return;
    }

    if (this.defaultLanguage !== this.currentLanguage) {
      this.translateService.setDefaultLang (this.currentLanguage);
      super.setDefaultLanguage (this.currentLanguage);
      this.defaultLanguage = this.currentLanguage;
      this.modalService.showAlertSuccess ('modal.titles.success', 'modal.messages.setting-applied');
    }
  }
}
