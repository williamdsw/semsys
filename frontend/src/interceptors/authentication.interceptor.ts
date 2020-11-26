import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
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
        let localUser = Object.assign (new LocalUser (), this.storageService.getLocalUser ());
        const BASE_URL_LENGTH = environment.API.length;
        const REQUEST_TO_API = (request.url.substring (0, BASE_URL_LENGTH) == environment.API);

        if (localUser && REQUEST_TO_API) {
            const BEARER = `Bearer ${localUser.getToken ()}`;
            const AUTH_REQUEST = request.clone ({
                headers: request.headers.set ('Authorization', BEARER)
            });

            return next.handle (AUTH_REQUEST);
        }
        else {
            return next.handle (request);
        }
    }
}

export const AUTHENTICATOR_INTERCEPTOR_PROVIDER = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
};