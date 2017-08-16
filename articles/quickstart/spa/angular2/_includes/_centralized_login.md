## Add Authentication with Auth0

The Auth0 hosted login page is the fastest, most secure, and most feature-rich way to implement authentication in your app. 

You can also embed the Lock widget directly in your application. Some features, such as single sign-on, won't be accessible if you use this method. 

If you want to embed the Lock widget directly in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-angular-samples/tree/embedded-login/01-Embedded-Login).

<%= include('../../_includes/_login_preamble', { library: 'Angular 2+' }) %>

## Create an Authentication Service

Create a reusable service to manage and coordinate the tasks necessary for user authentication. You can call the service's methods from your application. 

::: note
You can name the service anything you want. In the examples below, the service is called `AuthService` and the filename is called `auth.service.ts`.
You can create an instance of the `WebAuth` object from the **auth0.js** library in the service.
:::

Create a service and instantiate `auth0.WebAuth`. Provide a `login` method which calls the `authorize` method from **auth0.js**.

```ts
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    responseType: 'token id_token',
    audience: 'https://${account.namespace}/userinfo',
    redirectUri: 'http://localhost:4200/callback',      
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}
```

::: note
**Checkpoint:** Try calling the `login` method from somewhere in your application to see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

### Finish Out the Service

Add more methods to the `AuthService` service to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's access token, ID token, and the time when the access token expires
* `logout` - removes the user's tokens and expiry time from browser storage
* `isAuthenticated` - checks whether the expiry time for the user's access token has passed

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
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
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
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
```

### About the Authentication Service

<%= include('../../_includes/_auth_service_method_description_auth0js') %>

## Provide a Login Control

Provide a template with controls for the user to log in and log out.

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
This example uses Bootstrap styles. You can use any style library you want, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` events on the buttons make calls to the `AuthService` service to let the user log out or log in. When the user clicks the **Log In** button, they are redirected to the Auth0 hosted login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

## Process the Authentication Result

When a user authenticates at the Auth0 hosted login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `AuthService` service processes the hash. 

Call the `handleAuthentication` method in your app's root component. It processess the authentication hash while your app loads. 

```ts
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

## Add a Callback Component

When you use the Auth0 hosted login page, your users are taken away from your application. After they authenticate, they are automatically returned to your application and a client-side session is set for them. 

Select a callback URL for your users to return to.

::: note
This example assumes you are using the default Angular path-based routing. If you are using hash-based routing with `{ useHash: true }`, you won't be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and populate it with a loading indicator.

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assests` directory. See the downloadable sample for demonstration. 
:::

```html
<!-- app/callback/callback.html -->

<div class="loading">
  <img src="assets/loading.svg" alt="loading">
</div>
```

After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the `/home` route.