---
title: Rate Limits on User/Password Authentication
description: Explains the Auth0 limits the number of repeat login attempts per user and IP address on database connections.
topics:
    - connections
    - database
    - db-connections
    - rate-limits
contentType: concept
useCase: customize-connections
---

# Rate Limits on User/Password Authentication

For database connections, Auth0 limits certain types of repeat login attempts depending on the user account and IP address. Some of these limits are set as part of [Anomaly Detection](/anomaly-detection):

 - If a user enters their password incorrectly more than 10 times consecutively from a single IP address, they will be blocked from logging into their account from that IP address. Auth0 will send an email containing a link to unblock the account/IP address combination to the email address attached to the user account. This is the [Brute Force Protection](/anomaly-detection#brute-force-protection) shield which is part of Auth0's Anomaly Detection. Users may also unblock their account by resetting their password, and Dashboard administrators may manually unblock users.

- If a user attempts to login 20 times per minute as the same user from the same location, regardless of having the correct credentials, the rate limit will come into effect. When this happens, the user can make 10 attempts per minute.

## Unblocking a User

If a user has triggered a block as part of anomaly detection, you can unblock the IP address using the [remove IP block](/api/management/v2#!/Anomaly/delete_ips_by_id) endpoint. To learn how to unblock users using the Dashboard, see [Block and Unblock Users](/users/guides/block-and-unblock-users).

## Why are some successful login attempts blocked?

To protect the overall health of the system, we put these restrictions in place to help mitigate the system load. Because Auth0 provides a high amount of customization, we risk degradation of service from users who may perform high load stress or benchmark tests and from users who could possibly enter inefficient code that causes users to log in multiple times.

Requests are subject to limits as outlined in the Rate Limit Policy for Auth0 APIs. To learn more, see [API Rate Limits](/rate-limits).
