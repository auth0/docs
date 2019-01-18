---
description: Describes what changed in the flow for generating Auth0 Management APIv2 tokens and why.
section: apis
crews: crew-2
toc: true
topics:
  - apis
  - management-api
  - tokens
contentType: concept
useCase: invoke-api
---
# Changes in Auth0 Management APIv2 Tokens

Some time ago we changed the process to get a Management APIv2 Token. This article explains what changed, why this was done and how you can work around it (not recommended).

## What changed and why

### The User Experience

Until recently you could generate a Management APIv2 Token directly from the Management API explorer. You selected the scopes, according to the endpoint you wanted to invoke, and got a token from that same page.

That way was very easy but it was also __very insecure__. So we changed it.

The new way uses the [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow).

::: note
For details on how to follow this new process refer to [Access Tokens for the Management API](/api/management/v2/tokens).
:::

#### Why this changed

In order to generate the token, the Management API required access to your __Global Client Secret__ (used to sign the token). This is information that should __not__ be exposed to web browsers.

Furthermore, the API Explorer has no way to do authorization. This means that if you could login and access the API explorer, you could generate a token with __any__ scope, even if you as the logged in user were not allowed to have that scope.

The new OAuth 2.0 Client Credentials grant implementation does not pose such risks. Once you do the initial configuration, you can get a token either by visiting the dashboard, or by making a simple `POST` request to [the `/oauth/token` endpoint of our Authentication API](/api/authentication#client-credentials).

However, with regards to the manual process, we do understand that changing screens is not always the best user experience, so we are looking into ways to make the new flow more intuitive.


### The Validity Period

With the previous flow the tokens never expired. With the new flow all Management APIv2 Tokens __expire by default after 24 hours__. You can [work around that](#can-i-still-get-a-non-expiring-token-), even though we do not recommend it.

#### Why this changed

Having a token that never expires can be very risky, in case an attacker gets hold of it. If the token expires within a few hours the attacker has only a small window to access your protected resources.

## Can I still get a non-expiring token?

Yes you can. We added a text box (__Token Expiration (Seconds)__), at [the API Explorer tab of your Auth0 Management API](${manage_url}/#/apis/management/explorer), where you can set the new expiration time (in seconds) and click __Update & Regenerate Token__. A new token will be generated with your custom expiration time. Our recommendation however is not to use this and get a new token every 24 hours. You can easily automate this [following this process](/api/management/v2/tokens).

Furthermore, you can generate a token using [JWT.io](https://jwt.io/):
- Use the [JWT.io Debugger](https://jwt.io/#debugger-io) to manually type the claims and generate a token.
- Use one of the [JWT.io libraries](https://jwt.io/#libraries-io).

::: warning
Long-lived tokens compromise your security. Following this process is <strong>NOT</strong> recommended.
:::

### Use the JWT.io Debugger

You can use the [JWT.io Debugger](https://jwt.io/#debugger-io) to manually generate a token.

The debugger allows you to edit the __Header__ and __Payload__ content on the right hand side of the screen. The token will automatically be updated on the left hand text area. Note that the debugger supports only `HS256` when editing header and payload.

To generate a token follow the next steps:

1. Go to [JWT.io Debugger](https://jwt.io/#debugger-io). Notice that there is a sample token on the left hand editor. The right hand editor contains the header, payload and verify signature parts.

2. Delete the dummy `secret` value from the _Verify Signature_ panel. Set your __Global Client Secret__ (you can find this value at [Advanced Tenant Settings](${manage_url}/#/tenant/advanced)) and check the __secret base64 encoded__ flag.

3. Make sure the _Header_ contains the `alg` and `typ` claims, as follows.

  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```
4. Delete the dummy claims from the _Payload_ and add the following claims: `iss`, `aud`, `scope`, `iat`, `exp`.

  ```json
  {
    "iss": "https://${account.namespace}/",
    "aud": "YOUR_GLOBAL_CLIENT_ID",
    "scope": "SPACE-SEPARATED-LIST-OF-SCOPES",
    "iat": CURRENT_TIMESTAMP,
    "exp": EXPIRY_TIME
  }
  ```

  Where:

  - __iss__: Who issued the token. Use your tenant's __Domain__. You can find this value at any [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings).

  - __aud__: Who is the intended audience for this token. Use the __Global Client Id__ of your tenant. You can find this value at [Advanced Tenant Settings](${manage_url}/#/tenant/advanced).

  - __scope__: The (space separated) list of authorized scopes for the token. Each [Auth0 Management API v2](/api/management/v2) endpoint requires specific scopes. For example, the [Get all applications](/api/management/v2#!/Clients/get_clients) endpoint requires the scopes `read:clients` and `read:client_keys`, while the [Create an application](/api/management/v2#!/Clients/post_clients) endpoint requires the scope `create:clients`. So if you need to read _and_ create applications, then the token should include three scopes: `read:clients`, `read:client_keys` and `create:clients`. In this case you would set the scope at the editor to the value `read:clients read:client_keys create:clients`.

  - __iat__: The time at which the token was issued. It must be a number containing a `NumericDate` value, for example `1487260214` (which maps to `Thu, 16 Feb 2017 15:50:14 GMT`). You can use an [epoch converter](http://www.epochconverter.com/) to get this value.

  - __exp__: The time at which the token will expire. It must be a number containing a `NumericDate` value, for example `1518808520` (which maps to `Fri, 16 Feb 2018 19:15:20 GMT`).

5. As you type the token on the left hand editor is automatically refreshed. When you are done copy this value.

### Use a Library

- Use one of the [JWT.io libraries](https://jwt.io/#libraries-io). For example, the following snippet generates a JWT using [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken):

  ```javascript
  const jwt = require('jsonwebtoken');
  const globalClientSecret = new Buffer('YOUR_GLOBAL_CLIENT_SECRET', 'base64');
  const currentTimestamp = Math.floor(new Date());

  var token = jwt.sign({
    iss: 'https://${account.namespace}/',
    aud: 'YOUR_GLOBAL_CLIENT_ID',
    scope: 'read:clients read:client_keys'},
    globalClientSecret,
    { //options
      algorithm: 'HS256',
      expiresIn: '1y'
    }
  );

  console.log(token);
  ```

  Note the following:

  - The token is signed using `HS256` and the __Global Client Secret__ (you can find this value at [Advanced Tenant Settings](${manage_url}/#/tenant/advanced)).

  - The audience (claim `aud`) is the __Global Client Id__ (you can find this value at [Advanced Tenant Settings](${manage_url}/#/tenant/advanced)).

  - We want this token in order to call the [Get all applications](/api/management/v2#!/Clients/get_clients) so we only asked for the scopes required by this endpoint: `read:clients read:client_keys`.

  - The token expires in one year (`expiresIn: '1y'`).
