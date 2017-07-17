---
description: Recommendations on how you can improve your Auth0 Client prior to production deployment
---

# Pre-Deployment Tests: Recommended Fixes

The following tests check to see if you've completed all recommendations (which are optional) for successful deployment to Production.

| Test | Description |
| ---- | ----------- |
| Customer Error Page Configured | It is recommended to configure a Custom Error Page with your application specific details and corporate branding. |
| Customize Guardian Multifactor Page | If you are using Guardian Multifactor Authentication it is recommended to configure a custom Hosted Page for Guardian Multifactor with your application details and corporate branding. |
| Customize Hosted Login Page | It is recommended to configure a custom Hosted Page for Login with your application details and corporate branding. |
| Customize Password Reset Page | It is recommended to configure a custom Hosted Page for Password Reset with your application details and corporate branding. |
| Email Templates Configured | It is recommended to configure custom email templates with your application specific details and corporate branding. |
| Enable MFA for Tenant Administrators | It is recommended that tenant administrators have multifactor authentication enabled. |
| Guardian Multifactor or other Multifactor Authentication Providers | It is recommended that you consider multifactor authentication as part of the authentication strategy. |
| Redirect Logout URL | It is recommended the review of the Allowed Redirect Logout URLs. |
| Use RS256 Instead of HS256 | It is recommended that the JsonWebToken Signature Algorithm is set to RS256 over HS256. |
