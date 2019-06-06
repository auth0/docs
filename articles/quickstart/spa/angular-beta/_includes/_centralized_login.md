<!-- markdownlint-disable MD041 MD034 MD002 -->

<%= include('../../_includes/_login_preamble', { library: 'Angular 7+', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-spa-js-angular-samples/tree/master/01-Login'}) %>

This tutorial will guide you in modifying an Angular application to support login using Auth0, that demonstrates how users can log in, log out, and how to view their profile information. It will also show you how to protect routes from unauthenticated users.

::: note
This tutorial assumes that you're able to use the [Angular CLI](https://cli.angular.io/) to generate new components and services on your project. If not, please place the files where appropriate and ensure that any references to them regarding import paths are correct for your scenario.
:::

## Configure the Application

Create a new file in the root of the project called `auth_config.json`, and populate it with your Auth0 app's client ID and domain values:

```json
{
  "domain": "${account.tenant}",
  "clientId": "${account.clientId}"
}
```

In order for TypeScript to be able to import this JSON file, make a small tweak to the `tsconfig.json` file in the root of the project, by adding the `resolveJsonModule` flag. The resulting file should look something like the following:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "es2015",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es5",
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"],
    "resolveJsonModule": true
  }
}
```

Notice that the `resolveJsonModule` key has been added to the `compilerOptions` node, with a value of `true`.

::: note
A JSON file is being used here instead of a TypeScript file, as it will be shared in the next part of the tutorial by the backend server.
:::

## Add an Authentication Service

Generate a new service called `AuthService`:

```bash
ng generate service AuthService
```

Open this inside your code editor and add the following content:

```ts
import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import * as config from '../../config.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  config = config;

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
      });

      try {
        // Make sure the session has been initialized
        await this.auth0Client.getTokenSilently();

        // Provide the current value of isAuthenticated
        this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

        // Whenever isAuthenticated changes, provide the current value of `getUser`
        this.isAuthenticated.subscribe(async isAuthenticated => {
          if (isAuthenticated) {
            return this.profile.next(await this.auth0Client.getUser());
          }

          this.profile.next(null);
        });
      } catch {}

      return this.auth0Client;
    }

    return this.auth0Client;
  }
}
```

This service provides a single method `getAuth0Client`. When called, it will in turn call `createAuth0Client` from the Auth0 JS SDK and save it in a class-level variable. Subsequent calls to `getAuth0Client` will return the same instance.

The service uses [RxJS](https://www.learnrxjs.io/) to emit changes in values to the `isAuthenticated` state and the user's profile. These will be used in a moment to listen for changes and update the UI accordingly.

### Adding a navigation bar component

Add a new component that will house the login and logout buttons by using the Angular CLI in the terminal:

```bash
ng generate component navbar
```

Open the `src/app/navbar/navbar.component.ts` file and replace its contents with the following:

```js
import { Component, OnInit } from '@angular/core';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  profile: any;

  private auth0Client: Auth0Client;

  /**
   * Constructor - inject the AuthService class
   */
  constructor(private authService: AuthService) {}

  /**
   * Handle component initialization
   */
  async ngOnInit() {
    // Get an instance of the Auth0 client
    this.auth0Client = await this.authService.getAuth0Client();

    // Watch for changes to the isAuthenticated state
    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });

    // Watch for changes to the profile data
    this.authService.profile.subscribe(profile => {
      this.profile = profile;
    });
  }

  /**
   * Logs in the user by redirecting to Auth0 for authentication
   */
  async login() {
    await this.auth0Client.loginWithRedirect({
      redirect_uri: `<%= "${window.location.origin}" %>/callback`
    });
  }

  /**
   * Logs the user out of the applicaion, as well as on Auth0
   */
  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.clientId,
      returnTo: window.location.origin
    });
  }
}
```

Notice that the `AuthService` class you created in the previous section is being injected into the component through the constructor. This allows you to get an instance of the client, as well as react to changes in authentication state.

The main setup work is being carried out inside `ngOnInit`, where the RxJS `BehaviorSubject` instances are being used. Whenever the values of these change, the Navbar component will react to those changes and provide an updated UI.

Functions are provided to log in and log out the user using `loginWithRedirect` and `logout` directly on the Auth0 client. In the log in case, a URI is provided, indicating where Auth0 should redirect to once authentication is complete.

> **Note**: This URL should be registered with Auth0 as an Allowed Callback URL

Configure the UI for the `navbar` component by opening the `src/app/navbar/navbar.component.html` file and replacing its contents with the following:

```html
<header>
  <button (click)="login()" *ngIf="!isAuthenticated">Log In</button>
  <button (click)="logout()" *ngIf="isAuthenticated">Log Out</button>
</header>
```

Angular bindings are used here to show each button at the right time; the Login button when the user is unauthenticated, and the Log Out button when the user has been authenticated. Their `click` events are wired up to call the `login` and `logout` functions on the component respectively.

Finally, to show this component on the screen, open the `src/app/app.component.html` file and replace the default UI with the following:

```html
<app-navbar></app-navbar>

