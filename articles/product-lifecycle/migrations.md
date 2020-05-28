---
title: Active Migrations
description: View all Deprecations with active Migrations that may impact your tenant.
topics:
  - migrations
contentType:
  - reference
useCase:
  - migrate
---

# Active Migrations

We are actively migrating customers to new behaviors for all <dfn data-key="deprecation">Deprecations</dfn> listed below. Please review these carefully to ensure you've taken any necessary steps to avoid service disruption. To learn more, see [Migration Process](/product-lifecycle/migration-process).

<table class="table">
  <thead>
    <tr>
      <th style="width: 156px;">Feature/Behavior</th>
      <th style="width: 100px;">Deprecated</th>
      <th style="width: 233px;">End Of Life Date</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <td><a href="/migrations/guides/extensibility-node12">Node.js v8 Extensibility Runtime</a></td>
      <td>15 April 2020</td>
      <td>TBA</td>
      <td>
        The Webtask engine powering Auth0 extensibility points currently uses Node 8. Beginning <strong>31 December 2019</strong>, <a href="https://github.com/nodejs/Release#release-schedule">Node.js v8 was no longer under long-term support (LTS)</a>. This means that critical security fixes were no longer back-ported to this version. As such, Auth0 is migrating the Webtask runtime from Node.js v8 to Node.js v12.<br><br>On <strong>15 April 2020</strong>, we made the Node 12 runtime available for extensibility to all public cloud customers. You have been provided a migration switch that allows you to control your environment's migration to the new runtime environment.<br><br>To learn more about this migration and the steps you should follow to upgrade your implementation, see <a href="/migrations/guides/extensibility-node12">Migration Guide: Extensibility and Node.js v12</a>.
      </td>
    </tr>
    <tr>
      <td><a href="/migrations/guides/instagram-deprecation">Instagram Connection Deprecation</a></td>
      <td>5 March 2020</td>
      <td>31 March 2020</td>
      <td>Facebook announced that on March 31th, 2020, they will turn off the Instagram legacy APIs, and they won't provide an alternative to implement Login with Instagram</td>
    </tr>
     <tr>
      <td><a href="/migrations/guides/yahoo-userinfo-updates">Changes in the Yahoo user profile</a></td>
      <td>1 March 2020</td>
      <td>1 March 2020</td>
      <td>Yahoo changed the way to retrieve the user profile and the information included on it.</td>
    </tr>
    <tr>
      <td><a href="/migrations/guides/management-api-v1-v2">Management API v1</a></td>
      <td>October 2016</td>
      <td>
        <strong>Public Cloud</strong>: 13 July 2020<br>
        <strong>Private Cloud</strong>: November 2020 release<br>
      </td>
      <td>Management API v1 will reach its End of Life in the Public Cloud on July 13, 2020. Management API v1 will be included in the Private Cloud until the November 2020 monthly release, which is the first release that will not include Management API v1. You may be required to take action before that date to ensure no interruption to your service. A <a href="/migrations/guides/management-api-v1-v2">migration guide</a> is available to walk you through the required steps. Notifications have been and will continue to be sent to customers that need to complete this migration.<br>Useful Resources:<br>
        <a href="/migrations/guides/management-api-v1-v2">Management API v1 to v2 Migration Guide</a><br>
        <a href="/api/management/v2">Management API v2 documentation</a><br>
        <a href="/api/management/v1">Management API v1 documentation</a><br>
        <a href="/api/management/v2/changes">Breaking changes</a><br>
      </td>
  </tr>
    <tr>
      <td><a href="/migrations/guides/migration-oauthro-oauthtoken-pwdless"><code>/oauth/ro</code> deprecation for Passwordless Connections</a></td>
      <td>8 June 2017</td>
      <td>
        TBD
      </td>
      <td>On June 8th 2017 we deprecated the <code>/oauth/ro</code> endpoint for passwordless connections. You can now implement the same functionality using the <a href="/migrations/guides/migration-oauthro-oauthtoken-pwdless">/oauth/token endpoint</a>.</td>
    </tr>
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
      <td><a href="/logs/guides/migrate-logs-v2-v3">Tenant Logs Search v2</a></td>
      <td>21 May 2019</td>
      <td>
        <strong>Free</strong>: 9 July 2019<br>
        <strong>Developer</strong>: 20 August 2019<br>
        <strong>Developer Pro</strong>: 20 August 2019<br>
        <strong>Enterprise</strong>: 4 November 2019
      </td>
      <td>To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3. Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.  See the <a href="/logs/guides/migrate-logs-v2-v3">migration guide</a> for more information.</td>
    </tr>
  </tbody>
</table>

If you have any questions, please visit the Migrations section of the [Auth0 Community site](https://community.auth0.com/c/auth0-community/Migrations) or create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
