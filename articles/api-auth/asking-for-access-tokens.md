# API Authorization: Asking for Access Tokens
<%=include('./_preview-warning') %>

Consumers should perform a `POST` operation to:

Endpoint:
```
https://{YOUR_NAMESPACE}/oauth/token
```

Payload:
```
{
  audience: "{YOUR_API_IDENTIFIER}",
  grant_type: "client_credentials",
  client_id: "{APP_CLIENT_ID}",
  client_secret: "{APP_CLIENT_SECRET}"
}
```
The response will be a signed JWT token with

```
{
  "iss": "https://{YOUR_NAMESPACE}/",
  "sub": "{APP_CLIENT_ID}@clients",
  "aud": "{YOUR_API_IDENTIFIER}",
  ...
  "scope": ""
}
```

> *NOTE:* If you executed the setup steps in the Auth0 Dashboard you will notice that the `scope` property is blank. At this point we don't provide support for custom scopes in the Auth0 Dashboard. You can still use this token to authorize access to the the parts of your API that don't require elevated permissions. If you would like to add scopes for your API you can follow [a few extra steps](/api-auth/adding-scopes).

## Where can I find all the IDs you refer to in this sample?

First go to the [Applications](https://manage.auth0.com/#/applications) page in the Dashboard, and select the application you want to use:

* {YOUR_NAMESPACE}: This is the value of the **Domain** field.
* {APP_CLIENT_ID}: This is the value of the **Client ID** field.
* {APP_CLIENT_SECRET}: This is the value of the **Client Secret** field

Next go to the [APIs section](https://manage.auth0.com/#/apis) of the dashboard and select the API you are working with:

* {YOUR_API_IDENTIFIER}: This is the value of the **Id** field on the Settings tab of the API

**NB** You also need to go to the **Authorized Clients** tab of the API and ensure that the app you are using has been authorized to request access tokens from that particular API.
