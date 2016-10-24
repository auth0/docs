---
description: Explains the Auth0 limits the number of repeat login attempts per user and IP address on database connections.
---

# Rate Limits on User/Password Authentication

For database connections Auth0 limits certain types of repeat login attempts depending on the user account and IP address, some of these limits are set as part of [Anomaly Detection](/anomaly-detection):

 - If a user enters their password incorrectly more than 10 times from a single IP address, they will be blocked from logging into that account from that IP address. Auth0 will send an email containing a link to unblock the user to the owner of the database account. This the [Brute Force Protection](/anomaly-detection#brute-force-protection) shield as part of Auth0's Anomaly Detection.

 - Depending on if the [2nd Level Brute Force Protection](/anomaly-detection#2nd-level-brute-force-protection) shield is enabled, users may also be blocked they attempt 100 failed login attempts from a single IP address using different usernames and incorrect passwords in 24 hours. This shield also blocks 50 sign up attempts per minute from the same IP address.

 - A user cannot login more than 10 times-per-minute as the same user from the same location, regardless of having the correct credentials. This limit does not apply if the frequent requests are from different users.

 - For the users of a free account, there is a limit of two logins per second per IP address.

 ## Unblocking a User

 The user account can be unblocked for a given IP address by the database owner following the unblock-user link or by the user properly completing a password reset procedure.

 [Click here to learn more about Blocking and Unblocking a User](/user-profile#blocking-and-unblocking-a-user)

 ## Why are some successful login attempts blocked?

To protect the health of the system overall, putting these restrictions in place help mitigate the load on our systems. Due to the high amount of customization Auth0 provides, we risk degradation of service from users that may perform high load stress or benchmark tests, as well as the possibility of bad code causing users to login multiple times.

[Click here to learn more about API Rate Limits](/rate-limits)



