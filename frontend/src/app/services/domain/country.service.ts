import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CountryDTO } from '../../models/domain/dto/country.dto';

import { CrudService } from '../crud.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends CrudService<CountryDTO> {

  // CONSTRUCTOR 

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public listCountries () {
    return this.listAll (`${environment.API}/v1/public/countries`);
  }
}
