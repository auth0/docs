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

API scopes allow you to define the API data accessible to your applications. 

## Background

When you [create an API in Auth0](/apis), you can use scopes to control how and what someone can access. For example, if you want users to be able to **read** and **delete** contact information, you would create the follow two scopes to reflect these two actions:

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

## Define scopes using the Dashboard

::: warning
By default, any user of any application can ask for any scope defined here. You can implement access policies to limit this behaviour via [Rules](/rules).
:::

You can define API scopes using the [Dashboard](${manage_url}/#/apis). Select the API you want to edit, and open up its **Scopes** tab.

Provide the following parameters:

| Parameter | Description |
| - | - |
| Name | The name of your scope |
| Description | A friendly description for your scope |

Click **Add** when you've provided the requested values.

![API Scopes](/media/articles/scopes/api-scopes.png)

## Limiting API scopes being issued

An application can request any scope and the user will be prompted to approve those scopes during the authorization flow. This may not be a desirable situation, as you may want to limit the scopes based on, for example, the permissions (or role) of a user.

You can make use of the [Authorization Extension](/extensions/authorization-extension) in conjunction with a custom [Rule](/rules) to ensure that scopes are granted based on the permissions of a user.

This approach is discussed in more depth in some of our [Architecture Scenarios](/architecture-scenarios). Specifically, you can review the entire [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section of our SPA+API Architecture Scenario which demonstrates how to configure the Authorization Extension, and also create a custom Rule which will ensure scopes are granted based on the permissions of a user.
