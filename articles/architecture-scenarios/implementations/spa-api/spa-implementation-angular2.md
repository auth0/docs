---
title: "SPA + API: Angular 2 Implementation for the SPA"
description: The Angular 2 implementation of the SPA for the SPA + API architecture scenario
url: /architecture-scenarios/application/spa-api/spa-implementation-angular2
toc: true
---

# SPA + API: Angular 2 Implementation for the SPA

This document is part of the [SPA + API Architecture Scenario](/architecture-scenarios/application/spa-api) and it explains how to implement the SPA in Angular 2. Please refer to the scenario for information on the implemented solution.

::: note
The full source code for the Angular 2 implementation of the SPA can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-spa/angular).
:::

## 1. Configuration

Your application will require certain configuration information. Before carrying on with the rest of the implementation, create an `AuthConfig` interface which will contain various configuration values. Place this interface in a file called `auth0-variables.ts`.

```js
interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}
 
export const AUTH_CONFIG: AuthConfig = {
  clientID: '',
  domain: '',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: ''
};
```

## 2. Authorize the User

### Create an Authorization Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. An instance of the `WebAuth` object from [auth0.js](/libraries/auth0js) can be created in the service.

```js
import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  userProfile: any;
  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: this.requestedScopes
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert('Error: <%= "${err.error}" %>. Check the console for further details.');
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
```

The service includes several methods for handling authentication.

- __login__: calls `authorize` from auth0.js which initiates [universal login](/hosted-pages/login)
- __handleAuthentication__: looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
- __setSession__: sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
- __logout__: removes the user's tokens from browser storage
- __isAuthenticated__: checks whether the expiry time for the `access_token` has passed

### Process the Authentication Result

When a user authenticates via universal login and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` method in the `AuthService` is responsibile for processing the hash.

Call `handleAuthentication` in your app's root component so that the authentication hash fragment can be processed when the app first loads after the user is redirected back to it.

```js
// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
```

### Add the Callback Component

Using universal login means that users are taken away from your application to a page hosted by Auth0. After they successfully authenticate, they are returned to your application where a client-side session is set for them.
 
You can choose to have users return to any URL in your application that you like; however, it is recommended that you create a dedicated callback route to serve as a central location that the user will be returned to upon successful authentication. Having a single callback route is beneficial for two main reasons:

- It prevents the need to whitelist multiple (and sometimes unknown) callback URLs
- It serves as a place to show a loading indicator while your application sets the user's client-side session

Create a component named `CallbackComponent` and populate it with a loading indicator.

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

::: note
This example assumes some kind of loading spinner is available in an `assets` directory. See the downloadable sample for a demonstration.
:::

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

## 3. Get the User Profile

::: panel Extract info from the token
This section shows how to retrieve the user info using the `access_token` and the [/userinfo endpoint](/api/authentication#get-user-info). Alternatively, you can just decode the `id_token` [using a library](https://jwt.io/#libraries-io) (make sure you validate it first). The output will be the same. If you need additional user information consider using the [our Management API](/api/management/v2#!/Users/get_users_by_id).
:::

To obtain the user's profile, update the existing `AuthService` class. Add a `getProfile` function which will extract the user's `access_token` from local storage, and then pass that call the `userInfo` function to retrieve the user's information.

```js
// Existing code from the AuthService class is omitted in this code sample for brevity
@Injectable()
export class AuthService {
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
```

You can now simply call this function from any service where you want to retrieve and display information about the user.

For example you may choose to create a new component to display the user's profile information:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
}
```

The template for this component looks as follows:

```html
<div class="panel panel-default profile-area">
  <div class="panel-heading">
    <h3>Profile</h3>
  </div>
  <div class="panel-body">
    <img src="{{profile?.picture}}" class="avatar" alt="avatar">
    <div>
      <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
      <h3 class="nickname">{{ profile?.nickname }}</h3>
    </div>
    <pre class="full-profile">{{ profile | json }}</pre>
  </div>
</div>
```

## 4. Display UI Elements Conditionally Based on Scope

During the authorization process we already stored the actual scopes which a user was granted in the local storage. If the `scope` returned in the `authResult` is not empty, it means that a user was issued a different set of scopes than what was initially requested, and we should therefore use `authResult.scope` to determine the scopes granted to the user.

If the `scope` returned in `authResult` is issued is empty, it means the user was granted all the scopes that were requested, and we can therefore use the requested scopes to determine the scopes granted to the user.

Here is the code we wroter earlier for the `setSession` function that does that check:

```js
private setSession(authResult): void {
  // Set the time that the Access Token will expire at
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

  // If there is a value on the `scope` param from the authResult,
  // use it to set scopes in the session for the user. Otherwise
  // use the scopes as requested. If no scopes were requested,
  // set it to nothing
  const scopes = authResult.scope || this.requestedScopes || '';

  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  localStorage.setItem('scopes', JSON.stringify(scopes));
  this.scheduleRenewal();
}
```

Next we need to add a function to the `AuthService` class which we can call to determine if a user was granted a specific scope:

```js
@Injectable()
export class AuthService {
  // some code omitted for brevity

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
```

You can call this method to determine whether we should display a specific UI element, or not. As an example we only want to display the **Approve Timesheets** link if the user has the `approve:timesheets` scope. Note in the code below that we added a call to the `userHasScopes` function to deteremine whether that link should be displayed or not.

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Timesheet System</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li><a routerLink="/">Home</a></li>
        <li><a *ngIf="auth.isAuthenticated()" routerLink="/profile">My Profile</a></li>
        <li><a *ngIf="auth.isAuthenticated()" routerLink="/timesheets">My Timesheets</a></li>
        <li><a *ngIf="auth.isAuthenticated() && auth.userHasScopes(['approve:timesheets'])" routerLink="/approval">Approve Timesheets</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a *ngIf="!auth.isAuthenticated()" href="javascript:void(0)" (click)="auth.login()">Log In</a></li>
        <li><a *ngIf="auth.isAuthenticated()" href="javascript:void(0)" (click)="auth.logout()">Log Out</a></li>
      </ul>
    </div>
  </div>
</nav>

<main class="container">
  <router-outlet></router-outlet>
</main>
```

### Protect a route

We should also protect a route to not allow a route to be navigated to if a user has not been granted the correct scopes. For this we can add a new `ScopeGuardService` service class:

```js
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = (route.data as any).expectedScopes;

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
```

And then use that when we configure the routes to determine whether a route can be activated. Notice the use of the new `ScopeGuardService` in the definition for the `approval` route below:


```js
// app.routes.ts

import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './auth/scope-guard.service';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { ApprovalComponent } from './approval/approval.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'timesheets/add', component: TimesheetAddComponent, canActivate: [AuthGuard] },
  { path: 'timesheets', component: TimesheetListComponent, canActivate: [AuthGuard] },
  { path: 'approval', component: ApprovalComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['approve:timesheets']} },
  { path: '**', redirectTo: '' }
];
```

## 5. Call the API

The [angular2-jwt](https://github.com/auth0/angular2-jwt) module can be used to automatically attach JSON Web Tokens to requests made to your API. It does this by providing an `AuthHttp` class which is a wrapper over Angular's `Http` class.

Install `angular2-jwt`:

```text
# installation with npm
npm install --save angular2-jwt

