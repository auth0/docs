---
connection: OAuth2 Provider (Generic)
image: /media/connections/oauth2.png
seo_alias: oauth2
toc: true
index: 15
description: Learn how to add any OAuth2 provider using Auth0 Custom Social Connections.
topics:
  - connections
  - social
  - oauth2
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Generic OAuth2 Authorization Servers

The most common [identity providers](/identityproviders) are available in [Auth0's Dashboard](${manage_url}) and in the [Auth0 Marketplace](https://marketplace.auth0.com/features/social-connections). However, you can add any other <dfn data-key="oauth2">OAuth2</dfn> provider using a **Custom Social Connection**.

To create a new Custom Social Connection, navigate to [**Auth0 Dashboard > Authentication > Social**](${manage_url}/#/connections/social), click **Create Connection**, scroll to the bottom of the list, and click **Create Custom**.

The form that appears contains several fields that you must use to configure the custom connection:

- **Connection Name**: Logical identifier for the Connection you are creating. This name cannot be changed, must start and end with an alphanumeric character, and can only contain alphanumeric characters and dashes.
- **Authorization URL**: URL to which users are redirected to log in.
  :::note
  Do not attempt to set the OAuth2 `response_mode` parameter in the authorization URL. This connection only supports the default `response_mode` (`query`).
  :::
- **Token URL**: URL used to exchange the received authorization code for access tokens and, if requested, ID tokens.
- **Scope** - `scope` parameters to send with the authorization request. Separate multiple scopes with spaces.
- **Client ID**: Client ID for Auth0 as an application used to request authorization and exchange the authorization code. To get a Client ID, you will need to register with the identity provider.
- **Client Secret**: Client Secret for Auth0 as an application used to exchange the authorization code. To get a Client Secret, you will need to register with the identity provider.
- **Fetch User Profile Script**: Node.js script used to call a userinfo URL with the provided access token. To learn more about this script, see [Fetch User Profile Script](#fetch-user-profile-script).

:::note
When configuring the custom identity provider, use the callback URL `https://${account.namespace}/login/callback`.
:::

Once you create the custom connection, you will see the **Applications** view. Here, you can enable and disable applications for which you would like the connection to appear.

## Fetch User Profile Script

The fetch user profile script is called after the user has logged in with the OAuth2 provider. Auth0 executes this script to call the OAuth2 provider API and get the user profile:

```js
function fetchUserProfile(accessToken, context, callback) {
  request.get(
    {
      url: 'https://auth.example.com/userinfo',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    },
    (err, resp, body) => {
      if (err) {
        return callback(err);
      }

      if (resp.statusCode !== 200) {
        return callback(new Error(body));
      }

      let bodyParsed;
      try {
        bodyParsed = JSON.parse(body);
      } catch (jsonError) {
        return callback(new Error(body));
      }

      const profile = {
        user_id: bodyParsed.account.uuid,
        email: bodyParsed.account.email
      };

      callback(null, profile);
    }
  );
}
```

The `user_id` property in the returned profile is required, and the `email` property is optional but highly recommended. To learn more about what attributes can be returend, see [User Profile Root Attributes](/users/updating-user-profile-root-attributes).

You can filter, add, or remove anything from the profile returned from the provider. However, it is recommended that you keep this script as simple as possible. More sophisticated manipulation of user information can be achieved through the use of [Rules](/rules). One advantage of using Rules is that they apply to any connection.

## Log in using the custom connection

You can use any of the Auth0 standard mechanisms to log a user in with your custom connection. A direct link would look like:

```text
https://${account.namespace}/authorize
  ?response_type=code
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile%20email
  &connection=NAME_OF_CONNECTION
```

## Modify the icon and display name

To add an icon to the identity provider's login button or change the text used on the login button, you can use the `icon_url` property of the `options` object and the `display_name` property, respectively, via the [Management API](/api/management/v2#!/Connections/patch_connections_by_id).

:::note
These fields will only affect how the Connection is displayed in the [New Universal Login Experience](https://auth0.com/docs/universal-login/new-experience).
:::

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"client_id\": \"...\", \"client_secret\": \"...\", \"icon_url\": \"https://cdn.example.com/assets/icon.png\", \"scripts\": { \"fetchUserProfile\": \"...\" }, \"authorizationURL\": \"https://public-auth.example.com/oauth2/authorize\", \"tokenURL\": \"https://auth.example.com/oauth2/token\", \"scope\": \"auth\" }, \"enabled_clients\": [ \"...\" ] }, \"display_name\": \"Connection Name\""
  }
}
```

![Custom OAuth2 Connection with a custom icon and name](/media/articles/connections/social/oauth2/custom-connection-icon.png)

## Pass provider-specific parameters

You can pass provider-specific parameters to the Authorization endpoint of OAuth 2.0 providers. These can be either static or dynamic.

### Pass static parameters

To pass static parameters (parameters that are sent with every authorization request), you can use the `authParams` element of the `options` when configuring an OAuth 2.0 connection via the [Management API](/api/management/v2#!/Connections/patch_connections_by_id). The call below will set a static parameter of `custom_param` set to `custom.param.value` on all authorization requests:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"client_id\": \"...\", \"client_secret\": \"...\", \"authParams\": { \"custom_param\": \"custom.param.value\" }, \"scripts\": { \"fetchUserProfile\": \"...\" }, \"authorizationURL\": \"https://public-auth.example.com/oauth2/authorize\", \"tokenURL\": \"https://auth.example.com/oauth2/token\", \"scope\": \"auth\" }, \"enabled_clients\": [ \"...\" ] }"
  }
}
```

### Pass dynamic parameters

In certain circumstances, you may want to pass a dynamic value to an OAuth 2.0 Identity Provider. In this case, you can use the `authParamsMap` element of the `options` to specify a mapping between one of the existing additional parameters accepted by the [Auth0 `/authorize` endpoint](/api/authentication#social) to the parameter accepted by the Identity Provider.

Using the same example above, let's assume that you want to pass the `custom_param` parameter to the authorization endpoint, but you want to specify the actual value of the parameter when calling the Auth0 `/authorize` endpoint.

In this case, you can use one of the existing addition parameters accepted by the `/authorize` endpoint, such as `access_type`, and map that to the `custom_param` parameter:

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"options\": { \"client_id\": \"...\", \"client_secret\": \"...\", \"authParamsMap\": { \"custom_param\": \"access_type\" }, \"scripts\": { \"fetchUserProfile\": \"...\" }, \"authorizationURL\": \"https://auth.example.com/oauth2/authorize\", \"tokenURL\": \"https://auth.example.com/oauth2/token\", \"scope\": \"auth\" }, \"enabled_clients\": [ \"...\" ] }"
  }
}
```

Now when calling the `/authorize` endpoint, you can pass the access type in the `access_type` parameter, and that value will in turn be passed along to the authorization endpoint in the `custom_param` parameter.

## Pass Extra Headers

In some instances, you will need to pass extra headers to the Token endpoint of an OAuth 2.0 provider. To configure extra headers, open the Settings for the Connection, and in the **Custom Headers** field, specify a JSON object with the custom headers as key-value pairs:

```json
{
    "Header1" : "Value",
    "Header2" : "Value"
}
```

Let's use an example where an Identity Provider may require you to pass an `Authorization` header with [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) credentials. In this scenario, you can specify the following JSON object in the **Custom Headers** field:

```json
{
  "Authorization": "Basic [your credentials]"
}
```

Where `[your credentials]` are the actual credentials to send to the Identity Provider.

## Keep Reading

* [Social Identity Providers](https://auth0.com/docs/connections/identity-providers-social)
* [All Identity Providers supported by Auth0](/identityproviders)
* [Identity Protocols supported by Auth0](/protocols)
