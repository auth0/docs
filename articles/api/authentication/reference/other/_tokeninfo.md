# TokenInfo

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/tokeninfo
Content-Type: 'application/json'
{
  "id_token": ""
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

This endpoint validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id `sub` property of the token.

<aside class="notice">
For more information, see: <a href="/user-profile/user-profile-details#api">User Profile: In-Depth Details - API</a>.
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
| `id_token`       | object     |  |
