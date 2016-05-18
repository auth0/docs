---
  url: /api/authentication/authorize
  description: A description of the /authorize Authentication API v2 endpoint listing parameters and common uses.
---

# GET /authorize

Returns a redirect to the login page of the specified provider (passive authentication).

```
GET https://${account.namespace}/authorize?
  response_type=	 
  &client_id=		{client-id}
  &connection=     
  &redirect_uri=	
  &state=
  &			// additional parameters
```

## Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `response_type`  | string     | `code` (server-side) \|\| `token` (client -side) |
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `redirect_uri`   | URL     | the URL the user will be redirected to upon successful authentication |
| `state`          | string     | provided in the return |

## Remarks

* If no `connection` is specified, this will redirect to [Auth0 Login Page](${uiURL}/#/login_page) and show the Login widget using the first database connection.
* If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.
* Additional parameters can be sent that will be passed through to the provider, e.g. `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).
* The `state` parameter will be returned and can be used for XSRF and contextual information (like a return url).

## Use Cases

### Social Authentication

Use this endpoint to authenticate a user with a social provider. This endpoint will return a 302 redirect to the social provider specified in `connection`.

Social connections only support browser-based (passive) authentication because most social providers don't allow a username and password to be entered into applications that they don't own. Therefore, the user will be redirected to the provider's sign in page.

### Database & Active Directory / LDAP Authentication

This endpoint will return a 302 redirect to the [Auth0 Login Page](https://auth0.com/#/login_page) that will display the Lock widget where the user can login with their email and password. If you have multiple databases and Active Directory connections, use the  `connection` parameter to tell the widget which connection to use.

### Enterprise Authentication (SAML and Others)

This endpoint will return a 302 redirect to the enterprise provider specified in `connection`.

### Offline Access (Refresh Tokens)

This endpoint will trigger the login flow to request a refresh token. This will return a 302 redirect to the `connection` specifying an extra scope (`offline_access`) and a `device` id that can be used to identify the refresh token in the dashboard. This extra scope will return the usual response plus a refresh token that can be used to obtain a new JSON Web Token. The refresh token can be revoked (see [Revoke Refresh Token](/docs/api/management/v1#!#delete--api-users--user_id--refresh_tokens--refresh_token-)).

#### Additional Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `device`         | string     | an id for identifying the refresh token |
| `scope`          | string     | `openid offline_access` |


### Link Accounts

Call this endpoint to link the current user to an additional authentication method (e.g user/password and facebook).

This endpoint will trigger the login flow to link an existing account with a new one. This will return a 302 redirect to the `connection` that the current user wants to add. The user is identified by the `access_token` that was returned on login success.

#### Additional Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `access_token`   | string     | the logged-in user's access token |
