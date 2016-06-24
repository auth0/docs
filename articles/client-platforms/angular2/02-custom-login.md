---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/02-Custom-Login',
}) %>


The previous step explains how to login but with a widget called Lock. Lock is completely optional so you can build an application with Auth0 using your custom design without having to include it. You just need to use the [Auth0.js library](https://github.com/auth0/auth0.js). Let's see how.

#### Login

To implement login, first create an Auth0 instance.

```typescript
// Configure Auth0
auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  callbackOnLocationHash: true,
  callbackURL: `${account.callback}`,
});
```

In login method, just call `login` function on `auth0` instance:

```typescript
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

`Auth0` uses [redirect mode](https://github.com/auth0/auth0.js#redirect-mode) as default, so after a successful login, the app will be redirected to `callbackURL`. 
You can check for `hash` information inside `Auth` constructor using `parseHash` method:

```typescript
constructor(private router: Router) {
  var result = this.auth0.parseHash(window.location.hash);

  if (result && result.idToken) {
    localStorage.setItem('id_token', result.idToken);
    this.router.navigate(['/Home']);
  } else if (result && result.error) {
    alert('error: ' + result.error);
  }
}
```

Now, let's add a form to actually call login:

```html
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

#### Sign up

To do a Sign Up just call `signup` method on `auth0` instance:

```typescript
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

and add the button to call this:

```html
...
<button type="submit" class="btn btn-default" (click)="auth.signUp(username.value, password.value)">Sign Up</button>
...
```

#### Social login

To login using social connector, you just need to tell `Auth0` which connection you want to use:

```typescript
public googleLogin() {
  this.auth0.login({
    connection: 'google-oauth2'
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
};
```

and again add a button to call this:

```html
<button type="submit" class="btn btn-default btn-primary" (click)="auth.googleLogin()">Login with google</button>
```
