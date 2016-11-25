# Delegation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id":  "{client-id}",
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token" || "refresh_token" : "",
  "target":     "",
  "scope":      "",
  "api_type":   "",
  ""
}
```

```shell
ruby
```

```javascript
python
```

```csharp
csharp
```

Delegated authentication is used when an entity wants to call another entity on behalf of the user. For example, a user logs into an application and then calls an API. The application exchanges the token of the logged in user with a token that is signed with the API secret to call the API.

Given an existing token, this endpoint will generate a new token signed with the `target` client's secret. This is used to flow the identity of the user from the application to an API or across different APIs that are secured with different secrets.


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

<aside class="notice">
For more information, see: <a href="/tokens/delegation">Delegation Tokens</a>.
</aside>

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `grant_type`     | string     |             |
| `id_token` or `refresh_token` | object |      |
| `target `        | string     | the target `client_id` |
| `scope `         | string     | `openid` or `openid name email` |
| `api_type`       | string     |             |
