---
description: This page details Auth0's Penetration Testing Policy.
topics:
    - auth0-policies
    - penetration-testing
    - testing
contentType:
  - reference
useCase:
  - support
---
# Penetration Testing Policy

**This policy is effective July 1, 2019.**

If you have a *paid* Auth0 subscription, you may conduct a security test of your application involving Auth0 infrastructure (e.g. `your-tenant.auth0.com`) with **prior approval**.

To conduct a security test, please notify us in advance via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}). Auth0 requires at least **1 week's (7 days')** notice prior to your test's planned start date.

If the test is isolated to your infrastructure (that is, there will be no testing of Auth0 services), you do not need to notify Auth0.

## Information required

Please provide the following information in the support ticket when requesting approval for testing:

1. The specific dates/times of the test and timezone
2. The high level scope of the test
3. IP address(es) the scan will come from
4. The Auth0 tenant(s) involved
5. Two (2) contacts who will be available during the entire test period in case we need to contact you. If we have any questions, we will make a reasonable attempt to contact you. If you cannot be reached, we reserve the right to take measures to protect the service, which may include shutting down or blocking your tenant and/or the source of the intrusion traffic.

## Requirements

Auth0 requires that:

* The test be restricted to only your tenant
* You disclose any suspected findings to the Auth0 Security team for explanation/discussion
* You understand that your tenant will be moved between environments during testing. Auth0 will move your tenant from the stable environment to the preview environment before the testing commences. Auth0 will then return your tenant to the stable environment once the testing period ends. Note that while your tenant is on the preview environment it may receive updates more rapidly.

## Private Cloud customers

Private Cloud customers should also request permission to run a penetration test via the [Auth0 support center](${env.DOMAIN_URL_SUPPORT}). Please include the [information listed above](/policies/penetration-testing#information-required) with your support request.

## Restrictions

* You may not conduct any [load testing](/policies/load-testing) (such as Denial of Service testing) per the load testing policy.
* You may not conduct any penetration testing targeting our management dashboard. Management and Authentication APIs are allowed.
* You may not conduct any penetration testing targeting tenants that we have not approved.
