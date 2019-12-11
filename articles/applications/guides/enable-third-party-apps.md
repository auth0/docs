---
title: Enable Third-Party Applications
description: Learn how to enable third-party applications.
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

Applications can be classified as either first-party or third-party, which refers to the ownership of the application. The main difference relates to who has administrative access to your Auth0 domain.

- **First-party applications** are those controlled by the same organization or person who owns the Auth0 domain. For example, let's say you created both a Contoso API and an application that logs into `contoso.com` and consumes the Contoso API. You would register both the API and application under the same Auth0 domain, and the application would be a first-party application. By default, all applications created via the [Auth0 Dashboard](${manage_url}/#/applications) are first-party applications.

- **Third-party applications** are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to securely access protected resources behind your API. An example of this is with Facebook, let's say you created an application to get a client ID and secret to integrate with your service. That application is considered third-party because it is not owned by Facebook but a third-party that wants to integrate with Facebook APIs and services. Third-party applications must be created through the [Auth0 Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.

  Third-party applications have the following unique characteristics:

  - **User Consent**: You must require user consent when consuming APIs because anyone can create an application. Requiring the user to provide consent improves security.

  - **ID Tokens**: [ID Tokens](/tokens/id-tokens) generated for third-party applications hold only minimum user profile information.

  - **Connections**: You can only use tenant-level connections or *domain connections*. For more informations, see [Enable Third-party Applications](/applications/guides/enable-third-party-apps).
  
To enable third-party applications for your tenant:

1. [Promote the connections you will use with third-party applications to domain level](/api/management/guides/connections/promote-connection-domain-level) in Auth0.

    Third-party applications can only authenticate users from [connections](/connections) flagged as domain-level connections. Domain-level connections can be enabled for selected first-party applications while also being open to all third-party application users for authentication.
    
    ::: note 
    You should flag first-party and third-party applications. First-party applications can be configured in [Dashboard > Applications](${manage_url}/#/applications). Third-party applications must be created using the Auth0 Management API and have the `is_first_party` attribute set to `false`.
    :::

2. Update your application's login page (if you use [Lock](/libraries/lock/v11) in the [Hosted Login Page](/hosted-pages/login), you must also:

  - Upgrade to Lock version 11 or later
  - Set the `__useTenantInfo: config.isThirdPartyClient` flag when instantiating Lock
  - *For [Private Cloud](/private-cloud) users only*: Set the [`configurationBaseUrl` option](https://github.com/auth0/lock#other-options) to `https://{config.auth0Domain}/` when instantiating Lock

## Access Token `current_user_*` scopes 

Neither first- nor third-party applications can use [ID Tokens](/tokens/id-tokens) to invoke [Management API](/api/management/v2) endpoints. Instead, they should get [Access Tokens](/api/management/v2/tokens) with the following `current_user_*` scopes required by each endpoint:

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
* [Auth0 Application Types](/applications/concepts/app-types-auth0)
* [Application Types: Confidential vs. Public](/applications/concepts/app-types-confidential-public)
* [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
