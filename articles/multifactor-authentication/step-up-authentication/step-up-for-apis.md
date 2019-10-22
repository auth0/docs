---
title: Step-up Authentication for APIs
description: Learn how an API can check if a user has logged in with Multi-factor Authentication by examining their Access Token.
topics:
  - mfa
  - step-up-authentication
  - apis
contentType:
  - how-to
  - concept
useCase:
  - customize-mfa
---
# Step-up Authentication for APIs

With step-up authentication, applications that allow access to different types of resources can require users to authenticate with a stronger mechanism to access sensitive information or perform certain transactions.

For instance, a user may be allowed to transfer money only after they have confirmed their identity using <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

When your <dfn data-key="audience">audience</dfn> is an API, you can implement step-up authentication with Auth0 using <dfn data-key="scope">scopes</dfn>, <dfn data-key="access-token">Access Tokens</dfn> and [rules](/rules). 

## How it works

When an application wants to access an API's protected resources it must provide an Access Token. The resources that it will have access to depend on the permissions that are included in the Access Token. These permissions are defined as **scopes**. 

For example, a banking API may accept two different levels of authorization: view account balance (scope `view:balance`) or transfer funds (scope `transfer:funds`). When an application asks the API to retrieve the user's balance, then the Access Token should contain the `view:balance` scope. In order to transfer money to another account the Access Token should contain the `transfer:funds` scope.

A flow for this example is the following:
1. The user logs in to the application using username/password authentication. The standard login gives to this user the ability to interact with their API and fetch their balance. This means that the Access Token that the app receives after the user authentication contains the scope like `view:balance`
1. The application sends a request to the API to retrieve the balance, using the Access Token as credentials
1. The API validates the token and sends the balance info to the application
1. Now the user wishes to transfer funds from one account to another, which is deemed a high-value transaction. The application sends a request to the API using the same Access Token
1. The API validates the token and denies access since it's missing the required scope `transfer:funds`
1. The application redirects to Auth0 and a rule is used to challenge the user to authenticate with MFA since a high-value scope was requested. Once the user successfully authenticates with MFA, a new Access Token which includes this scope is generated and sent to the application as part of the response
1. The application sends again the transfer funds request using the new Access Token, which includes the `transfer:funds` scope.
1. The API validates the token, discards it (thereby treating it like a single-use token) and proceeds with the operation

::: note
Note that the API needs to do more validations than just check the scope. These are:
- Verify the token's signature. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
- Validate the standard claims: `exp` (when the token expires), `iss` (who issued the token), `aud` (who is the intended recipient of the token)
For details on how to do these validations, see [Validate an Access Token for Custom APIs](/tokens/guides/access-token/validate-access-token).
:::

## Sample scenario

In the following scenario, we will see how to implement the flow described above.

We assume that the following has already been set up:

