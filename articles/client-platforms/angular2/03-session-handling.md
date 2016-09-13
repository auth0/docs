---
title: Session Handling
description: This tutorial will show you how to integrate Auth0 with angular2 to add session handling and logout to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs2-systemjs-sample',
  pkgBranch: 'master',
  pkgPath: '03-Session-Handling',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

In the previous steps of this tutorial, you enabled user login with the `Lock` widget and then with `Auth0.js`. 

In this step, you will create a session for that user and also allow the user to logout.

## Create Session

Once the user is logged in, you will want to create a session for that user. To do this, you only need to store the value of the `id_token` attribute that is returned in the Lock `authenticated` callback parameter.

**NOTE**: This example uses `localStorage`, but you can use any storage library.

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

## Check Session

To check if a user is authenticated, you can use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt), which allows you to see if there is a non-expired JWT in local storage:

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

To use this service, inject the `Auth` service into your component:

```typescript
/* ===== app/app.component.ts ===== */
@Component({
    selector: 'my-app',
    providers: [ Auth ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {
  constructor(private auth: Auth) {}
};
```

and then into your component's template:

```html
/* ===== app/app.template.html ===== */
<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>
```

## Logout

To logout a user, remove the token from `localStorage`:

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

