---
title: Enable Third-Party Applications
description: Learn how to enable a third-party application.
toc: true
topics:
  - applications
  - application-types
  - third-party-applications
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Enable Third-party Applications

This guide will show you how to enable [third-party applications](/applications/concepts/app-types-first-third-party#third-party-applications) for your tenant. 

## Steps 

To enable third-party applications for your tenant, you will need to:

1. Promote the connections you will use with third-party applications to domain-level connections
2. Update your application's login page (if you use [Lock](/libraries/lock/v11))

## 1. Promote connections to domain-level connections

[Promote the connections you will use with third-party applications to domain level](/api/management/guides/connections/promote-connection-domain-level) in Auth0.

[Third-party applications](/applications/concepts/app-types-first-third-party) can only authenticate users from [connections](/connections) flagged as domain-level connections. Domain-level connections can be enabled for selected first-party applications while also being open to all third-party application users for authentication.

## 2. Update your application's login page (if you use Lock)

If you use Lock in the [Hosted Login Page](/hosted-pages/login), you must also:

- Upgrade to Lock version 10.7.x or later
- Set the `__useTenantInfo: config.isThirdPartyClient` flag when instantiating Lock
- *For [Private Cloud](/private-cloud) users only*: Set the [`configurationBaseUrl` option](https://github.com/auth0/lock#other-options) to `https://{config.auth0Domain}/` when instantiating Lock

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
