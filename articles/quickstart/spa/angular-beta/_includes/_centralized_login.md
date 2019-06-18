<!-- markdownlint-disable MD041 MD034 MD002 -->

<%= include('../../_includes/_login_preamble', { library: 'Angular 7+' }) %>

This tutorial will guide you in modifying an Angular application to support login using Auth0, that demonstrates how users can log in, log out, and how to view their profile information. It will also show you how to protect routes from unauthenticated users.

::: note
This tutorial assumes that you're able to use the [Angular CLI](https://cli.angular.io/) to generate new components and services on your project. If not, please place the files where appropriate and ensure that any references to them regarding import paths are correct for your scenario.
:::

## Create an Angular application

If you do not already have an application in which to implement the SDK, a new one can be generated using the [Angular CLI](https://cli.angular.io/).

Install the CLI:

```bash
npm install -g @angular/cli
```

Then use it to generate a new Angular application. When asked _"Would you like to use Angular routing?"_, select **yes**:

```bash
ng new auth0-angular-demo
```

Once the project has been created, open the `auth0-angular-demo` folder in your favorite code editor.

Finally, by default the application runs on port `4200`. This should run on port `3000` so that it matches the Auth0 URLs configured above. This can be done inside the `package.json` file by modifying NPM's `start` command as follows:

```json
"start": "ng serve --port 3000"
```

:::note
If you are following this tutorial using your own Angular application that runs on a different port, you should modify the URLs above when configuring Auth0 so that they match the host and port number of your own application.
:::

## Install the SDK

While in the project folder, install the SDK using `npm` in the terminal:

```bash
npm install @auth0/auth0-spa-js
```

## Add an Authentication Service

To make it easier to use the Auth0 SDK within an Angular application, create an Angular service that can be injected into other components and services. This service can be used to set up and retrieve an instance of `Auth0Client`.

To start, generate a new service called `Auth`:

```bash
ng generate service Auth
```

Open the `src/app/auth.service.ts` file inside your code editor and add the following content:

:::note
Make sure that the domain and client ID values are correct for the application that you want to connect with. 
:::

```ts
import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  // Auth0 application configuration
  config = {
    domain: "${account.tenant}",
    client_id: "${account.clientId}"
  };

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client(this.config);

      // Provide the current value of isAuthenticated
      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

      // Whenever isAuthenticated changes, provide the current value of `getUser`
      this.isAuthenticated.subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          this.profile.next(await this.auth0Client.getUser());

          return;
        }

        this.profile.next(null);
      });
    }

    return this.auth0Client;
  }
}
```

This service provides a single method `getAuth0Client`. When called, it will in turn call `createAuth0Client` from the Auth0 JS SDK and save it in a class-level variable. Subsequent calls to `getAuth0Client` will return the same instance.

The service uses [RxJS](https://www.learnrxjs.io/) to emit changes in values to the `isAuthenticated` state and the user's profile. These will be used in a moment to listen for changes and update the UI accordingly.

## Create a Navigation Bar Component

If you do not already have a logical place to house login and logout buttons within your application, create a new component to represent a navigation bar that can also hold some UI to log in and log out:

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
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }
}
```

Notice that the `AuthService` class you created in the previous section is being injected into the component through the constructor. This allows you to get an instance of the client, as well as react to changes in authentication state.

The main setup work is being carried out inside `ngOnInit`, where the RxJS `BehaviorSubject` instances are being used. Whenever the values of these change, the Navbar component will react to those changes and provide an updated UI.

Functions are provided to log in and log out the user using `loginWithRedirect` and `logout` directly on the Auth0 client. In the login scenario, a URI is provided that indicates where Auth0 should redirect to once authentication is complete. For login to work, this URL must be specified as an **Allowed Callback URL** in your [application settings](${manage_url}/#/applications/${account.clientId}/settings).

Next, configure the UI for the `navbar` component by opening the `src/app/navbar/navbar.component.html` file and replacing its contents with the following:

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

> **Checkpoint**: Run the application now using `npm start`. The login button should be visible, and you should be able to click it to be redirected to Auth0 for login. If you log in and are redirected back to the app, you'll see an error in the console about a missing route. The callback route used when redirected back to the app is setup in the next section.

## Handle Login Redirects

To log the user into your application, the redirect from Auth0 should be handled so that a proper login state can be achieved. To do this, the `handleLoginRedirect` SDK method must be called when Auth0 redirects back to your application. This can be done by using a separate component to handle the redirect callback.

Use the Angular CLI to create a new component called `Callback`:

```bash
ng generate component Callback
```

Open the newly-generated `src/app/callback/callback.component.ts` file and replace its contents with the following:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
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
    const result = await client.handleRedirectCallback();
    
    // Get the URL the user was originally trying to reach
    const targetRoute =
      result.appState && result.appState.target ? result.appState.target : '';

    // Update observables
    this.authService.isAuthenticated.next(await client.isAuthenticated());
    this.authService.profile.next(await client.getUser())

    // Redirect away
    this.router.navigate([targetRoute]);
  }
}
```

