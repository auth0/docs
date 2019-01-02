---
title: Using resource owner password from the server side
description: How to use Resource Owner Password Grant from the server side together with anomaly detection.
toc: true
topics:
  - api-authentication
  - oidc
  - resource-owner-password
contentType: tutorial
useCase:
  - secure-api
  - call-api
---

# Using Resource Owner Password from Server side

<%= include('../../_includes/_pipeline2') %>

Server-side applications can use the [Resource Owner Password Grant](/api-auth/grant/password) to access an API. The flow typically involves prompting the user for username and password as credentials which your server will submit to Auth0 to get an Access Token. When using this flow from server side, some anomaly detection features might fail because of the particularities of this scenario. This document details how to use [Resource Owner Password Grant](/api-auth/grant/password) flow from server side preventing some common issues.

## Prerequisites

Before you continue, make sure to have [brute force protection](/anomaly-detection/guides/enable-disable-brute-force-protection) enabled from your dashboard.

## The flow

1. Your server prompts the user for credentials (such as username and password). This could be achieved in many different ways, for example via a browser UI or providing an API.

2. The user enters credentials and the client-side application submits them to a backend server under your control.

3. Your server submits the credentials to Auth0 using the [Resource Owner Password Grant](/api-auth/grant/password) flow.

4. Auth0 validates the credentials and returns an Access Token. As part of the validation process Auth0 might also execute [anomaly-detection verifications](/anomaly-detection) and perform appropriate actions if an anomaly is detected.

## Brute-force protection and server-side APIs

Brute-force protection relies on having the original user's IP. When calling the API from your server, Auth0 treats the IP of your server as the IP of the end user, and uses it as input for the anomaly-detection functionality, in particular, for brute-force protection. This situation could potentially trigger false positives into the brute-force protection shields, causing it to block users or trigger warnings for legitimate requests.

To prevent this, you may send the end-user's IP address to Auth0 along with the credentials and configure the application to trust the provided IP. Because of security considerations, this configuration is only possible for Authenticated applications (such as those with authentication based on a client secret).

::: warning
<strong>Warning!</strong> Authenticated applications must only be used from protected resources, typically server-side. Do not use them from native applications or SPAs, as they are not capable of storing secrets.
:::


### Configuring the Auth0 Application to receive and trust the IP sent by your server

1. Navigate to your [dashboard](${manage_url}) and configure a regular web application or machine to machine application using this [tutorial](/applications#how-to-configure-an-application).

2. Choose a __Token Endpoint Authentication Method__ other than `None` under the [Settings](/applications#application-settings) section.

![Token Endpoint Authentication Method](/media/articles/api-auth/client-auth-method.png)

::: warning
Due to security considerations, the configuration stated on Step 3 will not be available for Non-Authenticated applications.
:::

3. Scroll to the bottom and click _Show Advanced Settings_.

4. Switch on __Trust Token Endpoint IP Header__ under the _OAuth_ tab to configure the application to trust the IP sent from your server.

![Enabling Auth0-Forwarded-For](/media/articles/api-auth/enabling-auth0-forwarded-for.png)

### Sending the end-user IP from your server

To send the end-user IP from your server, include a `auth0-forwarded-for` header with the value of the end-user IP address. If the `auth0-forwarded-for` header is marked as trusted, as explained above, Auth0 will use it as the source IP for [brute-force protection](/anomaly-detection). It is important to make sure the provided IP address really belongs to your end user. 

When using the resource owner password grant from your webserver with brute-force protection enabled, you could specify a whitelist of IPs that will not be considered when triggering brute-force protection. Both the `auth0-forwarded-for` IP address and the IP address of the proxy server will be taken into account for IP address whitelists. 


::: warning
<strong>Warning!</strong> Trusting headers like the <code>x-forwarded-for</code> (or, in general, data from application) as source for the end-user IP can be a big risk. This should not be done unless you know you can trust that header, since it is easy to spoof and makes possible to bypass the anomaly-detection validation.
</div>
:::

::: note
Both the IP address passed as part of the `auth0-forwarded-for` header, and the IP address of the request itself, will be matched against the configured whitelist for brute-force protection. 
The IP address in the header will only be used if it is marked as trusted for the connections.
:::

### Example

```javascript
var request = require("request");

app.post('/api/auth', function(req, res, next) {
  var options = {
    method: 'POST',
    url: 'https://${account.namespace}/oauth/token',
    headers: {
      'content-type': 'application/json',
      'auth0-forwarded-for': req.ip // End user ip
    },
    body: {
      grant_type: 'password',
      username: 'USERNAME',
      password: 'PASSWORD',
      audience: 'API_IDENTIFIER',
      scope: 'SCOPE',
      client_id: '${account.clientId}',
      client_secret: 'YOUR_CLIENT_SECRET' // Client is authenticated
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) return next(error);

    // ...
  });
});
```
