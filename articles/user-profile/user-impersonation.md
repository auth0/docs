---
description: This page explains how to impersonate a user, often used for testing and troubleshooting purposes.
---

# User Impersonation

Often administrators need to impersonate other users for testing or troubleshooting purposes. Using impersonation the administrators can login to an app as a specific user, see everything exactly as that user sees it, and do everything exactly as that user does it.

Auth0 provides a _Sign in As_ feature for user impersonation, and provides the following:
- Detailed auditing of who impersonated when.
- Restrictions on impersonation which allows you to reject an impersonated authentication transaction based on, for instance, corporate policies around privacy and sensitive data.
- Unlimited customization on who can impersonate who, when, depending on whatever context, using our [Rules](/rules) engine. In a Rule, you have access to `user.impersonated` (the impersonated login) and `user.impersonator` (the impersonating login) and you can write arbitrary Javascript to define how it works.

## Impersonate a User using the Management Dashboard

Navigate to the [Users](${manage_url}/#/users) page in the Management Dashboard and select the user you want to login as. Click on the _Sign in as User_ and select the app you want to log into using the dropdown menu.

![](/media/articles/user-profile/signin-as-user-01.png)

> Can't see the button? Check the following conditions; they should apply for the button to be displayed:
> - The applications registered in the account must have at least one callback URL listed.
> - The applications must have the connections turned on that the users who are to be impersonated belong to.

A popup displays the URL to be used in order to impersonate the user. You can choose either to copy the URL into the clipboard (white button) or open it in a separate browser tab/window (blue button).

![](/media/articles/user-profile/signin-as-user-02.png)

> Impersonating a user using the Management Dashboard will not return a [JWT](/jwt) to your application by default. You can achieve this by calling the [impersonation endpoint](/api/authentication#!#post--users--user_id--impersonate) manually and adding `additionalParameters.scope: "openid"` to the request body.

## Impersonate a User using the Impersonation API

You can also use the [Impersonation API](/api/authentication#!#post--users--user_id--impersonate). The API generates a link that can be used once to log in as a specific user. To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional `impersonated` and `impersonator` properties. For more details on how to use the API read on.

## Implement impersonation in your app

Let's assume that you have two apps, `app1` and `app2`, and you want to impersonate the users of `app2`.

Your first step would be to generate a _Bearer_ token to be used with [Impersonation API](/api/authentication#!#post--users--user_id--impersonate). You can generate it with the [Authentication API](/api/authentication) `/oauth/token` endpoint using your _Global Client ID_ and _Global Client Secret_. The token will be valid for 24 hours, so you should ask for a token everytime you make a request to the API or handle vigorously `401` responses.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"grant_type\": \"client_credentials\"}"
  }
}
```

> Management APIv2 calls are made with tokens issued by your _Global Client ID_, which is a unique identifier for your Auth0 account. You can retrieve your _Global Client ID_ and _Global Client Secret_ in the [Management APIv2 documentation page](/api/management/v2) (click on API Key/Secret). They are also available at the _Advanced_ section under _Account Settings_ in the Auth0 [Management Dashboard](${manage_url}/#/account/advanced).

Afterwards, you would have to find out the user id of the user that you want to impersonate. That would be the user of `app2`. You can retrieve this information with the [Management API /api/v2/users](/api/management/v2#!/Users/get_users) endpoint.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users",
  "headers": [
    { "name": "Authorization", "value": "Bearer {bearer-token}" }
  ]
}
```

The `{bearer_token}` should be replaced with an Auth0 Management APIv2 token. Details on how to do this can be found [here](/api/management/v2/tokens).

> You can also retrieve the `user_id` information from the Management Dashboard. Go to the [Users](${manage_url}/#/users) section and look at the user’s profile. The `user_id` is displayed under the _Identity Provider Attributes_ section.

You are now ready to call the [Impersonation API](/api/authentication#!#post--users--user_id--impersonate). The request should include an `Authorization` header with `Bearer bearer-token`, where `bearer-token` is the token you retrieved at the first step. The data part of the request should include the following:
- `protocol`: the protocol to use against the identity provider. It could be `oauth2` again or something else. (e.g. Office 365 uses WS-Federation, Google Apps uses OAuth2, AD will use LDAP or Kerberos).
- `impersonator_id`: the `user_id` of the impersonator, the user from `app1` that wants to impersonate a user from `app2`.
- `client_id`: the `client_id` of the app that is generating the impersonation link, in this example `app1`.
- `additionalParameters`: this is a JSON object. For a regular web app, you should set the `response_type` to be `code`, the `callback_url` to be the callback url to which Auth0 will redirect with the authorization code, and the `scope` to be the JWT claims that you want included in the JWT. For example:
```json
"response_type": "code",
"state": "",
"callback_url" : "http://localhost:3001/register",
"scope" : "openid email name user_metadata"
```

The `state` is an optional parameter, but we strongly recommend you use it as it mitigates [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

The `callback_url` must match what is defined in your [settings](${manage_url}/#/settings) page.

There are various possible values for `scope`:
- `scope: 'openid'`: _(default)_ It will return, not only the `access_token`, but also an `id_token` which is a _JSON Web Token ([JWT](/jwt)). The JWT will only contain the user id (`sub` claim).
- `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).
You can get more information about this in the [Scopes documentation](/scopes).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/users/{user_id}/impersonate",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer {bearer-token}" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"protocol\": \"{protocol-to-use}\",\"impersonator_id\": \"{impersonator-id}\",\"client_id\": \"${account.clientId}\",\"additionalParameters\":{\"response_type\": \"code\",\"state\": \"\"}}"
  }
}
```

Replace the required values as follows:
- The `{user_id}` should be replaced with the `user_id` you retrieved at the second step (the user to impersonate).
- The `{bearer_token}` should be replaced with the token already retrieved at the first step.
- The `{protocol-to-use}` should be replaced with the protocol to use against the identity provider, for example `oauth2`.
- The `{impersonator-id}` should be replaced with the `user_id` of the impersonator.

Upon successful authentication, a URL will be returned as response that will look like the following:

    ${account.callback}/?code=AUTHORIZATION_CODE&state=STATE_VALUE

`${account.callback}` is the URL you specified as `callback_url` (and configured in your [settings](${manage_url}/#/settings) page), `state` should match the `state` value you sent with your request and `code` is the authorization code you need.

> The process described applies to Regular Web Applications. In case yours is a Single Page Application (SPA) you would have to use `"response_type":"token"` when invoking the [Impersonation API](/api/authentication#!#post--users--user_id--impersonate). Once you do this Auth0 will redirect to your SPA _Callback URL_ with `access_token` and `id_token` in the `#` params. You can read more on the OAuth2 Implicit flow [here](/protocols#oauth2-implicit-flow).

Now you should exchange the `code` you received for a token. Note that this should already be implemented if you have a regular webapp and are using OAuth Server Side flow for authenticating normal users.

If not you should send a POST request to the token endpoint in Auth0. You will need to send the `code` obtained before along with your `clientId` and `clientSecret`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/users/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"code\": \"{AUTHORIZATION_CODE}\",\"grant_type\": \"authorization_code\",\"callback_url\": \"{CALLBACK_URL}\"}"
  }
}
```

Replace the `{AUTHORIZATION_CODE}` with the `code` you received previously. Also, replace `{CALLBACK_URL}` with your application's callback URL.

If the request is successful, you will get a JSON object with an `access_token`. You can use this token to call the Auth0 APIs and get additional information such as the user profile.


##### Sample Access Token Response:

  {
       "access_token": ".....Access Token.....",
       "token_type": "bearer",
       "id_token": "......The JWT......"
  }

Congratulations, you are done!

## Further reading
- [Troubleshooting? This is what you shouldn’t do.](https://auth0.com/blog/2015/12/14/how-not-to-troubleshoot-bugs-by-impersonating-users/)
- [Identity Protocols supported by Auth0](/protocols)
