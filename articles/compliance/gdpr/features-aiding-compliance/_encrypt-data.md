You can encrypt user information before you save it in the user profile. You can use any encryption mechanism you like prior to storing data in the metadata fields. When a user sets sensitive information, call the [Update a user endpoint](/api/management/v2#!/Users/patch_users_by_id).

For example, to save the encrypted `passportNumber` in the user's profile, send this request:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/users/user_id",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_ACCESS_TOKEN"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"user_metadata\": {\"passportNumber\": \"B9MuhaDoreVr69MDqx3p8A==\"}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

::: note
Replace the `YOUR_ACCESS_TOKEN` placeholder with a token that will allow you to access this endpoint. This should be a [Management API Token](/api/management/v2/tokens), with the scopes `update:users` and `update:users_app_metadata`.
:::

