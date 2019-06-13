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

For database connections Auth0 limits certain types of repeat login attempts depending on the user account and IP address, some of these limits are set as part of [Anomaly Detection](/anomaly-detection):

 - If a user enters their password incorrectly more than 10 times from a single IP address, they will be blocked from logging into that account from that IP address. Auth0 will send an email containing a link to unblock the user to the owner of the database account. This is the [Brute Force Protection](/anomaly-detection#brute-force-protection) shield which is part of Auth0's Anomaly Detection.

- If a user attempts to login 20 times per minute as the same user from the same location, regardless of having the correct credentials, the rate limit will come into effect. When this happens, the user can make 10 attempts per minute. Most endpoints at the moment support this rate limit, and soon all of them will.

## Unblocking a User

 The user account can be unblocked for a given IP address by the database owner following the unblock-user link or by the user properly completing a password reset procedure. For more information, see [Block and Unblock Users](/users/guides/block-and-unblock-users).

## Why are some successful login attempts blocked?

To protect the health of the system overall, putting these restrictions in place help mitigate the load on our systems. Due to the high amount of customization Auth0 provides, we risk degradation of service from users that may perform high load stress or benchmark tests, as well as the possibility of bad code causing users to login multiple times.

[Click here to learn more about API Rate Limits](/rate-limits)
