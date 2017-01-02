---
description: How to dynamically register Clients with Auth0, using the Management APIv2.
toc: true
---

# Dynamic Client Registration

Dynamic Client Registration is a feature, based on the [OpenID Connect Dynamic Client Registration specification](https://openid.net/specs/openid-connect-registration-1_0.html), that enables clients to register dynamically, using the [Management APIv2](/api/management/v2). This way you can allow third party developers to register and use clients.

All clients, registered dynamically with Auth0, have the following characteristics:

- The [ID tokens](/tokens/id-token) generated for these clients, hold minimum user profile information. In order to retrieve the full user profile, you need to get an access token and use the [/userinfo endpoint](/api/authentication#get-user-info).

- These clients cannot use [ID tokens](/tokens/id-token) to invoke [Management APIv2](/api/management/v2) endpoints. Instead, they should [get a Management APIv2 Token](/api/management/v2/tokens#how-to-get-a-management-apiv2-token). Note that the client should be granted the `current_user_*` scopes, as required by each endpoint.
  - `read:current_user`: [List or search users](/api/management/v2#!/Users/get_users), [Get a user](/api/management/v2#!/Users/get_users_by_id), [Get user Guardian enrollments](/api/management/v2#!/Users/get_enrollments)
  - `update:current_user_metadata`: [Update a user](/api/management/v2#!/Users/patch_users_by_id), [Delete a user's multifactor provider](/api/management/v2#!/Users/delete_multifactor_by_provider)
  - `delete:current_user_metadata`: [Delete a user](/api/management/v2#!/Users/delete_users_by_id)
  - `create:current_user_metadata`: [Create a user](/api/management/v2#!/Users/post_users)
  - `create:current_user_device_credentials`: [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials)
  - `delete:current_user_device_credentials`: [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id)
  - `update:current_user_identities`: [Link a user account](/api/management/v2#!/Users/post_identities), [Unlink a user identity](/api/management/v2#!/Users/delete_provider_by_user_id)

- They cannot have any connections, except for tenant level connections (domain connections). To use tenant level connections, you need the latest version of [Lock](/libraries/lock).

## Enable dynamic registration

In this section we will see how you can enable the dynamic registration feature for your tenant.

By default, the feature is disabled for all tenants. To change this, you have to update some account settings, promote the connections you will use with your dynamic clients to **domain connections**, and update your client's login page.

### Update tenant settings

In order to enable the feature, you need to enable the following flags at your tenant's settings:
- `enable_dynamic_client_registration`: Enables the feature.
- `enable_pipeline2`: Enables the underlying pipeline that is a required dependency.

You can enable these flags using the [Update tenant settings endpoint](/api/management/v2#!/Tenants/patch_settings).

```
curl -X PATCH -H "Authorization: Bearer API2_ACCESS_TOKEN" -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "flags": {
    "enable_pipeline2": true,
    "enable_dynamic_client_registration": true
  }
}' "https://${account.namespace}/api/v2/tenants/settings"
```

You need to update the `API2_ACCESS_TOKEN` with a valid Auth0 API2 token with the scope `update:tenant_settings`. See [How to get a Management APIv2 Token](/api/management/v2/tokens#how-to-get-a-management-apiv2-token) for details on how to do so.

### Promote connections

Clients registered via the [Dynamic Client Registration Endpoint](#dynamic-client-registration-endpoint) are flagged as **Third Party Clients** and can only authenticate users using connections flagged as **Domain Connections**. These connections will be open for any dynamic client to allow users to authenticate.

You can promote a connection to domain level using the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id).

```
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer API2_ACCESS_TOKEN" -H "Cache-Control: no-cache" -d '{
  "is_domain_connection": true
}' "https://${account.namespace}/api/v2/connections/CONNECTION_ID"
```

Where:
- `API2_ACCESS_TOKEN`: [Α valid Auth0 API2 token](/api/management/v2/tokens#how-to-get-a-management-apiv2-token) with the scope `update:connections`.
- `CONNECTION_ID`: Τhe Id of the connection to be promoted.


### Update the login page

If you use or would like to use an Auth0 [Hosted Login Page](/hosted-pages/login) with the Dynamic Client feature, you need to use at least version `10.7.x` of Lock, and set `__useTenantInfo: config.isThirdPartyClient` when instantiating Lock.

Sample script:

```js
<script src="https://cdn.auth0.com/js/lock/10.7/lock.min.js"></script>
...
<script>
  // Decode utf8 characters properly
  var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

  var connection = config.connection;
  var prompt = config.prompt;
  var languageDictionary;
  var language;
  if (config.dict && config.dict.signin && config.dict.signin.title) {
    languageDictionary = { title: config.dict.signin.title };
  } else if (typeof config.dict === 'string') {
    language = config.dict;
  }

  var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
    auth: {
      redirectUrl: config.callbackURL,
      responseType: config.callbackOnLocationHash ? 'token' : 'code',
      params: config.internalOptions
    },
    assetsUrl:  config.assetsUrl,
    allowedConnections: connection ? [connection] : null,
    rememberLastLogin: !prompt,
    language: language,
    languageDictionary: languageDictionary,
    closable: false,
    __useTenantInfo: config.isThirdPartyClient
  });

  lock.show();
</script>
```

## Use dynamic registration

In this section we will see how a third party developer can register and configure a client.

### Register your client

In order to dynamically register a client with Auth0, you need to send an HTTP `POST` message to the [Client Registration endpoint](/api/management/v2#!/oidc/register). Note that Auth0 supports open Dynamic Registration, which means that the [Client Registration endpoint](/api/management/v2#!/oidc/register) will accept a registration request without an [OAuth 2.0 Access Tokens](/tokens/access-token).

To create a client with the name `My Example` and the callback URLs `https://client.example.com/callback` and `https://client.example.com/callback2`, you would use the following.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oidc/register",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_name\":\"My Dynamic Client\",\"redirect_uris\": [\"https://client.example.com/callback\", \"https://client.example.com/callback2\"]}"
  }
}
```

Where:
- `client_name`: The name of the Dynamic Client to be created.
- `redirect_uris`: An array of URLs that Auth0 will deem valid to call at the end of an Authentication flow.

Optionally, you can set a value for `token_endpoint_auth_method`, which can be `none` or `client_secret_post` (default value).

**NOTE**: You can set several attributes. For a complete listing refer to the [/oidc/register endpoint](/api/management/v2#!/oidc/register).

The response includes the basic client information.

```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "client_name": "My Dynamic Client",
  "client_id": "8SXWY6j3afl2CP5ntwEOpMdPxxy49Gt2",
  "client_secret": "Q5O...33P",
  "redirect_uris": [
    "https://client.example.com/callback",
    "https://client.example.com/callback2"
  ],
  "client_secret_expires_at": 0
}
```

Where:
- `client_id`: Unique client identifier. This is the ID you will use while configuring your apps to use Auth0. It is generated by the system and it cannot be modified.
- `client_secret`: Alphanumeric 64-bit client secret. This value is used by clients to authenticate to the [token endpoint](/api/authentication#get-token) and for signing and validating [ID tokens](/tokens/id-token).
- `client_secret_expires_at`: Time at which the `client_secret` will expire. For Auth0 this value will always be zero (`0`) which means that the client never expires.

Make a note of the client ID and secret, as these are the most important pieces for executing [Authentication](/client-auth) and [Authorization](/api-auth) Flows.

Also, keep in mind that Third Party Developers are not allowed to modify the client settings. In case this is necessary, they will need to contact the Tenant Owner with their request.

### Configure your Client

Now that you have a client ID and secret, you can configure your application to authenticate users with Auth0.

**NOTE**: We will go through a simple scenario, that showcases how to call an API from a client-side web app, using the [Implicit Grant](/api-auth/tutorials/implicit-grant). For a list of tutorials on how to authenticate and authorize users, based on your application type, refer to [API Authorization](/api-auth).

First, you need to configure your application to send the user to the authorization URL:

```text
https://${account.namespace}/authorize?
  audience={API_AUDIENCE}&
  scope={SCOPE}&
  response_type={RESPONSE_TYPE}&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce={CRYPTOGRAPHIC_NONCE}
  state={OPAQUE_VALUE}
```

Where:
- `audience` (optional): The target API for which the Client Application is requesting access on behalf of the user. Set this parameter if you need API access.
- `scope` (optional): The scopes which you want to request authorization for. These must be separated by a space. Set this parameter if you need API access.
- `response_type`: The response type. For this flow you can either use `token` or `id_token token`. This will specify the type of token you will receive at the end of the flow.
- `client_id`: Your application's Client ID.
- `redirect_uri`: The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. The `access_token` (and optionally an `id_token`) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under the Client Settings of your application.
- `state`: An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks.
- `nonce`: A string value which will be included in the ID token response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce).

For example:

```html
<a href="https://${account.namespace}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${account.clientId}&redirect_uri=${account.callback}">
  Sign In
</a>
```

This call will redirect the user to Auth0, and upon successful authentication, back to your application (specifically to the `redirect_uri`).

If you need API access, then following the authentication, you need to [extract the access token](#extract-the-access-token) from the hash fragment of the URL, and use it to make calls to the API, by passing it as a `Bearer` token in the `Authorization` header of the HTTP request.
