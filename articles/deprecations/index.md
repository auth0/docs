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

<table class="table">
  <thead>
    <tr>
      <th style="width: 156px;">Feature</th>
      <th style="width: 100px;">Deprecated</th>
      <th style="width: 233px;">Removal Date</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/users/search/v3/migrate-search-v2-v3">User Search v2</a></td>
      <td>6 June 2018</td>
      <td>30 June 2019</td>
      <td>User Search v2 is being deprecated and you may be required to take action before June 30, 2019. A <a href="/users/search/v3/migrate-search-v2-v3">migration guide</a> is available to walk you through the steps required. Notifications have been and will continue to be sent to customers that need to complete this migration.<br>Useful Resources:<br>
        <a href="/users/search/v3">User Search v3</a><br>
        <a href="/users/search/v3/query-syntax">User Search v3 - Query Syntax</a><br>
        <a href="/best-practices/search-best-practices">User Search Best Practices</a><br>
        <a href="/users/search/v3/migrate-search-v2-v3">User Search v2 to v3 Migration Guide</a><br>
      </td>
    </tr>
    <tr>
      <td><a href="/logs/migrate-logs-v2-v3">Tenant Logs Search v2</a></td>
      <td>21 May 2019</td>
      <td>
        <b>Free</b>: 15 June 2019<br>
        <b>Developer</b>: 20 August 2019<br>
        <b>Developer Pro</b>: 20 August 2019<br>
        <b>Enterprise</b>: 4 November 2019
      </td>
      <td>To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3. Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.  See the <a href="/logs/migrate-logs-v2-v3">migration guide</a> for more information.</td>
    </tr>
    <tr>
      <td><a href="/migrations/guides/extensibility-node8">Node.js v4 Extensibility Runtime</a></td>
      <td>17 April 2019</td>
      <td>30 June 2019</td>
      <td>
        The Webtask engine powering Auth0 extensibility points currently utilizes Node 4. Beginning <strong>30 April 2018</strong>, <a href="https://github.com/nodejs/Release#release-schedule">Node.js v4 will no longer be under long-term support (LTS)</a>. This means that critical security fixes will no longer be back-ported to this version. As such, Auth0 will be migrating the Webtask runtime from Node.js v4 to Node.js v8.<br><br>On <strong>17 April 2018</strong> we will make the Node 8 runtime available for extensibility to all public cloud customers. You will be provided a migration switch that allows you to control your environment's migration to the new runtime environment.<br><br>For more information on this migration and the steps you should follow to upgrade your implementation, see <a href="/migrations/guides/extensibility-node8">Migration Guide: Extensibility and Node.js v8</a>.
      </td>
    </tr>
  </tbody>
</table>

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
