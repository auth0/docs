# Get Token Info

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/tokeninfo
Content-Type: 'application/json'
{
  "id_token": ""
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
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

auth0.getProfile(idToken, function (err, profile) {
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

<%= include('../../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/tokeninfo",
  "link": "#get-token-info"
}) %>

::: panel-warning Deprecation Notice
This endpoint will soon be deprecated. The [GET /userinfo](#get-user-info) endpoint should be used instead to retrieve user information.
:::

This endpoint validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id `sub` property of the token.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `id_token`       | the `id_token` to use |


### More Information

- [User Profile: In-Depth Details - API](/user-profile/user-profile-details#api)
