---
description: Fixes you must make to your Auth0 Client prior to production deployment
---

# Pre-Deployment Tests: Required Fixes

The following tests check to see if you've completed all requirements for successful deployment to Production.

| Test | Description |
| ---- | ----------- |
| Allowed Callback Urls Not Localhost | Validates the Client Allowed Callback URLs do not point to localhost, 127.0.0.1, etc |
| Configure Guardian SMS Provider (Dependency: Guardian is Configured) | Ensures that Twilio SMS is configured if you're using Guardian MFA |
| Configure Tenant Environment Tag | Ensures the tenant environment tag is set appropriately to Production, Staging or Development |
| Email Provider Configured | Verifies that the custom email provider has been configured |
| Social Connections Auth0 Dev Keys | Verify that Social Connections are not using the default Auth0 developer keys |
| Support Email is Configured | Ensures the Support Email is configured in Tenant Settings |
| Support URL is Configured | Ensures the Support URL is configured in Tenant Settings |