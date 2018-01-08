---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Cycle.js driver to add authentication and authorization to your web app.
budicon: 448
github:
  path: 01-Login
---

<%= include('../_callback') %>

## 1. Install the `cyclejs-auth0` Package

To install `cyclejs-auth0` from the command line, run:

${snippet(meta.snippets.dependencies)}

## 2. Instantiate the Driver and Configure Auth0Lock

In your main application file, you can now setup the `auth0Driver` and feed it your `clientID` and `domain`:

${snippet(meta.snippets.setup)}

## 3. Implement the Login

Now that everything is set, you can activate authentication on some of your components. Activating authentication on a component is as simple as calling the `protect` function on that component.
Let's assume you have a `Todos` component and you want to ensure the user is logged in to see it.

${snippet(meta.snippets.use)}

Now if the user is not logged in when the component is instantiated, the Auth0 form will show up.

## 4. Configuring the Login Form

You may want to configure the behavior of the Auth0 login form. To achieve that, you can use the `auth0ShowParams` options on the `protect` function:

${snippet(meta.snippets.configure)}

It defaults to:

```js
{
    authParams: { scope: "openid" },
    responseType: "token"
}
```

All the available configurable parameters are supported, see [User configurable options](/libraries/lock/v10/customization).

After authentication, the `protect` function will handle the token parsing and store it to `localStorage`.

## 4. Retrieve and display the User's Information

Once a component is protected, it is given a `props` object that contains a `tokens$` stream that can be used to either:
- be decoded to get some basic information about your user (sub, nickname ... depending on your `authParams.scope` setting);
- send a `getUserInfo` request to the Auth0 lock to retrieve a full profile.

${snippet(meta.snippets.query)}

```html
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

## 5. Implement the Logout

To log out, you simply need to send the `logout` action to the Auth0 driver.

${snippet(meta.snippets.logout)}

<%= include('../_includes/_persisting_state') %>
