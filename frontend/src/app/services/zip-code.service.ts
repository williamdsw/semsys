import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  // CONSTRUCTOR

  constructor(private httpClient: HttpClient) { }

  // HELPER FUNCTIONS

  searchZipCode(zipCode: string) {

    if (zipCode !== '') {
      const REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;
      console.log (REGEX.test (zipCode));
      if (REGEX.test (zipCode)) {
        return this.httpClient.get (`//ziptasticapi.com/${zipCode}`);
      }
    }

    return of ({});
  }
}
