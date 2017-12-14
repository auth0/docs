---
section: libraries
title: Migrating from Legacy Authentication Flows
description: How to migrate from Legacy Authentication Flows
---
# Migrating from Legacy Authentication Flows

Lock versions below 11 and Auth0.js version below 9 could use legacy authentication flows that are deprecated. This document describes how to migrate code from older versions of Auth0.js and Lock to the new OIDC-conformant APIs.

## Handling Renewing Tokens

Legacy applications used [Refresh Tokens](tokens/refresh-token) and the `refreshToken()` function as a way to get new tokens upon expiration. The code would be like:

```js
function renewToken() {
    // Assumes the refresh_token is stored in localStorage
    refresh_token = localStorage.getItem('refresh_token');   
    auth0.refreshToken(refresh_token, function (err, delegationResult) {
        if (!err)
        {
            var expires_at = JSON.stringify(
                    delegationResult.expires_in* 1000 + new Date().getTime())
                ;
            // Assumes you want to keep the time the token will expire 
            // and the id_token in localStorage
            localStorage.setItem('expires_at', expires_at); 
            localStorage.setItem('id_token', delegationResult.id_token);
        }
    );
}
```

In auth0.js v9 and Lock 11 you need to use [Silent Authentication](/api-auth/tutorials/silent-authentication) and `checkSession()`. The code would be like:

```js
function renewToken() {
    auth0.checkSession({}, function(err, result) {
        if (!err) {
            var expiresAt = JSON.stringify(
                authResult.expiresIn * 1000 + new Date().getTime()
            );
            // Assumes you want to store access token, id token and expiration time in local Storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('expires_at', expiresAt);
        }
    });
}
```

Check the [Silent Authentication documentation](/api-auth/tutorials/silent-authentication) for more information on how to fully implement it in different SPA frameworks.

## Calling APIs

Legacy applications used an [id-token](/tokens/id-token) to invoke APIs. This [is a bad practice](/api-auth/why-use-access-tokens-to-secure-apis) and we recommend you to start using [Access Tokens](/tokens/access-token).

To call an API, you will need to specify the API identifier as the `audience` parameter when initializing auth0.js or Lock.

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
        {
            auth: {
                audience: 'https::/mydomain.com/api',
            }
        }
    );
```

If you specify an audience, then the OIDC flow will be triggered and the user profile data returned by Auth0 in `id_tokens` or from `/userinfo` will be OIDC-conformant. If your application is using any non-standard claim from the user profile, it will break. Read [below](#using-oidc-conformant-user-profiles) for more information on how to deal with this issue.

You can check the 'Calling an API' section of our [SPA Quickstarts](/quickstart/backend) for more information on how to call APIs from SPAs. You will also need to migrate your backend API implementation to use access_tokens. You can look at our [API Quickstarts](/quickstart/backend) for instructions on how to do it.

## User Profiles

When using the legacy authentication flows, the entire user profile is returned in `id_tokens` and from `/userinfo`. For example:

```json
{
    "email": "demo@user.com",
    "picture": "https://s.gravatar.com/avatar/1a9b4fabea79ed763b435793887fb67b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "nickname": "demo",
    "name": "demo@user.com",
    "user_metadata": {
        "favorite_color": "blue"
    },
    "app_metadata": {
        "roleName": "foobar"
    },
    "roleName": "foobar",
    "email_verified": false,
    "user_id": "auth0|59df6364209a29662e321756",
    "clientID": "tkQfyt2o4uy5RJwhJ3g651BSY4Fwegex",
    "identities": [
        {
            "user_id": "59df6364209a29662e321756",
            "provider": "auth0",
            "connection": "Local-Users",
            "isSocial": false
        }
    ],
    "updated_at": "2017-12-13T14:43:01.575Z",
    "created_at": "2017-10-12T12:43:16.682Z",
    "sub": "auth0|59df6364209a29662e321756"
}
```

The new user profile conforms to the OIDC specification, which allows for certain [standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) to be available in the response:

```json
{
    "sub": "auth0|59df6364209a29662e321756",
    "nickname": "demo",
    "name": "demo@user.com",
    "picture": "https://s.gravatar.com/avatar/1a9b4fabea79ed763b435793887fb67b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "updated_at": "2017-12-13T14:44:51.788Z"
}
```

The contents will vary depending on which [scopes](/scopes) are requested. You will need to adjust the scopes you request when configuring Auth0.js or Lock so all the claims you need are available in your application. Note that you can add custom claims to return whatever data you want (e.g. user metadata), as described in [this example](/scopes/current#example-add-custom-claims).
