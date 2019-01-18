<%= include('../../_includes/_login_preamble', { library: 'Angular 2+', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-angular-samples/tree/embedded-login/01-Embedded-Login'}) %>

### Create an Authentication Service

Create a service to manage and coordinate user authentication. You can give the service any name. In the examples below, the service is `AuthService` and the filename is `auth.service.ts`.

In the service add an instance of the `auth0.WebAuth` object. When creating that instance, you can specify the following:
<%= include('../../_includes/_auth_service_configure_client_details') %>

::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

Add `_idToken`, `_accessToken`, `_expiresAt` properties to `AuthService` Class to store the ID Token, Access Token and Access Token's expiry time respectively. This values will be populated on successful auth. Add the getters for the ID Token and the Access Token.

Add a `login` method that calls the `authorize` method from auth0.js.

```ts
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

}
```

::: note
 **Checkpoint:** Try to call the `login` method from somewhere in your application to see the login page. For example, you can trigger the method from a button click or a lifecycle event.
 :::
 
 ![hosted login](/media/articles/web/hosted-login.png)
 
### Finish the Service

Add more methods to the `AuthService` service to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication`: looks for the result of authentication in the URL hash. Then, the result is processed with the `parseHash` method from auth0.js.
* `localLogin`: stores the user's Access Token, ID Token, and the Access Token's expiry time in `AuthService` properties.
* `renewTokens`: performs silent authentication to renew the session.
* `logout`: removes the user's tokens and expiry time from `AuthService` properties.
* `isAuthenticated`: checks whether the expiry time for the user's Access Token has passed.

```ts
// src/app/auth/auth.service.ts

// ...
@Injectable()
export class AuthService {

  // ...
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (<%= "${err.error}" %>: <%= "${err.error_description}" %>).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

}
```

### Provide a Login Control

Provide a template with controls for the user to log in and out.

```html
<!-- src/app/app.component.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - Angular</a>

      <button
        class="btn btn-primary btn-margin"
        routerLink="/">
          Home
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="!auth.isAuthenticated()"
        (click)="auth.login()">
          Log In
      </button>

      <button
        class="btn btn-primary btn-margin"
        *ngIf="auth.isAuthenticated()"
        (click)="auth.logout()">
          Log Out
      </button>

    </div>
  </div>
</nav>

<main class="container">
  <router-outlet></router-outlet>
</main>
```

::: note
This example uses Bootstrap styles. You can use any style library, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` events on the buttons make calls to the `AuthService` service to let the user log in or out. When the user clicks **Log In**, they are redirected to the login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

### Add a Callback Component

When you use Universal Login, your users are taken away from your application. After they authenticate, they are automatically returned to your application and a client-side session is set for them. 

::: note
This example assumes you are using the default Angular path-based routing. If you are using hash-based routing with `{ useHash: true }`, you will not be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and add a loading indicator.

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assets` directory. See the downloadable sample for demonstration. 
:::

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the `/home` route.

## Handle Authentication Tokens

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `AuthService` service processes the hash. 

Call the `handleAuthentication` method in your app's root component. The method processes the authentication hash while your app loads.

```ts
// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
  }

}
```
