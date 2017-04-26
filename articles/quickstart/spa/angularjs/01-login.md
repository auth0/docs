---
title: Login
description: This tutorial demonstrates how to use the Auth0 AngularJS SDK to add authentication and authorization to your mobile app.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '01-Login',
  requirements: [
    'AngularJS 1.5.8',
    'angular-lock 2.0.2'
  ]
}) %>

The first step in adding authentication to your Angular app is to provide a way for the user to log in. The easiest way to do this with Auth0 is to use the [Lock widget](/libraries/lock).

**Note:** You should scope your Angular application to a `div` tag inside the `body`. This will prevent issues with Angular incorrectly trying to handle events that are handled properly by Lock.

```html
<body>
  <div ng-app="myApp">
   ...
  </div>
  ...
</body>
```

<%= include('_includes/_authservice') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_login') %>
