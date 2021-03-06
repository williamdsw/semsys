import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from '../crud.service';

import { StateDTO } from '../../models/domain/dto/state.dto';

@Injectable({
  providedIn: 'root'
})
export class StateService extends CrudService<StateDTO> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public listStates(countryId: number): Observable<StateDTO[]> {
    return this.listAll (`${environment.API}/v1/public/countries/${countryId}/states`);
  }
}
