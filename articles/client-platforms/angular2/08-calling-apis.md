---
title: Calling APIs
description: This tutorial will show you how to use angular2-jwt library in Angular2 to make authenticated api calls.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/08-Calling-Api',
}) %>_

The reason for implementing authentication in the first place is to protect information. In this case your information is a resource served from a server of any sort. Auth0 provides a squad of tools to assist you with end-to-end authentication in an application. Auth0 suggests you conform to RFC standard by sending the token through Authorization header.

### Meet AuthHttp

In order to make an authorized request, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same `Http` module interface but automatically add the authorization header to the requests.

First you need to add the `AUTH_PROVIDERS` from `angular2-jwt`

```typescript
/* ===== app/main.ts ===== */
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  ...
  AUTH_PROVIDERS,
  ...
])
```

Then you can import `AuthHttp`, inject it in your component and use it to make the authenticated request:


```typescript
/* ===== app/ping.component.ts ===== */
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
    this.authHttp.get(`${this.API_URL}/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message= data.text,
        error => this.message = error._body || error
      );
  }
}
```

With that your request will have Authorization in your request herders:

```bash
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
```

By default `AuthHttp` will fetch the token from `localStorage`, using `'id_token'` key. You can change the key used, or even set another function to get the token, setting the provider by yourself. More detailed options [here](https://github.com/auth0/angular2-jwt#configuration-options)


For example changing the tokenName (key used in localStorage):


```typescript
/* ===== app/auth.service.ts ===== */
...
localStorage.setItem('another_token_name', authResult.idToken);
...

/* ===== app/main.ts ===== */
bootstrap(AppComponent, [
  ...
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'another_token_name'
      }), http);
    },
    deps: [Http]
  }),
  ...
])
```

### Not sending the JWT for specific requests

When you don't want to send the authentication headers just use the default angular [Http](https://angular.io/docs/ts/latest/guide/server-communication.html) client.

```typescript
/* ===== app/ping.component.ts ===== */
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
    this.http.get(`${this.API_URL}/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        error => this.message = error._body
      );
  }
  
  ...
}
```

### Done!

You have implemented the way of calling an authorized api using Auth0 token.
