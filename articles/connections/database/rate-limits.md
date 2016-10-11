---
description: Explains the Auth0 limits the number of repeat login attempts per user and IP address on database connections.
---

## Rate Limits on User/Password Authentication

For database connections, Auth0 limits the number of repeat login attempts per user and IP address:

 - If a user enters their password incorrectly more than 10 times, they will be blocked from logging in with that account from that IP address. Auth0 will send an email containing a link to unblock the user to the owner of the database account.

 - The user account can be unblocked for a given IP address by the database owner following the unblock-user link or by the user properly completing a password reset procedure.

 - A user cannot login more than 10 times-per-minute as the same user from the same location. 

 For users with a free account, there is a limit of two logins per second per IP address.

 [Click here to learn more about API Rate Limits](/rate-limits)



