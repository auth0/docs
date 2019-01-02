---
title: Impersonate Users Using the Impersonation API
description: This page explains how to impersonate a user using the Impersonation API.
topics:
    - users
    - user-management
    - user-profiles
    - impersonation
contentType: how-to
useCase: manage-users
v2: true
---

# Impersonate Users Using the Impersonation API

You can also use the [Impersonation API](/api/authentication/reference#impersonation). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties. For more details on how to use the API read on.

## Sample implementation

Let's assume that you have two apps, `app1` and `app2`, and you want to impersonate the users of `app2`. You will need to locate the `user_id` of the user you wish to impersonate, either via the Dashboard or the Management API. Next, you will need to obtain an authorization code via the impersonation endpoint. Finally, you will need to exchange your code for a valid Access Token, and your impersonation process will be complete. You can walk through the steps below which use the example `app1` and `app2`.

1. Use one of two methods to locate the `user_id` of a given user that you want to impersonate. You can either use the Management API v2 to retrieve it, or you can use the Dashboard.

### Option A: Use the Management API

First, you will need an APIv2 token, if you want to retrieve the `user_id` via the Management API. You can get one by making a `POST` request to the [Token endpoint](/api/authentication#client-credentials). For details on how to do that see [Access Tokens for the Management API](/api/management/v2/concepts/tokens).

The Management APIv2 Token will be valid for 24 hours, so you should ask for a token everytime you make a request to the API, or vigorously handle `401` responses.

After you have a token, you will have to use the token to retrieve the user id of the user that you want to impersonate (in this example, a user of `app2`). You can retrieve this information with the [Management API /api/v2/users](/api/management/v2#!/Users/get_users) endpoint.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

Replace `YOUR_ACCESS_TOKEN` with the Management APIv2 token you got in the previous step.

### Option B: Use the Dashboard

Alternatively, you can retrieve the `user_id` information from the Dashboard. Go to the [Users](${manage_url}/#/users) section and look at the user's profile. The `user_id` is displayed under the **Identity Provider Attributes** section.

2. Get an Authorization Code. Before calling the call the [Impersonation API](/api/authentication/reference#impersonation) you will need to generate a Bearer token. You can generate it with the [Management API V1 /oauth/token endpoint](/api/management/v1#authentication) with your **Global Client ID** and **Global Client Secret** which both can be found in the dashboard under [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![Global Client Information](/media/articles/user-profile/global-client-info.png)

3. You can now send a request to the [impersonation endpoint](/api/authentication/reference#impersonation) by sending an `Authorization` header with `Bearer <TOKEN_FROM_MANAGEMENT_API_V1>`.

The data part of the request should include the following:

- `protocol`: the protocol to use against the identity provider. It could be `oauth2` again or something else. (for example, Office 365 uses WS-Federation, Google Apps uses OAuth2, AD will use LDAP or Kerberos).

- `impersonator_id`: the `user_id` of the impersonator, the user from `app1` that wants to impersonate a user from `app2`.

- `client_id`: the `client_id` of the app that is generating the impersonation link, in this example `app1`.

- `additionalParameters`: this is a JSON object. For a regular web app, you should set the `response_type` to be `code`, the `callback_url` to be the callback url to which Auth0 will redirect with the authorization code, and the `scope` to be the JWT claims that you want included in the JWT. For example:
  ```json
  {
    "response_type": "code",
    "state": "",
    "callback_url" : "http://localhost:3001/register",
    "scope" : "openid email name user_metadata"
  }
  ```

The `state` is an optional parameter, but we strongly recommend you use it [mitigate CSRF attacks](/protocols/oauth2/mitigate-csrf-attacks).

The `callback_url` must match what is defined in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

There are various possible values for `scope`:

- `scope: 'openid'`: _(default)_ It will return, not only an opaque Access Token, but also an [ID Token](/tokens/id-token) which is a JSON Web Token ([JWT](/jwt)). The JWT will only contain the user id (`sub` claim).
- `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the [ID Token](/tokens/id-token) (for example, `scope: 'openid name email picture'`).

You can get more information about this in the [Scopes documentation](/scopes).

::: note
Impersonation cannot be used to return [JWT Access Tokens](/tokens/concepts/overview-access-tokens) to your APIs.
:::

Your request should look like the following:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/users/USER_ID/impersonate",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"protocol\": \"PROTOCOL_TO_USE\",\"impersonator_id\": \"IMPERSONATOR_ID\",\"client_id\": \"${account.clientId}\",\"additionalParameters\":{\"response_type\": \"code\",\"state\": \"\"}}"
  }
}
```

Replace the required values as follows:

- `YOUR_USER_ID`: the `user_id` you retrieved at the second step (the user to impersonate)
- `YOUR_ACCESS_TOKEN`: the token already retrieved at the first step
- `PROTOCOL_TO_USE`: the protocol to use against the identity provider, for example `oauth2`
- `IMPERSONATOR_ID`: the `user_id` of the impersonator

A successful response returns a URL which can be used to authenticate as the user. The URL should look something like this:

```text
https://${account.namespace}/users/IMPERSONATOR_ID/impersonate?&abc=XYZ123
```

4. Perform a GET request on the URL you received to get a new URL with a `code` and `state` value. The response should look like the following:

```text
${account.callback}/?code=AUTHORIZATION_CODE&state=STATE_VALUE
```

- `${account.callback}` is the URL you specified as `callback_url` (and configured in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings))
- `state` should match the `state` value you sent with your request
- `code` is the authorization code you need

::: panel Single Page Apps
The process described applies to Regular Web Applications. In case yours is a Single Page Application (SPA) you would have to use `"response_type":"token"` when invoking the [Impersonation API](/api/authentication/reference#impersonation). Once you do this Auth0 will redirect to your SPA _Callback URL_ with Access Token and ID Token in the `#` params. You can read more on the OAuth2 Implicit flow [here](/protocols/oauth2/oauth-implicit-protocol).
:::

5. Exchange Code with Token. Now you should exchange the Authorization Code you received for a token. Note that this should already be implemented if you have a regular webapp and are using OAuth Server Side flow for authenticating normal users.

If not, you should send a `POST` request to the [Token endpoint in Auth0](/api/authentication#authorization-code). You will need to send the Authorization Code obtained before along with your Client ID and Client Secret.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"code\": \"AUTHORIZATION_CODE\",\"grant_type\": \"authorization_code\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```

6. Replace the `AUTHORIZATION_CODE` with the `code` you received previously. Also, replace `${account.callback}` with your application's callback URL. 

If the request is successful, you will get a JSON object with an Access Token. You can use this token to call the Auth0 APIs and get additional information such as the user profile.

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

Congratulations, you are done!

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Normalized User Profiles](/users/normalized)
* [Metadata Overview](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)