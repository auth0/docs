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
```

Given the Auth0 `access token` obtained during login, this endpoint returns a user's profile.


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `access_token`   | the Auth0 `access_token` obtained during login |