- [Register an application](/applications/concepts/app-types-auth0). For the purposes of this example we'll be using a single-page web app
- [Create a database connection](${manage_url}/#/connections/database)
- [Register the API](/apis#how-to-configure-an-api-in-auth0). It should include two scopes: `view:balance` and `transfer:funds`
- [Enable Multi-factor Authentication](/multifactor-authentication). For the purposes of this example we'll be using [push notifications](/multifactor-authentication/factors/push)

1. First we will create a rule that will challenge the user to authenticate with MFA when the `transfer:funds` scope is requested. Go to [Dashboard > Multi-factor Auth](${manage_url}/#/rules) and create a rule with the content below.

    ```js
    function (user, context, callback) {

      var CLIENTS_WITH_MFA = ['${account.clientId}'];
      // run only for the specified clients
      if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
        // ask for MFA only if scope transfer:funds was requested
        if (context.request.query.scope.indexOf('transfer:funds') > -1) {
          context.multifactor = {
            provider: 'any',
            allowRememberBrowser: false
          };
        }
      }

      callback(null, user, context);
    }
    ```

    - The `CLIENTS_WITH_MFA` variable holds the Client IDs of all the applications you want to use this rule. You can remove this (and the `if` statement that follows) if you don't need it.

    - The `context.request.query.scope` property contains all the scopes that the authentication request asked for. If it includes the value `transfer:funds` then we ask for MFA by setting the `context.multifactor` property to the appropriate value. In this case we are asking for MFA using [Push](/multifactor-authentication/factors/push).

2. Next, we need to configure the application to send the appropriate authentication request, depending on the action that the user wants to perform. Notice that the only difference between the two authentication requests (with or without MFA) is the scope `transfer:funds`.

    ```js
    <div class="code-picker">
      <div class="languages-bar">
        <ul>
          <li class="active"><a href="#without-mfa" data-toggle="tab">Authenticate without MFA</a></li>
          <li><a href="#with-mfa" data-toggle="tab">Authenticate with MFA</a></li>
        </ul>
      </div>
      <div class="tab-content">
        <div id="without-mfa" class="tab-pane active">
          <pre class="text hljs">
            <code>
    ```

    ```text
    https://${account.namespace}/authorize?
      audience=https://my-banking-api
      &scope=openid%20view:balance
      &response_type=id_token%20token
      &client_id=${account.clientId}
      &redirect_uri=${account.callback}
      &nonce=NONCE
      &state=OPAQUE_VALUE
            </code>
          </pre>
        </div>
        <div id="with-mfa" class="tab-pane">
          <pre class="text hljs">
            <code>
    ```

    ```text
    https://${account.namespace}/authorize?
      audience=https://my-banking-api
      &scope=openid%20view:balance%20transfer:funds
      &response_type=id_token%20token
      &client_id=${account.clientId}
      &redirect_uri=${account.callback}
      &nonce=NONCE
      &state=OPAQUE_VALUE
            </code>
          </pre>
        </div>
      </div>
    </div>
    ```

| Parameter | Setting |
| --- | --- |
| `audience` | Set to the **Identifier** of your API (find it at [API Settings](${manage_url}/#/apis/)). We set ours to `https://my-banking-api`. |
| `response_type` | Set to `id_token token` so we get both an ID Token and an Access Token in the response. |
| `client_id` | Set to the Client ID of your application (find it at [Application Settings](${manage_url}/#/applications/${account.clientId}/settings)). |
| `redirect_uri` | Set to the URL of your application that Auth0 should redirect back to after authentication (find it at [Application Settings](${manage_url}/#/applications/${account.clientId}/settings)). |
| `nonce` | Set to a cryptographically-secure string value which will be included in the response from Auth0. This is [used to prevent token replay attacks](/api-auth/tutorials/nonce) and is required for `response_type=id_token token`. |
| `state` | Set to an opaque value that Auth0 includes when redirecting back to the application. This value must be used by the application to [prevent CSRF attacks](/protocols/oauth2/oauth-state). | 

3. Finally, you need to make your API validate the incoming token and check the authorized permissions.

    For the purposes of this example we will configure two endpoints for our API:
    - `GET /balance`: to retrieve the current balance
    - `POST /transfer`: to transfer funds

    We will be using `Node.js` and a number of modules:
    - [express](https://expressjs.com/): adds the Express web application framework
    - [jwks-rsa](https://github.com/auth0/node-jwks-rsa): retrieves RSA signing keys from a **JWKS** (JSON Web Key Set) endpoint. Using `expressJwtSecret` we can generate a secret provider that will provide the right signing key to `express-jwt` based on the `kid` in the JWT header
    - [express-jwt](https://github.com/auth0/express-jwt): lets you authenticate HTTP requests using JWT tokens in your Node.js applications. It provides several functions that make working with JWTs easier
    - [express-jwt-authz](https://github.com/auth0/express-jwt-authz): checks if the Access Token contains a specific scope

    Start with installing the dependencies.

    `npm install express express-jwt jwks-rsa express-jwt-authz --save`

    Next define the API endpoints, create a middleware function to validate the Access Token, and secure the endpoints using that middleware. The code in your `server.js` file should look like the following sample script.

    ```js
    // set dependencies
    const express = require('express');
    const app = express();
    const jwt = require('express-jwt');
    const jwksRsa = require('jwks-rsa');
    const jwtAuthz = require('express-jwt-authz');

    // Create middleware for checking the JWT
    const checkJwt = jwt({
      // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${account.namespace}/.well-known/jwks.json`
      }),

      // Validate the audience and the issuer
      audience: 'https://my-banking-api', // replace with your API's audience, available at Dashboard > APIs
      issuer: 'https://${account.namespace}/',
      algorithms: [ 'RS256' ] // we are using RS256 to sign our tokens
    });

    // create retrieve balance endpoint
    app.get('/balance', checkJwt, jwtAuthz(['view:balance']), function (req, res) {
      // code that retrieves the user's balance and sends it back to the calling app
      res.status(201).send({message: "This is the GET /balance endpoint"});
    });


    // create transfer funds endpoint
    app.post('/transfer', checkJwt, jwtAuthz(['transfer:funds']), function (req, res) {
      // code that transfers funds from one account to another
      res.status(201).send({message: "This is the POST /transfer endpoint"});
    });

    // launch the API Server at localhost:8080
    app.listen(8080);
    console.log('Listening on http://localhost:8080');
    ```

Each time the API receives a request the following will happen:
1. The endpoint will call the `checkJwt` middleware
1. `express-jwt` will decode the token and pass the request, the header and the payload to `jwksRsa.expressJwtSecret`
1. `jwks-rsa` will then download all signing keys from the JWKS endpoint and see if a one of the signing keys matches the `kid` in the header of the Access Token. If none of the signing keys match the incoming `kid`, an error will be thrown. If we have a match, we will pass the right signing key to `express-jwt`
1. `express-jwt` will the continue its own logic to validate the signature of the token, the expiration, audience and the issuer
1. `jwtAuthz` will check if the scope that the endpoint requires is part of the Access Token

Now your application allows access to different types of resources using a stronger mechanism to perform high-value transactions.

## Keep reading

* [Access Tokens](/tokens/access-tokens)
* [Rules](/rules)
* [Scopes](/scopes)
* [Validate an Access Token](/tokens/guides/access-token/validate-access-token)
* [Step-up Authentication for Web Apps](/multifactor-authentication/step-up-authentication/step-up-for-web-apps)
