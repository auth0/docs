<%= include('../../_includes/_login_preamble', { library: 'Angular 2+', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-angular-samples/tree/embedded-login/01-Embedded-Login'}) %>

## Create an Authentication Service

As a first step, create an `auth` sub-directory within your `src` directory. If you created your project using the Angular CLI, a good location for the `auth` sub-directory is `src/app`. 

Create a service to manage and coordinate user authentication. You can give the service any name. In the example below, we create `AuthService` within an `auth.service.ts` file that is placed within the `auth` sub-directory.

In the service add an instance of the `auth0.WebAuth` object. When creating that instance, you can specify the following:
<%= include('../../_includes/_auth_service_configure_client_details') %>

::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

Add a `login` method that calls the `authorize` method from auth0.js.

```ts
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/callback',
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }
}
```

::: note
If you specified a different `redirectUri` in the Auth0 application settings, please ensure that you update it in the `auth0.WebAuth` configuration shown above. 
:::

Register `AuthService` as a provider with the appropriate module. Since, `AuthService` uses `Router` from `@angular/router`, be sure that the module imports and initializes `RouterModule`, like so:

```ts
// src/app/app.module.ts

// .. 

import {AuthService} from './auth/auth.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(<YOUR ROUTES>)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
 
 To test the `login` method, inject `AuthService` into the constructor of one of your components. Then, call `login` from somewhere within the component, such as a button or a lifecycle hook, to trigger the call to the Auth0 hosted login page. For example: 

```ts
// src/app/app.component.ts

// ...

import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthService) {}
}
```

```html
<!-- src/app/app.component.html -->
 <button (click)="auth.login()">Login</button>
```
 
![hosted login](/media/articles/web/hosted-login.png)
 
With the above configuration, we are going to get an error message after we log in because we have not defined a Callback Component yet. Before we do so, let's add a few more methods to `AuthService` for completeness and create a login control through a form to exemplify how the different `AuthService` methods are used.
 
### Finish the Service

Add more methods to the `AuthService` service to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication`: looks for the result of authentication in the URL hash. Then, the result is processed with the `parseHash` method from auth0.js.
* `setSession`: stores the user's Access Token, ID Token, and the Access Token's expiry time in browser storage.
* `logout`: removes the user's tokens and expiry time from browser storage.
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
        this.setSession(authResult);
        this.router.navigate([<ROUTE TO NAVIGATE ON AUTHENTICATION SUCCESS>]);
      } else if (err) {
        this.router.navigate([<ROUTE TO NAVIGATE ON AUTHENTICATION ERROR>]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
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
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}

```

## Provide a Login Control

Provide a template with controls for the user to log in and out. For example: 

```html
<!-- src/app/app.component.html -->

<nav>
  <div>
      <a href="#">Auth0 - Angular</a>
      <form>
        <button routerLink="/" type="button">
            Home
        </button>

        <button id="qsLoginBtn"
          *ngIf="!auth.isAuthenticated()"
          (click)="auth.login()" type="button">
            Log In
        </button>

        <button id="qsLogoutBtn"
          *ngIf="auth.isAuthenticated()"
          (click)="auth.logout()" type="button">
            Log Out
        </button>
      </form>
  </div>
</nav>

<main>
  <router-outlet></router-outlet>
</main>
```

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` events on the buttons make calls to the `AuthService` service to let the user log in or out. When the user clicks **Log In**, they are redirected to the login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

## Add a Callback Component

When you use Universal Login, your users are taken away from your application. After they authenticate, they are automatically returned to your application and a client-side session is set for them. 

::: note
This example assumes you are using the default Angular path-based routing. If you are using hash-based routing with `{ useHash: true }`, you will not be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and add a loading indicator. You can create this component in a `callback` sub-directory within `src/app`, like so:

```ts
// src/app/callback/callback.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  template: `
    <div class="loading">
      <img src="assets/loading.svg" alt="loading">
    </div>
  `
})
export class CallbackComponent {}
```

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assets` directory. See the downloadable sample for demonstration. You can use our sample `loading.svg` by [downloading the image here](https://github.com/auth0-samples/auth0-angular-samples/blob/master/01-Login/src/assets/loading.svg).
:::

Add `CallbackComponent` to the proper module and configure a route for it within your router. For example:

```ts
// src/app/app.module.ts

// ...

import {CallbackComponent} from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent, CallbackComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot([
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'callback', component: CallbackComponent
      }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
 
After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the the route that you defined in the `handleAuthentication` method of `AuthService`:

```ts
// src/app/auth/auth.service.ts

// ...

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate([<ROUTE TO NAVIGATE ON AUTHENTICATION SUCCESS>]);
      } else if (err) {
         this.router.navigate([<ROUTE TO NAVIGATE ON AUTHENTICATION ERROR>]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  
// ...
```

After a successful login, the loading operation won't change because we are not yet handling authentication through our component. Let's do that next.

## Process the Authentication Result

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `AuthService` service processes the hash. 

Call the `handleAuthentication` method in your app's root component. The method processess the authentication hash while your app loads. 

```ts
// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
```