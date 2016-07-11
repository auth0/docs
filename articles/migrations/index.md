---
url: /migrations
description: Occasionally, Auth0 engineers must make breaking changes to the Auth0 platform. 
---

# Migrations
Occasionally, Auth0 engineers must make breaking changes to the Auth0 platform, primarily for security reasons. If a vulnerability or other problem in the platform is not up to our high standards of security, we work to correct the issue. 

Sometimes a correction will cause a breaking change to customer's applications. Depending on the severity of the issue, we may have to make the change immediately. 

For changes that do not require immediate changes, we often allow a grace period to allow you time to update your applications.

## Migration Process
The migration process is outlined below:

1. We update the platform and add a new migration option for existing customers, allowing a grace period for opt-in. New customers are always automatically enrolled in all migrations.
2. After a certain period, the migration is enabled for all customers. This grace period varies based on the severity and impact of the breaking change, typically 30 or 90 days.

During the grace period, customers are informed via dashboard notifications and emails to account administrators. You will continue to receive emails until the migration has been enabled on each account you administer.

## Current Migrations
Current migrations are listed below, newest first.

### Identity Provider access tokens removed from user profile and id_token

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | 2016-06-XX | TBD |

The format of the user profile JSON object (id_token) that is returned by Auth0 Authentication APIs has been changed to remove the Identity Provider's access token, which had been included as the first element in the user profile `identities` array.

Now, to obtain a user's IdP access token, you will need to make an HTTP GET call to the `/api/v2/user/{user-id}` endpoint containing an API token generated with  `read:user_idp_tokens` scope.

For more information on how to obtain an access token, see: [Identity Provider Access Tokens](/tokens/idp).

**NOTE:** If your account was created after the change, this update will be applied automatically.

### Email Delivery Changes: "From" Address

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-04-20 | 2016-04-27 |

Auth0's built-in email provider starting sending all emails from a predefined "from" address (`no-reply@auth0user.net`). Custom Email Providers will now be free for every customer, and to be able to customize the "from" address you can switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom).

If you already use a custom email provider, nothing will change.

For more information, see: [Emails in Auth0](/email).

### Email Delivery Changes: Template Customizations

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-04-04 | 2016-05-11 |

Auth0's built-in email provider will no longer be supported for use in a production environment. The emails sent using the Auth0 provider will no longer be customizable. They will be restricted to the template and you will not be able to change the *from address* or subject line.

The built-in email service may still be used for test purposes but you must switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom) before moving your apps to production.

If you already use a custom email provider, no action is necessary.

For more information, see: [Emails in Auth0](/email).

### Vulnerable Password Flow

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  TBD |

The current password reset flow on Auth0 allows a user to enter their email and a new password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested a password reset. 

The issue is that the confirmation link may be inadvertently clicked by a user, which would result in the user's password being changed by an attacker.

Lock version 9 and above uses the new password reset flow exclusively. Lock 8 and below does not handle the new password reset flow. We strongly recommend upgrading to Lock 9 or greater as soon as possible.

**NOTE**: Even if you are not using Lock, the vulnerable reset flow can be accessed directly through the API. (See the [DbConnections/Change_password](/auth-api#!#post--dbconnections-change_password) endpoint for details.) We strongly encourage any app using the current flow to move immediately to the new reset flow and enable this migration.