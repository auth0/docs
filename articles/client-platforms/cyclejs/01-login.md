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

From the command line, run:

    npm install cyclejs-auth0

To work properly, the package also need the `cyclic-router` package:

    npm install cyclic-router

### 2. Instantiate the driver and configure the Auth0Lock

In your main application file, you can now setup the `auth0Driver` and feed it you `client-ID` and `domain`:

```js
import {createHistory} from "history";
import {makeRouterDriver} from 'cyclic-router'
import {makeAuth0Driver, protect} from "cyclejs-auth0";

function main(sources) {
    //your application's code
}

const drivers = {
    auth0: makeAuth0Driver("client-ID", "domain"),
    router: makeRouterDriver(createHistory())
}
```

### 3. Implement the login

Now that everything is setted, you can activate authentication on some of your components. Activating authentication on a component is a simple as calling the `protect` function on that component.  
Let's asume you have a `Todos` component and you want to ensure the user is logged in to see it.

```js
function main(sources) {
    const ProtectedTodos = protect(Todos); //here we wrap the Todos component in the protect function
    const protectedTodosInstance = ProtectedTodos(sources);

    return {
        DOM: protectedTodosInstance.DOM,
        HTTP: protectedTodosInstance.HTTP
        //...
    }
}
```

Now if the user is not logged in when the component is instantiated, the Auth0 form will show up.

${browser}

### 4. Configuring the login form

You may want to use configure the behavior of the Auth0 login form. To achieve that, you can use the `auth0ShowParams` options on the `protect` function:

```js
const ProtectedComponent = protect(Component, {
    auth0ShowParams: {
        authParams: { scope: "openid nickname" },
        responseType: "token"
    }
});
```

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

```js
const ProtectedComponent = protect(Component, {
    decorators: {
        HTTP: (request, token) => {
            return {
                ...request,
                headers: {
                    ...request.headers,
                    //Will add the Authorization header to
                    //any of the http request sent by the component
                    "Authorization": "Bearer " + token
                }
            }
        }
    }
});
```

### 5. Retrieve the user profile and display user information

Once a component is protected, it is given a `props` object that contains a `token$` stream that can be used to either:
- be decoded to get some basic information about your user (sub, nickname ... depending on your `authParams.scope` setting);
- send a `getProfile` request to the Auth0 lock to retrieve a full profile.

```js
function Component(sources) {
    const token$ = sources.props.token$; //the token$ added by the protect function

    const userProfile$ = sources
        .auth0
        .select("getProfile") //read to response of the lock to the getProfile method call

    return {
        auth0: token$
            .filter(token => !!token) //filter empty tokens
            //send the getProfile action to the auth0 driver
            .map(token => ({ action: "getProfile", params: token })

        DOM: userProfile$ //displays the user profile once fetched
            .map(user => p([
                "Welcome",
                span(".nickname", user.nickname)
            ]))
    };
}
```

```html
<p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

### 6. Log out

To logout, you simply need to send the `logout` action to the Auth0 driver.

```js
function main(sources) {
    const logoutAction$ = sources
        .DOM
        .select(".logout")
        .events("click")

    return {
        auth0: logoutAction$.mapTo({ action: "logout" })
    }
}
```

### 7. All done!

You have completed the implementation of Login and Signup with Auth0 and Cycle.js.
