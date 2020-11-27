import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { StorageService } from 'src/app/services/storage.service';

import { LocalUser } from 'src/app/models/local-user';

@Injectable ()
export class AuthenticationInterceptor implements HttpInterceptor {

    // CONSTRUCTOR

    constructor(private storageService: StorageService) {}

    // OVERRIDED FUNCTIONS

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const localUser = Object.assign (new LocalUser (), this.storageService.getLocalUser ());
        const baseUrlLength = environment.API.length;
        const requestToApi = (request.url.substring (0, baseUrlLength) === environment.API);

        if (localUser && requestToApi) {
            const bearer = `Bearer ${localUser.getToken ()}`;
            const authRequest = request.clone ({
                headers: request.headers.set ('Authorization', bearer)
            });

            return next.handle (authRequest);
        }
        else {
            return next.handle (request);
        }
    }
}

export const authenticationInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
};