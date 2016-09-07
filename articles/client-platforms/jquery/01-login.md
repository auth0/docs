---
title: Login
description: This tutorial will show you how to use the Auth0 jQuery SDK to add authentication and authorization to your web app.
---

You can get started by either downloading the seed project or, if you would like to add Auth0 to an existing application, you can follow the tutorial steps. In this case, we will use Auth0's CDN.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/master/01-Login',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

<%= include('../../\_includes/\_signup') %>

**If you have an existing application, follow the steps below.**

${include('../\_callback')}

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include Auth0's jQuery module and its dependencies and set the viewport:

${snippet(meta.snippets.dependencies)}

### 2. Configure Lock

Configure Lock with your `client ID` and `domain`:

To discover all the available options for `Auth0Lock`, see [the Lock customization documentation](/libraries/lock/customization).

${snippet(meta.snippets.setup)}

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `Lock` instance when a user clicks the login button.

${snippet(meta.snippets.use)}

After authentication, Auth0 will redirect the user back to your application with an identifying token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```js
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);

    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
});
```

${browser}

### 4. Retrieve the user profile and display user information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```js
//retrieve the profile:
var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
}
```

```html
<img class="avatar">
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

### 5. Log out

In this implementation, a logout involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
localStorage.removeItem('id_token');
userProfile = null;
window.location.href = "/";
```

# Summary

In this guide you learned how to use the `Lock` widget to log users into your jQuery project.
