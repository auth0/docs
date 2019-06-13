---
title: Migrate from Logs Search v2 to v3
description: Learn how to migrate from Auth0 Logs Search v2 to v3.
topics:
  - logs
  - search
contentType: how-to 
useCase:
  - logs
---

# Migrate from Logs Search v2 to v3

To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3.
Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt in for v3 during the provided grace period.

## Am I affected by the migration?

Affected customers are those who meet all of the following criteria:
* With tenants created before or on May 21st, 2019
* With tenants hosted in Auth0's public cloud in the AU or EU regions
* Who use the [GET /api/v2/logs](/api/v2#!/Logs/get_logs) or the [GET /api/v2/users/{user_id}/logs](/api/v2#!/Users/get_logs_by_user) endpoint with the parameter `include_totals=true` or the `q` parameter.
* Who attempt to paginate through more than 1000 results.

The following tenants are NOT affected:
* Cloud customers in the US region. The US region has already been fully migrated to using Search Engine V3.
* PSaaS customers (Migration for PSaaS customers will begin at a later date).
* Cloud tenants in the EU and AU regions that:
  * are not using the `GET /api/v2/logs` or `GET /api/v2/users/{user_id}/logs` endpoints of Management API at all.
  * are consuming the logs from the Dashboard Logs section only.
  * are using the `GET /api/v2/logs endpoint` with the by checkpoint method (using `from` parameter).
  * are consuming logs using any of the [Auth0 Logs to External Service Dashboard extensions](/extensions#export-auth0-logs-to-an-external-service) (which use the by checkpoint method).
  
## How can I check if I've migrated all my queries?

You can search your tenant logs with the following query to check for queries that would result in an error after migrating to v3:

```
type:depnote AND description:migrate-logs
```

These log entries include a `description` field that specifies exactly what deprecated behavior you're still using.

::: note
Please note that only one log of the same `type` and `description` will be generated every 60 minutes. This means even though you may be making multiple calls with deprecated behavior to the impacted endpoints, you will only see one log for each deprecated bahavior per hour. This also means you'll need to wait 60 minutes after implementing any changes to your queries before you can consider a lack of new `depnote` logs to mean the deprecated behaviour has been removed from your code.
:::


## What’s changing?

The breaking changes are minor, but you should review your queries to make sure the results you are getting are as expected.

Breaking changes are related to:
* Pagination: The value of the `totals` field returned in the summary result when calling `GET /api/v2/logs` or `GET /api/v2/users/{user_id}/logs` is changing. There is a limit of 100 logs per request. Additionally, you may only paginate through up to 1,000 search results.
* Query Syntax: The query syntax when using the `q` parameter in the `GET /api/v2/logs` has minor changes that need to be taken into account

For more details on these changes, see [Logs Search Query Syntax](/logs/query-syntax#search-engine-v3-breaking-changes). 

## How to Migrate?

After reviewing your queries, you can opt in to Tenant Logs Search Engine v3 via the Dashboard. Go to *Tenant Settings > Advanced*, then scroll down to *Migrations*. Toggle the *Legacy Logs Search V2* switch to off. 
Toggling this switch to off disables the deprecated logs search engine v2 and forces the use of search engine v3.

::: note
If you do not see this option you've already been migrated to v3. No further action is required.
:::

![](/media/articles/logs/tenant-logs-migration.png)
 
If you need help with the migration, contact us using the [Support Center](https://support.auth0.com/).

## Keep reading
* [Tenant Logs Overview](/logs)
* [Query Syntax](/logs/query-syntax)

