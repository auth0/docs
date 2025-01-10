---
title: Enable Third-Party Applications
description: Learn how to enable third-party applications for your tenant.
topics:
  - applications
  - application-types
  - third-party-applications
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Enable Third-Party Applications
  
You can enable third-party applications for your tenant. See [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party) for details on the differences between the two types of applications. 

1. [Update your application's ownership to third-party](/api/management/guides/applications/update-ownership) in Auth0.

    By default, applications registered in Auth0 are first-party applications. If you want your application to be a third-party application, you must update its ownership.

2. [Promote the connections you will use with third-party applications to domain level](/api/management/guides/connections/promote-connection-domain-level) in Auth0.

    Third-party applications can only authenticate users from [connections](/connections) flagged as domain-level connections. Domain-level connections can be enabled for selected first-party applications while also being open to all third-party application users for authentication.
    
3. Update your application's login page. If you use [Lock](/libraries/lock/v11) in the [Universal Login Page](/universal-login/classic), you must also:

  - Upgrade to Lock version 11 or later
  - Set the `__useTenantInfo: config.isThirdPartyClient` flag when instantiating Lock
  - *For [Private Cloud](/private-cloud) users only*: Set the [`configurationBaseUrl` option](https://auth0.com/docs/libraries/lock/v11/configuration#configurationbaseurl-string-) to `https://{config.auth0Domain}/` when instantiating Lock

## Access Token `current_user_*` scopes 

Neither first- nor third-party applications can use [ID Tokens](/tokens/concepts/id-tokens) to invoke [Management API](/api/management/v2) endpoints. Instead, they should get [Access Tokens](/api/management/v2/tokens) with the following `current_user_*` scopes required by each endpoint:

| Scope | Endpoint |
| - | - |
| `read:current_user` | [List or search users](/api/management/v2#!/Users/get_users) |
|  | [Get a user](/api/management/v2#!/Users/get_users_by_id) |
|  | [Get user MFA enrollments](/api/management/v2#!/Users/get_enrollments) |
| `update:current_user_metadata` | [Update a user](/api/management/v2#!/Users/patch_users_by_id) |
|  | [Delete a user's multi-factor provider](/api/management/v2#!/Users/delete_multifactor_by_provider) |
| `create:current_user_device_credentials` | [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials) |
| `delete:current_user_device_credentials` | [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) |
| `update:current_user_identities` | [Link a user account](/api/management/v2#!/Users/post_identities) |
|  | [Unlink a user identity](/api/management/v2#!/Users/delete_user_identity_by_user_id) |

## Sample script

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

## Keep reading
* [View Application Ownership](/api/management/guides/applications/view-ownership)
* [Applications](/applications)
* [Confidential and Public Applications](/applications/concepts/app-types-confidential-public)
* [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
* [User consent and third-party applications](/api-auth/user-consent)
