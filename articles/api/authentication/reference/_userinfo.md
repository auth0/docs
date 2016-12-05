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
    callbackURL:  '{YOUR APP URL}',
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

Given the Auth0 `access token` obtained during login, this endpoint returns a user's profile.

This endpoint will work only if `openid` was granted as a scope for the `access_token`.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `access_token`   | the Auth0 `access_token` obtained during login |
