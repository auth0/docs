---
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

When we make an End Of Life announcement, we will also initiate a migration to allow customers to prepare for the End Of Life Date. 

Migrations will usually involve replacing the deprecated behavior with substantially comparable functionality (although at times, we may elect to discontinue support for some functionality entirely) and modifying your application's code so that it can continue working with the new behavior. We will publish a migration guide, which will detail any action required and will help you determine the impact on your tenants. To ensure a smooth transition and avoid service disruption, we will also provide instructions on how to opt in to the new behavior prior to the End Of Life Date. 

Whenever possible, we will provide at least a six-month migration window between the End Of Life announcement and the End Of Life Date. This time frame may be accelerated in cases of emergency, such as critical vulnerability remediation, or changes required to comply with applicable law or third-party certification standards. In these cases, Auth0 will provide as much prior notice as is reasonable under the circumstances. See our [Self Service Terms of Service](https://auth0.com/legal/ss-tos) or your Enterprise Subscription Agreement for more information. 

| Deprecated Feature/Behavior | Deprecation Date | End of Life Date | Migration Guide |
| -- | -- | -- | -- |
| [Management API v1](/product-lifecycle/deprecated/references/management-api-v1) | 2016-10-01 | Public Cloud: 2020-07-13 </br> Private Cloud: 2020-11-01| [Management API v1 to v2](/product-lifecycle/migration/guides/management-api-v1-v2)</br> [Breaking changes](/api/management/v2/changes) |
| [Passwordless/start authentication](/product-lifecycle/migration/guides/passwordless-start) | 2020-01-06 | TBD | [Use of /passwordless/start from Confidential Applications](/product-lifecycle/migration/guides/passwordless-start) |
| 


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
      <td>To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3. Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.  See the <a href="/product-lifecycle/migration/guides/migrate-logs-v2-v3">migration guide</a> for more information.</td>
    </tr>
  </tbody>
</table>

If you have any questions, please visit the Migrations section of the [Auth0 Community site](https://community.auth0.com/c/auth0-community/Migrations) or create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
