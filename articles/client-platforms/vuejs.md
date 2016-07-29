---
title: Vue.js Tutorial
name: Vue.js
alias:
  - vue
  - vuejs
language:
  - Javascript
framework:
  - Vue.js
image:
tags:
  - quickstart
snippets:
  dependencies: client-platforms/vuejs/dependencies
  http: client-platforms/vuejs/http
  httpcall: client-platforms/vuejs/httpcall
  interceptors: client-platforms/vuejs/interceptors
  login: client-platforms/vuejs/login
  loginlogout: client-platforms/vuejs/loginlogout
  logout: client-platforms/vuejs/logout
  routing: client-platforms/vuejs/routing 
alias:
  - vuejs
---

## Vue.js Tutorial

<%= include('../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-vue-samples/tree/master/00-Starter-Seed',
  pkgRepo: 'auth0-vue',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'js' + account.clientParam
}) %>

**If you have an existing application, follow the steps below.**

${include('./\_callback')}

### 1. Add the Auth0 Scripts

Add **Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

### 2. Set Up Login and Logout on a Standard Vue Instance (No Routing)

If your app does not require routing, set up a standard Vue.js instance that is attached to a DOM element. 

#### 2.1 Login

On the Vue instance, create a login method that calls `lock`.

${snippet(meta.snippets.login)}

In this example, the Vue instance is attached to an element with an ID of `app`. The `authenticated` property is used to keep track of the user's authentication state and is initially set to false. It is set to true upon a successful login. When the user authenticates successfuly, their `profile` and `token` are saved in local storage.

#### 2.2 Logout

To log the user out, simply remove their `profile` and `token` from local storage.

${snippet(meta.snippets.logout)}

These methods can now be attached to elements in the template.

${snippet(meta.snippets.loginlogout)}

__Note:__ There are multiple ways of implementing login. The example above displays the Lock Widget. However you may implement your own login UI by changing the line `<script src="${widget_url_no_scheme}"></script>` to `<script src="//cdn.auth0.com/w2/auth0-6.7.js"></script>`.

### 3. Make Secure Calls to an API

To make secure calls to an API, attach the user's JWT as an `Authorization` header to the HTTP request. Be sure that you have **[vue-resource](https://github.com/vuejs/vue-resource)** in your project to make HTTP requests.

${snippet(meta.snippets.http)}

This method can then be used in your template to make the API call.

${snippet(meta.snippets.httpcall)}

### 4. Implement Routing

For routing in a single page Vue.js app, use **[vue-router](https://github.com/vuejs/vue-router)**. To make use of the router, create Vue components for your application's states.

${snippet(meta.snippets.routing)}

The `canActivate` lifecycle hook is used to determine whether the route can be navigated to. If the user has a JWT in local storage, they are able to reach the route. The `checkAuth` method is used to check for the presence of a JWT in local storage.

### 5. Intercept Unauthorized Requests

An HTTP interceptor can be used to define custom actions for any unauthorized requests. In many cases, an `HTTP 401` will be returned when the user's JWT is expired or otherwise invalid. When this happens, you will likely want to invalidate the user's `authenticated` state on the front end and redirect them to the home or login route.

${snippet(meta.snippets.interceptors)}

### 6. All done!

You have completed the implementation of Login and Signup with Auth0 and Vue.js!
