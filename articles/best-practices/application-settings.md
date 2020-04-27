---
title: Application Settings Best Practices
description: Learn about recommended application settings in Auth0.
topics:
  - best-practices
  - configuration
  - application
  - settings
contentType:
    - reference
useCase:
  - best-practices
  - application
  - application-settings
---
# Application Settings Best Practices

Here are some best practices for configuring [Application Settings](${manage_url}/#/applications) on the Dashboard.

| Setting | Best Practice |
| - | - |
| Client ID | Confirm your application code uses the correct Client ID. |
| Application Type | Make sure the correct [application type](/applications) is set in your application settings to help Auth0 check for certain security risks. |
| First- and Third-party applications | Flag first-party and third-party applications. Third-party applications must be created using the Auth0 Management API and have the `is_first_party` attribute set to `false`. |
| ID token expiration | Set the [ID Token expiration time](/tokens/id-tokens#token-lifetime). By default ID Tokens expire after 10 hours. Once issued, an [ID Token cannot be revoked](/tokens/guides/revoke-tokens), so instead of longer expiration times, use a short expiration time and renew the session if the user remains active. |
| Wildcards or localhost URLs | Do not use wildcard or localhost URLs in your application <dfn data-key="callback">callbacks</dfn> or allowed origins fields. Using redirect URLs with wildcards [can make your application vulnerable to attacks](https://www.owasp.org/index.php/Unvalidated_Redirects_and_Forwards_Cheat_Sheet). |
| Logout redirect URLs | To redirect users after [logout](/logout), register the redirect URL in your tenant or application settings. Auth0 only redirects to whitelisted URLs after logout. If you need different redirects for each application, you can whitelist the URLs in your application settings. |
| **Advanced Settings**: RS256 signature algorithm | Make sure that RS256 is the signature method for signing <dfn data-key="json-web-token">JSON Web Tokens (JWT)</dfn>. The JWT signature method can be found under [Applications > Settings > Advanced Settings > OAuth](${manage_url}/#/applications). See [Auth0 Blog: Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/). |
| **Advanced Settings**: OIDC conformant (for tenants created before 2017-12-27) | If your application is not [OIDC conformant](/api-auth/intro), [migrate your applications](/api-auth/tutorials/adoption) to be OIDC conformant. Newer tenants can only use OIDC conformant behavior. Test by turning on the OIDC conformant toggle and testing your application. |
| **Advanced Settings**: Restrict delegation | <%= include('../_includes/_deprecate-delegation') %> </br> If you are not using delegation, provide your application's Client ID in the **Allowed Apps / APIs** field to restrict delegation requests. |
| **Advanced Settings**: Grant types | Turn off unneeded grant types for your application to prevent someone from issuing authorization requests for unauthorized grant types. |
