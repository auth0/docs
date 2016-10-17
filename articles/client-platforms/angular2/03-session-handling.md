---
title: Session Handling
description: This tutorial will show you how to integrate Auth0 with angular2 to add session handling and logout to your web app.
budicon: 280
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs2-systemjs-sample',
  path: '03-Session-Handling',
  requirements: [
    'Angular 2.0.1'
  ]
}) %>

In the previous steps of this tutorial, we enabled user login with the `Lock` widget and then with `auth0.js`.

In this step, we will create a session for the user and also allow them to log out.

## Create Session

Once the user is authenticated, we need to create a client-side session for them so that our Angular 2 app knows that they are currently authenticated. To do this, we need to store the value of the `id_token` attribute that is returned in the Lock `authenticated` callback parameter.

**NOTE**: This example uses `localStorage`, but you can use any storage library.

```typescript
// auth.service.ts

...

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  ...
}
```

## Check Session

To check if a user is authenticated, we can use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt) which allows us to check whether the user's JWT is expired or not. Since JWT is a "stateless" manner of doing user authentication, the best way to know if the user should be regarded as authenticated on the front end is to know whether the token is unexpired.

```typescript
// auth.service.ts

import { tokenNotExpired } from 'angular2-jwt';

...

public authenticated() {
  // Check if there's an unexpired JWT
  // It searches for an item in localStorage with key == 'id_token' by default
  return tokenNotExpired();
}
```

To use this service, inject `Auth` into your component:

```typescript
// app/app.component.ts

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {
  constructor(private auth: Auth) {}
};
```

and then use it in your component's template:

```html
  <!-- app/app.template.html -->
  <div class="navbar-header">
    <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
    <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
    <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
  </div>
```

## Logout

Since authentication with JWT is stateless, the only thing necessary for logging the user out is to remove their token from storage.

```typescript
// auth.service.ts

...

public logout() {
  // Remove token from localStorage
  localStorage.removeItem('id_token');
}

...
```
