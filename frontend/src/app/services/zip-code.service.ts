import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  constructor(private httpClient: HttpClient) { }

  public searchZipCode(zipCode: string): Observable<object> {

    if (zipCode !== '') {
      const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
      if (regex.test (zipCode)) {
        return this.httpClient.get (`//ziptasticapi.com/${zipCode}`);
      }
    }

    return of ({});
  }
}
