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

<%= include('../../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/tokeninfo",
  "link": "#get-token-info"
}) %>

::: panel-warning Depreciation Notice
This endpoint will soon be depreciated. The `/userinfo` endpoint should be used instead to obtain user information.
:::

This endpoint validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id `sub` property of the token.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `id_token`       | the `id_token` to use |


### More Information

- [User Profile: In-Depth Details - API](/user-profile/user-profile-details#api)
