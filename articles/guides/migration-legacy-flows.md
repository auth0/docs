---
section: libraries
title: Migrating from Legacy Authentication Flows
description: How to migrate from Legacy Authentication Flows
toc: true
topics:
    - migrations
    - lock
    - auth0js
    - tokens
    - user-profiles
contentType:
    - how-to
    - concept
useCase: migrate
---
# Migrating from Legacy Authentication Flows

When using Lock versions below 11 and Auth0.js version below 9, you could use legacy authentication flows that are deprecated. This document describes how to migrate code from older versions of Auth0.js and Lock to the new OIDC-conformant APIs.

## Renewing Tokens

Legacy applications used <dfn data-key="refresh-token">Refresh Tokens</dfn> and the `refreshToken()` function as a way to get new tokens upon expiration (an example of this is below).

```js
function renewToken() {
    // Assumes the Refresh Token is stored in localStorage
    refresh_token = localStorage.getItem('refresh_token');   
    auth0.refreshToken(refresh_token, function (err, delegationResult) {
        if (!err)
        {
            var expires_at = JSON.stringify(
                    delegationResult.expires_in* 1000 + new Date().getTime())
                ;
            // Assumes you want to keep the time the token will expire
            // and the ID Token in localStorage
            localStorage.setItem('expires_at', expires_at);
            localStorage.setItem('id_token', delegationResult.id_token);
        }
    );
}
```

In auth0.js v9 and Lock 11 you need to use [Silent Authentication](/api-auth/tutorials/silent-authentication) and `checkSession()`(an example of this is below).

```js
function renewToken() {
    auth0.checkSession({}, function(err, result) {
        if (!err) {
            var expiresAt = JSON.stringify(
                authResult.expiresIn * 1000 + new Date().getTime()
            );
            // Assumes you want to store Access Token, ID Token and expiration time in local Storage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('expires_at', expiresAt);
        }
    });
}
```

Check the [Silent Authentication documentation](/api-auth/tutorials/silent-authentication) for more information on how to fully implement it in different SPA frameworks.

## Calling APIs

Legacy applications used an [ID Token](/tokens/concepts/id-tokens) to invoke APIs. This is a bad practice, and we recommend that you only use [Access Tokens](/tokens/concepts/access-tokens).

To call an API, you will need to specify the API identifier as the `audience` parameter when initializing auth0.js or Lock.

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
  auth: {
    audience: 'https://mydomain.com/api',
  }
});
```

If you specify an audience, then the OIDC flow will be triggered and the user profile data returned by Auth0 in ID Tokens or from `/userinfo` will be OIDC conformant. If your application is using any non-standard claim from the user profile, it will break. For more information on how to deal with this issue, refer to the [User Profiles](#user-profiles) section.

You can check the **Calling an API** section of our [SPA Quickstarts](/quickstart/backend) for more information on how to call APIs from SPAs. You will also need to migrate your backend API implementation to use Access Tokens. You can look at our [API Quickstarts](/quickstart/backend) for instructions on how to do this.

## User Profiles

The legacy authentication flows that allow ID Tokens and the `/userinfo` endpoint to include the complete user profile are being deprecated. Make sure the `Legacy User Profile` toggle is turned off after completing the migration to the new OIDC-conformant APIs.

When using the legacy authentication flows, the entire user profile is returned in ID Tokens and from `/userinfo`, as demonstrated below.

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

The new user profile conforms to the OIDC specification, which allows for certain [standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) to be available in the response.

```json
{
    "sub": "auth0|59df6364209a29662e321756",
    "nickname": "demo",
    "name": "demo@user.com",
    "picture": "https://s.gravatar.com/avatar/1a9b4fabea79ed763b435793887fb67b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "updated_at": "2017-12-13T14:44:51.788Z"
}
```

The contents will vary depending on which [scopes](/scopes) are requested. You will need to adjust the scopes you request when configuring Auth0.js or Lock so all the claims you need are available in your application. Note that you can add custom claims to return whatever data you want (for example, user metadata), as described in [this example](/scopes/current/sample-use-cases#add-custom-claims-to-a-token).

Another approach to get the full user profile is to use the [Management API](/api/management/v2) (instead of getting the profile through the authentication flow) as described in the next section.

## User Profile with Management API

In the legacy flows, the [Management API](/api/management/v2) supported authentication with an ID Token. This approach has been deprecated, and now you need to call it with an Access Token.

To get an Access Token, you need to ask Auth0 for one using the `https://${account.namespace}/api/v2/` audience. Auth0 does not currently support specifying two audiences when authenticating, so you will need to still use your application's API audience when initializing Lock or auth0.js. Once the user is authenticated, you can use `checkSession` to retrieve a Management API `access_token`, and then call the [getUser() endpoint](/api/management/v2#!/Users/get_users_by_id).

```js
function getUserUsingManagementApi() {
    webAuth.checkSession(
      {
        audience: `https://${account.namespace}/api/v2/`,
        scope: 'read:current_user'
      },
      function(err, result) {
        if (!err) {
          var auth0Manage = new auth0.Management({
            domain: AUTH0_DOMAIN,
            token: result.accessToken
          });
          auth0Manage.getUser(result.idTokenPayload.sub, function(err, userInfo) {
            if (!err) {
              // use userInfo
            }
            else {
              // handle error
            }
          });
        }
        else {
            // handle error
        }
      }
    );
  }
  ```

You can ask for the following scopes:

* `read:current_user`
* `update:current_user_identities`
* `create:current_user_metadata`
* `update:current_user_metadata`
* `delete:current_user_metadata`
* `create:current_user_device_credentials`
* `delete:current_user_device_credentials`

You could get a `consent_required` error when calling `checkSession()`. If you do, make sure you have "Allow Skipping User Consent" enabled for the Management API and that you are not running from localhost. Check the [consent documentation](/api-auth/user-consent) for more information.
