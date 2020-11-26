import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {

  // CONSTRUCTOR

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  // OVERRIDED FUNCTIONS

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess ();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess ();
  }

  // HELPER FUNCTIONS

  private verifyAccess(): boolean {
    if (this.authenticationService.isAuthenticated ()) {
      return true;
    }

    this.router.navigate (['/login']);
    return false;
  }
  
}
