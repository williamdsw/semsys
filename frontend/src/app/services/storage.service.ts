import { Injectable } from '@angular/core';

import { LocalUser } from '../models/local-user';
import { STORAGE_KEYS } from 'src/config/storage-keys.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getLocalUser(): LocalUser {
    const localUser = localStorage.getItem (STORAGE_KEYS.localUser);
    return localUser ? JSON.parse (localUser) as LocalUser : null;
  }

  public setLocalUser(localUser: LocalUser): void {
    if (!localUser) {
      localStorage.removeItem (STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem (STORAGE_KEYS.localUser, JSON.stringify (localUser));
    }
  }

  public getDefaultLanguage(): string {
    const defaultLanguage = localStorage.getItem (STORAGE_KEYS.defaultLanguage);
    return defaultLanguage ? JSON.parse (defaultLanguage) : 'en';
  }

  public setDefaultLanguage(language: string): void {
    localStorage.setItem (STORAGE_KEYS.defaultLanguage, JSON.stringify (language));
  }
}
