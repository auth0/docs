---
description: Overview of API scopes
topics:
  - scopes
contentType:
  - reference
  - how-to
useCase:
  - development
---
# API Scopes

API scopes allow you to define the actions that applications calling your API can perform and the data they can access. 

## Background

When you [configure an API in Auth0](/api-auth/guides/configure-api), you can [define scopes](/scopes/current/guides/define-scopes-using-dashboard) to control what someone can do and access. For example, if you want users to be able to **read** and **delete** contact information, you would create the follow two scopes to reflect these two actions:

* `read:contacts` 
* `delete:contacts`

If you wanted to expand [our example on asking for standard claims](/scopes/current/oidc-scopes#example-asking-for-standard-claims) to include also the `read:contacts` permission, then you would using something like the following sample URL to initiate the authentication flow using the Implicit grant:

```text
https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=openid%20profile%20email%20read:contacts&
  response_type=id_token%20token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Note the differences between the example above and the example on asking for standard claims. In the example above, we want to get an Access Token, that will allow us to access the API, with the rights to do specific actions. To do so, we changed two parameters and added a new one:

- `audience`: New parameter added for this example. Its value is the unique identifier of the API we want to get access to.

- `scope`: We appended the value `read:contacts`. This denotes the rights that we want to be granted at the API (in this case, read contact information).

- `response_type`: We appended the value `token`. This tells the Authorization Server (Auth0 in our case) to issue an Access Token as well, not only an ID Token. The Access Token will be sent to the API as credentials.
