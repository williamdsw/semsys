import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { AdminGuard } from './guards/admin.guard';
import { EmployeeGuard } from './guards/employee.guard';

import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AboutComponent } from './views/about/about.component';

const ROUTES: Routes = [
  {
    path: 'persons',
    loadChildren: () => import('./views/persons/persons.module').then(mod => mod.PersonsModule),
    canActivate: [AuthenticationGuard, AdminGuard],
    canLoad: [AuthenticationGuard, AdminGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./views/employees/employees.module').then(mod => mod.EmployeesModule),
    canActivate: [AuthenticationGuard, EmployeeGuard],
    canLoad: [AuthenticationGuard, EmployeeGuard]
  },
  {
    path: 'students',
    loadChildren: () => import('./views/students/students.module').then(mod => mod.StudentsModule),
    canActivate: [AuthenticationGuard, EmployeeGuard],
    canLoad: [AuthenticationGuard, EmployeeGuard]
  },
  {
    path: 'schedules',
    loadChildren: () => import('./views/meeting-schedules/meeting-schedules.module').then(mod => mod.MeetingSchedulesModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./views/reports/reports.module').then(mod => mod.ReportsModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import('./views/courses/courses.module').then(mod => mod.CoursesModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then(mod => mod.SettingsModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(mod => mod.LoginModule),
    canActivate: [LoggedOutGuard],
    canLoad: [LoggedOutGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./views/forgot-password/forgot-password.module').then(mod => mod.ForgotPasswordModule),
    canActivate: [LoggedOutGuard],
    canLoad: [LoggedOutGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./views/sign-up/sign-up.module').then(mod => mod.SignUpModule),
    canActivate: [LoggedOutGuard],
    canLoad: [LoggedOutGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
