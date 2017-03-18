---
description: This page explains how to impersonate a user, often used for testing and troubleshooting purposes.
toc: true
---

# User Impersonation

::: panel-warning Advanced Feature
Impersonation functionality may be disabled by default for your tenant. To check, go to the [Users](${manage_url}/#/users) page in the Dashboard, select a user, and see if the __Sign in as User__ button is displayed. If you can't see it, [contact support](${env.DOMAIN_URL_SUPPORT}) and ask them to enable the feature for your tenant.
:::

Often administrators need to impersonate other users for testing or troubleshooting purposes. Using impersonation the administrators can login to an app as a specific user, see everything exactly as that user sees it, and do everything exactly as that user does it.

Auth0 provides a _Sign in As_ feature for user impersonation, and provides the following:
- Detailed auditing of who impersonated when.
- Restrictions on impersonation which allows you to reject an impersonated authentication transaction based on, for instance, corporate policies around privacy and sensitive data.
- Unlimited customization on who can impersonate who, when, depending on whatever context, using our [Rules](/rules) engine. In a Rule, you have access to `user.impersonated` (the impersonated login) and `user.impersonator` (the impersonating login) and you can write arbitrary Javascript to define how it works.

<div class="alert alert-info">
  <strong>Heads up!</strong> Any Rules that you've implemented will run when you impersonate a user, including any actions that update the user.
</div>

## Use the Dashboard

Navigate to the [Users](${manage_url}/#/users) page in the Management Dashboard and select the user you want to login as. Click on the __Sign in as User__ and select the client you want to log into using the dropdown menu.

![Click Sign in as User](/media/articles/user-profile/signin-as-user-01.png)

::: panel-info I can't see this button
In order to see this button the following conditions should apply:
- Impersonation should be enabled for your account (see panel at the top of this page)
- The Clients registered in the account must have at least one __callback URL__ listed
- The Clients must have the connections turned on that the users who are to be impersonated belong to
:::

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

![Links for User Impersonation](/media/articles/user-profile/signin-as-user-02.png)

<div class="alert alert-info">
Impersonating a user using the Dashboard will not return a <a href="/jwt">JWT</a> to your application by default. To achieve this, call the <a href="/api/authentication/reference#impersonation">impersonation endpoint</a> manually or in the <a href="#advanced-settings">Advanced Settings</a>. If you call the endpoint manually, add <code>additionalParameters.scope: "openid"</code> to the request body.
</div>

### Advanced Settings

When impersonating a user in Dashboard, after clicking __Sign in as User__ you will see a link to expand __Advanced Settings__.

![Advanced Settings](/media/articles/user-profile/impersonation-adv.png)

This reveals fields to make it easier to [impersonate a User using the Impersonation API](#impersonate-a-user-using-the-impersonation-api):

* **Response mode**: `GET` or `POST`. This is only for server side apps, client side apps default to `GET`.
* **Response type**: `Code` or `Token`. This is only for server side apps, client side apps default to `Token`.
* **Scope**: This field will have `openid` in it is as default, [other scopes](/scopes) can be added as a list using whitespace as separator.
* **State**: The `state` is an optional parameter. Learn more about [using the state parameter here](/protocols/oauth2/oauth-state).

## Use the Impersonation API

You can also use the [Impersonation API](/api/authentication/reference#impersonation). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties. For more details on how to use the API read on.

## Sample Implementation

Let's assume that you have two apps, `app1` and `app2`, and you want to impersonate the users of `app2`.

### Get a Token

First, you have to generate a token that you can use to call the [Management APIv2](/api/management/v2), specifically the [Impersonation endpoint](/api/authentication/reference#impersonation). This token is called __Auth0 Management APIv2 Token__.

You can get one either using the Dashboard or by making a `POST` operation to the [Token endpoint](/api/authentication#client-credentials). For details on how to do that refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

The Management APIv2 Token will be valid for __24 hours__, so you should ask for a token everytime you make a request to the API or handle vigorously `401` responses.

### Find the User Id

Afterwards, you would have to find out the user id of the user that you want to impersonate. That would be the user of `app2`. You can retrieve this information with the [Management API /api/v2/users](/api/management/v2#!/Users/get_users) endpoint.

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

Alternatively, you can retrieve the `user_id` information from the Dashboard. Go to the [Users](${manage_url}/#/users) section and look at the user's profile. The `user_id` is displayed under the _Identity Provider Attributes_ section.

### Get an Authorization Code

You are now ready to call the [Impersonation API](/api/authentication/reference#impersonation).

The request should include an `Authorization` header with `Bearer YOUR_ACCESS_TOKEN`, where `YOUR_ACCESS_TOKEN` is the token you retrieved at the first step.

The data part of the request should include the following:

- `protocol`: the protocol to use against the identity provider. It could be `oauth2` again or something else. (e.g. Office 365 uses WS-Federation, Google Apps uses OAuth2, AD will use LDAP or Kerberos).

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

The `callback_url` must match what is defined in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

There are various possible values for `scope`:
- `scope: 'openid'`: _(default)_ It will return, not only the Access Token, but also an [ID Token](/tokens/id-token) which is a _JSON Web Token ([JWT](/jwt)). The JWT will only contain the user id (`sub` claim).
- `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the [ID Token](/tokens/id-token) (for example, `scope: 'openid name email picture'`).

You can get more information about this in the [Scopes documentation](/scopes).

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
- The `YOUR_USER_ID` should be replaced with the `user_id` you retrieved at the second step (the user to impersonate).
- The `YOUR_ACCESS_TOKEN` should be replaced with the token already retrieved at the first step.
- The `PROTOCOL_TO_USE` should be replaced with the protocol to use against the identity provider, for example `oauth2`.
- The `IMPERSONATOR_ID` should be replaced with the `user_id` of the impersonator.

Upon successful authentication, a URL will be returned as response that will look like the following:

```test
${account.callback}/?code=AUTHORIZATION_CODE&state=STATE_VALUE
```

- `${account.callback}` is the URL you specified as `callback_url` (and configured in your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings))
- `state` should match the `state` value you sent with your request
- `code` is the authorization code you need

::: panel-info Single Page Apps
The process described applies to Regular Web Applications. In case yours is a Single Page Application (SPA) you would have to use `"response_type":"token"` when invoking the [Impersonation API](/api/authentication/reference#impersonation). Once you do this Auth0 will redirect to your SPA _Callback URL_ with Access Token and ID Token in the `#` params. You can read more on the OAuth2 Implicit flow [here](/protocols/oauth2/oauth-implicit-protocol).
:::

### Exchange Code with Token

Now you should exchange the Authorization Code you received for a token. Note that this should already be implemented if you have a regular webapp and are using OAuth Server Side flow for authenticating normal users.

If not you should send a `POST` request to the [Token endpoint in Auth0](/api/authentication#authorization-code). You will need to send the __Authorization Code__ obtained before along with your __Client Id__ and __Client Secret__.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"AUTHORIZATION_CODE\",\"grant_type\": \"authorization_code\",\"callback_url\": \"${account.callback}\"}"
  }
}
```

Replace the `AUTHORIZATION_CODE` with the `code` you received previously. Also, replace `${account.callback}` with your application's callback URL.

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

## Read more

[Troubleshooting? This is what you shouldn’t do.](https://auth0.com/blog/2015/12/14/how-not-to-troubleshoot-bugs-by-impersonating-users/)

[Identity Protocols supported by Auth0](/protocols)
