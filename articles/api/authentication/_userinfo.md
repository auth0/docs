# User Profile

## Get User Info

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/userinfo
Authorization: 'Bearer {ACCESS_TOKEN}'
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/userinfo' \
  --header 'authorization: Bearer {ACCESS_TOKEN}' \
  --header 'content-type: application/json'
```

```javascript
// Script uses auth0.js v8. See Remarks for details.
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
  // Initialize the Auth0 client
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Parse the URL and extract the access_token
  webAuth.parseHash(window.location.hash, function(err, authResult) {
    if (err) {
      return console.log(err);
    }
    webAuth.client.userInfo(authResult.accessToken, function(err, user) {
        // This method will make a request to the /userinfo endpoint
        // and return the user object, which contains the user's information,
        // similar to the response below.
    });
  });
</script>
```

> RESPONSE SAMPLE:

```json
{
  "email_verified": false,
  "email": "test.account@userinfo.com",
  "clientID": "q2hnj2iu...",
  "updated_at": "2016-12-05T15:15:40.545Z",
  "name": "test.account@userinfo.com",
  "picture": "https://s.gravatar.com/avatar/dummy.png",
  "user_id": "auth0|58454...",
  "nickname": "test.account",
  "identities": [
    {
      "user_id": "58454...",
      "provider": "auth0",
      "connection": "Username-Password-Authentication",
      "isSocial": false
    }
  ],
  "created_at": "2016-12-05T11:16:59.640Z",
  "sub": "auth0|58454..."
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/userinfo",
  "link": "#get-user-info"
}) %>

<div class="alert alert-info">
  <strong>Heads up!</strong> This is the latest version. If you are looking for the legacy version refer to <a href="/api/authentication/legacy#get-user-info">Authentication API Explorer (legacy)</a>.
</div>

Given the Auth0 `access token` obtained during login, this endpoint returns a user's profile.

This endpoint will work only if `openid` was granted as a scope for the `access_token`.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `access_token` <br/><span class="label label-danger">Required</span> | The Auth0 `access_token` obtained during login. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).
- The auth0.js `parseHash` method, requires that your tokens are signed with `RS256`, rather than `HS256`. For more information about this, check the [Auth0.js v8 Migration Guide](/libraries/auth0js/migration-guide#the-parsehash-method).
- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  * `X-RateLimit-Limit`: Number of requests allowed per minute.
  * `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  * `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).

### More Information
- [Auth0.js v8 Reference: Extract the authResult and get user info](/libraries/auth0js#extract-the-authresult-and-get-user-info)
- [Auth0 API Rate Limit Policy](/policies/rate-limits)


## Get Token Info

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/tokeninfo
Content-Type: 'application/json'
{
  "id_token": "ID_TOKEN"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/tokeninfo' \
  --header 'content-type: application/json' \
  --data '{"id_token":""}'
```

```javascript
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });
</script>

webAuth.parseHash(window.location.hash, function(err, authResult) {
  if (err) {
    return console.log(err);
  }

  webAuth.client.userInfo(authResult.accessToken, function(err, user) {
    // Now you have the user's information
  });
});
```

> RESPONSE SAMPLE:

```json
{
  "email_verified": false,
  "email": "foo@bar.com",
  "clientID": "q2hnj2iug0...",
  "updated_at": "2016-12-08T14:26:59.923Z",
  "name": "foo@bar.com",
  "picture": "https://s.gravatar.com/avatar/foobar.png",
  "user_id": "auth0|58454...",
  "nickname": "foo.bar",
  "identities": [
    {
      "user_id": "58454...",
      "provider": "auth0",
      "connection": "Username-Password-Authentication",
      "isSocial": false
    }
  ],
  "created_at": "2016-12-05T11:16:59.640Z",
  "global_client_id": "dfas76s..."
}
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/tokeninfo",
  "link": "#get-token-info"
}) %>

<div class="alert alert-info">
  <strong>Heads up!</strong> This is the latest version. If you are looking for the legacy version refer to <a href="/api/authentication/legacy#get-token-info">Authentication API Explorer (legacy)</a>.
</div>

This endpoint validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id `sub` property of the token.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `id_token` <br/><span class="label label-danger">Required</span> | The `id_token` to use. |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### Remarks
- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  * `X-RateLimit-Limit`: Number of requests allowed per minute.
  * `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  * `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).

### More Information

- [User Profile: In-Depth Details - API](/user-profile/user-profile-details#api)
- [Auth0 API Rate Limit Policy](/policies/rate-limits)
