---
title: Use the Management API from within Rules
description: Learn how to use the Management API from within rules.
toc: true
topics:
  - rules
  - extensibility
  - management-api
contentType: how-to
useCase: extensibility-rules
---
# Use the Management API from within Rules

From within any [Rule](/rules) you write, you can update a user's `app_metadata` or `user_metadata` using the [`auth0` object](/best-practices/rules#auth0-object), which is a specially-restricted instance of `ManagementClient` (defined in the [node-auth0](https://github.com/auth0/node-auth0) Node.js client library) and provides limited access to the [Auth0 Management API](/api/management/v2). 

To access additional Management API endpoints from inside Rules, you have to use another version of the library.

::: note
The <dfn data-key="access-token">Access Token</dfn> for the Management API, which is available through `auth0.accessToken`, is limited to the `read:users` and `update:users` <dfn data-key="scope">scopes</dfn>. If you require a broader range of scopes, you can request a token using the Client Credentials grant. See [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production).
:::

## Access a newer version of the library

You can load a newer version of the Auth0 Node.js client library by requiring the specific version of the library. For up-to-date version information, check the [repository](https://github.com/auth0/node-auth0).

In this example, we load version `2.9.1` of the library, then query the list of users and logs the users to the console (to be inspected with the [Real-time Webtask Logs Extension](/extensions/realtime-webtask-logs)).

:::warning
[Searching for users](/best-practices/search-best-practices) from inside Rules may affect the performance of your logins; we advise against it. 
:::

```js
function (user, context, callback) {
  var ManagementClient = require('auth0@2.9.1').ManagementClient;
  var management = new ManagementClient({
    token: auth0.accessToken,
    domain: auth0.domain
  });

  management.getUsers(function (err, users) {
    console.log(users);
    callback(null, user, context);
  });
}
```

::: note
For a filtered list of available libraries that can be set as required, check the [available library versions](https://auth0-extensions.github.io/canirequire/#auth0).
:::