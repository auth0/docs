---
title: Step-up Authentication for Web Apps
description: Learn how to check if a user has logged in your web app with Multi-factor Authentication by examining their ID Token.
topics:
  - mfa
  - step-up-authentication
  - web-apps
contentType:
  - how-to
  - concept
useCase:
  - customize-mfa
---
# Step-up Authentication for Web Apps

With step-up authentication, applications that allow access to different types of resources can require users to authenticate with a stronger mechanism to access sensitive information or perform certain transactions.

For instance, a user may be allowed to access views with sensitive data or reset their password only after confirming their identity using <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

To accomplish step-up authentication for your web app, you will create a rule that challenges the user to authenticate with MFA when the web app asks for it, check the ID Token claims for MFA if the user tries to access a restricted page, and then challenge the user if MFA is not included in the claim. 

## How it works

When a user logs in, you retrieve an [ID Token](/tokens/concepts/id-tokens), which is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> that contains information relevant to the user's session in the form of claims. For this scenario, the relevant claim is `amr`, which indicates the authentication method used during login; it **must** be present in the ID Token's payload and **must** contain the value `mfa`. Because it can contain claims other than `mfa`, when validating you must both test for its existence and examine its contents for a value of `mfa`.

::: panel Authentication Methods Reference
The `amr` claim is a JSON array of strings that indicates the authentication method used during login. Its values may include any of the pre-defined [Authentication Method Reference Values](https://tools.ietf.org/html/rfc8176). For example, the `amr` claim may contains the pre-defined value `mfa`, which indicates that the user has authenticated using MFA. 
:::

If a user attempts to access a restricted page and the token shows that the user has **not** authenticated with MFA, then you can retrigger authentication, which you have configured to trigger MFA using a rule. Once the user provides the second factor, a new ID Token that contains the `amr` claim is generated and sent to the app.

## Validate ID Tokens for MFA

1. Retrieve the ID Token.
2. Verify the token's signature, which is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
3. Validate the following claims: 

    | Claim | Description |
    | --- | --- |
    | `exp` | Token expiration |
    | `iss` | Token issuer |
    | `aud` | Intended recipient of the token |
    | `amr` | If `amr` does not exist in the payload or does not contain the value `mfa`, the user did not log in with MFA. If `amr` exists in the payload and contains the value `mfa`, then the user did log in with MFA. |

    In the example below, you can compare the potential values included in an ID Token's payload when a user has authenticated with MFA versus when they have not.

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
    "iat": 1522838054,
    "exp": 1522874054
}
        </code>
      </pre>
    </div>
  </div>
</div>

## Sample scenario

In the following scenario, a web app authenticates users with username and password. When users want to access a specific screen with sensitive information, such as salary data, they must authenticate with another factor, such as [Guardian push notifications](/multifactor-authentication#mfa-using-push-notifications-auth0-guardian-).

For this example, we assume that we have already done the following:

- [Registered an application](/applications). For this example, we'll use a regular web app.
- [Created a database connection](${manage_url}/#/connections/database).
- [Enabled Multi-factor Authentication](/multifactor-authentication) using [push notifications](/multifactor-authentication/factors/push).

1. Create a rule that challenges the user to authenticate with MFA when the web app requests it. Navigate to [Rules](${manage_url}/#/rules), and create a rule that contains the following content:

    ```js
    function(user, context, callback) {

      var CLIENTS_WITH_MFA = ['${account.clientId}'];
      // run only for the specified clients
      if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
        // ask for MFA only if the web app said so in the authentication request
        if (context.request.query.acr_values === 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'){
          context.multifactor = {
            provider: 'any',
            allowRememberBrowser: false
          };
        }
      }

      callback(null, user, context);
    }
    ```

    - The `CLIENTS_WITH_MFA` variable holds the Client IDs of all the applications you want to use this rule. (You can remove this (and the `if` statement that follows) if you don't need it.)

    - The `context.request.query.acr_values` property contains the context class that the Authorization Server is being requested to use when processing requests from the application. It only exists when the application includes it in the authentication request. In this example, our web app will include it in the authentication request, but only when a user who has not already authenticated ith MFA tries to access salary information. When our web app includes it, it will set a value of `http://schemas.openid.net/pape/policies/2007/06/multi-factor`, which indicates that we want the Authorization Server to require MFA, and the `context.multifactor` property value that we set in our code will specify MFA via [Push notification](/multifactor-authentication/factors/push).

2. Configure the app to check that the user has authenticated using MFA when a user tries to acces the restricted salary information page. (When a user has authenticated with MFA, the ID Token claims contain the `amr` claim with a value of `mfa`). If the user has already authenticated with MFA, then the web app will display the restricted page; otherwise, the web app will send a new authentication request that includes the `acr_values` parameter with a value of `http://schemas.openid.net/pape/policies/2007/06/multi-factor`, which will trigger our rule. 

    The web app in this scenario uses the [Authorization Code Flow](/flows/concepts/auth-code) to authenticate, so the request is as follows:

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

    Once the user authenticates with MFA, the web app receives the authorization code, which must be exchanged for the new ID Token, which should now contain the `amr` claim with a value of `mfa`. To learn how to exchange the code for an ID Token, see [Add Login Using the Authorization Code Flow: Request Tokens](/flows/guides/auth-code/add-login-auth-code#request-tokens). 

3. Validate the incoming ID Token using the steps described in the [Validate ID Tokens for MFA](#validate-id-tokens-for-mfa) section. In this scenario, we perform these validations using the [JSON Web Token Sample Code](https://github.com/auth0/node-jsonwebtoken), which verifies the token's signature (`jwt.verify`), decodes the token, checks whether the payload contains `amr`, and if so, logs the results in the console.

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

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Rules](/rules)
* [JSON Web Tokens](/tokens/concepts/jwts)
* [OpenID Connect (OIDC) specification](http://openid.net/specs/openid-connect-core-1_0.html)
* [Step-up Authentication for APIs](/multifactor-authentication/developer/step-up-authentication/step-up-for-apis)
