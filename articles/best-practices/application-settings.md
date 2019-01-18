---
description: Recommended application settings in Auth0.
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

Here are some best practices for configuring [applications](/applications).

## Check the Client ID

Confirm your application code uses the correct Client ID. You can find the Client ID in your [application's settings](${manage_url}/#/applications) on the Auth0 Dashboard.

## Correct application type

Make sure the correct [application type](/applications/application-types) is set in your application settings. Setting the correct application type helps Auth0 check for certain security risks.

## Flag third-party applications

You should flag [first-party and third-party applications](/applications/application-types#first-vs-third-party-applications). First-party applications can be configured from the [Applications page](${manage_url}/#/applications) of the Auth0 dashboard. Third-party applications must be created using the Auth0 Management API and have the `is_first_party` attribute set to false.

## Set JWT token expiration

Set the [ID Token expiration time](/tokens/id-token#token-lifetime) in your Application Settings. By default ID Tokens expire after 10 hours.

Once issued, [an ID Token cannot be revoked](/tokens/id-token#revoke-access). So use a short expiration time and renew the session, if the user remains active.

## Do not use wildcards or localhost in callbacks or origins fields

Do not use wildcard or localhost URLs in your application callbacks or allowed origins fields. Using redirect URLs with wildcards [can make your application vulnerable to attacks](https://www.owasp.org/index.php/Unvalidated_Redirects_and_Forwards_Cheat_Sheet).

## Register logout redirect URLs

To redirect users after [logout](/logout), register the redirect URL in your tenant or application settings. Auth0 only redirects to whitelisted URLs after logout.

You should register redirect URLs in your tenant settings. If you need different redirects for each application, you can whitelist the URLs in your application settings.

## Advanced application settings

### RS256 signature algorithm

Make sure that RS256 is the signature method for signing JSON Web Tokens (JWT). The JWT signature method can be found under [Applications > Settings > Advanced Settings > OAuth](${manage_url}/#/applications) on the dashboard.
 
[Auth0 Blog: Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/)

### OIDC conformant

If your application is not [OIDC conformant](/api-auth/intro), review the [migration steps required](/api-auth/tutorials/adoption). After review, migrate your applications to be OIDC conformant.

You can test if an application is OIDC conformant by turning on the OIDC conformant toggle and testing your application.

::: note
This setting only applies to older tenants, created before Dec 27th 2017. Newer tenants, created after that date, can only use OIDC conformant behavior.
:::

## Restrict Delegation

If you are not using delegation, provide your application's Client ID in the **Allowed Apps / APIs** field to restrict delegation requests. You can find this field in [Applications > Settings > Advanced Settings > OAuth](${manage_url}/#/applications) on the dashboard.

<%= include('../_includes/_deprecate-delegation') %>

### Remove unnecessary grant types

Go to [Applications > Settings > Advanced Settings > Grant Types](${manage_url}/#/applications) and turn off any unneeded grant type for your application. This prevents someone from issuing authorization requests for unauthorized grant types.

For example, you should turn off the authorization code grant type for a single page application, because it is not appropriate for a public client.
