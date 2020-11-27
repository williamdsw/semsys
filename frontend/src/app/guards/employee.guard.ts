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
export class EmployeeGuard implements CanActivate, CanLoad {

  // CONSTRUCTOR

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  // OVERRIDED FUNCTIONS

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isEmployee ();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isEmployee ();
  }

  // HELPER FUNCTIONS

  private isEmployee(): boolean {
    if (this.authenticationService.isAuthenticated ()) {
      if (this.authenticationService.containsProfile ('EMPLOYEE')) {
        return true;
      }
    }

    this.router.navigate (['/home']);
    return false;
  }
}
