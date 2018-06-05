---
description: Describes the Data Transfer Policy which governs requests for transfer of data from one Auth0 tenant to another.
tags:
    - auth0-policies
    - data
    - data-transfer
---

# Data Transfer Policy

At this time, Auth0 will not transfer data from one Auth0 tenant to another. This applies to both Cloud and PSaaS Appliance customers.

All data in your Auth0 tenant is always under your control and is [available through the Management API](/api/v2) at any time. The only information which is not available through the API are the password hashes of your [Auth0-hosted database users](/connections/database) and private keys, for security reasons.

If you are opting to move out from our service, then you might want to check [this section](/moving-out). Please notice that in order to make this request you must be signed in to the Developer plan for one month.

## Frequently made requests that are not supported

* Transfer data from a non-production tenant to a production tenant
* Rename a tenant
* Rename a connection
* Migrate a tenant from one region to another (for example, from US to EU)
