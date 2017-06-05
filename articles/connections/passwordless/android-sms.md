---
title: Using Passwordless Authentication on Android with SMS
---

::: note-warning
This feature is disabled by default for new tenants as of (date) due to security implications. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities. Please see <a href="/clients/grant-types/client-grant-types">Client Grant Types</a> for more information.
:::

# Authenticate users with a one-time code via SMS

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

For detailed information on how to implement this, refer to [Lock Passwordless for Android documentation](/libraries/lock-android/passwordless).
