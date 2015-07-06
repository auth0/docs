---
lodash: true
title: AngularJS Tutorial
name: Angular.js
image: //auth0.com/lib/platforms-collection/img/angular.png
tags:
  - quickstart
---

## AngularJS Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-angular/master/create-package?path=examples/widget-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, if you already have an existing application, please follow the steps below.**

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

```html
<!-- We use client cookies to save the user credentials -->
<script src="//code.angularjs.org/1.2.16/angular-cookies.min.js"></script>

<!-- Auth0 Lock script and AngularJS module -->
<script src="@@widget_url_no_scheme@@"></script>
<!-- angular-jwt and angular-storage -->
<script type="text/javascript" src="//cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js"></script>
<script type="text/javascript" src="//cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js"></script>

<script src="//cdn.auth0.com/w2/auth0-angular-4.js"> </script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including Auth0's angular module and its dependencies to the `index.html`.

### 2. Add the module dependency and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`

@@snippet('angularjs/app.run.js')@@

### 3. Let's implement the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup.
In this case, we'll add the call in the `login` method of the `LoginCtrl` controller. On login success, we'll save the user profile and token into `localStorage`.

@@snippet('angularjs/loginctrl.js')@@

@@snippet('angularjs/login.tpl.html')@@

@@browser@@

> Note: there are multiple ways of implementing login. What you see above is the Login Widget, but if you want to have your own UI you can change the `<script src="//cdn.auth0.com/js/auth0-lock-6.js"></script>` for `<script src="//cdn.auth0.com/w2/auth0-2.1.js"></script>`. For more details [check the GitHub repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 4. Adding a logout button

You can just call the `signout` method of Auth0 to log the user out. You should also remove the information saved into `localStorage`:

@@snippet('angularjs/logout.js')@@

@@snippet('angularjs/logout.html')@@

### 5. Configuring secure calls to our API

As we're going to call an API we did<%= configuration.api ? ' on ' + configuration.api : '' %>, we need to make sure we send the [JWT token](/jwt) we receive on the login on every request. For that, we need to do the add the `jwtInterceptor` to the list of `$http` interceptors:

@@snippet('angularjs/app.config.js.md')@@

Now, you can regularly call your API with `$http`, `$resource` or any rest client as you'd normally do and the [JWT token](/jwt) will be sent on every request.

### 6. Showing user information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

@@snippet('angularjs/profile.html')@@

@@snippet('angular/userinfoctrl.js')@@

You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 7. Keeping the user logged in after page refreshes

We already saved the user profile and tokens into `localStorage`. We just need to fetch them on page refresh and let `auth0-angular` know that the user is already authenticated.

@@snippet('angularjs/token-refresh.js')@@

### 8. You're done!

You've implemented Login and Signup with Auth0 and AngularJS.

### Optional Steps
#### Let's add routing

In most cases, we'll have routing in our app.
We usually want users to be authenticated to access some of the routes. For those routes, we must set the `requiresLogin` property to `true`.
So let's add the `$routeProvider` configuration in the `config` method of our app and let's specify the login to route to which the users will be redirected if trying to access a route to which they don't have access to:

@@snippet('angularjs/app.routing.js')@@

__Note__: If you are using ui-router, you can follow [this guide](https://github.com/auth0/auth0-angular/blob/master/docs/routing.md#ui-router)

#### Additional info

To get Additional info on how to use this SDK, you [should check this out](https://github.com/auth0/auth0-angular/blob/master/README.md)
