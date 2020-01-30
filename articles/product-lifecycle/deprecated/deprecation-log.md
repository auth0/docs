---
description: List of Auth0 migrations that have already been enabled for all customers
topics:
  - migrations
contentType:
  - reference
useCase:
  - migrate
---
# Deprecation Log

These are deprecations that have already been enabled for all customers.

| Feature | Severity | Grace Period Start | Mandatory Opt-in | 
| -- | -- | -- | -- | 
| [Legacy Lock API](/product-lifecycle/deprecated/references/legacy-lock-api) | Medium | 2017-12-21 | 2018-08-06 | 
| [Account Linking ID Tokens](/product-lifecycle/deprecated/references/account-linking-id-tokens) | Medium | -- | 2018-10-19 |
| [Account Linking for Authorization Callback](/product-lifecycle/deprecated/references/account-linking-auth-callback) | Medium | 2017-01-03 |  2017-03-01 |
| [Vulnerable Password Reset Flow](/product-lifecycle/deprecated/references/vulnerable-password-reset-flow) | 
| [Identity Provider Access Tokens Removed](/product-lifecycle/deprecated/references/idp-access-tokens-removed) | Medium | 2016-07-11 | 2016-08-18 |
| [Email Template Customization](/product-lifecycle/deprecated/references/email-template-customizations) (Cloud Only) | Medium |  2016-07-21 | 2016-08-29 |







## Delete All Users Endpoint Change

| Severity | Effective Date |
| --- | --- | --- | --- |
| Low | 2016-09-13 |

The previous endpoint for deleting all users was `DELETE  /api/v2/users`. This is rather similar to the endpoint to delete _one_ user: [DELETE  /api/v2/users](/api/management/v2#!/Users/delete_users_by_id). To prevent accidental requests to the delete all users endpoint, the url has been changed to `DELETE /api/v2/allusers`. This should ensure that only intentional calls to this endpoint get made.

### Am I affected by the change?

You are affected by the change only if you currently make use of the delete all users endpoint. If so, the only change you need to make is to change the URL as explained above.

## State Parameter required on redirect from rule

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-11-01 |

When a redirect is done from an Auth0 rule, Auth0 takes care of generating and sending a state parameter in HTTP and Auth0 will check for a valid state parameter when flow returns to the /continue endpoint.  The site to which the redirect goes has to capture the value of the state parameter and return it by adding it as a parameter when returning to the /continue endpoint.

This is documented [here](/rules/redirect#what-to-do-after-redirecting)

### Am I affected by the change?

You are effected by the change only if you redirect from rules, and do not yet capture and return (to the /continue end point) the state parameter.

## Patch and Post endpoints no longer accept secret_encoded flag

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-12-06 |

The `jwt_configuration.secret_encoded` configuration is no longer accepted by the PATCH and POST applications endpoints.

In order to further comply with the OIDC specification, Auth0 will no longer generate or accept base64 encoded application secrets for new applications.

Existing applications with encoded secrets stored will remain intact and unchanged, but *new* applications will no longer use base64 encoding. The `secret_encoded` flag is no longer accepted or necessary, as a result.

### Am I affected by the change?

You are affected by this change only if you interact with these endpoints directly.
