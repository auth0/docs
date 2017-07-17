---
description: Checks to ensure that your Clients comply with Auth0 best practices
---

# Pre-Deployment Tests: Best Practices

The following checks cannot be automated, so we recommend manually checking these areas prior to deployment to Production.

| Check | Description |
| ---- | ----------- |
| Anomaly Detection | Review your account's [Anomaly Detection](/anomaly-detection) capability and configuration |
| Externalize Configuration Parameters | [Externalize, instead of hard code, all configuration parameters](/connections/database/mysql#4-add-configuration-parameters), such as credentials, connection strings, API keys, etc, when developing Rules, Hooks, or custom database connections |
| Restrict Delegation | If not using Delegation, set the Allowed Apps and APIs field of your Client Settings to the current Client ID |
| SSO Timeout Values | Review the default SSO cookie timeout value and ensure it aligns with your requirements |
| Tenants and Administrators | Review all tenants and tenant administrators to ensure they are correct. Decommission tenants that are no longer in use. Ensure that tenant administrators are limited to the necessary users. |
| Verify Client Ids in App Code | Ensure that the Client IDs in your application code match those with their Auth0 Client configurations |
| Whitelist Auth0 Public IPs | Whitelist Auth0 IPs if you're connecting to internal services or services behind a firewall when using Rules, Hooks, or custom databases |