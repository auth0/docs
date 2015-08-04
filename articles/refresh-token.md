# Refresh Tokens

__Refresh tokens__ are special kinds of tokens that your app can use to get renewed `id_token` ([JWT](/jwt)) **at any time**. A __refresh token__ must be securely stored in your app.

## Introduction

The response of an initial authentication request results in an `id_token` being issued by Auth0. You use this token to authenticate calls to your secured API.

Among other security measures, like signing, every `id_token` has an expiration. By default this is set to 10 hours since issue time, but it can be changed.

Applications that are installed on a device such as a computer or a smartphone among others, might often want to avoid asking the user to enter credentials each time a token expires.

A `refresh_token` is an artifact that allows the application to request Auth0 to issue a new `id_token`. This works as long as the __refresh token__ is not revoked in the server.

Think of a __refresh token__ as a permission to renew tokens indefinitely, until you cancel that permission (which happens when it is __revoked__). When that happens, user will have to log in again no matter what.

## Security considerations

Because a __refresh token__ never expires, it is important to provide admins of apps ability to revoke access. Auth0 allows this process to happen both from the dashboard and programmatically through an API.

__Refresh tokens__ can be issued and revoked for each combination of __app__, __user__ and __device__.
To revoke a __refresh token__, you can call the **[revoke refresh token](/api/v1#delete--api-users--user_id--refresh_tokens--refresh_token-)** endpoint:

```
DELETE https://${account.namespace}/api/users/<user id>/refresh_tokens/<refresh token>

{
  "Authorization":   "Bearer <your access token>",
}

```

## How it all works

The process to log the user in is the same as [explained in the sequence diagram page](/sequence-diagrams). The difference is that when calling the **`authorize`** endpoint, you must include the **`offline_access`** `scope`. For example:

```
GET https://${account.namespace}/authorize/?
    response_type=token
    &client_id=${account.clientId}
    &redirect_uri=YOUR_CALLBACK_URL
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &scope=openid%20offline_access
```

After the user authenticates with the IdP, Auth0 will redirect the user to the callback URL as usual. The complete URL will look like:

```
GET YOUR_CALLBACK_URL#
    access_token=2YotnF..........1zCsicMWpAA
    &id_token=......Json Web Token......
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=....The refresh token....
```

This is the same as before but it will now contain a `refresh_token` parameter.

> Notice the token is sent back in the URL because `authorize` request in this example uses `response_type=token`.

Every time you need to get a new `id_token`, you can call the **[Delegation endpoint](/auth-api#!#post--delegation)**

```
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":       "${account.clientId}",
  "grant_type":      "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "refresh_token":   "your_refresh_token",
  "api_type":        "app"
}
```

## Using it with SDKs

Libraries like `auth0.js`, Lock and `auth0-angular.js` all include support to get a `refresh_token` and renewed `id_tokens`.

You can read more about them in the following links:

* [Getting it with Auth0.js](https://github.com/auth0/auth0.js#login)  and [using it to get a new id_token](https://github.com/auth0/auth0.js#refresh-token)
* [Getting and using it with Lock](/libraries/lock/using-a-refresh-token).
* [Getting and using it with Auth0-angular.js](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)
