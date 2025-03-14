---
title: Migrate from Management API v1 to v2
description: Learn how to migrate from Auth0 Management API v1 to v2.
topics:
  - management api
contentType:
  - concept
  - how-to
useCase:
  - management api
---
# Migrate from Management API v1 to v2

Auth0’s Management API v1 was deprecated in 2016 and replaced with the [Auth0 Management API v2](/api/management/v2/). Management API v1 will reach its End Of Life in the Public Cloud on **July 13th, 2020**. Requests will begin failing with a `410` HTTP status code on or after that date. Management API v1 will be included in the Private Cloud until the November 2020 monthly release, which is the first release that will not include Management API v1.

## Key Dates

The following are key dates for this migration:

| Date | Public Cloud | Private Cloud |
|------|--------------|---------------|
| Jan 13, 2020 | Initial Public Announcement | N/A | 
| May 21, 2020 | N/A | Initial Public Announcement |
| July 13, 2020 | End of Life for Management API v1 | N/A |
| November 2020 | N/A | Support removed from release for Mgmt API V1 |

## Am I affected by the migration?

Affected tenants are those who meet all of the following criteria:

* Created before January 2, 2020
* Actively making requests to Auth0 endpoints directly under the `/api/` path from your application.

The following tenants are NOT affected:

* Created after January 2, 2020
* Exclusively using the Auth0 Management API v2 endpoints
* Using the Authentication API exclusively, the Authentication API is not affected by this deprecation.

## How can I check to see if I've migrated all my requests?

Deprecation Notices will be recorded in your Tenant Logs for requests that will fail at API v1’s End of Life. You can search for relevant Deprecation Notices in your tenant logs with the following query:

```
type:depnote AND description:*APIv1*
```

::: note
**Private Cloud Customers**

- You must be running release [2003](https://auth0.com/releases/2003) or later to see Deprecation Notices.

- If searching tenant logs from the Dashboard, search for `type:depnote`. Searching by `description` is not currently supported in the tenant logs search available in the Dashboard. If you [export your logs to an external service](/extensions#logs-export), you can leverage it to query for APIv1 Deprecation Notices using a combination of `type` and `description`.
:::

![Management API Version 1 Log Query](/media/articles/migrations/apiv1-log-query.png)

To help identify the Application making requests, logs will include the `client_id` used to make the request. You can also find the endpoint being used in the logs `details.path` field.

Note that our current SDKs all use Management API v2. If you're seeing API v1 activity from an Application that is leveraging an older SDK, you should upgrade to the latest version.

![Management API Versiion 1 Log Example](/media/articles/migrations/apiv1-log-example.png)

::: note
Auth0 generates only one log for each `client_id` and `details.path` combination every 60 minutes. No matter how many calls you make to the deprecated endpoints, you will still see a single log per hour for *each* deprecated endpoint an application calls.

If you implement changes to your requests, you'll need to allow 60 minutes to elapse before you can conclusively determine that the lack of new `depnote` logs means the deprecated endpoints have been removed from your code.
:::

## What’s changing?

For a complete list of breaking changes associated with this deprecation, see [Management API v2 Changes](/api/management/v2/changes).

## How do I migrate?

After replacing all calls to the Management API v1 with their [Management API v2 replacements](/api/management/v2/changes), you should confirm you are no longer seeing Deprecation Notices in your Tenant Logs and **disable the Management API v1 for your tenant.**

You can disable API v1 by going **Tenant Settings** > **Advanced** > **Migration** in the [Auth0 Dashboard](http://manage.auth0.com/). This will simulate the expected behavior after the End of Life date, causing calls to API v1 to fail with a `410` HTTP status code. You will be able to re-enable API v1 any time before the End of Life date.

By migrating your requests to API v2 and disabling API v1 as soon as possible, you will ensure that your systems will continue to operate uninterrupted after the **July 13th, 2020** End of Life date, at which time the option to enable API v1 will be removed.

![Toggle Management API Version](/media/articles/migrations/apiv1-toggle.png)

::: note
Note that tenants created after January 2, 2020 will not have access to API v1. If you need API v1 enabled on a tenant for testing your migration, please open a ticket in our [Support Center](https://support.auth0.com/tickets).
:::

If you need help with the migration, contact us using the [Support Center](https://support.auth0.com/) or our [Community Site](https://community.auth0.com/c/auth0-community/Migrations).

## Auth0 AD/LDAP Connector Health Monitor extension

The [Auth0 AD/LDAP Connector Health Monitor](/extensions/adldap-connector) extension v1 uses the API v1 `GET /api/connections/{connection-name}` and `GET /api/connections/{connection-name}/socket` endpoints.

Please upgrade to the latest version of the extension before disabling API v1 support.

## SharePoint Integration Custom Claims Provider

The Custom Claims Provider of the [Auth0 SharePoint Integration](https://auth0.com/docs/integrations/sharepoint) leverages three API v1 endpoints : `/api/enterpriseconnections/users`, `/api/socialconnections/users`, and `/api/connections`.

If you are calling these endpoints from the SharePoint integration, they will continue to work after the API v1 End of Life date. You may continue see `depnote` tenant logs for this activity. If the `client_id` in the tenant log is a SharePoint application, you can disregard this warning. 

If you are calling these endpoints directly from your code, you will need to migrate those calls off of API v1.

## Keep reading

* [Complete list of changes](/api/management/v2/changes)
* [Management APIv1 documentation](/api/management/v1)
* [Management APIv2 documentation](/api/management/v2)
