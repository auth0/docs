---
description: This page explains how to impersonate a user, a feature often used for testing and troubleshooting purposes.
toc: true
---
# User impersonation

In this article, we will cover:

* Why you might use impersonation
* How you can enable impersonation
* What the risks of using impersonation are

## Why impersonation

Often administrators need to impersonate other users for testing or troubleshooting purposes. Using impersonation, administrators can:

* Log in to an app as a specific user
* See everything exactly as that user sees it
* Do everything exactly as that user does it

Auth0 provides a __Sign in As__ feature for user impersonation, and provides the following features and information:

* Detailed auditing of who impersonated when
* Restrictions on impersonation which allows you to reject an impersonated authentication transaction based on, for instance, corporate policies around privacy and sensitive data
* Unlimited customization on who can impersonate who, when, depending on whatever context, using our [Rules](/rules) engine. In a Rule, you have access to `user.impersonated` (the impersonated login) and `user.impersonator` (the impersonating login) and you can write arbitrary Javascript to define how it works

::: note
Any [Rules](/rules) that you've implemented will run when you impersonate a user, including any actions that update the user.
:::

## Enable impersonation

Impersonation functionality may be disabled by default for your tenant.

To check the status of your tenant:

1. Go to the [Users](${manage_url}/#/users) page in the Dashboard
2. Select a user
3. See if the **Sign in as User** button is displayed

If you can't see this button, [contact Support](${env.DOMAIN_URL_SUPPORT}) and ask them to enable the feature for your tenant.

Once you've enabled impersonation for your account, you'll need to update **webAuth.parseHash** of the [auth0.js library](/libraries/auth0js/v9#extract-the-authresult-and-get-user-info) and set the flag **__enableIdPInitiatedLogin** to true.

```javascript
var data = webAuth.parseHash(
  {
    ...
    __enableIdPInitiatedLogin: true
    ...
  }
```

If you're using [Lock](/lock), you can include the flag using the options parameter sent to the constructor.

```
const lock = new Auth0Lock(clientID, domain, options)
```

Here's the flag itself:

```javascript
var options = {
    _enableIdPInitiatedLogin: true
};
```

Note that the **enableIdPInitiatedLogin** flag is preceded by **one** underscore when used with Lock and **two** underscores when used with the auth0.js library.

::: warning
Enabling impersonation leaves your application vulnerable to CSRF attacks, since the flag allows the bypassing of the CSRF check from the [state parameter](/protocols/oauth2/oauth-state) if this parameter is missing from the authorization response.

By enabling impersonation, you acknowledge that you understand and accept these risks.
:::

## Use the dashboard

Navigate to the [Users](${manage_url}/#/users) page in the Auth0 Dashboard and select the user you want to log in as. Click on the __Sign in as User__ and select the application you want to log in to using the dropdown menu.

![Click Sign in as User](/media/articles/user-profile/user2.png)

::: panel I can't see this button
In order to see this button the following conditions should apply:
- Impersonation should be enabled for your tenant (see panel at the top of this page)
- The Applications registered in the tenant must have at least one __callback URL__ listed
- The Applications must have the connections turned on that the users who are to be impersonated belong to
:::

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

![Links for User Impersonation](/media/articles/user-profile/user3.png)

::: panel Acquiring a Token
Impersonating a user using the [Dashboard](${manage_url}) will not return an [ID Token](/tokens/id-token) to your application by default. There are two ways to achieve this. You can alter the **Response Type** setting in the impersonation menu's [Advanced Settings](#advanced-settings) from `Code` to `Token` (**Sign in as user** -> **Show Advanced Settings**). Alternatively, you can add `additionalParameters.scope: "openid"` to the request body while calling the [impersonation endpoint](/api/authentication/reference#impersonation) manually.
:::

### Advanced settings

When impersonating a user in Dashboard, after clicking **Sign in as User** you will see a link to expand "Advanced Settings".

![Advanced Settings](/media/articles/user-profile/impersonation-adv.png)

This reveals fields to make it easier to [impersonate a User using the Impersonation API](#impersonate-a-user-using-the-impersonation-api):

- **Response mode**: `GET` or `POST`. This is only for server side apps, client side apps default to `GET`.
- **Response type**: `Code` or `Token`. This is only for server side apps, client side apps default to `Token`.
- **Scope**: This field will have `openid` in it is as default, [other scopes](/scopes) can be added as a list using whitespace as separator.
- **State**: The `state` is a required parameter and leaving it blank may lead to errors like `Impersonation - Bad mac`. Learn more about [using the state parameter here](/protocols/oauth2/oauth-state).

## Use the impersonation API

You can also use the [Impersonation API](/api/authentication/reference#impersonation). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties. For more details on how to use the API read on.

## Sample implementation

Let's assume that you have two apps, `app1` and `app2`, and you want to impersonate the users of `app2`. You will need to locate the `user_id` of the user you wish to impersonate, either via the Dashboard or the Management API. Next, you will need to obtain an authorization code via the impersonation endpoint. Finally, you will need to exchange your code for a valid Access Token, and your impersonation process will be complete. You can walk through the steps below which use the example `app1` and `app2`.

### 1. Find the user ID

You can use one of two methods to locate the `user_id` of a given user that you want to impersonate. You can either use the Management API v2 to retrieve it, or you can use the Dashboard.

#### Option A: Use the Management API

First, you will need an APIv2 token, if you want to retrieve the `user_id` via the Management API. You can get one by making a `POST` request to the [Token endpoint](/api/authentication#client-credentials). For details on how to do that refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens) documentation.

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

#### Option B: Use the Dashboard

Alternatively, you can retrieve the `user_id` information from the Dashboard. Go to the [Users](${manage_url}/#/users) section and look at the user's profile. The `user_id` is displayed under the **Identity Provider Attributes** section.

### 2. Get an Authorization Code

Before calling the call the [Impersonation API](/api/authentication/reference#impersonation) you will need to generate a Bearer token. You can generate it with the [Management API V1 /oauth/token endpoint](/api/management/v1#authentication) with your **Global Client ID** and **Global Client Secret** which both can be found in the dashboard under [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![Global Client Information](/media/articles/user-profile/global-client-info.png)

You can now send a request to the [impersonation endpoint](/api/authentication/reference#impersonation) by sending an `Authorization` header with `Bearer <TOKEN_FROM_MANAGEMENT_API_V1>`.

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

The `state` is an optional parameter, but we strongly recommend you [use it as it mitigates CSRF attacks](/protocols/oauth2/oauth-state).

The `callback_url` must match what is defined in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

There are various possible values for `scope`:

- `scope: 'openid'`: _(default)_ It will return, not only an opaque Access Token, but also an [ID Token](/tokens/id-token) which is a JSON Web Token ([JWT](/jwt)). The JWT will only contain the user id (`sub` claim).
- `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the [ID Token](/tokens/id-token) (for example, `scope: 'openid name email picture'`).

You can get more information about this in the [Scopes documentation](/scopes).

::: note
Impersonation cannot be used to return [JWT Access Tokens](/tokens/access-token) to your APIs.
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

Upon successful authentication, a URL will be returned as response that will look like the following:

```text
${account.callback}/?code=AUTHORIZATION_CODE&state=STATE_VALUE
```

- `${account.callback}` is the URL you specified as `callback_url` (and configured in your [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings))
- `state` should match the `state` value you sent with your request
- `code` is the authorization code you need

::: panel Single Page Apps
The process described applies to Regular Web Applications. In case yours is a Single Page Application (SPA) you would have to use `"response_type":"token"` when invoking the [Impersonation API](/api/authentication/reference#impersonation). Once you do this Auth0 will redirect to your SPA _Callback URL_ with Access Token and ID Token in the `#` params. You can read more on the OAuth2 Implicit flow [here](/protocols/oauth2/oauth-implicit-protocol).
:::

### 3. Exchange Code with Token

Now you should exchange the Authorization Code you received for a token. Note that this should already be implemented if you have a regular webapp and are using OAuth Server Side flow for authenticating normal users.

If not you should send a `POST` request to the [Token endpoint in Auth0](/api/authentication#authorization-code). You will need to send the Authorization Code obtained before along with your Client ID and Client Secret.

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

Replace the `AUTHORIZATION_CODE` with the `code` you received previously. 

Also, replace `${account.callback}` with your application's callback URL.

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

::: next-steps
- [Troubleshooting? This is what you shouldn’t do.](https://auth0.com/blog/2015/12/14/how-not-to-troubleshoot-bugs-by-impersonating-users/)
- [Identity Protocols supported by Auth0](/protocols)
:::
