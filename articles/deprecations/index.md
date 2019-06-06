---
toc: true
title: Auth0 Deprecations
description: List of all the deprecations in progress
topics:
  - deprecations
  - migrations
contentType:
  - concept
  - reference
useCase:
  - migrate
---

# Deprecations

In an effort to keep the Auth0 platform stable and secure some features must occasionally be removed from service.

This proccess starts with the feature being **Deprecated**. Our policy provides at least a six month grace period before the **Removal Date**, at which point using the deprecated functionality will result in an error. Depending on the severity of the issue the grace period time frame may be accelerated.

Typcially there will be a replacement for the feature being removed (e.g. new version of an API or SDK, alternative API endpoint, etc.). While we make our best effort to maintain backward compatibility, the replacement will often result in a breaking change or require a migration to a new version. In that case a migration guide will be provided to help ensure you're fully prepared for the.

| Feature | Deprecated | Removal Date | Details |
| - | - | - | - |
| [User Search v2](/users/search/v3/migrate-search-v2-v3)  | 6 June 2018 | 30 June 2019 | User Search v2 is being deprecated and you may be required to take action before June 30, 2019. A [migration guide](/users/search/v3/migrate-search-v2-v3) is available to walk you through the steps required. Notifications have been and will continue to be sent to customers that need to complete this migration.<br>Useful Resources:<br><ul><li>[User Search v3](/users/search/v3)</li><li>[User Search v3 - Query Syntax](/users/search/v3/query-syntax)</li><li>[User Search Best Practices](/best-practices/search-best-practices)</li><li>[User Search v2 to v3 Migration Guide](/users/search/v3/migrate-search-v2-v3)</li></ul>|
| [Tenant Logs Search v2](/logs/migrate-logs-v2-v3) | 21 May 2019 | Removal date is based on plan type: <br> <ul><li><b>Free</b>: 15 June 2019</li><li><b>Developer or Developer Pro</b>: 20 August 2019</li><li><b>Enterprise</b>: 4 November 2019</li></ul> | To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3. Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.  See the [migration guide](/logs/migrate-logs-v2-v3) for more information. |
| Node.js v4 for Webtask Runtime | 17 April 2019 | 30 June 2019 | The Webtask engine powering Auth0 extensibility points currently utilizes Node 4. Beginning **30 April 2018**, [Node.js v4 will no longer be under long-term support (LTS)](https://github.com/nodejs/Release#release-schedule). This means that critical security fixes will no longer be back-ported to this version. As such, Auth0 will be migrating the Webtask runtime from Node.js v4 to Node.js v8.<br>On **17 April 2018** we will make the Node 8 runtime available for extensibility to all public cloud customers. You will be provided a migration switch that allows you to control your environment's migration to the new runtime environment.<br>For more information on this migration and the steps you should follow to upgrade your implementation, see [Migration Guide: Extensibility and Node.js v8](/migrations/guides/extensibility-node8).|

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
