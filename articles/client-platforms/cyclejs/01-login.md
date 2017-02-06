---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Cycle.js driver to add authentication and authorization to your web app.
budicon: 448
---

::: panel-info System Requirements
This tutorial has been tested with the following:

* NodeJS 6.3
* npm 3.10.3
* @cycle/xstream-run 3.0.3
* cyclejs-auth0 1.1.0
:::



${include('../\_callback')}

## 1. Install the `cyclejs-auth0` Package

To install both `cyclejs-auth0` and the `cyclic-router` (needed to parse the token sent by Auth0), from the command line, run:

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

## 4. Configure Secure Calls to Your API

To configure secure calls to the API you are creating, you need to decorate all your newly secured component's HTTP calls with the [JSON Web Token](/jwt) that has been stored in `localStorage`. To do that, you can set a decorator that will be called on each HTTP request and where you can add the `Authorization` header.

${snippet(meta.snippets.securize)}

## 5. Retrieve the User Profile and Display User Information

Once a component is protected, it is given a `props` object that contains a `token$` stream that can be used to either:
- be decoded to get some basic information about your user (sub, nickname ... depending on your `authParams.scope` setting);
- send a `getProfile` request to the Auth0 lock to retrieve a full profile.

${snippet(meta.snippets.query)}

```html
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

## 6. Implement the Logout

To log out, you simply need to send the `logout` action to the Auth0 driver.

${snippet(meta.snippets.logout)}

<%= include('../_includes/_persisting_state') %>
