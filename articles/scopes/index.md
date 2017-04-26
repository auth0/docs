---
description: Overview of scopes with a client-side authorization transaction.
---

# Scopes

<div class="alert alert-info">
<strong>Heads up!</strong> If you are working with the <a href="/api-auth">API Authorization flows</a> and you are looking for the updated documentation, refer to <a href="/scopes/preview">Scopes</a>.
</div>

When initiating a client-side authorization transaction through the [`/authorize` endpoint](/api/authentication/reference#social), only an opaque `access_token` will be returned by default. To also return a JWT that authenticates the user and contains their profile information, the `scope` parameter can be sent as part of the request.

## Example (implicit flow)

The following URL logs a user in using Google and requests a JWT that authenticates the user.

<pre>
https://example.auth0.com/authorize
  ?response_type=token
  &client_id=${account.clientId}
  &redirect_uri=http://jwt.io&connection=google-oauth2
  &<strong>scope=openid</strong>
</pre>

After a successful transaction, the user would be redirected here:

<a href="http://jwt.io/#access_token=s213Mvz1QW7XpjoX&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyMzk2MzA5MDk2MDM2MzAwMTA5IiwiYXVkIjoiakdNb3cwS08zV0RKRUxXOFhJeG9scWIxWElpdGprWUwiLCJleHAiOjE0Mzc1NjAzODEsImlhdCI6MTQzNzUxMDM4MX0.Rg9nV2j11epQawEB6tvlhnc4ZLBWJ-93YrtdGqBh6NA&token_type=Bearer&state=mep7BLYt1lAsLC94">
<pre>
http://jwt.io/
  #access_token=s213Mvz1QW7XpjoX
  &<strong>id_token=eyJ0...</strong>
  &token_type=Bearer
  &state=mep7BLYt1lAsLC94
</pre>
</a>

When decoded, this token contains the following claims:

```json
{
  "iss": "https://example.auth0.com/",
  "sub": "google-oauth2|112396309096036300109",
  "aud": "jGMow0KO3WDJELW8XIxolqb1XIitjkYL",
  "exp": 1437560381,
  "iat": 1437510381
}
```

## Requesting specific claims

The attributes included in the issued token can be controlled with the `scope` parameter as follows:

* `scope=openid`: will only return `iss`, `sub`, `aud`, `exp` and `iat` claims.
* `scope=openid email nickname favorite_food`: will return claims for `openid` in addition to the `email`, `nickname` and `favorite_food` fields if they are available.
* `scope=openid profile`: will return all the user attributes in the token.

> The `scope` parameter can used in the same way when calling the [Resource Owner endpoint](/api/authentication/reference#resource-owner).


## Further reading

* [Sending a `scope` parameter with Lock](/libraries/lock/sending-authentication-parameters#scope-string-)
* [Retrieving the full user profile with an `access_token`](/api/authentication/reference#get-user-info)
* [Validating a JWT and obtaining the full user profile](/api/authentication/reference#get-token-info)
