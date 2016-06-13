# Data Transfer Policy

The following policy governs requests for transfer of data from one Auth0 account to another.

## Requests Allowed


Auth0 will transfer customer data from one account to another in the following situations:

* Account move from US to EU hosting environment due to Safe Harbor invalidation.  This is allowed for any plan.

* Account move from US or EU regions and want to switch to the Australia Region.  This is allowed for any plan. 

* Account move from an on-premise Auth0 appliance to a cloud account.  This is allowed for any plan.

* One-time transfer of data from one non-production account to a production account prior to transition to production status.  This will be allowed for customers on an enterprise support plan that includes this feature.

* A one-time account name change for an account.  This will be allowed for customers on an enterprise support plan that includes this feature.
 
* If you are opting to move out from our service, then you might want to check [this section](https://auth0.com/docs/moving-out). Please notice that in order to make this request you must be signed in to the Silver plan for one month.

## Limitations

The following limitations apply to data transfers:

* The data transfer must be done to a new, empty account.  We unfortunately cannot undertake merges of data into accounts that already contain data.

* The data transfer must bring all the data from the source to the destination.  We unfortunately cannot undertake partial data transfers (such as a subset of the users).

* The data transfer must be for either all data in the account or all users in the account.

* Requests for transfers must be filed via the Auth0 support center (https://support.auth0.com) at least five (5) business days in advance of the desired timeframe for the transfer.

* Requests should include

  * Source account name and region (US, EU, AU)
  * Destination account name and region (US, EU, AU)
  * Desired timeframe (at least 5 business days from time of request)
  * Whether to transfer all data in the account or just all users


## Customer’s responsibility

Auth0 will make every effort to ensure the integrity of the data transfer, however it is the customer’s responsibility to validate the correctness of the data transfer and notify Auth0 about any issues.
