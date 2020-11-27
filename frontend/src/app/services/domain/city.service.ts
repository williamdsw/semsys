import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from '../crud.service';

import { CityDTO } from '../../models/domain/dto/city.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService extends CrudService<CityDTO> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public listCities(countryId: number, stateId: number): Observable<CityDTO[]> {
    const url = `${environment.API}/v1/public/countries/${countryId}/states/${stateId}/cities`;
    return this.listAll (url);
  }
}
