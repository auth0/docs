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
Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt-in for v3 during the provided grace period.

## Am I affected by the migration?

Affected customers are those who meet all of the following criteria:
* With tenants created before or on May 21st, 2019
* With tenants hosted in Auth0's public cloud in the AU or EU regions
* Who use the [GET /api/v2/logs](/api/v2#!/Logs/get_logs) or the [GET /api/v2/users/{user_id}/logs](/api/v2#!/Users/get_logs_by_user) endpoint with the parameter `include_totals=true` or the `q` parameter.
* Who paginate through more than 1000 results
* Who use the Delegated Admin Extension
  * Older versions of the extension will continue to work after your Tenant is migrated to Logs Search Engine v3, however you might notice pagination totals being incorrect when viewing logs. Updating to v3.7 of the extension will address this.

The following tenants are NOT affected:
* Cloud customers in the US region. The US region has been fully migrated and is already using Search Engine v3.
* Private Cloud customers (Migration for Private Cloud customers will begin at a later date).
* Cloud tenants in the EU and AU regions that:
  * are not using the `GET /api/v2/logs` or `GET /api/v2/users/{user_id}/logs` endpoints of Management API at all.
  * are consuming the logs from the Dashboard Logs section only.
  * are using the `GET /api/v2/logs endpoint` with the by checkpoint method (using `from` parameter).
  * are consuming logs using any of the [Auth0 Logs to External Service Dashboard extensions](/extensions#export-auth0-logs-to-an-external-service) (which use the by checkpoint method).
  
## How can I check to see if I've migrated all my queries?

You can search your tenant logs with the following to look for queries that would throw errors after you migrate to v3:

```
type:depnote AND description:*logs*
```

These log entries include a `description` field that specifies the deprecated behavior you're using. You can also check the `details.request.path` and `client_name` fields to see what application is calling either `GET /api/v2/logs` or `GET /api/v2/users/{user_id}/logs`.

::: note
Auth0 generates only one log of the same **type** and **description** every 60 minutes. No matter how many calls you make using deprecated features to the impacted endpoints, you will still see a single log for *each* deprecated feature each hour.

If you implement changes to your queries, you'll need to allow 60 minutes to elapse before you can conclusively determine that the lack of new `depnote` logs means the deprecated behavior has been removed from your code.
:::

## What’s changing?

The breaking changes are minor, but you should review your queries to make sure the results you are getting are as expected.

Breaking changes are related to:
#### Pagination
*  When your tenant is migrated to logs v3 the value of the `total` field returned in the summary result when calling `GET /api/v2/logs` or `GET /api/v2/users/{user_id}/logs` is changing. When searching for logs using search engine v2, the totals field in your results tells you the number of logs that match the query you provided. However, in v3, the totals field tells you how many logs are returned in the page (similar to what the length field returns). To avoid any potential disruption, if your application relies on the total field for pagination purposes, you should update your logic to handle this change appropriately. 
* There is an existing limit of 100 logs per request. When your tenant is migrated to logs v3 you may only paginate through a maximum of 1,000 search results, resulting in calls for anything over 1,000 results returning an error. To avoid any potential disruption, you should review your queries to avoid this limit or handle errors accordingly.
#### `q` parameter validation
* The query syntax when using the `q` parameter in the `GET /api/v2/logs` has minor changes that need to be taken into account. When your tenant is migrated to logs v3 this validation will be enforced resulting in this query returning an error. To avoid any potential disruption, you should review your queries to make sure they comply with the supported query syntax.
* The `q` parameter includes an invalid field. When your tenant is migrated to logs v3 this validation will be enforced resulting in this call returning an error. To avoid any potential disruption, you should review your queries to make sure that only searchable fields are included. 

## How to Migrate?

After reviewing your queries, you can opt-in to Tenant Logs Search Engine v3 via the Dashboard. Go to *Tenant Settings > Advanced*, then scroll down to *Migrations*. Toggle the *Legacy Logs Search V2* switch to off. 
Toggling this switch to off disables the deprecated logs search engine v2 and forces the use of search engine v3.

::: note
If you do not see the **Legacy Logs Search V2** toggle, you've already been migrated to v3. No further action is required.
:::

![](/media/articles/logs/tenant-logs-migration.png)
 
If you need help with the migration, contact us using the [Support Center](https://support.auth0.com/).

## Keep reading

* [Logs](/logs)
