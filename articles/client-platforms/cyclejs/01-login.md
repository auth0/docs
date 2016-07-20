---
title: Login
description: This tutorial will show you how to use the Auth0 Cycle.js driver to add authentication and authorization to your web app.
---

## Cycle.js Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 6.3
* npm 3.10.3
* @cycle/xstream-run 3.0.3
* cyclejs-auth0 1.0.1
:::

${include('../\_callback')}

### 1. Install the cyclejs-auth0 package

To install both `cyclejs-auth0` and the `cyclic-router` (needed to parse the token sent by Auth0), from the command line, run:

${snippet(meta.snippets.dependencies)}

### 2. Instantiate the driver and configure the Auth0Lock

In your main application file, you can now setup the `auth0Driver` and feed it you `client-ID` and `domain`:

${snippet(meta.snippets.setup)}

### 3. Implement the login

Now that everything is setted, you can activate authentication on some of your components. Activating authentication on a component is a simple as calling the `protect` function on that component.  
Let's asume you have a `Todos` component and you want to ensure the user is logged in to see it.

${snippet(meta.snippets.use)}

Now if the user is not logged in when the component is instantiated, the Auth0 form will show up.

### 4. Configuring the login form

You may want to use configure the behavior of the Auth0 login form. To achieve that, you can use the `auth0ShowParams` options on the `protect` function:

${snippet(meta.snippets.configure)}

It defaults to:
```js
{
    authParams: { scope: "openid" },
    responseType: "token"
}
```

All the available arguments for `lock.show` are supported, see [.show\(\[options, callback\]\)](/libraries/lock#-show-options-callback-).

After authentication, the `protect` function will handle the token parsing and storing it to `localStorage`.

### 4. Configure secure calls to your API

To configure secure calls to the API you are creating<%= configuration.api ? ' on ' + configuration.api : '' %>, you need to decorate all your newly secured component's http calls with the [JWT token](/jwt) that has been stored in `localStorage`. To do that, you can set a decorator that will be called on each http request and where you can add the `Authorization` header.

${snippet(meta.snippets.securize)}

### 5. Retrieve the user profile and display user information

Once a component is protected, it is given a `props` object that contains a `token$` stream that can be used to either:
- be decoded to get some basic information about your user (sub, nickname ... depending on your `authParams.scope` setting);
- send a `getProfile` request to the Auth0 lock to retrieve a full profile.

${snippet(meta.snippets.query)}

```html
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

### 6. Log out

To logout, you simply need to send the `logout` action to the Auth0 driver.

${snippet(meta.snippets.logout)}

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and Cycle.js.
