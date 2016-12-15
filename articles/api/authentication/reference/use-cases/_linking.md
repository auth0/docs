# Account Linking

## Link

<h5 class="code-snippet-title">Examples</h5>

Call this endpoint to link the current user to an additional authentication method (e.g. user/password).


<aside class="notice">
For more information, see: <a href="/link-accounts">Linking Accounts</a>.
</aside>

This endpoint will trigger the login flow to link an existing account with a new one. This will return a 302 redirect to the `connection` that the current user wants to add. The user is identified by the `access_token` that was returned on login success.

#### Additional Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `access_token`   | object     | the logged-in user's access token |

## Unlink

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/unlink
```

```shell
POST https://${account.namespace}/login/unlink
Content-Type: 'application/json'
{
  "access_token": "",
  "user_id":      ""
}
```

```javascript
javascript
```

```javascript
javascript
```

Given a logged-in user's `access_token` and `user_id`, this endpoint will unlink a user's account from identity provider .

<aside class="notice">
For more information, see: <a href="/link-accounts/auth-api#unlinking-accounts">Unlinking Accounts</a>.
</aside>

> This command returns a JSON object in this format:

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `access_token`   | object     | the logged-in user's `access token` |
| `user_id`        | string     | the logged-in user's `user_id` |
