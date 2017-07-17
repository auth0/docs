---
description: Recommendations on how you can improve your Auth0 Client prior to production deployment
---

# Pre-Deployment Tests: Recommended Fixes

The following tests check to see if you've completed all recommendations (which are optional) for successful deployment to Production.

| Test | Description |
| ---- | ----------- |
| Customer Error Page Configured | Configure a Custom Error Page with your application-specific details and corporate branding |
| Customize Guardian Multifactor Page | If you're using Guardian Multifactor Authentication, configure a Custom Hosted Page for Guardian Multifactor with your application details and corporate branding |
| Customize Hosted Login Page | Configure a Custom Hosted Page for Login with your application details and corporate branding |
| Customize Password Reset Page | Configure a Custom Hosted Page for Password Reset with your application details and corporate branding |
| Email Templates Configured | Configure custom email templates with your application specific details and corporate branding |
| Enable MFA for Tenant Administrators | Enable multifactor authentication for tenant administrators |
| Guardian Multifactor or other Multifactor Authentication Providers | Consider multifactor authentication as part of the authentication strategy |
| Redirect Logout URL | Review of the Allowed Redirect Logout URLs for your Clients |
| Use RS256 Instead of HS256 | Set the JSONWebToken Signature Algorithm to RS256 instead of HS256 |