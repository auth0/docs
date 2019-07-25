---
title: Calling an API
description: This tutorial demonstrates how to call a backend API using an access token.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular
  - login
github:
    path: 02-Calling-an-API
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD006 MD002 MD041 -->

Most single-page apps use resources from data APIs. You may want to restrict access to those resources, so that only authenticated users with sufficient privileges can access them. Auth0 lets you manage access to these resources using [API Authorization](/api-auth).

This tutorial shows you how to create a simple API using [Express](https://expressjs.com) that serves resources protected by a middleware that looks for and validates access tokens. You will then see how to call this API using an access token granted by the Auth0 authorization server.

:::note
If you have been following [part 1 of this tutorial](/quickstart/spa/angular-beta/01-login), then the following steps can be completed within the same project.
:::

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_backend.md') %>

:::note
If you are not logged in when viewing this tutorial, the sample above will show the `domain` and `audience` values as "YOUR_TENANT" and "YOUR_API_IDENTIFIER" respectively. These should be replaced with the values from your Auth0 application.
:::

Finally, modify `package.json` to add two new scripts: `dev` and `server`. Running the `dev` script will now start both the backend server and the serve the Angular application at the same time:

```json
"scripts": {
  ...,
  "server": "node server.js",
  "dev": "npm-run-all --parallel start server"
},
```

To start the project for this sample, run the `dev` script from the terminal:

```bash
npm run dev
```

This will start both the backend API and the frontend application together.

### Proxy to Backend API

In this example, the Node backend and Angular app run on two different ports. In order to call the API from the Angular application, the development server must be configured to proxy requests through to the backend API. This is so that the Angular app can make a request to `/api/external` and it will be correctly proxied through to the backend API at `http://localhost:3001/api/external`.

To do this, create a `proxy.conf.json` file in the root of the project and add the following code:

```json
{
  "/api": {
    "target": "http://localhost:3001",
    "secure": false
  }
}
```

Now open `angular.json` and add a reference to the proxy config. In the `serve` node, include the following reference to the proxy config file:

```json
  ...
  "serve": {
    ...,
    "options": {
      ...,
      "proxyConfig": "proxy.conf.json"
    },
    ...
```

::: note
In order for these changes to take effect, you will need to stop and restart the run script.
:::

## Update the Authentication Service

We'll now make several updates in the `src/app/auth.service.ts` file.

### Add Audience

First, add the `audience` value to the creation of the Auth0 client instance:

```js
// Create an observable of Auth0 instance of client
auth0Client$ = (from(
  createAuth0Client({
  ...,
  audience: "${apiIdentifier}"
})
```

This setting tells the authorization server that your application would like to call the API with the identifier ${apiIdentifier} on the user's behalf. This will cause the authorization server to prompt the user for consent the next time they log in. It will also return an access token that can be used to call the API.

### Manage Access Token

We'll also define another observable and another subject to retrieve the access token and make it available for use in our application. Add the following properties to the `AuthService` class:

```ts
getTokenSilently$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.getTokenSilently()))
);
// Create subject and public observable of access token
private accessTokenSubject$ = new BehaviorSubject<string>(null);
accessToken$ = this.accessTokenSubject$.asObservable();
```

In the `localAuthSetup()` method, we now not only want to retrieve the user's profile data, we also want to request their access token. Update the `localAuthSetup()` method to the following code:

```ts
localAuthSetup() {
  // This should only be called on app initialization
  // Check if user already has an active session with Auth0
  const checkAuth$ = this.isAuthenticated$.pipe(
    concatMap((loggedIn: boolean) => {
      if (loggedIn) {
        // If authenticated, return stream that emits user object and token
        return combineLatest(
          this.getUser$(),
          this.getTokenSilently$
        );
      }
      // If not authenticated, return stream that emits 'false'
      return of(loggedIn);
    })
  );
  const checkAuthSub = checkAuth$.subscribe((response: any[] | boolean) => {
    // If authenticated, response will be array of user object and token
    // If not authenticated, response will be 'false'
    // Set subjects appropriately
    if (response) {
      const user = response[0];
      const token = response[1];
      this.userProfileSubject$.next(user);
      this.accessTokenSubject$.next(token);
    }
    this.loggedIn = !!response;
    // Clean up subscription
    checkAuthSub.unsubscribe();
  });
}
```

Similarly, our `handleAuthCallback()` method should also request an access token in addition to user data now. Update the `handleAuthCallback()` method to the following:

```ts
handleAuthCallback() {
  // Only the callback component should call this method
  // Call when app reloads after user logs in with Auth0
  let targetRoute: string; // Path to redirect to after login processsed
  // Ensure Auth0 client instance exists
  const authComplete$ = this.auth0Client$.pipe(
    // Have client, now call method to handle auth callback redirect
    concatMap(() => this.handleRedirectCallback$),
    tap(cbRes => {
      // Get and set target redirect route from callback results
      targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
    }),
    concatMap(() => {
      // Redirect callback complete; create stream returning
      // user data, token, and authentication status
      return combineLatest(
        this.getUser$(),
        this.getTokenSilently$,
        this.isAuthenticated$
      );
    })
  );
  // Subscribe to authentication completion observable
  // Response will be an array of user, token, and login status
  authComplete$.subscribe(([user, token, loggedIn]) => {
    // Update subjects and loggedIn property
    this.userProfileSubject$.next(user);
    this.accessTokenSubject$.next(token);
    this.loggedIn = loggedIn;
    // Redirect to target route after callback processing
    this.router.navigate([targetRoute]);
  });
}
```

In both of the above methods, we're using [`combineLatest` from RxJS](https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest) to create an observable that combines `getUser$()` and `getTokenSilently$` to emit results from both streams. We can then subscribe and set those values in the appropriate behavior subjects for easy access in our application.

::: note
For more details on the implementation, see the comments in the code snippets above.
:::

## Create an HTTP Interceptor

In order to add the access token to the header of secured API requests, we'll create an [HTTP interceptor](https://angular.io/api/common/http/HttpInterceptor). Interceptors intercept and handle or modify HTTP requests or responses. Interceptors in Angular are services. 

Create an interceptor service with the following CLI command:

```bash
ng generate service interceptor
```

Open the generated `src/app/interceptor.service.ts` file and add the following code:

```ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { filter, mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.accessToken$.pipe(
      filter(token => typeof token === 'string'),
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}
```

The `AuthService` is provided so that we can access the `accessToken$` stream. Using this stream in the interceptor ensures that requests wait for the access token to be available before firing.

The `intercept()` method returns an observable of an HTTP event. In it, we do the following:

* `filter` any value from the `accessToken$` stream to make sure the value is a string (as opposed to the `null` default value)
* `mergeMap` ensures that any new requests coming through don't cancel previous requests that may not have completed; this is useful if you have multiple HTTP requests on the same page
* `clone` the outgoing request and attach the [`Authorization` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) with access token, then send the cloned, authorized request on

In order to put the interceptor to work in the application, open the `src/app/app-routing.module.ts` routing module and add:

```js
...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.service';
...
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
```

In the `providers` array, we're providing the `HTTP_INTERCEPTORS` injection token and our `InterceptorService` class. We then set `multi: true` because we could potentially use multiple interceptors (which would be called in the order provided).

::: note
The interceptor will now run on every outgoing HTTP request. If you have public endpoints as well as protected endpoints, you could use conditional logic in the interceptor to only add the token to requests that require it.
:::

## Call the API

Now we're ready to call the secure API endpoint and display its results in the application. To make HTTP requests in our application, we'll first add the `HttpClientModule` to the `src/app/app.module.ts`:

```js
...
import { HttpClientModule } from '@angular/common/http';
...
@NgModule({
  ...,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  ...
})
...
```

The `HttpClientModule` must be imported and then added to the NgModule's `imports` array.

Next, create an API service using the Angular CLI:

```bash
ng generate service api
```

Open the generated `src/app/api.service.ts` file and add:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ping$(): Observable<any> {
    return this.http.get('/api/external');
  }

}
```

This creates a `ping$()` method that returns an observable of the HTTP GET request to the API. This can now be used in the application to call the `api/external` endpoint.

Now we need somewhere to call the API and display the results. Create a new page component:

```bash
ng generate component external-api
```

Open `src/app/external-api/external-api.component.ts` and add this code:

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit, OnDestroy {
  responseJson: string;
  pingSub: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  pingApi() {
    this.pingSub = this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

  ngOnDestroy() {
    if (this.pingSub) {
      this.pingSub.unsubscribe();
    }
  }

}
```

