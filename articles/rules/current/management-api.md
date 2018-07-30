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

When you write [Rules](/rules), you can use the `auth0` object to update a user's `app_metadata` or `user_metadata` (for details on how to do that, see [User Metadata in Rules](/rules/current/metadata-in-rules)).

If you wish to access more [Management API](/api/management/v2) endpoints inside Rules, you have to use another version of the library.

:::warning
[Searching for users](/users/search/best-practices) inside Rules may affect the performance of your logins and we advise against it. 
:::

## How to access a newer version of the library

You can load a newer version of the Auth0 Node.js client library by requiring the specific version on the library. The sample code below loads version `2.6.0` of the library, then query the list of users and log the users to the console (to be inspected with the [Real-time Webtask Logs Extension](/extensions/realtime-webtask-logs)):

```js
function (user, context, callback) {
  var ManagementClient = require('auth0@2.6.0').ManagementClient;
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
The Access Token for the Management API which is available through `auth0.accessToken` is limited to the `read:users` and `update:users` scopes. If you require a broader range of scopes you can [request a token using Client Credentials Grant](/api/management/v2/tokens#automate-the-process).
:::
