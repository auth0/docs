---
title: Enabling Third-Party Applications
description: How to enable a third-party application
toc: true
topics:
  - applications
  - application-types
  - third-party applications
contentType: reference
useCase:
  - build-an-app
---

# Enable third-party applications

To enable [third-party applications](/application-types#third-party-applications) for your tenant, you must:

1. Update your application's login page (if you use [Lock](/libraries/lock/v11))
2. Promote the connections you will use with your third-party applications to **domain connections**

## Step 1: Update the login page

If you use Lock in the [Hosted Login Page](/hosted-pages/login), you must:

- Upgrade to Lock version 10.7.x or later
- Set the `__useTenantInfo: config.isThirdPartyClient` flag when instantiating Lock
- *For [PSaaS Appliance](/appliance) users only*: Set the [`configurationBaseUrl` option](https://github.com/auth0/lock#other-options) to `https://{config.auth0Domain}/` when instantiating Lock

### Sample script:

```html
 <script src="https://cdn.auth0.com/js/lock/11.x.y/lock.min.js"></script>
...
<script>
  // Decode utf8 characters properly
  var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

  var connection = config.connection;
  var prompt = config.prompt;
  var languageDictionary;
  var language;
  if (config.dict && config.dict.signin && config.dict.signin.title) {
    languageDictionary = { title: config.dict.signin.title };
  } else if (typeof config.dict === 'string') {
    language = config.dict;
  }

  var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
    auth: {
      redirectUrl: config.callbackURL,
      responseType: config.callbackOnLocationHash ? 'token' : 'code',
      params: config.internalOptions
    },
    assetsUrl:  config.assetsUrl,
    allowedConnections: connection ? [connection] : null,
    configurationBaseUrl: 'https://' + config.auth0Domain + '/', // for PSaaS only
    rememberLastLogin: !prompt,
    language: language,
    languageDictionary: languageDictionary,
    closable: false,
    __useTenantInfo: config.isThirdPartyClient // required for all Tenants
  });

  lock.show();
</script>
```

## Step 2: Promote connections

Third-party applications can only authenticate users from connections flagged as **Domain Connections**. Domain connections can be enabled for selected first-party applications while also being open to third-party application users for authentication.

Promote a connection to domain level using the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id).

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer API2_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
      "mimeType": "application/json",
      "text" : "{ \"is_domain_connection\": true }"
  }
}
```
| Value | Description |
| - | - |
| `API2_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the scope `update:connections` |
| `CONNECTION_ID` | Τhe ID of the connection to be promoted |
