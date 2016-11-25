# Get User Info

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/userinfo
Authorization: 'Bearer {access_token}'
```

```shell
curl --request GET \
  --url https://${account.namespace}/userinfo \
  --header 'authorization: Bearer {access_token}' \
  --header 'content-type: application/json'
```

```javascript
```

Given the Auth0 `access token` obtained during login, this endpoint returns a user's profile.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `access_token`    | string     | the Auth0 `access_token` obtained during login |

For more information, see: [User Profile: In-Depth Details - API](/user-profile/user-profile-details#api).
