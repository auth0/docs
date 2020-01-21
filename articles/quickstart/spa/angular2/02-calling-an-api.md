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

We'll define an observable method to retrieve the access token and make it available for use in our application. Add the following to the `AuthService` class:

```ts
getTokenSilently$(options?): Observable<string> {
  return this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
  );
}
```

If you'd like to [pass options to `getTokenSilently`](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently) when calling the method, you can do so.

:::note
**Why isn't the token stored in browser storage?** Historically, it was common to store tokens in local or session storage. However, browser storage is [not a secure place to store sensitive data](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage). The [`auth0-spa-js` SDK](https://auth0.com/docs/libraries/auth0-spa-js) manages session retrieval for you so that you no longer need to store sensitive data in browser storage in order to restore sessions after refreshing a Single Page Application.

With `auth0-spa-js`, we can simply request the token from the SDK when we need it (e.g., in an HTTP interceptor) rather than storing it locally in the Angular app or browser. The SDK manages token freshness as well, so we don't need to worry about renewing tokens when they expire.
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
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer <%= "${token}" %>` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}
```

The `AuthService` is provided so that we can access the `getTokenSilently$()` stream. Using this stream in the interceptor ensures that requests wait for the access token to be available before firing.

The `intercept()` method returns an observable of an HTTP event. In it, we do the following:

* `mergeMap` ensures that any new requests coming through don't cancel previous requests that may not have completed yet; this is useful if you have multiple HTTP requests on the same page
* `clone` the outgoing request and attach the [`Authorization` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) with access token, then send the cloned, authorized request on its way

In order to put the interceptor to work in the application, open the `src/app/app-routing.module.ts` routing module and add:

```js
...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
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
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  pingApi() {
    this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

}
```

The API service is provided and a named subscription to `api.ping$()` is created. The act of subscribing fires off the HTTP call, which we'll do on a button click in the UI. When data comes back from the API, the results are set in a local property (`responseJson`).

:::note
We do _not_ need to unsubscribe from the `api.ping$()` observable because it completes once the HTTP request is finished.
:::

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

Finally, add a link to the navigation bar. Open `src/app/nav-bar/nav-bar.component.html` and add:

```html
<header>
  ...
  &nbsp;<a routerLink="external-api" *ngIf="auth.loggedIn">External API</a>
</header>
```

::: note
If, at any time, the application isn't working as expected, the Angular CLI server may need to be restarted. Enter `Ctrl+C` in the terminal to stop the application, then run it again using `npm run dev`.
:::

> **Checkpoint:** You should now be able to log in, browse to the External API page, and click the **Ping API** button to make an API request. The response should then display in the browser.
