---
description: Describes the deprecation of the Logs Search v2.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---
# Deprecation Notice: Tenant Logs Search v2

To provide our customers with the most reliable and scalable solution, Auth0 has deprecated Tenant Logs Search Engine v2 in favor of v3.

Auth0 is proactively migrating customers unaffected by this change, while those who are potentially affected are being notified to opt-in for v3 during the provided grace period.

## Are you affected?

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
  
## Migration

See [Migration Guide: Logs Search v2 to v3](/product-lifecycle/migration/guides/migrate-logs-v2-v3) for details.