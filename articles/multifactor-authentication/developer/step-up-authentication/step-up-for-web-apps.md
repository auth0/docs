---
title: Step-up Authentication for Web Apps
description: Describes how to check if a user has logged in your web app with Multifactor Authentication by examining their ID Token
tags:
  - mfa
  - step-up-authentication
  - web-apps
toc: true
---
# Step-up Authentication for Web Apps

With Step-up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger mechanism to access sensitive information or perform certain transactions.

For instance, a user may be allowed to access views with sensitive data or reset their password only after confirming their identity using Multifactor Authentication (MFA).

When a user logs in you can get an [ID Token](/tokens/id-token) which is a [JSON Web Token](/jwt) that contains information relevant to the user's session, in the form of claims.

The claim that is relevant to this scenario is `amr`. If it contains the value `mfa` then you know that the user has authenticated using MFA. Note the following:
- `amr` **must** be present in the ID Token's payload (if you log in with username/password the claim will not be included in the payload)
- `amr` **must** contain the value `mfa` (`amr` can contain claims other than `mfa`, so its existence is not a sufficient test, its contents must be examined for the value `mfa`)

If the token shows that the user has not authenticated with MFA, then you can trigger again authentication, and using a rule, trigger MFA. Once the user provides the second factor, a new ID Token, that contains the `amr` claim, is generated and sent to the app.

## How to check the ID Token for MFA

In order to check if a user logged in with MFA follow these steps:

1. Retrieve the ID Token
1. Verify the token's signature. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
1. Validate the standard claims: `exp` (when the token expires), `iss` (who issued the token), `aud` (who is the intented recipient of the token)
1. Verify that the token contains the `amr` claim.
  - If `amr` **is not** in the payload or it does not contain the value `mfa`, the user did not log in with MFA
  - If `amr` **is** in the payload and it contains the value `mfa`, then the user logged in with MFA

For more information on the signature verification and claims validation, see [ID Token](/tokens/id-token).

## Sample payloads

In the snippet below you can see how an ID Token's payload is if the user has authenticated with MFA, and how it is if they have not.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#with-mfa" data-toggle="tab">ID Token with MFA</a></li>
      <li><a href="#without-mfa" data-toggle="tab">ID Token without MFA</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="with-mfa" class="tab-pane active">
      <pre class="text hljs">
        <code>
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|1a2b3c4d5e6f7g8h9i",
  "aud": "${account.clientId}",
  "iat": 1522838054,
  "exp": 1522874054,
  "acr": "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
  "amr": [
    "mfa"
  ]
}
        </code>
      </pre>
    </div>
    <div id="without-mfa" class="tab-pane">
      <pre class="text hljs">
        <code>
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|1a2b3c4d5e6f7g8h9i",
  "aud": "${account.clientId}",
  "iat": 1522838197,
  "exp": 1522874197
}
        </code>
      </pre>
    </div>
  </div>
</div>

## Example

Let's say that you have a web app that authenticates users with username and password. When a user wants to access a specific screen with sensitive information, for example, one that displays salary data, you want the user to authenticate with another factor, for example [Guardian push notifications](/multifactor-authentication#mfa-using-push-notifications-auth0-guardian-).

### Before you start

This tutorial assumes that you have already done the following:

- [Register an application](/applications#how-to-configure-an-application). For the purposes of this example we'll be using a regular web app
- [Create a database connection](${manage_url}/#/connections/database)
- [Enable Multifactor Authentication](/multifactor-authentication). For the purposes of this example we'll be using [Guardian push notifications](/multifactor-authentication/administrator/push-notifications)

### 1. Create the rule

First we will create a rule that will challenge the user to authenticate with MFA when the web app asks for it.

Go to [Dashboard > Multifactor Auth](${manage_url}/#/guardian) and modify the script as follows.

```js
function (user, context, callback) {

  var CLIENTS_WITH_MFA = ['${account.clientId}'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // ask for MFA only if the web app said so in the authentication request
    if (context.request.query.acr_values === 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'){
      context.multifactor = {
        provider: 'guardian',
        allowRememberBrowser: false
      };
    }
  }

  callback(null, user, context);
}
```

The `CLIENTS_WITH_MFA` variable holds the Cliend IDs of all the applications you want to use this rule. You can remove this (and the `if` statement that follows) if you don't need it.

The `context.request.query.acr_values` property exists only if the web app included it in the authentication request, using the request parameter `acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor`. The web app will only include this parameter in the authentication request (as we will see in a while) if the user tries to access salary information and has not authenticated with MFA. In this case we ask for MFA using [Guardian](/multifactor-authentication/guardian) by setting the `context.multifactor` property to the appropriate value.

### 2. Configure your application

If the user tries to access the salary information screen, then the web app must check the ID Token claims for MFA. If the user has already authenticated with MFA, then the screen is displayed, otherwise the web app sends a new authentication request to Auth0. This time the request parameter `acr_values` is included so the rule we saw in the previous paragraph triggers MFA. Once the user authenticates, a new token is sent to the app.

#### Check the ID Token

The web app must validate the token as described in [How to check the ID Token for MFA](#how-to-check-the-id-token-for-mfa).

In this example, we do these validations, using the [JSON Web Token Sample Code](https://github.com/auth0/node-jsonwebtoken).

The code verifies the token's signature (`jwt.verify`), decodes the token, and checks whether the payload contains `amr` and if it does whether it contains the value `mfa`. The results are logged in the console.

```js
const AUTH0_CLIENT_SECRET = '${account.clientSecret}';
const jwt = require('jsonwebtoken')

jwt.verify(id_token, AUTH0_CLIENT_SECRET, { algorithms: ['HS256'] }, function(err, decoded) {
   if (err) {
     console.log('invalid token');
     return;
   }

   if (Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0) {
     console.log('You used mfa');
     return;
   }

   console.log('you are not using mfa');
 });
```

#### Ask for MFA

If the output of the previous validations is that the user has not authenticated with MFA, then you must trigger authentication again. The request will include the `acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor` parameter, which as a result will trigger the rule we wrote at [the first step](#1-create-the-rule).

Our web app uses the [Authorization Code Grant](/api-auth/tutorials/authorization-code-grant) to authenticate, so the request is as follows.

```text
https://${account.namespace}/authorize?
    audience=https://${account.namespace}/userinfo&
    scope=openid&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state=YOUR_OPAQUE_VALUE&
    acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor
```

Once the user authenticates with Guardian, the web app receives in the response the authorization code which must be exchanged for the new ID Token, using the [Token endpoint](/api/authentication#authorization-code). For more details, and sample requests, see [Exchange the Authorization Code for a Token](/api-auth/tutorials/authorization-code-grant#2-exchange-the-authorization-code-for-an-access-token).

That's it, you are done!

## Keep reading

::: next-steps
* [Overview of ID Tokens](/tokens/id-token)
* [Overview of JSON Web Tokens](/jwt)
* [OpenID specification](http://openid.net/specs/openid-connect-core-1_0.html)
* [Step-up Authentication for APIs](/multifactor-authentication/developer/step-up-authentication/step-up-for-apis)
:::
