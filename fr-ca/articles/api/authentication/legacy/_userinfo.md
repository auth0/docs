<!-- markdownlint-disable MD024 MD033 -->

# User Profile
## Get Token Info

```http
POST https://${account.namespace}/tokeninfo
Content-Type: application/json
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
<script src="${auth0js_url}"></script>
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

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/tokeninfo",
  "link": "#get-token-info"
}) %>

::: warning
This endpoint is part of the legacy authentication pipeline and will be disabled for those who use our latest, OIDC conformant, pipeline. We encourage using the [/userinfo endpoint](#get-user-info) instead. For more information on the latest authentication pipeline refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).
:::

This endpoint validates a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> (signature and expiration) and returns the user information associated with the user id `sub` property of the token.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `id_token` <br/><span class="label label-danger">Required</span> | The ID Token to use. |


### Remarks

- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  - `X-RateLimit-Limit`: Number of requests allowed per minute.
  - `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  - `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).

### Learn More

- [User Profile Struture](/users/references/user-profile-structure)

- [Auth0 API Rate Limit Policy](/policies/rate-limits)
