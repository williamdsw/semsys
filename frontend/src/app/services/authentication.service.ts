import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { JwtHelperService } from "@avatsaev/angular-jwt";

import { environment } from 'src/environments/environment';

import { StorageService } from './storage.service';

import { CredentialsDTO } from '../models/domain/credentials.dto';
import { LocalUser } from '../models/local-user';
import { EmailDTO } from '../models/domain/email.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // FIELDS

  private jwtHelper: JwtHelperService = new JwtHelperService ();

  // CONSTRUCTOR

  constructor(
    private httpClient: HttpClient, 
    private storageService: StorageService) { }

  // HELPER FUNCTIONS

  public authenticate(credentials: CredentialsDTO) {
    const URL = `${environment.API}/login`;
    return this.httpClient.post (URL, credentials, {
      observe: 'response',
      responseType: 'text',
    }).pipe (take (1));
  }

  public forgotPassword(email: EmailDTO) {
    return this.httpClient.post(`${environment.API}/v1/public/auth/forgot-password`, email, {
      observe: 'response',
      responseType: 'text'
    }).pipe (take (1));
  }

  public refreshToken() {
    const URL = `${environment.API}/v1/protected/auth/refresh-token`;
    return this.httpClient.post (URL, {}, {
      observe: 'response', responseType: 'text'
    }).pipe (take (1));
  }

  public successfulLogin (authorizationBearer: string) : void {
    let newToken = authorizationBearer.substring ("Bearer ".length);

    let localUser = new LocalUser ();
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
      let localUser = new LocalUser ();
      Object.assign (localUser, this.storageService.getLocalUser ());
      return localUser.getProfiles ().includes (profile);
    }

    return false;
  }
}
