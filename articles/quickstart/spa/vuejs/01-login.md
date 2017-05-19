---
title: Login
description: This tutorial will show you how to use the Auth0 Vue.js SDK to add authentication and authorization to your web app.
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-vue-samples',
  path: '01-Login',
  requirements: [
    'Vue.js 1.0.16'
  ]
}) %>

${include('../\_callback')}

## 1. Add the Auth0 Scripts

Add **Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

## 2. Set Up Login and Logout on a Standard Vue Instance (No Routing)

If your app does not require routing, set up a standard Vue.js instance that is attached to a DOM element.

### 2.1 Login

On the Vue instance, create a login method that calls `lock`.

${snippet(meta.snippets.login)}

In this example, the Vue instance is attached to an element with an ID of `app`. The `authenticated` property is used to keep track of the user's authentication state and is initially set to false. It is set to true upon a successful login. When the user authenticates successfully, their `profile` and `token` are saved in local storage.

### 2.2 Logout

To log the user out, simply remove their `profile` and `token` from local storage.

${snippet(meta.snippets.logout)}

These methods can now be attached to elements in the template.

${snippet(meta.snippets.loginlogout)}

::: note
There are multiple ways of implementing login. The example above displays the Lock Widget. However you may implement your own login UI by changing the line `<script src="${lock_url}"></script>` to `<script src="${auth0js_url}"></script>`.
:::

## 3. Implement Routing

For routing in a single page Vue.js app, use **[vue-router](https://github.com/vuejs/vue-router)**. To make use of the router, create Vue components for your application's states.

${snippet(meta.snippets.routing)}

The `canActivate` lifecycle hook is used to determine whether the route can be navigated to. If the user has a JWT in local storage, they are able to reach the route. The `checkAuth` method is used to check for the presence of a JWT in local storage.

<%= include('../_includes/_persisting_state') %>
