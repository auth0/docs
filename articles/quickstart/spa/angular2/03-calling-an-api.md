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
Add your scopes to the `scope` key.

```ts
// src/app/auth/auth.service.ts

auth0 = new auth0.WebAuth({
  // ...
  audience: '${apiIdentifier}',
  scope: 'openid profile email read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Add Authorization Header to Requests

<%= include('../_includes/_calling_api_access_token') %>

Inject `HttpClient` into any component or service and use it to return  
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
