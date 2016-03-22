---
url: /migrations
---

# Migrations
From time to time we must make breaking changes with the Auth0 platform. The primary reason we do this is for security reasons. If we find a known vunerability or something in our platform that is not up to our high standards of security best practices we will work to correct the issue. Occasionally, correcting issues could cause a breaking change to our customer's application. Depending on the severity of the issue we may have to make the change immediately. For changes that do not require immediate changes we will allow a grace period to enable the migration in order to allow you time to update your application.

## Migration Process
When we decide to create a migration the following process will be used.

1. First, we will make the update to the platform and add a new migration option for existing customers allowing the grace period to opt-in. New customers will always be automatically enrolled in all migrations.
2. After a certain period of time the migration will be enabled for all customers. The period of time will vary based on the severity and impact of the breaking change, but typically this wil be either 30 or 90 days.

Durring the grace period, we will notify customers via dashboard notifications and emails to account administrators. You will continue to recieve emails until the migration has been enabled on each account you administer.

## Current Migrations
Below you will find the current migrations.

### Vulnerable Password Flow

| Severity | Grace Period Start | Manditory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  TBD |

The current password reset flow on Auth0 allows a user to enter their email and a new requested password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested the password reset. The issue here is that the confirmation link may be inadvertently clicked by a user which would result in the user's password being changed by an attacker.

This venerable password flow can be perfomed in Lock version 9.x or below. You can optionally enable the new flow in Lock. 9.x. Lock 10 will only use the new reset flow. See here for more details.

Notice that even if you are not using Lock the venerable reset flow can be used directly through the API as well. See here for details.

We strongly encourage any app using the current flow to move immediately to the new reset flow and enable this migration.
