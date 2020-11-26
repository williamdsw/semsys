import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  public getLanguages() {
    return this.httpClient.get ('assets/files/languages.json');
  }
}
