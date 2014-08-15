# Refresh Tokens

A Refresh Token is a token that can be used to get a new `id_token` ([JWT](http://docs.auth0.com/jwt)) whenever you like. It doesn't matter if the current `id_token` is expired or not.

## Reasons

Imagine that you login to an application using Auth0. After logging in, you get an `id_token` (JWT). Then, You send that token in every call you want to make authenticated to the API. However, the token has an expiration. Once that token is expired, the user needs to log in again to get a new, not expired, token. Sometimes, we don't want to show the user the Login page again. This usually happens in Mobile Applications. In order to achieve that, you can use a `refresh_token`. Every time the `id_token` expires, the `refresh_token` can be used to get a new and not expired one.

## Security considerations

It's important to note that if the `refresh_token` is compromised, whoever has it can get new `id_tokens` whenever he wants. That's why it's really important to keep the `refresh_token` in a secured place. 
However, if it does get compromised, you can revoke that `refresh_token` from Auth0 dashboard so that nobody else can use it.

## How it all works

The process to log the user in is the same as [explained in the sequence diagram page](https://docs.auth0.com/sequence-diagrams). The difference is that when doing the call to the `authorize` endpoint, an extra `scope` must be sent: `offline_access`. This means that the call will look like:

````
GET https://@@acccount.namespace@@/authorize/?
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

Now, every time you need to get a new `id_token`, you can call the `delegation` endpoint

````
POST https://@@acccount.namespace@@/delegation
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


