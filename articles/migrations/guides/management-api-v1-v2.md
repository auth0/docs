---
title: Migrate from Management API v1 to v2
description: Learn how to migrate from Auth0 Management API v1 to v2
topics:
  - management api
contentType: how-to 
useCase:
  - management api
---

# Migrate from Management API v1 to v2

Auth0’s Management API v1 was deprecated 2016 and replaced with the [Auth0 Management API v2](https://auth0.com/docs/api/management/v2/). Management API v1 will reach its End Of Life on **July 6th, 2020**. Requests will begin failing with a `410` HTTP status code on or after that date.

## Am I affected by the migration?

Affected customers are those who meet all of the following criteria:
* Created before {UPDATE}
* Actively making requests to Auth0 endpoints directly under the `/api/` path (excluding those listed in https://auth0.com/docs/api/management/v1/use-cases)

The following tenants are NOT affected:
* Tenants created after {UPDATE}
* Exclusively using the Auth0 Management API v2 endpoints 
* The Authentication API is not affected by this deprecation
* Only using endpoints with no API v2 alternative. See https://auth0.com/docs/api/management/v1/use-cases for more information.
  
## How can I check to see if I've migrated all my requests?

Deprecation Notices will be recorded in your Tenant Logs for requests that will fail at API v1’s End of Life. You can search for relevant Deprecation Notices in your tenant logs with the following query: 

```
type:depnote AND description:*APIv1*
```
![](/media/articles/migrations/apiv1-log-query.png)

To help identify the source of the request logs will include the Client ID used to make the request.

![](/media/articles/migrations/apiv1-log-example.png)

::: note
Auth0 generates only one log of the same **type** and **description** every 60 minutes. No matter how many calls you make using deprecated features to the impacted endpoints, you will still see a single log for *each* deprecated feature each hour.

If you implement changes to your requests, you'll need to allow 60 minutes to elapse before you can conclusively determine that the lack of new `depnote` logs means the deprecated behavior has been removed from your code.
:::

## What’s changing?

See https://auth0.com/docs/api/management/v2/changes for a complete list of breaking changes associated with this deprecation

## How to Migrate?

After replacing all calls to the Management API v1 with their [Management API v2 replacements](https://auth0.com/docs/api/management/v2/changes), you should confirm you are no longer seeing Deprecation Notices in your Tenant Logs and **disable the Management API v1 for your tenant.** 

You can disable API v1 by going to your Tenant Settings / Advanced / Migration panel on the [Auth0 Dashboard](http://manage.auth0.com/)**. This will simulate the expected behavior after the End of Life date, causing calls to API v1 to fail with a `410` HTTP status code.  You will be able to re-enable API v1 anytime before the End of Life date.

By migrating your requests to API v2 and disabling API v1 as soon as possible, you will ensure that your systems will continue to operate uninterrupted after the **July 6th, 2020** End of Life date, at which time the option to enable API v1 will be removed.

![](/media/articles/migrations/apiv1-toggle.png)

::: note
Note that tenants created after {UPDATE} will not have access to API v1. If you need API v1 enabled on a tenant for testing your migration please open a ticket in our [Support Center](https://support.auth0.com/tickets).
:::
 
If you need help with the migration, contact us using the [Support Center](https://support.auth0.com/) or our [Community Site](https://community.auth0.com/c/auth0-community/Migrations).

## Keep reading
* [Complete list of breaking changes](https://auth0.com/docs/api/management/v2/changes)
* [Unaffected API v1 endpoints](https://auth0.com/docs/api/management/v1/use-cases)
* [Management APIv1 documentation](https://auth0.com/docs/api/management/v1)
* [Management APIv2 documentation](https://auth0.com/docs/api/management/v2)
