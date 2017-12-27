---
description: Describes using acr_values and acr claims to perform step-up authentication with Auth0
---
# Step-up Authentication

With step-up authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources.

For example, Fabrikam's Intranet requires users to authenticate with their username and password to access customer data. However, a request for access to employee data (which may contain sensitive salary information) triggers a stronger authentication mechanism like multifactor authentication.

You can add step-up authentication to your app with Auth0's extensible multifactor authentication support. Your app can verify that the user has logged in using multifactor authentication (MFA) and, if not, require the user to step-up to access certain resources.

![Step-up flow](/media/articles/mfa/step-up-flow.png)

## Step-up Authentication with Auth0

The recommended way to implement step-up authentication with Auth0 is using [scopes](/scopes), [access tokens](/tokens/access-token) and [rules](/rules).

::: note
An access token is a credential you can use to access an API. The actions that you can perform to that API are defined by the scopes your access token includes. The rules are JavaScript functions you can use to run custom logic when a user authenticates.
:::

You can use a rule to trigger the step-up authentication mechanism (for example, prompt MFA) whenever the user requests scopes that map to sensitive resources.

This is best explained with an example.

A user signs into Fabrikam's web app. The standard login gives to this user the ability to interact with their API and fetch the users account list. This means that the access token that the client receives after the user authentication contains a scope like `read:accounts`.

Now the user wishes to transfer funds from one account to another, which is deemed a high-value transaction. In order to perform this action, the API requires the scope `transfer:funds`.

The access token that the user currently has does not include this scope and the client knows it since it knows the set of scopes it requested in the initial authentication call.

The solution is that the client performs another authentication call, but this time it requests the required scope. The browser redirects to Auth0 and a rule is used to challenge the user to authenticate with MFA since a high-value scope was requested.

The result is a new access token which includes the high-value scope. The client will discard the token (i.e. not store it in local storage like the original token) thereby treating it like a single-use token.

## Keep reading

::: next-steps
* [Configure Custom MFA](/multifactor-authentication/custom)
* [An implementation of JSON Web Tokens with Node.js](https://github.com/auth0/node-jsonwebtoken)
* [Authentication policy definitions](http://openid.net/specs/openid-provider-authentication-policy-extension-1_0.html#rfc.section.4)
:::
