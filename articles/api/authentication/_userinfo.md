# Get User Info

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/userinfo
Authorization: 'Bearer {access_token}'
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/userinfo' \
  --header 'authorization: Bearer {access_token}' \
  --header 'content-type: application/json'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  'https://YOUR_APP_URL/callback',
    responseType: 'token'
  });
</script>

auth0.getUserInfo(access_token, function (err, profile) {
  if(err) {
    // handle error
    return;
  }

  alert('hello ' + profile.name);
});
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

Given the Auth0 `access token` obtained during login, this endpoint returns a user's profile.

This endpoint will work only if `openid` was granted as a scope for the `access_token`.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `access_token`   | the Auth0 `access_token` obtained during login |
