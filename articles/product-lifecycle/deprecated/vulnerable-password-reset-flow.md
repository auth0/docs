---
description: Describes the deprecation of the vulnerable password reset flow.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---

# Vulnerable Password Reset Flow Deprecation

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  2017-02-01 |

The current password reset flow on Auth0 allows a user to enter their email and a new password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested a password reset.

The issue is that the confirmation link may be inadvertently clicked by a user, which would result in the user's password being changed by an attacker.

## Are you affected?

Lock version 9 and above uses the [new password reset flow](/connections/database/password-change) exclusively. Lock 8 and below does not handle the new password reset flow. 

## Next steps

We strongly recommend upgrading to Lock 9 or greater as soon as possible.

::: panel Security Warning
Even if you are not using Lock, the vulnerable reset flow can be accessed directly through the API. (See the [/dbconnections/change_password](/api/authentication/reference#change-password) endpoint for details.) 
:::

We strongly encourage you to migrate any app using the current flow to immediately use to the new reset flow and enable this migration.

<%= include('./_contact-support') %>
