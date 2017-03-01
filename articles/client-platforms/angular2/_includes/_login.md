## Login

The best way to have authentication utilities available across the application is to use an **Injectable** service.

You will need an `Auth0Lock` instance to receive your Auth0 credentials and an options object. For a full list of Lock's options, see the [customization docs](/libraries/lock/customization).

Your app will need to listen for Lock's `authenticated` event and have a callback registered to handle authentication. The callback has a single parameter that will have the user's authentication information and it will be invoked once the user is redirected after authenticating.

There is a property on the object that gets returned by Auth0 called `idToken` which is a [JSON Web Token](https://jwt.io/introduction) identifying the user. It is this token that can be used to give an indication in your Angular 2 application that the user is authenticated, and it is also used to access resources from an API.

For now, store the `idToken` attribute into `localStorage`.

In the `login` method, call `lock.show()` to display the login widget.

To check if a user is authenticated, use `tokenNotExpired` from [angular2-jwt](https://github.com/auth0/angular2-jwt), which allows you to see if there is a non-expired JWT in local storage.

```typescript
// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

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

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }
}
```

To use this service, inject the `Auth` service into your component:

```typescript
//app/app.component.ts

export class AppComponent {
  constructor(private auth: Auth) {}
}
```

and into your component's template:

```html
<!-- app/app.template.html -->

<div class="navbar-header">
  <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
  <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
  <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
</div>
```

And create your [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html) in your root app module as follows:

```typescript
// app/app.module.ts

import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { routing,
         appRoutingProviders } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders
  ],
  imports: [
    BrowserModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

The Lock widget will be displayed when the **Login** button is clicked.

## Use with HashLocationStrategy

In redirect-based authentication flows, the results for the user's authentication transaction come back in a hash fragment. Angular's router automatically cleans up routes on navigation. When using `HashLocationStrategy`, this means that the application won't see the fragment and the `authenticated` event won't work properly.

As a workaround, look for an `access_token`, `id_token`, or `error` in the hash when `NavigationStart` happens and use Lock's `resumeAuth` method.

```js
// app/auth.service.ts

import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';

constructor(public router: Router) {
  this
    .router
    .events
    .filter(event => event.constructor.name === 'NavigationStart')
    .filter(event => (/access_token|id_token|error/).test(event.url))
    .subscribe(() => {
      this.lock.resumeAuth(window.location.hash, (error, authResult) => {
        if (error) return console.log(error);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/']);
      });
  });
}
```

<%= include('../../_includes/_persisting_state') %>
