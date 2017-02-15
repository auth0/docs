---
description: Describes what changed in the flow for generating Auth0 Management APIv2 tokens and why.
section: apis
---

# Flows for generating Auth0 Management APIv2 Tokens

Recently we changed the process to get a Management APIv2 Token. This article explains what changed, why this was done and how you can work around it (not recommended).

## What changed and why

### The User Experience

Until recently you could generate a Management APIv2 Token directly from the Management API explorer. You selected the scopes, according to the endpoint you wanted to invoke, and got a token from that same page.

![Old Token Generator](/media/articles/api/tokens/old-token-generator.png)

That way was very easy but it was also __very insecure__. So we changed it.

The new way uses the OAuth 2.0 Client Credentials grant. This new flow requires some initial configuration: set up a Non Interactive Client and authorize it to access the Management APIv2.

Once this is done you can get a new token either using the dashboard (if you use the API sporadically) or by configuring a server process (if you need a token frequently) that will get a new token every 24 hours.

#### Why this changed

In order to generate the token, the Management API had access to your __Global Client Secret__ (used to sign the token). This is information that should __not__ be exposed to web browsers.

So we replaced this with the OAuth 2.0 Client Credentials grant. At the moment (once you do the initial configuration) you can either go to the dashboard to get a token, or make a `POST` request to `/oauth/token`.

However, we are looking into ways to make the new flow more intuitive.


### The Validity Period

With the previous flow the tokens never expired. With the new flow all Management APIv2 Tokens __expire after 24 hours__.

#### Why this changed

Having a token that never expires can be very risky, in case an attacher gets hold of it. If the token expires within a few hours the attacker has only a small window to abuse access your protected resources.


## Can I still get a non-expiring token?

Using Auth0 UI, no you cannot. If you need however a work-around to the old way, you can generate a token using [JWT.io](https://jwt.io/).

<div class="alert alert-danger">Long-lived tokens compromise your security. Following this process is <strong>NOT</strong> recommended.</div>

If you are set on generating a non-expiring token, you have the following options:

- Use the [JWT.io Debugger](https://jwt.io/#debugger-io) to manually generate a token. The debugger allows you to edit the __Header__ and __Payload__ content on the right hand side of the screen. The token will automatically be updated on the left hand text area. Note that the debugger supports only `HS256` when editing header and payload.

- Use one of the [JWT.io libraries](https://jwt.io/#libraries-io). For example, the following snippet generates a JWT using [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken):

  ```javascript
  const jwt = require('jsonwebtoken');
  const globalClientSecret = 'MY_GLOBAL_CLIENT_SECRET';

  var token = jwt.sign({
    iss: 'https://${account.namespace}/',
    aud: 'https://${account.namespace}/api/v2/',
    scope: 'read:clients read:client_keys'},
    globalClientSecret,
    { algorithm: 'HS256', expiresIn: '1y'}
  );

  console.log(token);
  ```

  Note the following:
  - The token is singed using `HS256` and the __Global Client Secret__ (you can find this as [Advanced Account Settings](${manage_url}/#/account/advanced)).
  - We want this token in order to call the [Get all clients](/api/management/v2#!/Clients/get_clients) so we only asked for the scopes required by this endpoint: `read:clients read:client_keys`.
  - The token expires in one year (`expiresIn: '1y'`).
