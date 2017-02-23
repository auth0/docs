<%= include('../../_includes/_login_preamble', { library: 'Angular' }) %>
<%= include('../../_includes/_auth_service_description') %>

## Install the Lock Widget

The only dependency required to power a basic login solution is Auth0's [Lock widget](/lock) which can be installed using npm.

```bash
npm install --save auth0-lock
```

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="https://cdn.auth0.com/js/lock/10.11/lock.min.js"></script>
```

Create an injectable authentication service for your application. The naming is at your discretion, but in these examples it will be called `AuthService` and the filename will be `auth.service.ts`. An instance of the Lock widget can be created in the service and its configuration can be controlled there.

<%= include('../../_includes/_auth_service_methods') %>

```js
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock(${account.clientId}, ${account.namespace}, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:4200/callback',
      responseType: 'token id_token',
      audience: `https://${account.namespace}/userinfo`
    }
  });

  constructor(public router: Router) {}

  public login(): void {
    this.lock.show();
  }

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.events
          .filter(event => event.url === '/callback')
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
```

<%= include('../../_includes/_auth_service_method_description') %>

## Use the Authentication Service in Components

With the authentication service in place, it can now be used throughout the application. The first place it should be used is in the app's root component. It's in this component that the `handleAuthentication` method needs to be called.

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

The authentication service has a method named `login` which will call the Lock widget, but a UI to make this `login` call needs to be created.

Provide a template with controls for the user to log in and log out.

```html
<!-- src/app/app.component.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - Angular 2+</a>

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

> This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.

The `click` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `AuthService` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the `Log In` button is clicked, the Lock widget will be shown, and the user can enter their credentials.

## Add a Callback Component

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and populate it with a loading indicator.

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

> This example assumes some kind of loading spinner is available in an `assets` directory. See the downloadable sample for a demonstration.

The options that were passed to the `Auth0Lock` instance above include a `redirectUrl` set to the `/callback` route. This means that the user will be redirected to this newly created route after they authenticate with a redirect-based flow.

## Using HashLocationStrategy

Single page applications generally provide two ways to accomplish routing: with hashes or without hashes. The benefit to not uses hashes is that the URLs produced for the routes are cleaner, but this also requires some configuration on the server to make it work properly.

Angular 2+ uses `PathLocationStrategy` by default, meaning that there will be no hash fragment in the URL when routes are produced. You can elect to use `HashLocationStrategy` if you like, but doing so will require a different way to handle the `authenticated` event fired by the Lock widget.

If you are using `HashLocationStrategy`, use the following method to respond to authentication transactions instead of the `handleAuthentication` method defined above.

```js
// src/app/auth/auth.service.ts

// Call this method in app.component
// if using hash-based routing
public handleAuthenticationWithHash(): void {
  this
    .router
    .events
    .filter(event => event.constructor.name === 'NavigationStart')
    .filter(event => (/access_token|id_token|error/).test(event.url))
    .subscribe(() => {
      this.lock.resumeAuth(window.location.hash, (error, authResult) => {
        if (error) return console.log(error);
        this.setSession(authResult);
        this.router.navigate(['/']);
      });
  });
}
```

This method uses the `resumeAuth` function from Lock to properly handle the hash fragment that is included with authentication results.

Call the `handleAuthenticationWithHash` method in your `AppComponent`.

```js
// src/app/auth/auth.service.ts

// ...
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthenticationWithHash();
  }

}
```