# installation with yarn
yarn add angular2-jwt
```

Create a factory function with some configuration values for `angular2-jwt` and add it to the `providers` array in your application's `@NgModule`. The factory function should have a `tokenGetter` functon which fetches the `access_token` from local storage.

```js
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [...]
})
```

After `angular2-jwt` is configured, you can use the `AuthHttp` class to make secure calls to your API from anywhere in the application. To do so, inject `AuthHttp` in any component or service where it is needed and use it just as you would use Angular's regular `Http` class.

```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NewTimesheetModel } from '../models/new-timesheet-model';

@Injectable()
export class TimesheetsService {

  constructor(public authHttp: AuthHttp) { }

  addTimesheet(model: NewTimesheetModel) {
    return this.authHttp.post('http://localhost:8080/timesheets', JSON.stringify(model));
  }

  getAllTimesheets() {
    return this.authHttp.get('http://localhost:8080/timesheets')
      .map(res => res.json())
  }
}
```

## 6. Renew the Access Token

Renewing the user's `access_token` requires to update the Angular SPA. Add a method to the `AuthService` which calls the `checkSession` method from auth0.js. If the renewal is successful, use the existing `setSession` method to set the new tokens in local storage.

```js
public renewToken() {
  this.auth0.checkSession({
    audience: AUTH_CONFIG.apiUrl
  }, (err, result) => {
    if (!err) {
      this.setSession(result);
    }
  });
}
```

In the `AuthService` class, add a method called `scheduleRenewal` to set up a time at which authentication should be silently renewed. In the sample below this is set up to happen 30 seconds before the actual token expires. Also add a method called `unscheduleRenewal` which will unsubscribe from the Observable.

```js
public scheduleRenewal() {
  if (!this.isAuthenticated()) return;

  const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

  const source = Observable.of(expiresAt).flatMap(
    expiresAt => {

      const now = Date.now();

      // Use the delay in a timer to
      // run the refresh at the proper time
      var refreshAt = expiresAt - (1000 * 30); // Refresh 30 seconds before expiry
      return Observable.timer(Math.max(1, refreshAt - now));
    });

  // Once the delay time from above is
  // reached, get a new JWT and schedule
  // additional refreshes
  this.refreshSubscription = source.subscribe(() => {
    this.renewToken();
  });
}

public unscheduleRenewal() {
  if (!this.refreshSubscription) return;
  this.refreshSubscription.unsubscribe();
}
```

Finally you need to initiate the schedule renewal. This can be done by calling `scheduleRenewal` inside your `AppComponent` which will happen when the page is loaded. This will occur after every authentication flow, either when the user explicitly logs in, or when the silent authentication happens.
