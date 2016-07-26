---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/02-Custom-Login',
}) %>

In the previous step, you enabled login with the Auth0 Lock widget. You can also build your application with a custom design without using Lock by including the [Auth0.js library](https://github.com/auth0/auth0.js).

## Custom Login

First, you must add the `Auth0.js` library to your application:

```typescript
/* ===== ./index.html ===== */
...
<script src="//cdn.auth0.com/w2/auth0-7.0.3.min.js"></script>
...
```

The best way to have authentication utilities available across the application is to use an **Injectable** service.

You will need an `Auth0` instance. Create one using your client credentials. Include your `callbackURL` and set `callbackOnLocationHash` to `true`:

```typescript
/* ===== app/auth.service.ts ===== */
// Configure Auth0
auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  callbackOnLocationHash: true,
  callbackURL: '${account.callback}',
});
```

In the `login` method, call the `login` function on the `auth0` instance, setting `connection` to `Username-Password-Authentication` and `responseType` to `token`:

```typescript
/* ===== app/auth.service.ts ===== */
public login(username, password) {
  this.auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
};
```

Since `Auth0` uses [redirect mode](https://github.com/auth0/auth0.js#redirect-mode) by default, the app will be redirected to the `callbackURL` after a successful login. 

With `callbackOnLocationHash` set to `true`, the result will be appended to the URL.

Inside the `Auth` service constructor, check for `hash` information using  Auth0's `parseHash` method, which will extract the `id_token`. Save it to `localStorage`:

```typescript
/* ===== app/auth.service.ts ===== */
...
export class Auth {
  constructor(private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/Home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }
 ...
```

Now, add a form to call the login:

```html
/* ===== app/login.template.html ===== */
<form>
  <div class="form-group">
    <label for="name">Username</label>
    <input type="text" class="form-control" #username placeholder="yours@example.com">
  </div>
  <div class="form-group">
    <label for="name">Password</label>
    <input type="password" class="form-control" #password placeholder="your password">
  </div>
  <button type="submit" class="btn btn-default" (click)="auth.login(username.value, password.value)">Login</button>
</form>
```

## Sign up

To allow users to sign up, provide a `signUp` method:

```typescript
/* ===== app/auth.service.ts ===== */
public signUp(username, password) {
  this.auth0.signup({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
};
```

and add a **Sign Up** button to call this method:

```html
/* ===== app/login.template.html ===== */
...
<button type="submit" class="btn btn-default" (click)="auth.signUp(username.value, password.value)">Sign Up</button>
...
```

## Social login

To log in using a social connection, set the `connection` property of the `login` method to the identity provider you want to use:

```typescript
/* ===== app/auth.service.ts ===== */
public googleLogin() {
  this.auth0.login({
    connection: 'google-oauth2'
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
};
```

and add a button to call this method:

```html
/* ===== app/login.template.html ===== */
<button type="submit" class="btn btn-default btn-primary" (click)="auth.googleLogin()">Login with Google</button>
```
