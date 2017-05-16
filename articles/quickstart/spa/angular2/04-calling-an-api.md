---
title: Calling an API
description: This tutorial demonstrates how to use angular2-jwt in an Angular 2+ application to make authenticated API calls
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '03-Calling-an-Api',
  requirements: [
    'Angular 2+'
  ]
}) %>

It's likely that your single page app will need to consume resources from a data API. Since you are adding authentication to your app, presumably you need to limit access to these resources such that they are only accessible by an authenticated user who is authorized to retrieve them. Auth0 provides [API Authorization](https://auth0.com/docs/api-auth) to accomplish this.

This tutorial will guide you through how to make calls from your Angular application to your data API to access protected resources. It does not, however, cover how to add protection to your API itself. For instructions on protecting your API, please follow the [Backend/API quickstart documentation](quickstart/backend) specific to your situation.

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope in `auth0.WebAuth`

Pass your API identifier for your newly created API as the `audience` value in your `auth0.WebAuth` instance. Additionally, pass any of your newly created scopes to the `scope` key.

```ts
// src/app/auth/auth.service.ts

auth0 = new auth0.WebAuth({
  // ...
  audience: '{YOUR_API_IDENTIFIER}',
  scope: 'read:messages'
});
```

At this point you should try logging in again and take note of how the `access_token` differs from before. Instead of being an opaque token, it is now a JSON Web Token which has a payload that contains your API identifier as an `audience` and any `scope`s you've requested.

> **Note:** By default, any user on any client can ask for any scope defined in the scopes configuration area. You can implement access policies to limit this behaviour via [Rules](https://auth0.com/docs/rules).

## Configure angular2-jwt

<%= include('../_includes/_calling_api_access_token') %>

The [angular2-jwt](https://github.com/auth0/angular2-jwt) module can be used to automatically attach JSON Web Tokens to requests made with Angular's `Http` class. To to so, it provides an `AuthHttp` class which is a wrapper over `Http`.

If you haven't already done so, install angular2-jwt.

```bash
# installation with npm
npm install --save angular2-jwt

# installation with yarn
yarn add angular2-jwt
```

Create a factory function with some configuration values for angular2-jwt and add it to the `providers` array in your application's `@NgModule`. The factory function should have a `tokenGetter` functon which fetches the `access_token` from local storage.

```js
// src/app/app.module.ts

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [...]
})
```

## Make Secure Calls with AuthHttp

After angular2-jwt is configured, you can use the `AuthHttp` class to make secure calls to your API from anywhere in the application. To do so, inject `AuthHttp` in any component or service where it is needed and use it just as you would use Angular's regular `Http` class. Assuming you have an API which returns a `message` from some protected endpoint called `/private`, you could craft an API call as such:

```js
// src/app/ping/ping.component.ts

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

// ...
export class PingComponent {

  API_URL: string = 'http://<your-application-domain>/api';
  message: string;

  constructor(public authHttp: AuthHttp) {}

  public securedPing(): void {
    this.message = '';
    this.authHttp.get(`<%= "${this.API_URL}" %>/private`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }
}
```

<%= include('../_includes/_calling_api_protect_resources') %>