import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { JwtHelperService } from '@avatsaev/angular-jwt';

import { environment } from 'src/environments/environment';

import { StorageService } from './storage.service';

import { LocalUser } from '../models/local-user';
import { CredentialsDTO } from '../models/domain/dto/credentials.dto';
import { EmailDTO } from '../models/domain/dto/email.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper: JwtHelperService = new JwtHelperService ();

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  private doPostWithTakeOne(url: string, object: any): Observable<HttpResponse<string>> {
    return this.httpClient.post(url, object, { observe: 'response', responseType: 'text' }).pipe(take(1));
  }

  public authenticate(credentials: CredentialsDTO): Observable<HttpResponse<string>> {
    const url = `${environment.API}/login`;
    return this.doPostWithTakeOne(url, credentials);
  }

  public forgotPassword(email: EmailDTO): Observable<HttpResponse<string>> {
    const url = `${environment.API}/v1/public/auth/forgot-password`;
    return this.doPostWithTakeOne(url, email);
  }

  public refreshToken(): Observable<HttpResponse<string>> {
    const url = `${environment.API}/v1/protected/auth/refresh-token`;
    return this.doPostWithTakeOne(url, {});
  }

  public successfulLogin(bearer: string): void {
    const newToken = bearer.substring ('Bearer '.length);
    const localUser = new LocalUser ();
    localUser.setSocialSecurityNumber (this.jwtHelper.decodeToken (newToken).sub);
    localUser.setToken (newToken);
    this.storageService.setLocalUser (localUser);
  }

  public logout(): void {
    this.storageService.setLocalUser (null);
  }

  public isAuthenticated(): boolean {
    return this.storageService.getLocalUser () != null;
  }

  public containsProfile(profile: string): boolean {
    if (this.isAuthenticated ()) {
      const localUser = new LocalUser ();
      Object.assign (localUser, this.storageService.getLocalUser ());
      return localUser.getProfiles ().includes (profile);
    }

    return false;
  }
}
