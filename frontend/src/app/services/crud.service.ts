import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class CrudService<T> {

  constructor(protected httpClient: HttpClient) { }

  protected listAll(apiUrl: string, params?: HttpParams): Observable<T[]> {
    return this.httpClient.get<T[]>(apiUrl, { params }).pipe (take (1));
  }

  protected findUnique(apiUrl: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(apiUrl, { params }).pipe (take (1));
  }

  protected insert(apiUrl: string, record: T): Observable<any> {
    return this.httpClient.post (apiUrl, record).pipe (take (1));
  }

  protected update(apiUrl: string, record: T): Observable<any> {
    return this.httpClient.put (apiUrl, record).pipe (take (1));
  }

  protected delete(apiUrl: string): Observable<any> {
    return this.httpClient.delete (apiUrl).pipe (take (1));
  }

}
