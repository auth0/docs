---
section: private-cloud
description: Operations - Testing
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud Testing

## Load testing

This policy outlines the necessary requirements for Auth0 to perform load testing for Private Cloud customers who submit a request. You can file a load testing request via the [Support Center](${env.DOMAIN_URL_SUPPORT}). Under the **Issue** field, select **Private Cloud Support Incident**.

To be considered for approval, the request must:

* Be filed at least two (2) weeks prior to the desired test date; in many cases, Auth0 encourages one (1) month of advance notice to ensure time for a thorough review and any required modifications.
* Be approved in writing before any testing is conducted.
* Stay within our [published production rate limits](/policies/rate-limits).
* Include all information described in our [Load Testing Policy](/policies/load-testing).

If changes to infrastructure are requested, cost will be determined based on your specific requirements. 

::: panel Testing Capacity Considerations
If you performs a test that exceeds 500RPS in a High Availability environment or 1500RPS in a High Capacity environment, then the performance of the environment may be negatively effected, either with requests being slow or potentially the environment seizing. You should start with a low load and slowly increase until the environment has reached its peak. Should you require a load greater than what the environment can handle, then the environment size should be increased if possible and your Auth0 Account Manager will contact your to discuss details.
::: 

## Penetration testing

To conduct a security test, please notify us in advance via the Auth0 Support Center. Auth0 requires at least 1 week's (7 days') notice prior to your test's planned start date.

If the test is isolated to your infrastructure (that is, there will be no testing of Auth0 services), you do not need to notify Auth0.

For the information we require, see our [Penetration Testing Policy](/policies/penetration-testing).

## Keep reading

* [Testing Auth0 Implementations](/support/testing)
* [Open and Manage Support Tickets](/support/tickets)