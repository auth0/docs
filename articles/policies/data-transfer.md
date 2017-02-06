---
description: Describes the Data Transfer Policy which governs requests for transfer of data from one Auth0 account to another.
---

# Data Transfer Policy

The following policy governs requests for transfer of data from one Auth0 account to another.

## Requests Allowed


Auth0 will transfer customer data from one account to another in the following situations:

* Account move from US to EU hosting environment due to Safe Harbor invalidation.  This is allowed for any plan.

* Account move from US or EU regions and want to switch to the Australia Region.  This is allowed for any plan.

* Account move from an on-premise Auth0 appliance to a cloud account.  This is allowed for any plan.

* If you are opting to move out from our service, then you might want to check [this section](/moving-out). Please notice that in order to make this request you must be signed in to the Silver plan for one month.

## Frequently asked requests that are not allowed

* Transfer of data from one non-production account to a production account prior to transition to production status.

* Rename of an account.

* Rename of a database connection.

## Limitations

The following limitations apply to data transfers:

* The data transfer must be done to a new, empty account.  We unfortunately cannot undertake merges of data into accounts that already contain data.

* The data transfer must bring all the data from the source to the destination.  We unfortunately cannot undertake partial data transfers (such as a subset of the users).

* The data transfer must be for either all data in the account or all users in the account.

* Requests for transfers must be filed via the Auth0 support center (${env.DOMAIN_URL_SUPPORT}) at least five (5) business days in advance of the desired timeframe for the transfer.

* Requests should include

  * Source account name and region (US, EU, AU)
  * Destination account name and region (US, EU, AU)
  * Desired timeframe (at least 5 business days from time of request)
  * Whether to transfer all data in the account or just all users


## Customer’s responsibility

Auth0 will make every effort to ensure the integrity of the data transfer, however it is the customer’s responsibility to validate the correctness of the data transfer and notify Auth0 about any issues.
