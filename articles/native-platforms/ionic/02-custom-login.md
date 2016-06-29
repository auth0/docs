---
title: Custom Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-ionic-samples/tree/master/02-Custom-Login',
}) %>

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `02-Custom-Login` folder of the sample project and running `ionic serve`
:::

The previous step explained how you can log users into your application using the Lock Widget. You do not have to use Lock, and can instead create a custom login page and log the user in using the username and password they entered.

If you are using social logins, you can also launch the login screen for a particular social login provider directly from your Ionic application.

### 1. Update references

The custom login uses the Auth0.js library to sign a user in, so you should therefor reference this library instead of the Lock widget in your `index.html`:

${snippet(meta.snippets.referencescustom)}

### 2. Implement the login

For out login view we will display a Username and Password field to allow the user to sign in with their email address and password, and we will also display a button which will allow the user to sign in with their Google account.

Go ahead and update your `login.html` you did in Step 1:

${snippet(meta.snippets.loginviewcustom)}

Also change the `LoginController` to sign the user in with the supplied `username` and `password` fields, or alternatively launch the Google login dialog when the user clicks on the **Login with Google** button:

${snippet(meta.snippets.logincustom)}