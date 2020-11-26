import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

import { LocalUser } from 'src/app/models/local-user';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseTranslateComponent implements OnInit, OnDestroy {

  // FIELDS

  private subscription$: Subscription;

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router) {

    super(translateService, storageService);
    this.subscription$ = new Subscription();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.subscription$ = this.authenticationService.refreshToken ().subscribe (
      response => {
        const BEARER_TOKEN = response.headers.get ('Authorization');
        let localUser = new LocalUser ();
        localUser = Object.assign (localUser, this.storageService.getLocalUser ());
        localUser.setToken (BEARER_TOKEN.substring ('Bearer '.length));
        this.storageService.setLocalUser (localUser);
      },
      error => {
        console.log (error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public buildCarouselLinks() {
    return [
      {
        src: 'assets/images/icons/persons.png',
        url: '/persons',
        alt: 'global.menu-links.persons',
        checkProfile: this.authenticationService.containsProfile('ADMIN'),
      },
      {
        src: 'assets/images/icons/employees.png',
        url: '/employees',
        alt: 'global.menu-links.employees',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE')
      },
      {
        src: 'assets/images/icons/students.png',
        url: '/students',
        alt: 'global.menu-links.students',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE'),
      },
      {
        src: 'assets/images/icons/courses.png',
        url: '/courses',
        alt: 'global.menu-links.courses',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE'),
      },
      {
        src: 'assets/images/icons/schedules.png',
        url: '/schedules',
        alt: 'global.menu-links.my-schedules',
        checkProfile: this.authenticationService.containsProfile('EMPLOYEE'),
      },
      {
        src: 'assets/images/icons/reports.png',
        url: '/reports',
        alt: 'global.menu-links.my-reports',
        checkProfile: true
      },
      {
        src: 'assets/images/icons/profile.png',
        url: '/profile',
        alt: 'global.menu-links.profile',
        checkProfile: true,
      },
      {
        src: 'assets/images/icons/settings.png',
        url: '/settings',
        alt: 'global.menu-links.settings',
        checkProfile: true,
      },
      {
        src: 'assets/images/icons/about.png',
        url: '/about',
        alt: 'global.menu-links.about',
        checkProfile: true,
      },
    ];
  }
}