Once again the `AuthService` class is injected so that the component can gain access to the Auth0 SDK client. The key line is `await client.handleRedirectCallback`, which processes the callback data from Auth0 and retrieves the tokens. It also sets some internal state that can be used to determine whether the user is authenticated or not.

Notice that the component updates the observable properties inside the `AuthService` instance. This means that other components that are watching these observables can update their UI at the right time: when the user logs in.

This component also recovers the URL the user was trying to reach before redirecting to Auth0 for authentication. They are then redirected to that URL to continue their journey through the site.

In order for this component to work, the Angular router must be adjusted so that this component is used when the `/callback` route is hit. Open `src/app/app-routing.module.ts` and replace its content with the following:

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

> **Checkpoint**: Run the app again using `npm start` in the terminal. This time you should be able to log in and have the application handle the callback appropriately, sending you back to the default route. The "log out" button should now be visible. Check that the "log out" button works and that the user is unauthenticated when clicked.

## Showing Profile Information

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

Run the application and log in. Click on the **Profile** link to browse to the `/profile` URL. Your profile information should now be present on the screen in JSON format. Try logging out of the application again to make sure that the profile information disappears as you would expect.

## Gated Content

Right now, your users could simply enter the `/profile` path into their URL bar and reach the profile page, even if they're unauthenticated. You're going to use a [Guard](https://angular.io/guide/router#milestone-5-route-guards) to help prevent that from happening.

### Add an authentication guard

The Angular CLI can be used to generate a guard:

```bash
ng generate guard auth
```

When asked the question "Which interfaces would you like to implement?", select "CanActivate".

Open the `src/app/auth.guard.ts` file and replace its contents with the following:

```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const client = await this.authService.getAuth0Client();
    const isAuthenticated = await client.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    client.loginWithRedirect({
      redirect_uri: `<%= "${window.location.origin}" %>/callback`,
      appState: { target: state.url }
    });

    return false;
  }
}
```

The key part here is the implementation of the `canActivate` method. First, the Auth0 client is retrieved. Then, the `isAuthenticated` value is interrogated. If the user is already authenticated, then `true` is returned to indicate that the current route can continue.

If the user is not authenticated, then the `loginWithRedirect` method is invoked, causing the user to be logged in. Also notice that the `appState` property in the options for `loginWithRedirect` is set to an object containing a `target` property. This value is set to the route that the user was trying to access when this guard was activated. We can use this to helpfully redirect the user to where they were trying to reach once they have successfully authenticated with Auth0.

In order for this guard to work, it must be applied to the router so that the `/profile` route cannot be accessed unless the user is logged in. Open the `src/app/app-routing.module.ts` file and update it so that the guard is used. It should look something like the following:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component'
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
    canActivate: [AuthGuard]    // NEW - apply the guard to the `profile` route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Check that the application works as intended, by logging out of the application, then trying to access `http://localhost:3000/profile` route directly in the URL bar. You should be automatically redirected to the Auth0 Login page before being able to access your profile information in the app. Note that the application should automatically route you to the `/profile` page after authentication.
