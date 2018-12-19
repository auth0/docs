---
title: Enabling Third-party Applications
description: Read about the requirements to set up a third party application
toc: true
topics:
  - applications
  - application-types
  - third-party applications
contentType: reference
useCase:
  - build-an-app
---

# Enabling third-party applications

To enable [third-party applications](/application-types#third-party-applications) for your Tenant you must:

- update your application's login page (if you use [Lock](/libraries/lock/v11))
- promote the connections you will use with your third-party applications to **domain connections**

## Update the login page

To use the Auth0's [Universal Login](/hosted-pages/login) with third-party Applications, you must:

- use at least version `10.7.x` of Lock
- set `__useTenantInfo: config.isThirdPartyClient` when instantiating Lock
- [PSaaS Appliance](/appliance) users must use `https://{config.auth0Domain}/` as the value for [the `configurationBaseUrl` option](https://github.com/auth0/lock#other-options) when instantiating Lock

Sample script:

```html
<script src="https://cdn.auth0.com/js/lock/10.7/lock.min.js"></script>
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

## Promote connections

Third-party applications can only authenticate users from connections flagged as **Domain Connections**. These connections will be open for any third-party application to allow users to authenticate and can still also be enabled for selected first party (standard) applications.

You can promote a connection to domain level using the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id).

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

Where:
- `API2_ACCESS_TOKEN`: [Access Tokens for the Management API](/api/management/v2/tokens) with the scope `update:connections`
- `CONNECTION_ID`: Τhe Id of the connection to be promoted

