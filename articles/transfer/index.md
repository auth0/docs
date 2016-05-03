Data Transfer Policy

The following policy governs requests for transfer of data from one account to another.

* Auth0 will transfer customer data from one account to another for the following situations:
 * Customer requests their account be moved from US to EU hosting environment due to Safe Harbor invalidation.  This is allowed for any plan.
 * Customer requests their account be moved from an on-premise Auth0 appliance to a cloud account.  This is allowed for any plan.
 * A one-time transfer of data from a non-prod account to a prod account will be allowed for customers on an enterprise support plan that includes this feature.
 * A one-time account name change will be allowed for customers on an enterprise support plan that includes this feature.

* Regarding customer’s responsibility
 * Auth0 will make every effort to ensure the integrity of the data transfer, however it is ultimately the customer’s responsibility to validate the correctness of the data transfer and notify Auth0 about any issues.

* In all cases, the transfer must meet the following criteria:
 * The data transfer must be done to a new, empty account.  We unfortunately cannot undertake merges of data into accounts that already contain data.
 * The data transfer will bring all the data from the source to the destination.  We unfortunately cannot undertake scenarios with requirements for partial data transfer (such as a subset of the users).
 * The data transfer requested must be for either all data in the account or all users in the account.
 * Requests for transfers must be filed via the Auth0 support center (https://support.auth0.com) at least five (5) business days in advance of the desired timeframe for the transfer.
 * Requests should include:
    * Source account name
    * Destination account name
    * Desired timeframe (at least 5 business days from time of request)
    * Whether to transfer all data in the account or just all users

