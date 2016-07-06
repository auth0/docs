---
title: Session Handling
description: This tutorial will show you how to integrate Auth0 with angular2 to add session handling and logout to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/01-Login',
}) %>

Previous steps explain how to login using both `Lock` and `Auth0`. Most of the time, when you login, you want to create a session for that user and also allow the user to logout. Let's see how to do it.


#### Create Session

Once the user is logged in, we want to create a session for that user. To do this, we only need to store the `idToken` attribute, which came in lock `authenticated` callback parameter.
We are going to use `localStorage`, but you can use any storage library you want.

```typescript
/* ===== ./auth.service.ts ===== */
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
}
```

#### Check Session

To know if a user is authenticated, just use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt) which allows you to check whether there is a non-expired JWT in local storage.

```typescript
/* ===== ./auth.service.ts ===== */
import { tokenNotExpired } from 'angular2-jwt';
...
public authenticated() {
  // Check if there's an unexpired JWT
  // It searches for an item in localStorage with key == 'id_token' by default
  return tokenNotExpired();
};
...
}
```

To use this, just inject the `Auth` service into your component

```typescript
/* ===== app/app.component.ts ===== */
@Component({
    selector: 'my-app',
    providers: [ Auth ],
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {
  constructor(private auth: Auth) {}
};
```

and then in your component's template

```html
/* ===== app/app.template.html ===== */
<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>

```
#### Logout

To do the logout, just remove the token from `localStorage`

```typescript
/* ===== ./auth.service.ts ===== */
...
public logout() {
  // Remove token from localStorage
  localStorage.removeItem('id_token');
};
...
}
```


Done. You've implemented Session Handling and Logout with Auth0 in your Angular2 project.
