---
title: Call an API
description: This tutorial demonstrates how to make API calls to the Auth0 Management API.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular
  - api
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_calling_api_preamble_api2") %>

This article builds upon [the previous chapter](/quickstart/spa/angular-next), adding the capability to automatically attach an access token to outgoing requests made using Angular's built-in `HttpClient` service.

:::note
If you followed the [previous section where you added user log in to Angular](/quickstart/spa/angular-next#add-login-to-your-application), make sure that you log out of your application as you'll need a new access token to call APIs.
:::

## Install the HTTP Interceptor

To install and configure the HTTP interceptor, perform the following steps:

* Import the `AuthHttpInterceptor` type from the Auth0 Angular SDK
* Import `HttpClientModule` and `HTTP_INTERCEPTORS` from `@angular/common/http`
* Register `AuthHttpInterceptor` in the `providers` section of your application module
* Add configuration to specify which requests should have an `Authorization` header

The following is an example of an Angular module (based upon the default implementation when you create a new app using `ng new`) that supports `AuthHttpInterceptor`, configured to call the Auth0 Management API with the ability to read the current user profile:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the injector module and the Angular types you'll need
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,

    // Register HttpClient for making API calls
    HttpClientModule,
    
    AppRoutingModule,
    AuthModule.forRoot({
      domain: "${account.namespace}",
      clientId: "${account.clientId}",

      // Specify the audience for the management API, allowing us to make API calls
      audience: "https://${account.namespace}/api/v2/",

      // Specify the necessary scopes for getting user information
      scope: "read:current_user",

      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://${account.namespace}/api/v2/' (note the asterisk)
            uri: 'https://${account.namespace}/api/v2/*'
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://${account.namespace}/api/v2/',

              // The attached token should have these scopes
              scope: 'read:current_user'
            }
          }
        ]
      }
    }),
  ],
  providers: [
    // Register the `AuthHttpInterceptor` to automatically attach the 'Authorization' header
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
```

## Make an API Call

With your app module configured with the HTTP interceptor from the Angular SDK, calls you make using Angular's built-in `HttpClient` to the Auth0 Management API will have the appropriate access token specified in the `Authorization` header. Let's use this as an example for showing user metadata.

The following component demonstrates how to display the `user_metadata` field from the authenticated user's profile, by making a call to the `/api/v2/users` endpoint using `HttpClient`:

```js
import { Component, OnInit } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-metadata',
  template: `<div *ngIf="metadata">
    <pre>{{ metadata | json }}</pre>
  </div>`,
  styles: [],
})
export class UserMetadataComponent implements OnInit {
  metadata = {};

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://${account.namespace}/api/v2/users/<%= "${user.sub}" %>`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
  }
}
```

This call succeeds because the HTTP interceptor took care of making sure the correct access token was included in the outgoing request.

:::panel Checkpoint
Your application will show an empty JSON object if you have not set any `user_metadata` for the logged-in user. To further test out this integration, head to the [Users section of the Auth0 dashboard](https://manage.auth0.com/#/users) and click on the user who is logged in. Update the `user_metadata` section with a value like `{ "theme": "dark" }` and click "Save". Refresh your Angular application and verify that it reflects the new `user_metadata`. 
:::

As a final reminder, consult the [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to learn how to integrate Auth0 with your backend platform.
