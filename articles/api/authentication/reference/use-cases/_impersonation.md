# Impersonation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/users/{user_id}/impersonate
```

```shell
curl https://${account.namespace}/users/{user_id}/impersonate
	-H "Authorization: Bearer {access_token}"
	-H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8"
	--data
		"protocol={}
		&impersonator_id={}
		&client_id={client_id}
		&additionalParameters[response_type]=code
		&additionalParameters[state]="
```
```javascript
javascript
```

```csharp
csharp
```

Use this endpoint to obtain an impersonation URL to login as another user.

<aside class="notice">
For more information, see: <a href="/api/management/v1/use-cases#impersonation">Impersonation</a>.
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
| `protocol`       | string     | the connection protocol (e.g. oauth2, samlp, wsfed) |
| `impersonator_id` | string    | the `user_id` of the impersonator |
| `client_id`  | string     | the  `client_id` of your app |
| `additionalParameters` | object | "response_type": "code", "state": "" |

<aside class="warning">
This endpoint can only be used with <b>Global Client</b> credentials.
</aside>

### Remarks

* To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional impersonated and impersonator properties.

For example:

`"impersonated": true, "impersonator": {"user_id": "auth0|...", "email": "admin@example.com"}`
