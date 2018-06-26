---
description: Fixes you must make to your Auth0 Application prior to production deployment
topics:
    - pre-deployment
    - pre-deployments-tests
    - tests
    - requirements
    - production-checks
contentType: reference
---

# Production Checks: Required Fixes

The following tests check to see if you've completed all requirements for successful deployment to Production.

::: note
See [How to Read Your Results Set](/pre-deployment/how-to-run-test#how-to-read-your-results-set) for additional information on your testing output.
:::

| Test | Description |
| ---- | ----------- |
| [Allowed Callback URLs](tutorials/redirecting-users) are not Localhost | Validates the [Application Allowed Callback URLs do not point to localhost](${manage_url}/#/applications), 127.0.0.1, and so on |
| [Guardian SMS Provider](/multifactor-authentication/administrator/twilio-configuration) is configured (Dependency: Guardian is configured) | Ensures that [Twilio SMS is configured](${manage_url}/#/guardian) if you're using Guardian MFA |
| Tenant Environment Tag is configured | Ensures the [tenant environment tag is set](${env.DOMAIN_URL_SUPPORT}/tenants/public) appropriately to Production, Staging or Development |
| [Email Provider](/email/providers) is configured | Verifies that the [custom email provider has been configured](${manage_url}/#/emails/provider) |
| [Social Connections](/connections/social/devkeys) are not using Auth0 Developer Keys | Verifies that [Social Connections are not using the default Auth0 developer keys](${manage_url}/#/connections/social) |
| Support Email is configured | Ensures the [Support Email is configured](${manage_url}/#/account) in Tenant Settings |
| Support URL is configured | Ensures the [Support URL is configured](${manage_url}/#/account) in Tenant Settings |
