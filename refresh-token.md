# Refresh Tokens

A Refresh Token is a token that can be used to get a new `id_token` ([JWT](http://docs.auth0.com/jwt)) **at any time**.

## Introduction

The response of an initial authentication request is always an `id_token`. You can use this token to authenticate calls to your secure API. For security reasons, every `id_token` has a finite expiration by default equals to 10 hours since the issued date.

Applications that are installed on a device such as a computer, a cell phone or a tablet might want to avoid asking the user to login every time the token has expired.

A `refresh_token` allows the application to get a new token as long as the user has not revoked the access granted.

## Security considerations

Because a refresh token never expires it is important to provide the user an easy way to revoke. Auth0 allows this from the dashboard and from the API.

The user should be able to identify the `refresh_token` to revoke with the `device` name from where it has been requested (e.g. `John Doe's iPad`).

## How it all works

The process to log the user in is the same as [explained in the sequence diagram page](https://docs.auth0.com/sequence-diagrams). The difference is that when doing the call to the **`authorize`** endpoint, **an extra `scope` must be sent: `offline_access`**. This means that the call will look like:

````
GET https://@@account.namespace@@/authorize/?
    response_type=token
    &client_id=@@account.clientId@@
    &redirect_uri=YOUR_CALLBACK_URL
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &scope=openid%20offline_access
```

After the user authenticates himself in the IdP, your app will get called to the callback URL you specified in the following way:

````
GET YOUR_CALLBACK_URL#
    access_token=2YotnF..........1zCsicMWpAA
    &id_token=......Json Web Token......
    &state=VALUE_THAT_SURVIVES_REDIRECTS
    &refresh_token=....The refresh token....
```

Now, **every time you need to get a new `id_token`, you can call the [Delegation endpoint](https://docs.auth0.com/auth-api#!#post--delegation)**

````
POST https://@@account.namespace@@/delegation
Content-Type: 'application/json'
{
  "client_id":       "@@account.clientId",
  "grant_type":      "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "refresh_token":   "your_refresh_token",
  "api_type":        "app"
}
```

## Using it with SDKs

If you're using `auth0.js`, `auth0-widget.js` or `auth0-angular.js`, they all have mechanisms to get the `refresh_token` and then use it to get a new `id_token`.

You can read more about it in the following links:

* [Getting it with Auth0.js](https://github.com/auth0/auth0.js#login)  and [using it to get a new id_token](https://github.com/auth0/auth0.js#refresh-token)
* [Getting it with Auth0-widget.js](https://github.com/auth0/widget#show-widget). Using it is through Auth0.js
* [Getting and using it with Auth0-angular.js](https://github.com/auth0/auth0-angular/blob/master/docs/refreshToken.md)


