# Scopes

When initiating an authorization transaction through the [`/authorize` endpoint](https://auth0.com/docs/auth-api#!#get--authorize_social),
only an opaque `access_token` will be returned by default.
To also return a JWT that authenticates the user and contains their profile information, the `scope` parameter can be sent as part of the request.

## Example ([implicit flow](https://auth0.com/docs/protocols#5))

The following URL logs a user in using Google and requests a JWT that authenticates the user.

<pre>
https://example.auth0.com/authorize?response_type=token&client_id=jGMow0KO3WDJELW8XIxolqb1XIitjkYL&redirect_uri=http://jwt.io&connection=google-oauth2&<strong>scope=openid</strong>
</pre>

After a successful transaction, the user would be redirected here:

<pre>
http://jwt.io/#access_token=s213Mvz1QW7XpjoX&<strong>id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyMzk2MzA5MDk2MDM2MzAwMTA5IiwiYXVkIjoiakdNb3cwS08zV0RKRUxXOFhJeG9scWIxWElpdGprWUwiLCJleHAiOjE0Mzc1NjAzODEsImlhdCI6MTQzNzUxMDM4MX0.Rg9nV2j11epQawEB6tvlhnc4ZLBWJ-93YrtdGqBh6NA</strong>&token_type=Bearer&state=mep7BLYt1lAsLC94
</pre>

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
* `scope=openid profile` (not recommended): will return all the user attributes in the token.
This can cause problems when sending or receiving tokens in URLs (e.g. when using `response_type=token`) and will likely create an unnecessarily large token.
Keep in mind that JWTs are sent on every API request, so it is desirable to keep them as small as possible.
