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

Load testing against the Auth0 production cloud service is not permitted at any time, as stated in our [Terms of Service](https://auth0.com/terms).

However, customers who have purchased an Enterprise subscription may request one load test (with up to 2 repeats) to conduct load testing against an Auth0 test instance. For load tests that require more than 100 RPS a separate environment will have to be created and it will have a different time schedule than normal load tests.

Note that Auth0 reserves the right to reject the load test request, or ask for modifications to the load test plans.
## How to request

* Customers **must** file a load testing request via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}). Under the **Issue type** field, select **Public Cloud Support Incident**.
* Requests must be filed at least two (2) weeks in advance of the desired test date.
* Requests must be approved in writing before any load/performance testing is conducted.

## Test windows
Approved load testing windows are subject to availability of testing windows on a first-come first-served basis. Customers are encouraged to submit requests well in advance of the 2-week advance notice period.

Testing windows will have a scheduled start and end time assigned by Auth0 and all testing must begin and complete during the window.

It is common for an initial load test to experience some unexpected issues, resulting in a need for repeat tests.  Customers should plan in advance and allow sufficient time for repeat tests before any planned golive.

## Information to include in requests
The load testing request must include the following information:

* A description of the test to be done
* The name of the Auth0 tenant to be used during the test
* The date and time when the test will be performed
* The requested duration of the test (2 hour maximum)
* The Auth0 features, such as rules, email, used during the test
* The Auth0 API methods and endpoints to be used, for example `GET /api/v2/clients`
* The types of Auth0 connections involved in the test
* Which Auth0 Rules, if any, will execute during the test
* Which Custom DB, if any, will be used
* Which Auth0 Webtasks, if any, will be used
* Whether verification, welcome or other emails will be sent
* The peak load, specified in requests-per-second, expected for each API endpoint or Auth0 feature involved in the test.
* An explanation/justification for the peak load numbers.  The justification should include the size of the target user population and realistic estimates of logins per hour to justify TPS numbers.
* The ramp-up rate for the test
* Contacts who will be available during the test and how to reach them

## Test requirements
Note that load testing will require customer to:

* Configure their own email provider in Auth0
* Receive approval from their email provider to send the expected volume of email
* Make arrangements for bounced emails
* Establish a mechanism for testing that emails arrived

## Limitations
Auth0 reserves the right to reject the load testing request, or ask for modifications to load test plans.

A load testing approval will specify pre-arranged dates/times in which load testing can be performed.  All load testing must be limited to those pre-arranged dates/times. Load testing windows will be a maximum of 2 hours in duration. Failure to abide by this policy may result in temporary blocking of access to an tenant until the issue is remediated.

## Effectivity
This policy is effective April 4, 2016. It has been updated on September 17th, 2018.
