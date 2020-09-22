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
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_calling_api_preamble_api2") %>

This article builds upon [the previous chapter](/quickstart/spa/angular-next), adding the capability to automatically attach an access token to outgoing requests made using Angular's built-in `HttpClient` service.

:::note
If you followed the [previous section where you added user log in to Angular](/quickstart/spa/angular-next#add-login-to-your-application), make sure that you log out of your application as you'll need a new access token to call APIs.
:::

## Provide the HTTP Interceptor

To install and configure the HTTP interceptor, perform the following steps:

* Import the `AuthHttpInterceptor` type from the Auth0 Angular SDK
* Import `HttpClientModule` and `HTTP_INTERCEPTORS` from `@angular/common/http`
* Register `AuthHttpInterceptor` in the `providers` section of your application module
* Add configuration to specify audience, scope, and which requests should have an `Authorization` header attached automatically

The following is an example of an Angular module (based upon the default implementation when you create a new app using `ng new`) that supports `AuthHttpInterceptor`, configured to call the Auth0 Management API with the ability to read the current user profile:

To begin, open your `app.module.ts` file and add the necessary imports at the top:

```javascript
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
```

Next, import `HttpClientModule` into the `imports` array of `AppModule`:

```javascript
imports: [
  HttpClientModule,
],
```

Now add the Auth0 HTTP interceptor to the `providers` array of `AppModule`, like so:

```javascript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
],
```

Finally, modify the configuration given to `AuthModule.forRoot()` to specify the `audience` and `scope` values required by the API you want to call, as well as the API routes that should be intercepted by `AuthHttpInterceptor`.

In this case, the audience and scope for the Auth0 Management API are given, which allows your app to retrieve information about the current user.

```javascript
AuthModule.forRoot({
  // The domain and clientId were configured in the previous chapter
  domain: '${account.namespace}',
  clientId: '${account.clientId}',

  // Request this audience at user authentication time
  audience: 'https://${account.namespace}/api/v2/',

  // Request this scope at user authentication time
  scope: 'read:current_user',

  // Specify configuration for the interceptor              
  httpInterceptor: {
    allowedList: [
      {
        // Match any request that starts 'https://${account.namespace}/api/v2/' (note the asterisk)
        uri: 'https://${account.namespace}/api/v2/*',
        tokenOptions: {
          // The attached token should target this audience
          audience: 'https://${account.namespace}/api/v2/',

          // The attached token should have these scopes
          scope: 'read:current_user'
        }
      }
    ]
  }
})
```

Please [refer to the docs](https://github.com/auth0/auth0-angular#configure-authhttpinterceptor-to-attach-access-tokens) for more information on the available options for the HTTP interceptor.

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

Please refer to the the [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to learn how to integrate Auth0 with your backend platform.
