---
description: Learn how to use Resource Owner Password Grant (ROPG) from the server side together with anomaly detection.
toc: true
topics:
  - api-authentication
  - oidc
  - resource-owner-password
  - anomaly-detection
contentType: tutorial
useCase:
  - secure-api
  - call-api
---

# Use Resource Owner Password Grant From the Server Side

<%= include('../_includes/_ropg-warning') %>

Server-side applications can use the [Resource Owner Password Grant](/api-auth/grant/password) to access an API. The flow typically involves prompting the user for username and password as credentials which your server will submit to Auth0 to get an <dfn data-key="access-token">Access Token</dfn>. When using this flow from server side, some anomaly detection features might fail because of the particularities of this scenario. This document details how to use [Resource Owner Password Grant](/api-auth/grant/password) flow from server side preventing some common issues.

## Prerequisites

Before you continue, make sure to have [brute force protection](/anomaly-detection/guides/enable-disable-brute-force-protection) enabled from your dashboard.

## How it works

1. Your server prompts the user for credentials (such as username and password). This could be achieved in many different ways, for example via a browser UI or providing an API.

2. The user enters credentials and the client-side application submits them to a backend server under your control.

3. Your server submits the credentials to Auth0 using the [Resource Owner Password Grant](/api-auth/grant/password) flow.

4. Auth0 validates the credentials and returns an Access Token. As part of the validation process Auth0 might also execute [anomaly-detection verifications](/anomaly-detection) and perform appropriate actions if an anomaly is detected.

## Brute-force protection and server-side APIs

Brute-force protection relies on having the original user's IP. When calling the API from your server, Auth0 treats the IP of your server as the IP of the end user, and uses it as input for the anomaly-detection functionality, in particular, for brute-force protection. This situation could potentially trigger false positives into the brute-force protection shields, causing it to block users or trigger warnings for legitimate requests.

To prevent this, you may send the end-user's IP address to Auth0 along with the credentials and configure the application to trust the provided IP. Because of security considerations, this configuration is only possible for Authenticated applications (such as those with authentication based on a client secret).

::: warning
Authenticated applications must only be used from protected resources, typically server-side. Do not use them from native applications or SPAs, as they are not capable of storing secrets.
:::

### Configure the Auth0 Application to receive and trust the IP sent by your server

1. Navigate to your [dashboard](${manage_url}) and [configure a regular web application or machine-to-machine application](/applications).

2. Choose a __Token Endpoint Authentication Method__ other than `None` under the [Settings](/dashboard/reference/settings-application) section.

    ![Token Endpoint Authentication Method](/media/articles/api-auth/client-auth-method.png)

3. Scroll to the bottom and click _Show Advanced Settings_.

    ::: warning
    Due to security considerations, the configuration stated on Step 3 will not be available for Non-Authenticated applications.
    :::

4. Enable __Trust Token Endpoint IP Header__ under the _OAuth_ tab to configure the application to trust the IP sent from your server.

    ![Enabling Auth0-Forwarded-For](/media/articles/api-auth/enabling-auth0-forwarded-for.png)

### Send the end-user IP from your server

If your application is configured to send the `auth0-forwarded-for` header and it authenticates (sends `client_secret` in the request):

- Only the IP in the `auth0-forwarded-for` header is checked against the brute-force protection whitelist.
- The corollary to the above is the proxy IP is ignored by brute-force protection.  Don't add the proxy IP to the whitelist (if you did it would have no effect).
- If specific clients that use the proxy should be whitelisted, add them to the whitelist and they will not be subject to brute-force protection.  

If the application is **not** configured to use the `auth0-forwarded-for` header *or* if it does not authenticate (send `client_secret` in the request):

- The originating IP of each request is checked against the brute-force protection whitelist.
- Whitelisting the IP proxy exempts **all** traffic passing through the proxy from brute-force protection (this is probably not what you want).

1. To send the end-user IP from your server, include a `auth0-forwarded-for` header with the value of the end-user IP address. 

    If the `auth0-forwarded-for` header is marked as trusted, as explained above, Auth0 will use it as the source IP for [brute-force protection](/anomaly-detection). It is important to make sure the provided IP address really belongs to your end user. 

2. When using the resource owner password grant from your webserver with brute-force protection enabled, specify a whitelist of IPs that will not be considered when triggering brute-force protection. Both the `auth0-forwarded-for` IP address and the IP address of the proxy server will be taken into account for IP address whitelists. 

::: warning
Trusting headers like the `x-forwarded-for` (or, in general, data from application) as source for the end user IP can be a big risk. This should not be done unless you know you can trust that header, since it is easy to spoof and makes possible to bypass the anomaly detection validation.
:::

### Example

```javascript
var request = require("request");

app.post('/api/auth', function(req, res, next) {
  var options = {
    method: 'POST',
    url: 'https://${account.namespace}/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'auth0-forwarded-for': req.ip // End user ip
    },
    form: {
      grant_type: 'password',
      username: 'USERNAME',
      password: 'PASSWORD',
      audience: 'YOUR_API_IDENTIFIER',
      scope: 'SCOPE',
      client_id: '${account.clientId}',
      client_secret: 'YOUR_CLIENT_SECRET' // Client is authenticated
    }
  };

  request(options, function (error, response, body) {
    if (error) return next(error);

    // ...
  });
});
```

### Validate with logs

If your settings are working correctly, you will see the following in the logs:

```text
type:  sepft
...
ip:  <ip from auth0-forwarded-for header>
client_ip:  <ip of actual client/proxy>
...
```