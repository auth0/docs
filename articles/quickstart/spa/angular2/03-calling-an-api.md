---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '03-Calling-an-API',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope in `auth0.WebAuth`

In your `auth0.WebAuth` instance, enter your API identifier as the value for `audience`.
Add your newly created scopes to the `scope` key.

```ts
// src/app/auth/auth.service.ts

auth0 = new auth0.WebAuth({
  // ...
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Configure angular2-jwt

<%= include('../_includes/_calling_api_access_token') %>

You can use the [angular2-jwt](https://github.com/auth0/angular2-jwt) module to automatically attach JSON Web Tokens to requests you make with Angular's `Http` class. The module provides an `AuthHttp` class which is a wrapper over the `Http` class.

Install angular2-jwt using npm or yarn.

```bash
# installation with npm
npm install --save angular2-jwt

# installation with yarn
yarn add angular2-jwt
```

Create a factory function with configuration values for angular2-jwt and add it to the `providers` array in your application's `@NgModule`. Add a `tokenGetter` function to the factory function to fetch the access token from local storage.

```ts
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

## Make Authenticated Calls with `AuthHttp`

After you configure angular2-jwt, you can use the `AuthHttp` class to make secure calls to your API from anywhere in the application. 
Inject `AuthHttp` into any component or service and use it as you would use Angular's regular `Http` class. 
If you have an API that sends messages from the protected `/private` endpoint, you can create an API call. 

```ts
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

::: note
To learn more about configuration options for angular2-jwt, see the [main project repo](https://github.com/auth0/angular2-jwt).
:::

<%= include('../_includes/_calling_api_protect_resources') %>
