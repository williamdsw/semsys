import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanLoad {

  // CONSTRUCTOR

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  // OVERRIDED FUNCTIONS

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedOut ();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedOut ();
  }

  // HELPER FUNCTIONS

  private isLoggedOut(): boolean {
    if (!this.authenticationService.isAuthenticated ()) {
      return true;
    }

    this.router.navigate (['/home']);
    return false;
  }
  
}
