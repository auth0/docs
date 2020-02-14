---
title: Migrations
classes: topic-page
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

Migrations usually involve replacing the deprecated behavior with substantially comparable functionality (although at times, we may elect to discontinue support for some functionality entirely) and modifying your application's code so that it can continue working with the new behavior. We will publish a migration guide, which will detail any action required and will help you determine the impact on your tenants. To ensure a smooth transition and avoid service disruption, we will also provide instructions on how to opt in to the new behavior prior to the End Of Life Date. 

Whenever possible, we will provide at least a six-month migration window between the End Of Life announcement and the End Of Life Date. This time frame may be accelerated in cases of emergency, such as critical vulnerability remediation, or changes required to comply with applicable law or third-party certification standards. In these cases, Auth0 will provide as much prior notice as is reasonable under the circumstances. See our [Self Service Terms of Service](https://auth0.com/legal/ss-tos) or your Enterprise Subscription Agreement for more information. 

| Feature/Behavior | Deprecation Date | End of Life Date | Migration Guide |
| -- | -- | -- | -- |
| [Management API v1](/product-lifecycle/deprecated/management-api-v1) | 2016-10-01 | Public Cloud: 2020-07-13 </br> Private Cloud: 2020-11-01 | [Management API v1 to v2](/product-lifecycle/migration/management-api-v1-v2)</br> [Breaking changes](/api/management/v2/changes) |
| [Passwordless/start authentication](/product-lifecycle/deprecated/passwordless-start) | 2020-01-06 | TBD | [Use of /passwordless/start from Confidential Applications](/product-lifecycle/migration/passwordless-start) |
| [Password and Refresh Token Exchange Rules Using /oauth/token](/product-lifecycle/upgrades/password-refresh-token-exchange-rules) | 2017-02-23 | 2017-06-08 | [Passwordless API Calls from /oauth/ro to /oauth/token](/product-lifecycle/migration/migration-oauthro-oauthtoken-pwdless) </br> [Resource Owner Password Credentials Exchange](/product-lifecycle/migration/migration-oauthro-oauthtoken) |
| [User Search v2](/product-lifecycle/deprecated/search-v2) | 2018-06-06 | 2019-06-30 | [User Search v2 to v3](/product-lifecycle/migration/migrate-search-v2-v3) |
| [Tenant Logs Search v2](/product-lifecycle/deprecated/logs-search-v2) | Free: 2019-07-09 </br> Developer: 2019-08-20 </br> Developer Pro: 2019-08-24 </br> Enterprise: 2019-11-04 | [Tenant Logs Search v2 to v3](/product-lifecycle/migration/migrate-logs-v2-v3) |

## Other helpful migration guides

<%= include('../../_includes/_topic-links', { links: [
  'guides/login/migration-embedded-universal',
  'guides/migration-legacy-flows',
  'libraries/auth0js/v9/migration-guide',
  'libraries/lock/v11/migration-guide',
  'guides/login/migration-sso',
  'product-lifecycle/migration/account-linking',
  'product-lifecycle/migration/calling-api-with-idtokens',
  'product-lifecycle/migration/facebook-social-context',
  'product-lifecycle/migration/facebook-graph-api-deprecation',
  'product-lifecycle/migration/google_cloud_messaging',
  'product-lifecycle/migration/legacy-lock-api-deprecation',
  'product-lifecycle/migration/linkedin-api-deprecation',
  'integrations/office365-connection-deprecation-guide',
  'product-lifecycle/migration/liveid-api-deprecation',
  'product-lifecycle/migration/lock-android-v1-v2',
  'product-lifecycle/migration/lock-ios-v1-v2',
  'product-lifecycle/migration/clickjacking-protection'
] }) %>

See [Check Deprecation Errors](/troubleshoot/guides/check-deprecation-errors) for help diagnosing errors. 

If you have any questions, please visit the Migrations section of the [Auth0 Community site](https://community.auth0.com/c/auth0-community/Migrations) or create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
