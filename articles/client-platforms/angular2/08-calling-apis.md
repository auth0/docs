---
title: Calling APIs
description: This tutorial demonstrates how to use angular2-jwt in Angular 2 applications to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '08-Calling-Api',
  pkgFilePath: '08-Calling-Api/app/auth.config.ts',
  pkgType: 'replace'
}) %>

<%= include('../../_includes/_calling_apis') %>

## Sending Authenticated HTTP Requests

To make an authenticated request, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same interface as the `Http` module but automatically adds the authorization header to requests.

First, add `AUTH_PROVIDERS` from `angular2-jwt`:

```typescript
/* ===== app/app.module.ts ===== */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    ...
    AUTH_PROVIDERS,
    ...
  ],
  imports: [
      ...
  ],
  bootstrap: [AppComponent]
})
```

Then import `AuthHttp`, inject it into your component, and use it to make the authenticated requests.

```typescript
// app/ping.component.ts

import {Component} from '@angular/core';
import {Auth} from './auth.service';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ping',
  templateUrl: 'app/ping.template.html'
})
export class Ping {

  API_URL: string = 'http://localhost:3001';
  message: string;

  constructor(private auth: Auth, private authHttp: AuthHttp) {}

  public securedPing() {
    this.authHttp.get(`<%= "${this.API_URL}" %>/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message= data.text,
        error => this.message = error._body || error
      );
  }
}
```

Your request will have the `Authorization` header added automatically.

`Authorization: Bearer eyJ0eXAiOiJKV1Qi...`

By default, `AuthHttp` will fetch the token from `localStorage` using the `id_token` key. You can change the key used. Or you can create another function to get the token and set the provider manually. For more detail on available options, see: [Configuration Options](https://github.com/auth0/angular2-jwt#configuration-options).

## Not sending the JWT for Specific Requests

If you do not want to send the access token in the authorization header, you can use the default Angular [Http](https://angular.io/docs/ts/latest/guide/server-communication.html) client:

```typescript
// app/ping.component.ts

import {Component} from '@angular/core';
import {Auth} from './auth.service';
import {AuthHttp} from 'angular2-jwt';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ping',
  templateUrl: 'app/ping.template.html'
})
export class Ping {
  API_URL: string = 'http://localhost:3001';
  message: string;

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp) {}

  // Makes a get to the api without authorization headers
  public ping() {
    this.http.get(`<%= "${this.API_URL}" %>/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        error => this.message = error._body
      );
  }

  ...
}
```

