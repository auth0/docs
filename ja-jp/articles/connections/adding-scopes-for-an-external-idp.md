---
description: How to add scopes to your IdP connection.
topics:
  - connections
  - scopes
contentType: how-to
useCase:
  - customize-connections
  - add-idp
---
# Add scopes/permissions to call Identity Provider's APIs

Once user is logged in, you can get the user profile and then the associated `accessToken` to call the Identity Provider APIs as described in: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api)

However, if you are receiving `Access Denied` when calling the IdP API, you probably have not requested the correct permissions for the user during login.

There are two ways you can use to request the correct permissions.

## 1. Change Identity Provider Settings

To configure the <dfn data-key="scope">scopes</dfn>/permissions needed from the user, go to [Auth0 Dashboard > Authentication > Social](${manage_url}/#/connections/social), and select an IdP. You can select the required permissions listed on the configuration screen.

For example, if you click the **Google / Gmail** connection, you can configure Google-specific permissions:

![Permissions for Google](/media/articles/connections/social/dashboard-connections-social-create_google.png)

## 2. Pass Scopes to Authorize endpoint

You can also pass the scopes/permissions you wish to request as a comma-separated list in the `connection_scope` parameter when calling the [authorize endpoint](/api/authentication#login). For example, if you want to request the `https://www.googleapis.com/auth/contacts.readonly` and `https://www.googleapis.com/auth/analytics` scopes from Google, you can pass these along with the `connection` parameter to ensure the user logs in with their Google account:

```text
https://${account.namespace}/authorize
  ?response_type=id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &scope=openid%20profile
  &connection=google-oauth2
  &connection_scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts.readonly
  &nonce=abc
```

::: note
Please note that in the example request above, the value of the `connection_scope` parameter is URL encoded. The decoded value that is passed to Google is `https://www.googleapis.com/auth/analytics, https://www.googleapis.com/auth/contacts.readonly`
:::
