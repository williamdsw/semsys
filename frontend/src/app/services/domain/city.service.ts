import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from '../crud.service';

import { CityDTO } from '../../models/domain/city.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService extends CrudService<CityDTO> {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public listCities (countryId: number, stateId: number) {
    return this.listAll (`${environment.API}/v1/public/countries/${countryId}/states/${stateId}/cities`);
  }
}