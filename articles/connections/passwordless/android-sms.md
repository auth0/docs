---
title: Using Passwordless Authentication on Android with SMS
---
# Authenticate users with a one-time code via SMS

<!-- markdownlint-disable -->

::: warning
This feature is disabled by default for new tenants as of 8 June 2017. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities. Please see [Client Grant Types](/clients/client-grant-types) for more information.
:::

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

For detailed information on how to implement this, refer to [Lock Passwordless for Android documentation](/libraries/lock-android/passwordless).
