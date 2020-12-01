import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { authenticationInterceptorProvider } from 'src/interceptors/authentication.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { BootstrapModule } from './shared/bootstrap/bootstrap.module';
import { SharedModule } from './shared/shared.module';

import { SchoolClassesModule } from './views/school-classes/school-classes.module';
import { PageNotFoundModule } from './views/page-not-found/page-not-found.module';

import { AppComponent } from './app.component';
import { AboutModule } from './views/about/about.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BootstrapModule,
    SharedModule,
    ModalModule.forRoot(),
    SchoolClassesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PageNotFoundModule,
    AboutModule
  ],
  providers: [authenticationInterceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

export function httpTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader (httpClient, 'assets/i18n/', '.json');
}
