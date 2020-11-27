import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  // CONSTRUCTOR

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  // OVERRIDED FUNCTIONS

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin ();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin ();
  }

  // HELPER FUNCTIONS

  private isAdmin(): boolean {
    if (this.authenticationService.isAuthenticated ()) {
      if (this.authenticationService.containsProfile ('ADMIN')) {
        return true;
      }
    }

    this.router.navigate (['/home']);
    return false;
  }
}
