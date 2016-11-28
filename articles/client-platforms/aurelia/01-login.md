---
title: Login
default: true
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to Aurelia apps
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aurelia-samples',
  path: '01-Login'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.0.0
* JSPM 0.16.27
* Aurelia-framework 1.0.0-beta.1.1.0
:::

${include('../\_callback')}

## 1. Add the Auth0 Scripts

Add **Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

## 2. Import Dependencies and Set Up Auth0Lock

Later we'll see how to make authenticated HTTP requests, and for that we'll need `HttpClient` from `aurelia-fetch-client`. We also need to create a new instance of `Auth0Lock`.

${snippet(meta.snippets.setup)}

We also set the `isAuthenticated` property to false to start with, but this value will be changed later on to reflect the user's authentication status.

## 2. Set Up the Login and Logout Methods

The `login` and `logout` methods will be bound to button clicks in the template.

We first need to set up the buttons in our template. At the same time, we'll create a button that will be used for authenticated HTTP requests.

${snippet(meta.snippets.template)}

The `login` method will show the Lock widget and save the user's profile and JWT in local storage if authentication is successful and set `isAuthenticated` to true.

${snippet(meta.snippets.login)}

To log the user out, we just need to remove the their JWT and profile from local storage, and then set `isAuthenticated` to false.

${snippet(meta.snippets.logout)}

__Note:__ There are multiple ways of implementing login. The example above displays the Lock Widget. However you may implement your own login UI by changing the line `<script src="${lock_url}"></script>` to `<script src="${auth0js_url}"></script>`.

## 3. Make Secure Calls to an API

To make secure calls to an API, attach the user's JWT as an `Authorization` header to the HTTP request. This is done in the `RequestInit` object as the second argument to the `fetch` call.

${snippet(meta.snippets.http)}

## 4. Configure All HTTP Calls to be Secure

If you wish to attach the user's JWT as an `Authorization` header on all HTTP calls, you can configure the `HttpClient` to do so.

${snippet(meta.snippets.configurehttp)}

You can then remove the `RequestInit` object (the second argument of `fetch`) from individual HTTP calls.

## 5. Optional: Decode the User's JWT to Check Expiry

Checking whether the user's JWT has expired is useful for conditionally showing or hiding elements and limiting access to certain routes. This can be done with the `jwt-decode` package and a simple function. First, install the package.

${snippet(meta.snippets.jwtdecode)}

Next, we can create a utilities file that will have a function that decodes the JWT and checks whether it has expired.

${snippet(meta.snippets.tokenisexpired)}

With this method in place, we can now call it in the constructor so that the user's authentication state is preserved if the page is refreshed.

${snippet(meta.snippets.constructorexpiry)}

## 6. Check Whether a Route Can Be Activated

Aurelia's `canActivate` method can be used to check whether a route can be navigated to. If the user's JWT has expired, we don't want them to be able to navigate to private routes.

${snippet(meta.snippets.routing)}

This hook will redirect the user to some other route (`public` in this case) if the user's JWT has expired.

<%= include('../_includes/_persisting_state') %>