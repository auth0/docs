---
description: How to request tokens for your applications.
---

# API Authorization: Asking for Access Tokens

<%=include('./_preview-warning') %>

To ask Auth0 for tokens for any of your authorized client applications, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```
{
  audience: "YOUR_API_IDENTIFIER",
  grant_type: "client_credentials",
  client_id: "APP_CLIENT_ID",
  client_secret: "APP_CLIENT_SECRET"
}
```
The response will be a signed JWT token in this format:

```
{
  "iss": "https://${account.namespace}/",
  "sub": "APP_CLIENT_ID@clients",
  "aud": "YOUR_API_IDENTIFIER",
  ...
  "scope": ""
}
```

> **NOTE:** When you execute the setup steps in the Auth0 Dashboard as described in [API Authorization: Using the Auth0 Dashboard](/api-auth/using-the-auth0-dashboard), you will notice that the `scope` property is blank. Custom scopes are not supported in the Auth0 Dashboard at this time. You can still use this token to authorize access to the the parts of your API that do not require elevated permissions. If you would like to add scopes for your API you can follow [these steps](/api-auth/adding-scopes).

### Authorized Client Applications

Your client app must be authorized to access your API before you can request tokens.

You can go to the **Authorized Clients** tab of your API in the [APIs section](${uiURL}/#/apis) of the dashboard to verify that the app you are using has been authorized to request access tokens from this API.

To add an authorized app, follow the instructions as described in [API Authorization: Using the Auth0 Dashboard](/api-auth/using-the-auth0-dashboard).



### Where to Find the IDs

To find the values for the parameters referred to in this sample:

1. Go to the [Applications](${uiURL}/#/applications) page in the Dashboard, and select the application you want to use. There you will find these values:

  * YOUR_NAMESPACE: This is the value of the **Domain** field.
  * APP_CLIENT_ID: This is the value of the **Client ID** field.
  * APP_CLIENT_SECRET: This is the value of the **Client Secret** field.

2. Go to the [APIs section](${uiURL}/#/apis) of the dashboard and select the API you are working with. There you will find this values:

  * YOUR_API_IDENTIFIER: This is the value of the **Id** field on the Settings tab of the API.
