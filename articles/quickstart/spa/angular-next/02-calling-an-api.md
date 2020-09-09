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

:::note
If you followed the [previous section where you added user log in to Angular](/quickstart/spa/angular-next#add-login-to-your-application), make sure that you log out of your application as you'll need a new access token to call APIs.
:::

## Configure Your App to Make Authorized API Calls

To facilitate calling APIs, the Angular SDK exports an [`HttpInterceptor`](https://angular.io/api/common/http/HttpInterceptor) that automatically adds an `Authorization` header with the appropriate access token to outgoing requests. However, only requests that are specified through configuration will have this header attached, preventing unintended leakage of access tokens to unexpected URLs. Once the application module has been correctly configured, any calls to APIs through Angular's `HttpClient` class to configured URLs will have an `Authorization` header attached.

The following section demonstrates how to configure the application module to call APIs.

### Configure the Auth Module

As your Angular application needs to pass an access token when it calls a target API to access private resources, you can [request an access token](https://auth0.com/docs/tokens/guides/get-access-tokens) at user authentication time in a format that the API can verify by passing the `audience` and `scope` properties to `AuthModule.forRoot`.

In addition, the configuration should specify which requests should have an `Authorization` header added to them with the access token.

The following describes how to adjust your Angular application module, with all the necessary imported types and the configuration to call the management API. If you're following the quickstart from part 1, take your [Angular application module](/quickstart/spa/angular-next/01-login#register-and-configure-the-authentication-module) and adjust it as follows:

* Import the `AuthHttpInterceptor` type from the Auth0 Angular SDK
* Import `HttpClientModule` and `HTTP_INTERCEPTOR` from `@angular/common/http`
* Register `AuthHttpInterceptor` in the `providers` section of your application module
* Add configuration to specify which requests should have an `Authorization` header

The following is an example of an Angular module that supports `AuthHttpInterceptor`, configured to call the Auth0 Management API:

```javascript
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

Auth0 uses the value of the `audience` prop to determine which resource server (API) the user is authorizing your Angular application to access.

Notice the `httpInterceptor` configuration, which specifies:

* Any request where the URL starts with `https://${account.namespace}/api/v2/` should have an access token attached
* If the URL is matched, the attached access token should have an audience value of `https://${account.namespace}/api/v2/` and the `read:current_user` scope;

A more detailed run-down of the available configuration options for the HTTP interceptor is available in [the repository docs](https://github.com/auth0/auth0-angular#call-an-api).

:::note
In the case of the Auth0 Management API, the audience is `https://${account.namespace}/api/v2/`. In the case of your APIs, you create an _Identifier_ value that serves as the _Audience_ value whenever you [set up an API](https://auth0.com/docs/getting-started/set-up-api) with Auth0.
:::

The actions that your Angular application can perform on the API depend on the [scopes](https://auth0.com/docs/scopes/current) that your access token contains, which you define as the value of `scope`. Your Angular application will request authorization from the user to access the requested scopes, and the user will approve or deny the request.

:::note
In the case of the Auth0 Management API, the `read:current_user` and `update:current_user_metadata` scopes let you get an access token that can retrieve user details and update the user's information. In the case of your APIs, you'll define custom [API scopes](https://auth0.com/docs/scopes/current/api-scopes) to implement access control, and you'll identify them in the calls that your client applications make to that API.
:::

## Make an API Call

With your app module configured with the HTTP interceptor from the Angular SDK, calls you make to the Auth0 Management API will have the appropriate access token specified in the `Authorization` header. Let's use this as an example for showing user metadata.

Consider the following component that displays user profile information:

```js
import { Component, OnInit } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  template: `<div *ngIf="auth.user$ | async as user">
    <p>{{ user.name }}</p>
    <pre>{{ metadata | json }}</pre>
  </div>`,
  styles: [],
})
export class ProfileComponent implements OnInit {
  metadata = {};

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
  }
}
```

Right now, the `metadata` property will always be empty. Populate the `ngOnInit` method to update this with code that fetches the user metadata from the Auth0 Management API:

```js
ngOnInit(): void {
  this.auth.user$
    .pipe(
      concatMap((user) =>
        this.http.get(
          encodeURI(`https://${account.namespace}/api/v2/users/<%= "${user.sub}" %>`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
}
```

This call succeeds because the HTTP interceptor took care of making sure the correct access token was included in the outgoing request.

:::note
In the case of the Auth0 Management API, one of the scopes that the [`/api/v2/users/{id}` endpoint](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) requires is `read:current_user`.
:::

:::panel Checkpoint
Your application will show an empty JSON object if you have not set any `user_metadata` for the logged-in user. To further test out this integration, head to the [Users section of the Auth0 dashboard](https://manage.auth0.com/#/users) and click on the user who is logged in. Update the `user_metadata` section with a value like `{ "theme": "dark" }` and click "Save". Refresh your Angular application and verify that it reflects the new `user_metadata`. 
:::

As a final reminder, consult the [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to learn how to integrate Auth0 with your backend platform.
