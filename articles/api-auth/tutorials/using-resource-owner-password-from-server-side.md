---
title: Using resource owner password from server side
description: How to use Resource Owner Password Grant from server side together with anomaly detection.
toc: true
---

# Using resource owner password from server side
Server side applications can use the [Resource Owner Password Grant](/api-auth/grant/password) to access an API. The flow typically involves prompting the user for username and password as credentials which your server will submit to Auth0 to get an access token. When using this flow from server side, some anomaly detection features might fail because of the particularities of this scenario. This document details how to use [Resource Owner Password Grant](/api-auth/grant/password) flow from server side preventing some common issues.

## Prerequisites
Before you continue, make sure to have [brute force protection](https://auth0.com/docs/anomaly-detection#brute-force-protection) enabled from your dashboard.

## The flow
1. Your server prompts the user for credentials (i.e. username and password), this could be achieved in many different ways, for example presenting a Browser UI or providing an API.

2. User enters credentials and the client-side application submits them to a backend server under your control.

3. Your server submits the credentials to Auth0 using the [Resource Owner Password Grant](/api-auth/grant/password) flow.

4. Auth0 validates the credentials and returns an access token. As part of the validation process Auth0 might also execute [anomaly detection verifications](https://auth0.com/docs/anomaly-detection) and perform different actions if an anomaly is detected.

## Brute force protection and server side APIs
Brute force protection relies on caller IPs to work, when you call the API from your server Auth0 assumes that the IP of your server
is the IP of the end user and so uses it as input for the anomaly detection system, in particular, for brute force protection.
This situation could potentially trigger false positives into the brute protection shields; causing it to block users or trigger
warnings even for legitimate request.

To solve this issue you must send the end user IP address to Auth0 toguether with the credentials and configure the client to trust the provided IP. Because of security considerations, this configuration is only possible for Authenticated clients (i.e. those that needs authentication based on a client secret).

WARNING: Authenticated client must only be used from protected resources, typically server side, do not use them from native applications or SPAs because they
are not capable of storing secrets.

### Configuring Auth0 Client to receive and trust the IP sent by your server
1. Navigate to your dashboard and configure a Regular web application or Non interactive client following this [tutorial](https://auth0.com/docs/clients#how-to-configure-a-client).

2. Make sure to choose a "Token Endpoint Authentication Method" different from "None" under [Settings](https://auth0.com/docs/clients#client-settings) section.
Important: because of security considerations the configuration stated on Step 3 will not be available for Non-Authenticated clients.

![Token Endpoint Authentication Method](/media/articles/api-auth/client-auth-method.png)

3. Scroll up to the bottom and click "Show Advanced Settings"

4. Switch on "Trust Token Endpoint IP Header" under OAuth tab, to configure the client to trust the IP you will send from your server.

![Enabling Auth Forwarded For](/media/articles/api-auth/enabling-auth0-forwarded-for.png)

### Sending end user IP from your server
To send the end user IP from your server include an `auth0-forwarded-for` header with end user IP address as value. If the IP is valid Auth0 will use it as source IP for brute force protection, because of that it is important to make sure the provided IP address really belongs to your end user.

WARNING: Trusting headers like the `x-forwarded-for` (or, in general, data from client) as source for the end user IP is a big risk and should not be done
unless you know exactly what you are doing since they are easy to spoof and so make possible to by pass the anomaly detection validation.

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
      client_secret: '${account.clientSecret}' // Client is authenticated
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) return next(error);

    // ...
  });
});
```
