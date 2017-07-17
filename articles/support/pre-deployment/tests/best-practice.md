---
description: Checks to ensure that your Clients comply with Auth0 best practices
---

# Pre-Deployment Tests: Best Practices

The following checks cannot be automated, so we recommend manually checking these areas prior to deployment to Production.

| Check | Description |
| ---- | ----------- |
| Tenants and Administrators | Review all tenants and tenant administrators and ensure that they are correct. Decommission tenants that are no longer in use. Ensure that tenant administrators are limited to the necessary users. |
| SSO Timeout Values | Review the default SSO cookie timeout value and ensure it aligns with your requirements. |
| Verify Client Ids in App Code | Within your application code ensure that the Client Ids align with their Auth0 Client configuration. |
| Restrict Delegation | It is recommended that Allowed Apps and APIs are set to the current Client Id if delegation is not in use. |
| Whitelist Auth0 Public IPs | If you are connecting to internal or firewalled services from within Rules, Hooks or custom databases ensure Auth0 IPs are whitelisted. |
| Anomaly Detection | It is recommended that you review Auth0 Anomaly Detection capability and configuration. |
| Externalize Configuration Parameters | When developing Rules, Hooks or custom database connections it is best practice that credentials, connection strings, API keys, etc are externalized to configuration parameters instead of hard coded in the rule. |