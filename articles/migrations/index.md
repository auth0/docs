---
url: /migrations
---

# Migrations
From time to time we must make breaking changes with the Auth0 platform. The primary reason we do this is for security reasons. If we find a vulnerability or other problem in our platform that is not up to our high standards of security we will work to correct the issue. Occasionally, correcting issues will cause a breaking change to our customer's application. Depending on the severity of the issue we may have to make the change immediately. For changes that do not require immediate changes we will allow a grace period to enable the migration in order to allow you time to update your application.

## Migration Process
When we decide to create a migration the following process will be used.

1. First, we will make the update to the platform and add a new migration option for existing customers allowing the grace period to opt-in. New customers will always be automatically enrolled in all migrations.
2. After a certain period of time the migration will be enabled for all customers. The period of time will vary based on the severity and impact of the breaking change, but typically this will be either 30 or 90 days.

During the grace period, we will notify customers via dashboard notifications and emails to account administrators. You will continue to receive emails until the migration has been enabled on each account you administer.

## Current Migrations
Below you will find the current migrations.

### Vulnerable Password Flow

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  TBD |

The current password reset flow on Auth0 allows a user to enter their email and a new requested password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested the password reset. The issue  is that the confirmation link may be inadvertently clicked by a user which would result in the user's password being changed by an attacker.

Lock version 9 and above will use the new password reset flow exclusively. Lock 8 and below will not handle the new password reset flow. We recommend upgrading to Lock 9 or greater as soon as possible.

Notice that even if you are not using Lock the vulnerable reset flow can be used directly through the API as well. See the [api docs](/auth-api#!#post--dbconnections-change_password) for details.

We strongly encourage any app using the current flow to move immediately to the new reset flow and enable this migration.

### Email Delivery Changes

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-04-04 | 2016-05-11 |

Auth0's built-in email provider will no longer be supported for use in a production environment. The emails sent using the Auth0 provider will no longer be customizable, they will be restricted to the template, and you will not be able to change the *from address*.

The built-in email service can still be used for test purposes but you must switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/) or [SendGrid](https://sendgrid.com/pricing)) or a [custom provider](/email/custom) before moving your apps to production.

[Click here to learn more about Auth0 Emails](/email)

