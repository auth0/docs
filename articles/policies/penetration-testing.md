---
description: This page details Auth0's Penetration Testing Policy.
tags:
    - auth0-policies
    - penetration-testing
    - testing
---
# Penetration Testing Policy

::: warning
This policy is effective August 1, 2017.
:::

While conducting a security test of your own application it is **not** permitted to directly test Auth0 infrastructure (such as `tenant.auth0.com`) without prior approval. Please notify us in advance via the [Auth0 support center](${env.DOMAIN_URL_SUPPORT}). Auth0 requires at least **1 week** (7 days) notice prior to the test's planned start date.

Please provide the following information in the support ticket:

1. The specific dates/times of the test and timezone
2. The high level scope of the test
3. IP address(es) the scan will come from
4. The Auth0 tenant(s) involved
5. Two (2) contacts who will be available during the entire test period in case we need to contact you. If we have any questions, we will make a reasonable attempt to contact you. If you cannot be reached, we reserve the right to take measures to protect the service, which may include shutting down or blocking your tenant and/or the source of the intrusion traffic.

Auth0 requires that:

* The test be restricted to only your tenant 
* You disclose any suspected findings to the Auth0 Security team for explanation/discussion

Private SaaS Appliance customers should also request permission to run a penetration test via the [Auth0 support center](${env.DOMAIN_URL_SUPPORT}). Please include the information listed above with your support request.

If the test is isolated to your infrastructure (that is, there will be no testing of Auth0 services), you do not need to notify Auth0.

You may not conduct any [load testing](/policies/load-testing) (such as Denial of Service testing) per the load testing policy.
