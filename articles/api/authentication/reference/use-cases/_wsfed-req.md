# Ws-Fed Request

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/wsfed/${account.client_id}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/wsfed/${account.client_id}'
```

```javascript
```

This endpoint accepts a WS-Fed request to initiate a login.

The query parameters are:

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client-id`      | string     | the `client-id` of your client (optional) |
| `wtrealm`        | string     | can be used in place of `client-id` |
| `whr`         |            | the name of the connection (to skip the login page, optional) |
| `wctx`             |            | your application's state (optional) |
| `wreply`           |            | the callback URL (optional) |

Note the following:
- All the parameters of the SAML assertion can be modified through [Rules](/rules).
- The `wtrealm` parameter must be in one of these formats:
  - `urn:clientID` (e.g. urn:${account.client_id})
  - If this parameter does not begin with a urn, the `client.clientAliases` array is used for look-up. (This can only be set with the [/api/v2/clients](/api/management/v2#!/Clients/get_clients) Management API)
- The `whr` parameter is mapped to the connection like this: `urn:{connection_name}`. For example, `urn:google-oauth2` indicates login with Google. If there is no `whr` parameter included, the user will be directed to the [Auth0 Login Page](/login_page).

For more information, see: [WS-Federation Protocol](/protocols#ws-federation)
