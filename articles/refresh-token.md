# Refresh Tokens

A **refresh token** is a special kind of token that can be used to obtain a renewed `id_token` ([JWT](/jwt)) at any time.
Refresh tokens must be stored securely by an application because they essentially allow a user to remain authenticated forever.

> For more information on all the types of access tokens used by Auth0, see [Tokens](/tokens).

## Introduction

The response of an [authentication request](/protocols) can result in an `id_token` (JWT) being issued by Auth0.
This token can be used to make authenticated calls to a secured API.

Among other security measures like signing, JWTs have an expiration date indicated by the `exp` claim.
However, applications that are locally installed on a device such as a desktop or smartphone might want to avoid asking the user to enter credentials each time a token expires.

A refresh token allows the application to request Auth0 to issue a new `id_token` directly, without needing to reauthenticate.
This works as long as the refresh token has not been revoked.

## Security considerations

Because a refresh token never expires, it is important to provide a way to revoke them.
This can be done manually from the dashboard or programatically through Auth0's API.

Refresh tokens can be issued and revoked for each combination of __app__, __user__ and __device__.
To revoke a __refresh token__, you can call the **[revoke refresh token](/api/v1#delete--api-users--user_id--refresh_tokens--refresh_token-)** endpoint:

```
DELETE https://${account.namespace}/api/users/<user id>/refresh_tokens/<refresh token>

{
  "Authorization":   "Bearer <your access token>",
}

```

## Obtaining a refresh token

To obtain a refresh token, the [`offline_access` scope](/scopes) and an arbitrary `device` name must be included when initiating an authentication request through the [`/authorize` endpoint](/auth-api#!#get--offline-access).
For example:

```
GET https://${account.namespace}/authorize/?
    response_type=token
    &client_id=${account.clientId}
    &redirect_uri=YOUR_CALLBACK_URL
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &scope=openid%20offline_access
    &device=my-device
```

> Note: `device` can be any value, such as a unique mobile device identifier.
Refresh tokens can be issued and revoked for each unique combination of __app__, __user__ and __device__.

When the authentication flow finishes, Auth0 will redirect the user to the callback URL as usual.
The complete URL will be as follows:

```
GET https://YOUR_CALLBACK_URL#
    access_token=2nF...WpA
    &id_token=eyJhb...
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=Cqp...Mwe
```

The refresh token is returned as part of the URL, in the form of an opaque string.

> In this case, the token was returned to the client directly in the URL because the [implicit flow](/protocols#oauth-for-native-clients-and-javascript-in-the-browser) was used (`response_type=token`).

## Using a refresh token

To obtain a new `id_token`, the **[delegation endpoint](/auth-api#!#post--delegation)** is used:

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

A response from this request could be as follows:

```
{
  "token_type": "Bearer",
  "expires_in": 30000,
  "id_token": "eyJ..."
}
```

The `expires_in` parameter indicates the lifetime of the new JWT in seconds.
It can be calculated by the difference between the `exp` and `iat` claims of the JWT.

> IMPORTANT ADVICE: obtaining new tokens using the `refresh_token` should happen only if the `id_token` has expired. For example, it is a bad practice to call the endpoint to get a new token every time you do an API call. There are rate limits in Auth0 that will throttle the amount of requests that can be done using the same token from a certain IP to this endpoint.

## SDK support

Libraries such as `auth0.js`, Lock and `auth0-angular.js` include support to obtain and use refresh tokens:

* [Getting it with Auth0.js](https://github.com/auth0/auth0.js#login)  and [using it to get a new id_token](https://github.com/auth0/auth0.js#refresh-token)
* [Getting and using it with Lock](/libraries/lock/using-a-refresh-token).
* [Getting and using it with Auth0-angular.js](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)
