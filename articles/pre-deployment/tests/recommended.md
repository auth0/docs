---
description: Recommendations on how you can improve your Auth0 Client prior to production deployment
---

# Pre-Deployment Tests: Recommended Fixes

The following tests check to see if you've completed all recommendations (which are optional) for successful deployment to Production.

::: note
See [How to Read Your Results Set](/pre-deployment/how-to-run-test#how-to-read-your-results-set) for additional information on your testing output.
:::

| Test | Description |
| ---- | ----------- |
| [Customer Error Page](/hosted-pages/custom-error-pages) Configured | [Configure a Custom Error Page](${manage_url}/#/account) with your application-specific details and corporate branding |
| Customize [Guardian Multifactor Page](/hosted-pages/guardian) | If you're using Guardian Multifactor Authentication, [configure a Custom Hosted Page for Guardian Multifactor](${manage_url}/#/guardian_mfa_page) with your application details and corporate branding |
| Customize [Hosted Login Page](/hosted-pages/login) | [Configure a Custom Hosted Page for Login](${manage_url}/#/login_page) with your application details and corporate branding |
| Customize [Password Reset Page](/hosted-pages/password-reset) | [Configure a Custom Hosted Page for Password Reset](${manage_url}/#/password_reset) with your application details and corporate branding |
| [Email Templates](/email/custom) Configured | [Configure custom email templates](${manage_url}/#/emails) with your application specific details and corporate branding |
| Enable [MFA for Domain Administrators](/tutorials/manage-dashboard-admins) | [Enable multifactor authentication](${manage_url}/#/account/admins) for domain administrators |
| [Guardian Multifactor](/multifactor-authentication) or other Multifactor Authentication Providers | Consider [multifactor authentication](${manage_url}/#/guardian) as part of the authentication strategy |
| [Redirect Logout URL](/logout#set-the-allowed-logout-urls-at-the-account-level) | Review the [Allowed Redirect Logout URLs](${manage_url}/#/account/advanced) for your Clients |
| Use RS256 Instead of HS256 | Set the JSONWebToken [Signature Algorithm](/apis#signing-algorithms) to RS256 instead of HS256 |