<!-- markdownlint-disable -->

# Login

## Social with Provider's Access Token

```http
POST https://${account.namespace}/oauth/access_token
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "access_token": "ACCESS_TOKEN",
  "connection": "CONNECTION",
  "scope": "SCOPE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/access_token' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "access_token":"ACCESS_TOKEN", "connection":"CONNECTION", "scope":"SCOPE"}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/oauth/access_token';
var params = 'client_id=${account.clientId}&access_token={ACCESS_TOKEN}&connection={CONNECTION}&scope={SCOPE}';

var xhr = new XMLHttpRequest();

xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
  if (xhr.status == 200) {
    fetchProfile();
  } else {
    alert("Request failed: " + xhr.statusText);
  }
};

xhr.send(params);
```

> RESPONSE SAMPLE:

```JSON
{
  "id_token": "eyJ0eXAiOiJKV1Qi...",
  "access_token": "A9CvPwFojaBI...",
  "token_type": "bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/access_token",
  "link": "#social-with-provider-s-access-token"
}) %>

::: warning
This endpoint is part of the legacy authentication pipeline. We recommend that you open the browser to do social authentication instead, which is what [Google and Facebook are recommending](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html). For more information on the latest authentication pipeline refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).

This feature is disabled by default for new tenants as of 8 June 2017. Please see [Client Grant Types](/clients/client-grant-types) for more information.

:::

Given the social provider's `access_token` and the `connection`, this endpoint will authenticate the user with the provider and return a JSON with the `access_token` and, optionally, an `id_token`. This endpoint only works for Facebook, Google, Twitter and Weibo.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client. |
| `access_token` <br/><span class="label label-danger">Required</span> | The social provider's `access_token`. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of an identity provider configured to your app. |
| `scope` | Use `openid` to get an `id_token`, or `openid profile email` to include user information in the `id_token`. If null, only an `access_token` will be returned. |

### Test with Postman

<%= include('../../../_includes/_test-with-postman') %>

### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

- The `email` scope value requests access to the `email` and `email_verified` Claims.

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/access_token](#post-oauth-access_token).

### More Information

- [Call an Identity Provider API](/tutorials/calling-an-external-idp-api)

- [Identity Provider Access Tokens](/tokens/idp)

- [Add scopes/permissions to call Identity Provider's APIs](/tutorials/adding-scopes-for-an-external-idp)

## Database/AD/LDAP (Active)

```http
POST https://${account.namespace}/oauth/ro
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "username": "USERNAME",
  "password": "PASSWORD",
  "connection": "CONNECTION",
  "scope": "openid"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "username":"USERNAME", "password":"PASSWORD", "connection":"CONNECTION", "scope":"openid"}'

```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize client
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

  // Trigger login using redirect with credentials to enterprise connections
  webAuth.redirect.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    username: 'testuser',
    password: 'testpass',
    scope: 'openid'
  });

  // Trigger login using popup mode with credentials to enterprise connections
  webAuth.popup.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    username: 'testuser',
    password: 'testpass',
    scope: 'openid'
  });

  // The client.login method allows for non redirect auth using custom database connections, using /oauth/token.
  webAuth.client.login({
    realm: 'tests',
    username: 'testuser',
    password: 'testpass',
    scope: 'openid profile',
    audience: 'urn:test'
  });
</script>
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#database-ad-ldap-active-"
}) %>

::: warning
This endpoint is part of the legacy authentication pipeline and has been replaced in favor of the [Password Grant](#resource-owner-password). For more information on the latest authentication pipeline refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).
:::

Use this endpoint for API-based (active) authentication. Given the user credentials and the `connection` specified, it will do the authentication on the provider and return a JSON with the `access_token` and `id_token`.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your client |
| `username` <br/><span class="label label-danger">Required</span> | Username/email of the user to login |
| `password` <br/><span class="label label-danger">Required</span> | Password of the user to login |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the connection to use for login |
| `scope` | Set to `openid` to retrieve also an `id_token`, leave null to get only an `access_token` |
| `grant_type` <br/><span class="label label-danger">Required</span> | Set to `password` to authenticate using username/password or `urn:ietf:params:oauth:grant-type:jwt-bearer` to authenticate using an `id_token` (used to [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)) |
| `device` | String value. Required when `grant_type` is `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `id_token` | Used to authenticate using a token instead of username/password, in [Touch ID](/libraries/lock-ios/touchid-authentication) scenarios. Required when `grant_type` is `urn:ietf:params:oauth:grant-type:jwt-bearer` |

### Test with Postman

<%= include('../../../_includes/_test-with-postman') %>

### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Client** (select the client you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set **Username** and **Password**. Click **Resource Owner Endpoint**.


### Remarks

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.

- The main difference between passive and active authentication is that the former happens in the browser through the [Auth0 Login Page](https://${account.namespace}/login) and the latter can be invoked from anywhere (a script, server to server, and so forth).

- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).

### More Information

- [Database Identity Providers](/connections/database)

- [Rate Limits on User/Password Authentication](/connections/database/rate-limits)

- [Active Directory/LDAP Connector](/connector)

- [Authenticate users with Touch ID](/connections/passwordless/ios-touch-id-swift)
