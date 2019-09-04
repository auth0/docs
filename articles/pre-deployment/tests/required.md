---
description: Fixes you must make to your Auth0 Application prior to production deployment
topics:
    - pre-deployment
    - pre-deployments-tests
    - tests
    - requirements
    - production-checks
contentType:
  - reference
useCase:
  - support
---

# Production Checks: Required Fixes

The following checks see if you've completed all requirements for successful deployment to Production.

::: note
See [How to Read Your Results Set](/pre-deployment/how-to-run-test#how-to-read-your-results-set) for additional information on your checks output.
:::

| Check | Description |
| ---- | ----------- |
| [Allow ID Tokens for Management API v2 Authentication](/migrations/guides/calling-api-with-idtokens) is disabled | The capabilities for using ID Tokens to authorize some of the Users and Device Credentials endpoints of the Management API are being deprecated. After completing migration to Access Tokens, make sure the [`Allow ID Tokens for Management API v2 Authentication` toggle is turned off](${manage_url}/#/tenant/advanced). If you can't see this setting, then your tenant was created after this feature was deprecated, so it is already disabled by default. |
| [Allowed Callback URLs](/protocols/oauth2/redirect-users) are not Localhost | Validates the [Application Allowed Callback URLs do not point to localhost](${manage_url}/#/applications), 127.0.0.1, and so on. |
| [Allowed Origins (CORS)](/cross-origin-authentication) is not Localhost | Validates that the [Location URL for the page does not point to localhost](${manage_url}/#/applications). |
| [Allowed Web Origins are not Localhost](/dashboard/reference/settings-application) | Validates that the [Allowed Web Origins URLs do not point to localhost](${manage_url}/#/applications). |
| [Email Provider](/email/providers) is configured | Verifies that the [custom email provider has been configured](${manage_url}/#/emails/provider). |
| [SMS Provider](/multifactor-authentication/administrator/twilio-configuration) is configured (Dependency: MFA is configured) | Ensures that [Twilio SMS is configured](${manage_url}/#/mfa) if you're using MFA with SMS. |
| [Legacy Lock Migration](/libraries/lock/v11/migration-guide#disabling-legacy-lock-api) is disabled | The `/usernamepassword/login` and `/ssodata` endpoints will be removed from service on July 16th, 2018. These are used by Lock.js v8, v9, v10, and auth0.js v6, v7 and v8. After completing the migration to the latest versions, make sure the [`Legacy Lock Migration` toggle is turned off](${manage_url}/#/account/advanced). |
| [Legacy User Profile](/guides/migration-legacy-flows#user-profiles) is disabled | The legacy authentication flows that allow ID Tokens and the `/userinfo` endpoint to include the complete user profile are being deprecated. After completing the migration to the new OIDC-conformant APIs, make sure the [`Legacy User Profile` toggle is turned off](${manage_url}/#/account/advanced). |
| [Social Connections](/connections/social/devkeys) are not using Auth0 Developer Keys | Verifies that [Social Connections are not using the default Auth0 developer keys](${manage_url}/#/connections/social). |
| Support Email is configured | Ensures the [Support Email is configured](${manage_url}/#/account) in Tenant Settings. |
| Support URL is configured | Ensures the [Support URL is configured](${manage_url}/#/account) in Tenant Settings. |
| Tenant Environment Tag is configured | Ensures the [tenant environment tag is set](${env.DOMAIN_URL_SUPPORT}/tenants/public) appropriately to Production, Staging, or Development. |
