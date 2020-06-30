<!-- markdownlint-disable MD041 MD034 MD002 -->

<%= include('../../_includes/_login_preamble', { library: 'Angular 7+' }) %>

This tutorial will guide you in modifying an Angular application demonstrating how users can log in and log out with Auth0 and view profile information. It will also show you how to protect routes from unauthenticated users.

::: note
This tutorial assumes that you're able to use the [Angular CLI](https://cli.angular.io/) to generate new components and services on your project. If not, please place the files where appropriate and ensure that any references to them regarding import paths are correct for your scenario.
:::

## Create an Angular Application

If you do not already have your own application, a new one can be generated using the [Angular CLI](https://cli.angular.io/).

Install the CLI:

```bash
npm install -g @angular/cli
```

Then generate a new Angular application by running the following command from your filesystem wherever you'd like your application to be created:

```bash
ng new auth0-angular-demo
```

When asked _"Would you like to use Angular routing?"_, select **y** (yes).

When prompted _"Which stylesheet format would you like to use?"_, select **CSS**.

Once the project has been created, open the `auth0-angular-demo` folder in your favorite code editor.

By default, the Angular CLI serves your app on port `4200`. This should run on port `3000` so that it matches the Auth0 URLs configured above. Open the `package.json` file and modify the `start` script to:

```json
"start": "ng serve --port 3000"
```

:::note
If you are following this tutorial using your own Angular application that runs on a different port, you should modify the URLs above when configuring Auth0 so that they match the host and port number of your own application.
:::

## Install the SDK

While in the project folder, install the SDK using `npm` in the terminal (or use one of the other methods from the section above):

```bash
npm install @auth0/auth0-spa-js --save
```

## Add the Authentication Service

To manage authentication with Auth0 throughout the application, create an authentication service file and then copy the following code. This ensures that authentication logic is consolidated in one place and can be injected easily. Methods for interoperating between Angular with RxJS and the Auth0 SPA SDK are provided for you in the service.

Use the CLI to generate a new service called `AuthService`:

```bash
ng generate service auth
```

Open the `src/app/auth.service.ts` file inside your code editor and copy the following content:

:::note
Make sure that the domain and client ID values are correct for the application that you want to connect with. 
:::

```ts
import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "${account.namespace}",
      client_id: "${account.clientId}",
      redirect_uri: `<%= "${window.location.origin}" %>`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `<%= "${window.location.origin}" %>`,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "${account.clientId}",
        returnTo: `<%= "${window.location.origin}" %>`
      });
    });
  }

}
```

This service provides the properties and methods necessary to manage authentication across the application. An `auth0Client$` observable is defined that returns the same instance whenever a new subscription is created. The [Auth0 SDK for Single Page Applications](https://auth0.com/docs/libraries/auth0-spa-js) returns promises by default, so observables are then created for each SDK method so we can use [reactive programming (RxJS)](https://rxjs.dev/) with authentication in our Angular app.

Note that the `redirect_uri` property is configured to indicate where Auth0 should redirect to once authentication is complete. For login to work, this URL must be specified as an **Allowed Callback URL** in your [application settings](${manage_url}/#/applications/${account.clientId}/settings).

The service provides some basic methods, such as:

* `getUser$(options)` - Requests user data from the SDK and accepts an options parameter, then makes the user profile data available in a local RxJS stream
* `login()` - Log in with Auth0
* `logout()` - Log out of Auth0

In a Single Page Application, when the user reloads the page anything stored in app memory is cleared. We don't want the application to force the user to log in again if they did not log out, and still have an active session with the authorization server.

We also [should not store sensitive session data in browser storage due to lack of security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage).

The `localAuthSetup()` method uses the `auth0-spa-js` SDK to check if the user is still logged in with the authorization server. If they are, their authentication state is restored in the front end when they return to the app after refreshing or leaving, without having to log in again. We can call this method from the `constructor` since our authentication service is a singleton.

<%= include('../../_includes/_silent-auth-social-idp') %>

We also need to handle login redirects when the application loads. In the authentication service, `handleAuthCallback()` does several things:

* Checks to see if the necessary query parameters (`code` and `state`) are present, and if they are:
* Stores the application route to redirect back to after login processing is complete
* Calls the JS SDK's `handleRedirectCallback` method
* Gets and sets the user's profile data
* Updates application login state
* After the callback has been processed, redirects the user to their intended route

We can also call `handleAuthCallback()` from the `constructor`.

:::note
**Angular and the Auth0 SPA JS SDK:** `auth0-spa-js` is a promise-based library built using async/await, providing an agnostic approach for the highest volume of JavaScript apps. The Angular platform manages asynchronous code by [using reactive programming and observable streams with RxJS](https://angular.io/guide/rx-library). To enable the async/await library to work seamlessly with Angular’s stream-based approach, we have converted the async/await functionality to observables for you in this service. This improves the developer experience for interoperability between the SDK and the Angular platform.
:::

## Create a Navigation Bar Component

If you do not already have a logical place to house login and logout buttons within your application, create a new component to represent a navigation bar that can also hold some UI to log in and log out:

```bash
ng generate component nav-bar
```

Open the `src/app/nav-bar/nav-bar.component.ts` file and replace its contents with the following:

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
```

The `AuthService` class you created in the previous section is being provided in the component in the constructor. It is `public` to enable use of its methods in the component _template_.

Next, configure the UI for the `navbar` component by opening the `src/app/nav-bar/nav-bar.component.html` file and replacing its contents with the following:

```html
<header>
  <button (click)="auth.login()" *ngIf="!auth.loggedIn">Log In</button>
  <button (click)="auth.logout()" *ngIf="auth.loggedIn">Log Out</button>
</header>
```

Methods and properties from the authentication service are used to log in and log out, as well as show the appropriate button based on the user's current authentication state.

To display this component, open the `src/app/app.component.html` file and replace the default UI with the following:

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

> **Checkpoint**: Run the application now using `npm start`. The login button should be visible, and you should be able to click it to be redirected to Auth0 to authenticate. After logging in with Auth0, the application should handle the callback appropriately and send you back to the default route. The logout button should now be visible. Click the logout button to verify that it works.

## Show Profile Information

Create a new component called "Profile" using the Angular CLI:

```bash
ng generate component profile
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

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
```

All we need to do here is publicly inject the `AuthService` so that it can be used in the template.

Next, open `src/app/profile/profile.component.html` and replace its contents with the following:

```html
<pre *ngIf="auth.userProfile$ | async as profile">
<code>{{ profile | json }}</code>
</pre>
```

The `AuthService`'s `userProfile$` observable emits the user profile object when it becomes available in the application. By using the [`async` pipe](https://angular.io/api/common/AsyncPipe), we can display the profile object as JSON once it's been emitted. 

Next we need a route for the profile page. Open `src/app/app-routing.module.ts`, import the `ProfileComponent`, and add it to the `routes` array to create a `/profile` route:

```js
...
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  ...,
  {
    path: 'profile',
    component: ProfileComponent
  }
];
...
```

Finally, the navigation bar should be updated to include navigation links. Open `src/app/nav-bar/nav-bar.component.html` and add route links below the login/logout buttons:

```html
<header>
  ...

  <a routerLink="/">Home</a>&nbsp;
  <a routerLink="profile" *ngIf="auth.loggedIn">Profile</a>
</header>
```

> **Checkpoint**: If you log in now, you should be able to click on the **Profile** link to access the `/profile` page component and view your user data. Log out of the application to make sure that the profile link is no longer displayed when unauthenticated.

## Add an Authentication Guard

Right now, users could enter the `/profile` path in the browser URL to view profile page, even if they're unauthenticated. They won't see any user data (since they're not logged in), but they can still access the page component itself. Let's fix this using a [route guard](https://angular.io/guide/router#milestone-5-route-guards).

The Angular CLI can be used to generate a guard:

```bash
ng generate guard auth
```

You will receive this prompt: "Which interfaces would you like to implement?" Select **CanActivate**.

Open the `src/app/auth.guard.ts` file and replace its contents with the following:

```ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    return this.auth.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.auth.login(state.url);
        }
      })
    );
  }

}

```

The `canActivate()` method can return an `observable<boolean>`, `promise<boolean>`, or `boolean`. This tells the application whether or not navigation to the guarded route should be allowed to proceed depending on whether the returned value is `true` or `false`.

The `AuthService` provides an observable that does exactly this, returning a boolean indicating if the user is authenticated: `isAuthenticated$`.

We can return `isAuthenticated$` and implement a side effect with the `tap` operator to check if the value is `false`. If so, the user is not logged in, so we can call the `login()` method to prompt the user to authenticate. Passing the `state.url` as a parameter tells our authentication service's `login()` function that we want the application to redirect back to this guarded URL after the user is logged in.

Now we need to apply the `AuthGuard` to the `/profile` route. Open the `src/app/app-routing.module.ts` file and import the guard, then add it to the profile:

```js
...
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  ...
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
...
```

::: note
Guards are arrays because multiple guards can be added to the same route. They will run in the order declared in the array.
:::

> **Checkpoint:** Log out of your app and then navigate to `http://localhost:3000/profile`. You should be automatically redirected to the Auth0 login page. Once you've authenticated successfully, you should be redirected to the `/profile` page.
