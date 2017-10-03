---
title: Security Advice for Customers
description: How to protect your end users' data
---
# Security Advice for Customers

Auth0 recommends the following practices to help ensure the security of your end users data and minimize the probability of a data breach:

Protect client secrets and keys
Protect Management Dashboard credentials, and require multifactor authentication for access to the Dashboard
Review the list of administrators for the Dashboard on a regular basis and remove outdated entries
Review the list of connections and clients associated with your Auth0 tenants and remove outdated entries
Ensure that Dashboard administrators use corporate credentials that can be easily revoked if necessary, *not* personal credentials such as a personal email account
Remove accounts for terminated employees promptly
Ensure that administrators use devices with mandatory screen locking
Provide regular training to all Dashboard administrators and developers on security and privacy best practices

::: note
Make sure that you monitor any Auth0 [extensions](/extensions#export-auth0-logs-to-an-external-service) you use to send log data to logging tools with reporting capability.
:::