# Impersonation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/users/{user_id}/impersonate
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
  protocol:             "",
  impersonator_id:      "github|11715799", // Maria Paktiti
  client_id:            "",
  additionalParameters: "response_type": "code", "state": ""
}
```

```shell
curl https://${account.namespace}/users/{user_id}/impersonate
	-H "Authorization: Bearer {access_token}"
	-H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8"
	--data
		"protocol={protocol-to-use}
		&impersonator_id={impersonator-id}
		&client_id=${account.client_id}
		&additionalParameters[response_type]=code
		&additionalParameters[state]="
```

```javascript
javascript
```

Use this endpoint to obtain an impersonation URL to login as another user. Useful for troubleshooting.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `protocol`       | string     | the connection protocol to use: oauth2, samlp, wsfed, wsfed-rms |
| `impersonator_id` | string    | the `user_id` of the impersonator |
| `client_id`  | string     | the  `client_id` of your client |
| `additionalParameters` | object | "response_type": "code", "state": "" |

Note the following:
- This endpoint can only be used with **Global Client** credentials.
- To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional impersonated and impersonator properties. For example:
`"impersonated": true, "impersonator": {"user_id": "auth0|...", "email": "admin@example.com"}`

For more information, see: [Impersonation](/user-profile/user-impersonation).
