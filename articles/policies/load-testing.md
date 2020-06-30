---
description: This page details Auth0's Load Testing Policy.
topics:
    - auth0-policies
    - load-testing
    - testing
contentType:
  - reference
useCase:
  - support
---
# Load Testing Policy

Auth0 recognizes that customers may occasionally need to perform load tests against its production cloud service. In order to ensure a successful test and maintain a high quality of service for all customers, Auth0 has established the following guidelines. Any load testing in Auth0 must be conducted in accordance with this Policy.

Only customers who have purchased an Enterprise subscription may conduct load testing. Free, Developer, Developer Pro and other non-Enterprise customers may not conduct load testing. Customers with an Enterprise subscription may request one load test (with up to 2 repeats) per year against an Auth0 production tenant. Performance and load testing is only allowed with Auth0's prior written approval. Once approved, testing can only target tenants that we have approved.

::: note
Auth0 reserves the right to reject the load test request or ask for modifications. Failure to abide by this policy may result in temporary blocking of access to a tenant until the issue is remediated.
:::

## How to request

Customers must file a load testing request via the Auth0 Support Center. Under the Issue typefield, select Public Cloud Support Incident.

To be considered for approval, the request must:

* Be filed at least two (2) weeks prior to the desired test date; in many cases, Auth0 encourages one (1) month of advance notice to ensure time for a thorough review and any required modifications.
* Be approved in writing before any testing is conducted.
* Stay within our [published production rate limits](/policies/rate-limits).
* Include all information described below.

## Information to include in requests

The load testing request must include the following:

* A description of the test to be done
* The name and region of the Auth0 tenant to be used during the test
* The requested date and time of the test, including time zone
* The requested duration of the test (2 hour maximum)
* The platforms to be used for the test (desktop/laptop, iOS, Android, other)
* The Auth0 features (such as rules or email) used during the test
* The Auth0 API methods and endpoints to be used (for example `GET /api/v2/clients`)
* The maximum requests per second for each type of request or endpoint
* The types of Auth0 connections involved in the test
* Which Auth0 Rules, if any, will execute during the test
* Which Custom DB, if any, will be used
* Which Auth0 Webtasks, if any, will be used
* Whether verification, welcome or other emails will be sent
* The peak load, specified in requests-per-second, expected for each API endpoint or Auth0 feature involved in the test
* An explanation/justification for the peak load numbers, including the size of the target user population and realistic estimates of logins per hour
* The ramp-up rate for the test
* Contacts who will be available during the test and how to reach them
* Number of unique users participating in the load test

## Email considerations

Before any testing, customers must:

* Configure their own email provider in Auth0
* Receive approval from their email provider to send the expected volume of email
* Make arrangements for bounced emails
* Establish a mechanism for testing that emails arrived

## Test requirements

Load testing windows are subject to availability so advance notice is highly recommended. Once approved, load testing windows will have a scheduled start and end time not to exceed two (2) hours in duration. All testing must begin and end during this window.

Auth0 strongly recommends including a brief "ramp up" period to the desired load test target numbers. For example, a load test request of 100 RPS might be preceded by three five minute periods: 5 minutes at 25 RPS, 5 minutes at 50 RPS, and 5 minutes at 75 RPS. This ramp up period allows Auth0 and the customer to observe and compare effects at increasing RPS levels prior to peak RPS. If a ramp up period is not possible, please indicate why.

_Updated February 4, 2019_
