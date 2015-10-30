---
title: Angular 2 Tutorial
name: Angular2
alias:
  - angular2
  - angularjs
language:
  - Javascript
framework:
  - Angular 2
image: /media/platforms/angular.png
tags:
  - quickstart
snippets:
  install: client-platforms/angular2/install
  dependencies: client-platforms/angular2/dependencies
  setup: client-platforms/angular2/setup
  use: client-platforms/angular2/use
  request: client-platforms/angular2/request
  router: client-platforms/angular2/router
alias:
  - angular
---

## Angular 2 Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-with-api',
  pkgFilePath: null,
  pkgType: 'js' + account.clientParam
}) %>

**If you have an existing application, follow the steps below.**

${include('./\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add **Lock** and **angular2-jwt** to your project in your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

You can also install **angular2-jwt** with **npm**.

${snippet(meta.snippets.install)}

### 2. Import Dependencies

To set up a simple component, you'll need some standard Angular 2 imports, as well as the `AuthHttp` class and `tokenNotExpired` function from **angular2-jwt**.

${snippet(meta.snippets.setup)}

### 3. Implement the Login and Logout

To implement login, create a new `Auth0Lock` instance in your component. In this example, we are implementing the login in the app's root component, but it could also be placed in a child component.

${snippet(meta.snippets.use)}

${browser}

In the `login` method, we call `lock.show` which will display the login widget. On a successful login, we save the user's profile object (as a string) and token in local storage.

To log the user out, we simply remove the profile and token from local storage.

We use the `tokenNotExpired` function in the `loggedIn` method to conditionally show and hide the **Login** and **Logout** buttons.

__Note:__ There are multiple ways of implementing a login. The example above displays the Login Widget. However you may implement your own login UI by changing the line `<script src="//cdn.auth0.com/js/lock-7.5.min.js"></script>` to `<script src="//cdn.auth0.com/w2/auth0-6.js"></script>`.

### 4. Make an Authenticated HTTP Request

The `AuthHttp` class is used to make authenticated HTTP requests. The class uses Angular 2's **Http** module but includes the `Authorization` header for you.

${snippet(meta.snippets.request)}

We inject the `AuthHttp` class as `authHttp` and use the `get` method to make an authenticated `GET` request. `AuthHttp` supports all HTTP verbs, so we can just as easily do `POST`, `PUT`, and `DELTE` requests. We can provide an object as the second argument to the call if we want to include a body.

### 5. Check the Token to Protect Routes

Although data from the API will be protected and require a valid JWT to access, users that aren't authenticated will be able to get to any route by default. We can use the `@CanActivate` life-cycle hook from Angular 2's router to limit navigation on certain routes to only those with a non-expired JWT.

${snippet(meta.snippets.use)}

We use the `tokenNotExpired` function within the `@CanActivate` life-cycle hook to determine if the user can navigate to the private route. If the token isn't expired, the function will return `true` and navigation will be permitted.

### 6. All done!

You have completed the implementation of Login and Signup with Auth0 and Angular 2.

### Optional: Use JWT as an Observable

The `Auth0Service` sets a property, `token`, to be an observable stream from the user's JWT. This stream can be used with other streams and can be combined to make authenticated requests. This can be used as an alternative to the explicit `AuthHttp` class.

${snippet(meta.snippets.observable)}


