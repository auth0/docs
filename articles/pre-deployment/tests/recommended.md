---
description: Recommendations on how you can improve your Auth0 Application prior to production deployment
topics:
    - pre-deployment
    - pre-deployments-tests
    - tests
    - recommendations
    - production-checks
contentType:
  - reference
useCase:
  - support
---

# Production Checks: Recommended Fixes

The following checks see if you've completed all recommendations (which are optional) for successful deployment to Production.

::: note
See [How to Read Your Results Set](/pre-deployment/how-to-run-test#how-to-read-your-results-set) for additional information on your checks output.
:::

| Check | Description |
| ---- | ----------- |
| [Authorization Extension](/extensions/authorization-extension/v2) | Evaluate the [Authorization Extension if you have authorization requirements](${manage_url}/#/extensions). |
| [Custom Domain](/custom-domains) is configured | Use [custom domains with Universal Login](${manage_url}/#/tenant/custom_domains) for the most seamless and secure experience for your end users. |
| [Custom Error Page](/hosted-pages/custom-error-pages) is configured | [Configure a Custom Error Page](${manage_url}/#/account) with your application-specific details and corporate branding. |
| [Email Templates](/email/custom) are configured | [Configure custom email templates](${manage_url}/#/emails) with your application specific details and corporate branding. |
| [Guardian Multi-factor](/multifactor-authentication) or other Multi-factor Authentication Providers | Consider [multi-factor authentication](${manage_url}/#/guardian) as part of the authentication strategy. |
| [MFA for Tenant Administrators](/tutorials/manage-dashboard-admins) is enabled | [Enable multi-factor authentication](${manage_url}/#/account/admins) for tenant administrators. |
| [Hosted Password Reset Page](/universal-login/password-reset) is customized | [Configure a Custom Hosted Page for Password Reset](${manage_url}/#/password_reset) with your application details and corporate branding. |
| [Redirect Logout URL](/logout#set-the-allowed-logout-urls-at-the-account-level) | Review the [Allowed Redirect Logout URLs](${manage_url}/#/account/advanced) for your Application. |
| Use RS256 Instead of HS256 | Set the JSONWebToken [Signature Algorithm](/apis#signing-algorithms) to RS256 instead of HS256. |