The API service is provided and a named subscription to `api.ping$()` is created. The act of subscribing fires off the HTTP call, which we'll do on a button click in the UI. When data comes back from the API, the results are set in a local property (`responseJson`). When the component is destroyed, we unsubscribe from the subscription.

Open `src/app/external-api/external-api.component.html` and replace its contents with the following:

```html
<button (click)="pingApi()">Ping API</button>

<pre *ngIf="responseJson">
<code>{{ responseJson | json }}</code>
</pre>
```

Clicking the button calls the API. The response is displayed in the `pre` element, which only renders if `responseJson` is present.

This route now needs to be added to our application. Open `src/app/app-routing.module.ts` and add the `/external-api` route like so:

```js
...
import { ExternalApiComponent } from './external-api/external-api.component';
...
const routes: Routes = [
  ...,
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard]
  }
];
...
```

The `/external-api` route is also guarded with `AuthGuard` since it requires an authenticated user with an access token.

Finally, add a link to the navigation bar. Open `src/app/navbar/navbar.component.html` and add:

```html
<header>
  ...&nbsp;
  <a routerLink="external-api" *ngIf="auth.loggedIn">External API</a>
</header>
```

::: note
If, at any time, the application isn't working as expected, the Angular CLI server may need to be restarted. Enter `Ctrl+C` in the terminal to stop the application, then run it again using `npm run dev`.
:::

> **Checkpoint:** You should now be able to log in, browse to the External API page, and click the **Ping API** button to make an API request. The response should then display in the browser.
