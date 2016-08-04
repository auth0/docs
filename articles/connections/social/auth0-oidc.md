---
connection: Auth0 OpenIDConnect
seo_alias: auth0-oidc
image: /media/connections/auth0.png
description: You can use a Client on another Auth0 account as an identity provider in your current Auth0 account.
---

# Authenticate using OpenIDConnect to another Auth0 account

You can use a Client on another Auth0 account (referred to below as the **child account**) as an identity provider in your current Auth0 account (the **master account**).

## Configure the Child Auth0 Account

1. Create a Client or edit an existing one.
2. Take note of its **clientID** and **clientSecret**. You will need these to create the connection in the master account.
3. Add the master account's login callback to the list of **Allowed Callback URLs**: `https://${account.namespace}/login/callback`

![](/media/articles/connections/social/auth0-oidc/child-app.png)

## Configure the Master Auth0 Account

The Auth0-to-Auth0 connection is not yet supported in the Dashboard. You need to create the connection using the [Create a connection](/api/v2#!/Connections/post_connections) endpoint, which will require an [API V2 token](/api/management/v2/tokens) with `create:connections` scope.

Here is a sample request:

```sh
curl -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_API_V2_TOKEN}' -d @auth0-oidc-connection.json https://${account.namespace}/api/management/v2#!/Connections/post_connections
```

with the **auth-oidc-connection.json** file containing:

```js
{
  "name": "YOUR-AUTH0-CONNECTION-NAME",
  "strategy": "auth0-oidc",
  "options": {
    "client_id": "CHILD_CLIENT_ID",
    "client_secret": "CHILD_CLIENT_SECRET",
    "domain": "CHILD_AUTH0_DOMAIN",
    "scope": "openid"
  },
  "enabled_clients":["${account.clientId}"]
}
```

The required parameters for this connection are:

* **name**: how the connection will be referenced in Auth0 or in your app.
* **strategy**: defines the protocol implemented by the provider. This should always be `auth0-oidc`.
* **options.client_id**: the `clientID` of the target Client in the child Auth0 account.
* **options.client_secret**: the `cliendSecret` of the target Client in the child Auth0 account.
* **options.domain**: the domain of the child Auth0 account.

Optionally, you can add:

* **options.scope**: the scope parameters for which you wish to request consent (i.e. `profile`, `identities`, etc.).
* **enabled_clients**: an array containing the identifiers of the clients for which the connection is to be enabled. If the array is empty or the property is not specified, no clients are enabled.

## Use the Auth0 connection

You can use any of the standard Auth0 mechanisms (e.g. direct links, [Auth0 Lock](/libraries/lock), [auth0.js](/auth0js), etc.) to login a user with the auth0-oidc connection.

A direct link would look like:

`https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=YOUR-AUTH0-CONNECTION-NAME`

To add a custom connection in Lock, you can add a custom button as described in [Adding a new UI element using JavaScript](/libraries/lock/v9/ui-customization#adding-a-new-ui-element-using-javascript) and use the direct link as the button `href`.

The user will be redirected to the built-in login page of the child Auth0 account where they can choose their identity provider (from the enabled connections of the target Client) and enter their credentials.

![](/media/articles/connections/social/auth0-oidc/login-page.png)

## The resulting profile

Once the user is authenticated, the resulting profile will contain the [Auth0 Normalized User Profile](/user-profile/normalized) fields. For example:

```js
{
  "name": "user-in-child@mail.com",
  "email": "user-in-child@mail.com",
  "email_verified": false,
  "nickname": "user-in-child",
  "picture": "https://s.gravatar.com/avatar/cb89d47afd405d39a8bce96b8b17bcbc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fus.png",
  "clientID": "${account.clientId}",
  "updated_at": "2015-11-05T18:10:17.813Z",
  "user_id": "auth0-oidc|your-auth0-oidc-conn-name|auth0|563b9b6cf50bc24402a69b80",
  "identities": [
    {
      "user_id": "your-auth0-oidc-conn-name|auth0|563b9b6cf50bc24402a69b80",
      "provider": "auth0-oidc",
      "connection": "tenant2",
      "isSocial": true
    }
  ],
  "created_at": "2015-11-05T18:09:49.575Z",
  "global_client_id": "abOXA94rTYTYk6wDZsbQXJBv5VYiArmI",
  "persistent": {}
}
```

Note that the generated `user_id` has the following format:

`auth0-oidc|YOUR_AUTH0_CONNECTION_NAME|THE_CHILD_AUTH0_CONNECTION|THE_CHILD_USER_ID`

The `access_token` is the JWT of the user in the child Auth0 connection. If you decode it, you will see all the properties that were requested in the `scope` of the auth0-oidc connection. For example, for `scope=openid identities` will return:

```js
{
  "identities": [
    {
      "user_id": "563b9b6cf50bc24402a69b80",
      "provider": "auth0",
      "connection": "Username-Password-Authentication",
      "isSocial": false
    }
  ],
  "iss": "https://child.auth0.com/",
  "sub": "auth0|563b9b6cf50bc24402a69b80",
  "aud": "eQVR4UI4b6ht1hXIcb90cMJN6pvvDPWD",
  "exp": 1446783017,
  "iat": 1446747017
}
```

This token can be used to access the Auth0 API of the child account.