<router-outlet></router-outlet>
```

> **Checkpoint**: Run the application now using `npm start`. The login button should be visible, and you should be able to click it to be redirected to Auth0 for login.

### Creating the callback component

To complete the authentication story, the callback route must be handled.

Use the Angular CLI to create a new component called `Callback`:

```bash
ng generate component Callback
```

Open the newly-generated `src/app/callback/callback.component.ts` file and replace its contents with the following:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const client = await this.authService.getAuth0Client();

    // Handle the redirect from Auth0
    await client.handleRedirectCallback();

    this.router.navigate(['']);
  }
}
```

The key line is `await client.handleRedirectCallback`, which takes the processes the data in the callback from Auth0 and retrieves the tokens. It also sets some internal state that can be used to determine whether the user is authenticated or not.

In order for this component to work, the Angular router must be adjusted so that this component is used when the `/callback` route is hit. Open `src/app/app-routing.module.ts` and ensure that there is a route to the `Callback` component on the `/callback` path:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

The primary change here is to add in the `callback` route which points to the `CallbackComponent`.

> **Checkpoint**: Run the app again. This time you should be able to log in and have the application handle the callback appropriately, sending you back to the default route. The "log out" button should now be visible. Check that the "log out" button works and that the user is unauthenticated when clicked.

### Showing profile information

Create a new component called "Profile" using the Angular CLI:

```bash
ng generate component Profile
```

Open `src/app/profile/profile.component.ts` and replace its contents with the following:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.profile.subscribe(profile => (this.profile = profile));
  }
}
```

In order to retrieve the profile data, the component subscribes to changes on the `profile` property of `AuthService` and sets a class-level property to its value. This property can be used to drive the UI and show the profile information on the screen.

To do this, open `src/app/profile/profile.component.html` and replace its contents with the following:

```html
<pre *ngIf="profile">
  <code>{{profile | json}}</code>
</pre>
```

This simple UI displays a JSON representation of the profile object, only if the `profile` property on the component has a value. This means that the UI will be present if the user is logged in, and invisible if they are not.

To view the profile page, the router must be updated to show the profile component at the right time. Open `src/app/app-routing.module.ts` and ensure that the `routes` map includes a route to the your profile component:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';

// NEW - import the Profile component
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },

  // NEW - add a route to the profile component
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Finally, update the navigation bar to include some router links so that we can navigate between the different pages. Open `src/app/navbar/navbar.component.html` and update it to look like the following:

```html
<header>
  <button (click)="login()" *ngIf="!isAuthenticated">Log in</button>
  <button (click)="logout()" *ngIf="isAuthenticated">Log out</button>

  <!-- NEW - add a couple of router links to the home page, and to profile -->
  <a [routerLink]="['']">Home</a>&nbsp;
  <a [routerLink]="['profile']" *ngIf="isAuthenticated">Profile</a>
</header>
```

Run the application and log in. You should now find that, once you have logged in, you should be able to browse to the profile page. Your profile information should be present on the screen in JSON format. Try logging out of the application again to make sure that the profile information disappears as you would expect.

## Gated Content

Right now, your users could simply enter the `/profile` path into their URL bar and reach the profile page, even if they're unauthenticated. You're going to use a [Guard](https://angular.io/guide/router#milestone-5-route-guards) to help prevent that from happening.

### Adding a guard

The Angular CLI can be used to generate a guard:

```bash
ng generate guard auth
```

When asked the question "Which interfaces would you like to implement?", select "CanActivate".

Open the `src/app/auth.guard.ts` file and replace its contents with the following:

```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.getAuth0Client().then(client => {
      return client.isAuthenticated().then(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }

        client.loginWithRedirect({
          redirect_uri: `<%= "${window.location.origin}" %>/callback`,
          appState: { target: next.url[0].path }
        });
      });
    });
  }
}
```

The key part here is the implementation of the `canActivate` method. First, the Auth0 client is retrieved. Then, the `isAuthenticated` value is interrogated. If the user is already authenticated, then `true` is returned to indicate that the current route can continue.

If the user is not authenticated, then the `loginWithRedirect` method is invoked, causing the user to be logged in. Also notice that the `appState` property in the options for `loginWithRedirect` is set to an object containing a `target` property. This value is set to the route that the user was trying to access when this guard was activated. We can use this to helpfully redirect the user to where they were trying to reach once they have successfully authenticated with Auth0.

In order for this guard to work, it must be applied to the router so that the `/profile` route cannot be accessed unless the user is logged in. Open the `src/app/app-routing.module.ts` file and update it so that the guard is used. It should look something like the following:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';

// NEW - import the guard
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] // NEW - apply the guard to the `profile` route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Finally, to make use of the helpful redirect once the user has returned from the authorization server, update the callback component to read the `appState` value and redirect the user to the right place. It should now look something like the following:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const client = await this.authService.getAuth0Client();
    const result = await client.handleRedirectCallback();

    // NEW - retrieve the URL that the user was trying to reach..
    const targetRoute = result.appState.target ? result.appState.target : '';

    // .. and navigate the user to that location
    this.router.navigate([targetRoute]);
  }
}
```

Check that the application works as intended, by logging out of the application, then trying to access `http://localhost:3000/profile` route directly in the URL bar. You should be automatically redirected to the Auth0 Login page before being able to access your profile information in the app. Note that the application should automatically route you to the `/profile` page after authentication, thanks to the updates made to the callback component.
