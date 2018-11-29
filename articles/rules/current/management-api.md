---
description: How to use the Management API in rules.
toc: true
topics:
  - rules
  - extensibility
  - management-api
contentType:
  - reference
  - concept
  - how-to
useCase:
  - extensibility-rules
---
# Use the Management API in Rules

When you write [Rules](/rules), you can use the `auth0` object to update a user's `app_metadata` or `user_metadata` (for details on how to do this, see [User Metadata in Rules](/rules/current/metadata-in-rules)).

If you wish to access more [Management API](/api/management/v2) endpoints inside Rules, you have to use another version of the library.

:::warning
[Searching for users](/best-practices/search-best-practices) inside Rules may affect the performance of your logins, and we advise against it. 
:::

## How to access a newer version of the library

You can load a newer version of the Auth0 Node.js client library by requiring the specific version on the library (check the [repository](https://github.com/auth0/node-auth0) for up-to-date version information). The sample code below loads version `2.9.1` of the library, then queries the list of users and logs the users to the console (to be inspected with the [Real-time Webtask Logs Extension](/extensions/realtime-webtask-logs)):

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

::: note
The Access Token for the Management API, which is available through `auth0.accessToken`, is limited to the `read:users` and `update:users` scopes. If you require a broader range of scopes, you can [Get Access Tokens for Production](/api/management/v2/get-access-tokens-for-production) to request a token using the Client Credentials Grant.
:::
