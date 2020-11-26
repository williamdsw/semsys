import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { AuthenticationService } from './services/authentication.service';

import { BaseTranslateComponent } from '../app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseTranslateComponent implements OnInit, OnDestroy {

  // FIELDS

  public title = 'semsys-frontend';

  public buttonLinks: any[] = [];
  public sidenavLinks: any[] = [
    { routerLink: '/profile', text: 'global.menu-links.profile' },
    { routerLink: '/settings', text: 'global.menu-links.settings' },
    { routerLink: '/about',  text: 'global.menu-links.about' },
  ];

  public isLoginPage = false;
  public isCollapsed = true;
  private publicUrls: string[] = ['/login', '/sign-up', '/forgot-password'];
  private subscription$: Subscription;

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    super (translateService, storageService);
    this.subscription$ = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Checks login url with SSN
        let eventUrl = event.url;
        let split = [];
        split = (eventUrl.includes('/login') ? eventUrl.split(';') : split);
        eventUrl = (split.length >= 2 ? split[0] : eventUrl);

        for (const URL of this.publicUrls) {
          if (URL.includes(eventUrl)) {
            this.isLoginPage = true;
            break;
          }

          this.isLoginPage = false;
        }

        console.log (this.isLoginPage);
        this.buttonLinks = this.buildButtonLinks();
      }
    });
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  private buildButtonLinks() {
    return [
      {
        routerLink: '/persons',
        text: 'global.menu-links.persons',
        checkProfile: this.authenticationService.containsProfile('ADMIN'),
      },
      {
        routerLink: '/employees',
        text: 'global.menu-links.employees',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE')
      },
      {
        routerLink: '/students',
        text: 'global.menu-links.students',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE'),
      },
      {
        routerLink: '/courses',
        text: 'global.menu-links.courses',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE'),
      },
      {
        routerLink: '/schedules',
        text: 'global.menu-links.my-schedules',
        checkProfile: true
      },
      {
        routerLink: '/reports',
        text: 'global.menu-links.my-reports',
        checkProfile: true,
      },
    ];
  }

  public isOnMobile() {
    const WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return (WIDTH < 768);
  }
}
