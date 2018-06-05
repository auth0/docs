---
description: Checks to ensure that your Applications comply with Auth0 best practices
tags:
    - pre-deployment
    - pre-deployments-tests
    - tests
    - best-practices
---

# Pre-Deployment Tests: Best Practices

The following checks cannot be automated, so we recommend manually checking these areas prior to deployment to Production.

| Check | Description |
| ---- | ----------- |
| [Anomaly Detection](/anomaly-detection) | Review your account's [Anomaly Detection](${manage_url}/#/anomaly) capability and configuration |
| Externalize [Configuration Parameters](/connections/database/mysql#4-add-configuration-parameters) | [Externalize, instead of hard code, all configuration parameters](${manage_url}/#/connections/database), such as credentials, connection strings, API keys, and so on, when developing Rules, Hooks, or custom database connections |
| Restrict Delegation | If not using Delegation, set the Allowed Apps and APIs field of your Application Settings to the current Client ID |
| SSO Timeout Values | Review the default [SSO cookie timeout values](${manage_url}/#/account/advanced) and ensure it aligns with your requirements |
| Tenants and Administrators | Review all tenants and tenant administrators to ensure they are correct. Decommission tenants that are no longer in use. Ensure that tenant administrators are limited to the necessary users. |
| Verify Client IDs in App Code | Ensure that the Client IDs in your application code match those with their Auth0 Application configurations |
| Whitelist Auth0 Public IPs | Whitelist Auth0 IPs if you're connecting to internal services or services behind a firewall when using Rules, Hooks, or custom databases. You can get a list of IP addresses in the tool tip when configuring any of these items |