---
title: Auth0 Angular 2 SDK Tutorial
name: Angular 2
description: This tutorial will show you how to use the Auth0 Angular 2 SDK to add authentication and authorization to your web app.
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
  dependencies: client-platforms/angular2/dependencies
  install: client-platforms/angular2/install
  observable: client-platforms/angular2/observable
  request: client-platforms/angular2/request
  router: client-platforms/angular2/router
  setup: client-platforms/angular2/setup
  system_map: client-platforms/angular2/system-map
  use: client-platforms/angular2/use
alias:
  - angular
seo_alias: angular2
---

## Angular 2 SDK Tutorial
You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Angular2 2.0.0-rc.1
* NodeJS 4.3
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular2',
  pkgBranch: 'master',
  pkgPath: null,
  pkgFilePath: 'auth0vars.ts',
  pkgType: 'replace'
}) %>

**If you have an existing application, follow the steps below.**

${include('./\_callback')}

### 1. Add the Auth0 Scripts and Install angular2-jwt

Install **angular2-jwt** with **npm**.

${snippet(meta.snippets.install)}

Add **Lock** in your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

### 2. Set Up SystemJS Configuration to Map angular2-jwt

If you're using SystemJS, set up `System.config` to map **angular-jwt** so that it can be imported.

${snippet(meta.snippets.system_map)}

### 2.1 Using Webpack

**If you are using Webpack, please see the [auth0-angular2 Webpack example](https://github.com/auth0/auth0-angular2/tree/master/webpack) for configuration.**

### 3. Import Dependencies

To set up a simple component, you'll need some standard Angular 2 imports, as well as the `AuthHttp` class and `tokenNotExpired` function from **angular2-jwt**.

${snippet(meta.snippets.setup)}

### 4. Implement Login and Logout

To implement login, create a new `Auth0Lock` instance in your component. In this example, login is implemented in the app's root component, but it could also be placed in a child component.

${snippet(meta.snippets.use)}

${browser}

In the `login` method, call `lock.show` to display the login widget. On a successful login, you can save the user's profile object (as a string) and token in local storage.

To log the user out, simply remove the profile and token from local storage.

You can use the `tokenNotExpired` function in the `loggedIn` method to conditionally show and hide the **Login** and **Logout** buttons.

__Note:__ There are multiple ways of implementing a login. The example above displays the Login Widget. However you may implement your own login UI by changing the line `<script src="//cdn.auth0.com/js/lock-9.0.min.js"></script>` to `<script src="//cdn.auth0.com/w2/auth0-6.8.js"></script>`.

### 5. Make an Authenticated HTTP Request

The `AuthHttp` class is used to make authenticated HTTP requests. `AuthHttp` uses Angular 2's **Http** class but includes the `Authorization` header for you on requests.

${snippet(meta.snippets.request)}

Inject the `AuthHttp` class as `authHttp`. This example uses the `get` method to make an authenticated `GET` request. `AuthHttp` supports all HTTP verbs, so you can just as easily do `POST`, `PUT`, and `DELETE` requests. You can provide an object as the second argument to the call if you want to include a body.

### 6. Limit Certain Routes to Authenticated Users

Although data from the API will be protected and require a valid JWT to access, users that aren't authenticated will be able to get to any route by default. You can use the `@CanActivate` life-cycle hook from Angular 2's router to limit navigation on certain routes to only those with a non-expired JWT.

${snippet(meta.snippets.router)}

Use the `tokenNotExpired` function within the `@CanActivate` life-cycle hook to determine if the user can navigate to the private route. If the token isn't expired, the function will return `true` and navigation will be permitted.

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and Angular 2.

### Optional: Use JWT as an Observable

The `AuthHttp` class sets a property, `tokenStream`, as an observable stream from the user's JWT. This stream can be used with other streams and can be combined to make authenticated requests. This can be used as an alternative to the explicit methods in the `AuthHttp` class.

${snippet(meta.snippets.observable)}
