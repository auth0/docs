---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
github:
  path : 03-Calling-an-API
---

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
  scope: 'openid profile read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Add `HttpClientModule`

<%= include('../_includes/_calling_api_access_token') %>

You can use the Angular HttpClientModule to attach JSON Web Tokens to requests you make with Angular's `HttpClient` class.

Import the `HttpClientModule` in your AppModule:

```ts
// src/app/app.module.ts
...
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...],
  imports: [
    ...,
    HttpClientModule
  ],
  providers: [...],
  bootstrap: [...]
})
```

## Make Authenticated Calls with `HttpHeaders`

You can now use `HttpClient` and `HttpHeaders` to make secure calls to your API from anywhere in the application.

If you have an API that sends messages from the protected `/private` endpoint, you can create an API call. Set the `headers` option to a new instance of `HttpHeaders()` to attach an `Authorization` header with a value of `Bearer` and the Access token stored in local storage.

```ts
// src/app/ping/ping.component.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

// ...
export class PingComponent {

  API_URL: string = 'http://<your-application-domain>/api';
  message: string;

  constructor(public http: HttpClient) {}

  public securedPing(): void {
    this.message = '';
    this.http
      .get<IApiResponse>(`<%= "${this.API_URL}" %>/private`, {
        headers: new HttpHeaders().set('Authorization', `Bearer <%= "${localStorage.getItem('access_token')}" %>`)
      })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedScopedPing(): void {
    this.message = '';
    this.http
      .get<IApiResponse>(`<%= "${this.API_URL}" %>/private-scoped`, {
        headers: new HttpHeaders().set('Authorization', `Bearer <%= "${localStorage.getItem('access_token')}" %>`)
    })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
    }
}
```

::: note
Alternatively, as of version 4.3 of Angular, you could use [HTTP interceptors](https://angular.io/api/common/http/HttpInterceptor) to attach the token to all outgoing HTTP requests.
:::

<%= include('../_includes/_calling_api_protect_resources') %>
