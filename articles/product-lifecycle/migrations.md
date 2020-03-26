---
toc: true
title: Migrations
description: View all Deprecations with active Migrations which may impact your tenant.
topics:
  - migrations
contentType:
  - reference
useCase:
  - migrate
---
# Migrations

We are actively migrating customers to new behaviors for all **Deprecations** listed below. Please review these carefully to ensure you've taken any necessary steps to avoid service disruptions. See [Deprecation and End Of Life](/product-lifecycle/deprecation-eol) to learn more about this process.

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
        <strong>Private Cloud</strong>: December 2020 release<br>
      </td>
      <td>Management API v1 will reach its End of Life on July 13, 2020. You may be required to take action before that date to ensure no interruption to your service. A <a href="/migrations/guides/management-api-v1-v2">migration guide</a> is available to walk you through the steps required. Notifications have been and will continue to be sent to customers that need to complete this migration.<br>Useful Resources:<br>
        <a href="/migrations/guides/management-api-v1-v2">Management API v1 to v2 Migration Guide</a><br>
        <a href="/api/management/v2">Management API v2 documentation</a><br>
        <a href="/api/management/v1">Management API v1 documentation</a><br>
        <a href="/api/management/v2/changes">Breaking changes</a><br>
      </td>
  </tr>
  <tr>
      <td><a href="/migrations/guides/passwordless-start">Deprecation of unauthenticated calls to the <code>/passwordless/start</code> endpoint from confidential clients</a></td>
      <td>6 January 2020</td>
      <td>
        TBD
      </td>
      <td>We improved the security of our Passwordless implementation by adding client authentication to the <code>/passwordless/start</code> endpoint.</td>
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
      <td><a href="/migrations/guides/facebook-social-context"><code>context</code> field for Facebook Connection (3rd party deprecation)</a></td>
      <td>30 April 2019</td>
      <td>
        30 July 2019
      </td>
      <td>On April 30th 2019, Facebook deprecated the use of the <a href="https://developers.facebook.com/docs/graph-api/changelog/4-30-2019-endpoint-deprecations">'Social Context’ field</a> for new applications.</td>
    </tr>
    <tr>
      <td><a href="/logs/migrate-logs-v2-v3">Tenant Logs Search v2</a></td>
      <td>21 May 2019</td>
      <td>
        <strong>Free</strong>: 9 July 2019<br>
        <strong>Developer</strong>: 20 August 2019<br>
        <strong>Developer Pro</strong>: 20 August 2019<br>
        <strong>Enterprise</strong>: 4 November 2019
      </td>
      <td>To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3. Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.  See the <a href="/logs/migrate-logs-v2-v3">migration guide</a> for more information.</td>
    </tr>
  </tbody>
</table>

If you have any questions, please visit the Migrations section of the [Auth0 Community site](https://community.auth0.com/c/auth0-community/Migrations) or create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
