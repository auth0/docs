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

When a user logs in you can get an [ID Token](/tokens/id-tokens) which is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> that contains information relevant to the user's session, in the form of claims. The claim that is relevant in this scenario is `amr`. It **must** be present in the ID Token's payload. It **must** also contain the value `mfa`. It can contain claims other than `mfa` so its existence is not a sufficient test. It's contents must be examined for the value `mfa`.

::: panel Authentication Methods Reference
The `amr` claim identifies the Authentication Methods References which are a JSON array of strings that are identifiers for specific methods used in the authentication. For instance, if the `amr` claim contains the value `mfa` then you know that the user has authenticated using MFA. See [Authentication Method Reference Values](https://tools.ietf.org/html/rfc8176) for more details. 
:::

If the token shows that the user has not authenticated with MFA, then you can again trigger  authentication, and using a rule, trigger MFA. Once the user provides the second factor, a new ID Token, that contains the `amr` claim, is generated and sent to the app.

## Check the ID Token for MFA

1. Retrieve the ID Token.
1. Verify the token's signature. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
1. Validate the following claims: 

| Claim | Description |
| --- | --- |
| `exp` | Token expiration |
| `iss` | Token issuer |
| `aud` | Intended recipient of the token |
| `amr` | If `amr` **is not** in the payload or it does not contain the value `mfa`, the user did not log in with MFA. If `amr` **is** in the payload and it contains the value `mfa`, then the user logged in with MFA. |

    In the example below, you can see what an ID Token's payload may look like if the user has authenticated with MFA, and how it may look if they have not.

    ```js
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
    ```

## Sample scenario

In the following scenario, a web app authenticates users with username and password. When a user wants to access a specific screen with sensitive information, such as salary data, the user will authenticate with another factor, such as [Guardian push notifications](/multifactor-authentication#mfa-using-push-notifications-auth0-guardian-).

We assume that the following has already been set up for the web app:

- [Registered an application](/applications/concepts/app-types-auth0). (A regular web app in this case.)
- [Created a database connection](${manage_url}/#/connections/database).
- [Enabled Multi-factor Authentication](/multifactor-authentication) using [push notifications](/multifactor-authentication/factors/push).

1. First, we will create a rule that challenges the user to authenticate with MFA when the web app asks for it. To do that, we go to [Rules](${manage_url}/#/rules) and create a rule with the content below:

    ```js
    function (user, context, callback) {

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

    - The `CLIENTS_WITH_MFA` variable holds the Client IDs of all the applications you want to use this rule. (You can remove this and the `if` statement that follows if you don't need it.)

    - The `context.request.query.acr_values` property exists only if the web app included it in the authentication request, using the request parameter `acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor`. The web app will only include this parameter in the authentication request (as we will see in a while) if the user tries to access salary information and has not authenticated with MFA. In this case we ask for MFA using [Push](/multifactor-authentication/factors/push) by setting the `context.multifactor` property to the appropriate value.

2. Next, we will configure the app so that if the user tries to access the salary information page, then the app checks the ID Token claims for MFA. If the user has already authenticated with MFA, then the screen is displayed, otherwise the web app sends a new authentication request to Auth0. This time the request parameter `acr_values` is included so the rule we created in the previous step triggers MFA. Once the user authenticates, a new token is sent to the app.

3. Check the ID Token. The web app should validate the token as described in [Check the ID Token for MFA](#check-the-id-token-for-mfa) above. In this scenario, we do these validations using the [JSON Web Token Sample Code](https://github.com/auth0/node-jsonwebtoken). The code verifies the token's signature (`jwt.verify`), decodes the token, and checks whether the payload contains `amr` and if it does, the results are logged in the console.

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

4. If the output of the previous validations is that the user has not authenticated with MFA, then the web app triggers authentication again. The request includes the `acr_values=http://schemas.openid.net/pape/policies/2007/06/multi-factor` parameter, which triggers the rule we wrote in the first step. The web app in this scenario uses the [Authorization Code Flow](/flows/concepts/auth-code) to authenticate, so the request is as follows:

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

    Once the user authenticates with Guardian, the web app receives in the response the authorization code which must be exchanged for the new ID Token, using the [Token endpoint](/api/authentication#authorization-code). For more details, and sample requests, see [Add Login Using the Authorization Code Flow: Request Tokens](/flows/guides/auth-code/add-login-auth-code#request-tokens).

## Keep reading

* [ID Tokens](/tokens/id-tokens)
* [Rules](/rules)
* [JSON Web Tokens](/jwt)
* [OpenID Connect (OIDC) specification](http://openid.net/specs/openid-connect-core-1_0.html)
* [Step-up Authentication for APIs](/multifactor-authentication/developer/step-up-authentication/step-up-for-apis)
