---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain API endpoints.
budicon: 500
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-api-sample',
  path: '02-Authorization',
  requirements: [
    'Java 7 or above',
    'Maven 3.0.x or above'
  ]
}) %>

In this step we will see how we can add role based authorization to our API, using [Rules](/rules).

## 1. Create a Rule to assign roles

In our example we will create a simple rule that assigns two roles (`ROLE_ADMIN` and `ROLE_USER`) to any user. Of course you can change our sample code to match your needs.

To create a new rule, navigate to the [new rule page](${manage_url}/#/rules/new) and select the __Set Roles To A User__ template, under _Access Control_. Then, replace the sample script with the following:

${snippet(meta.snippets.newRule)}

The first condition of this rule makes sure that it runs only for a specific `CLIENT_ID`. Make sure the value matches the `CLIENT_ID` of the Client you are using for this API.

What this rule does is add a `roles` property at the `app_metadata`. To customize your API based on its value, first you need to retrieve this information. This can be retrieved as part of the token.

When you ask for a token you need to add this new property, `roles`, as part of the `scope` parameter. For example, if your front-end is using Lock, the code should look like this:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
lock.showSignin({
    authParams: {
        scope: 'openid roles'
    },
    // ... other params
});
```

For more details on the `scope` parameter refer to: [Scopes](/scopes).

## 2. Secure the endpoints

For our sample, we will allow anyone to call our `ping` endpoint. We will also allow both `ROLE_USER` and `ROLE_ADMIN` to perform `GET` operations on our `/api/v1/profiles/**` endpoints. However, we will restrict the `POST`, `PUT` and `DELETE` operations to strictly `ROLE_ADMIN` role privilege.

Add the following code at the `AppConfig.java`:

${snippet(meta.snippets.AppConfig)}

### 3. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT [id_token](/tokens#auth0-id_token-jwt-).

```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

Before making the request you should replace the port (`8000`) with the one on which your app is listening.

If the roles functionality is not working properly for you make sure that the `roles` property is included in the token. To ensure this you can log your token and use the [JWT home page](https://jwt.io/) to decode it and review its contents.

### 4. You're done!

You have configured your Java Spring Security API to use Auth0. Congrats, you're awesome!
