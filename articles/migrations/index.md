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

If you need help with the migration, create a ticket in our [Support Center](https://support.auth0.com)

## Current Migrations
Current migrations are listed below, newest first. For migrations that have already been enabled see [Past Migrations](#past-migrations).

### SAML Validations

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2016-12-05 |  2017-03-01 |

As part of Auth0's efforts to improve security and standards compliance, we will be adding some additional validations to our SAML functionality. SAML Responses which fail these validations will not be processed by Auth0:

- Destination does not match AssertionConsumerService url
- Recipient does not match AssertionConsumerService url
- Response ID must be unique for every response

#### Am I affected by the change?

You are affected by this change if you see the validation warnings in your tenant logs. During the grace period, these validation errors will show up in your tenant logs, but will not cause the authentication to fail.

If you need help with the migration, create a ticket in our [Support Center](https://support.auth0.com)

### Vulnerable Password Flow

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  2017-02-01 |

The current password reset flow on Auth0 allows a user to enter their email and a new password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested a password reset.

The issue is that the confirmation link may be inadvertently clicked by a user, which would result in the user's password being changed by an attacker.

Lock version 9 and above uses the [new password reset flow](/connections/database/password-change) exclusively. Lock 8 and below does not handle the new password reset flow. We strongly recommend upgrading to Lock 9 or greater as soon as possible.

**NOTE**: Even if you are not using Lock, the vulnerable reset flow can be accessed directly through the API. (See the [/dbconnections/change_password](/api/authentication/reference#change-password) endpoint for details.) We strongly encourage any app using the current flow to move immediately to the new reset flow and enable this migration.


## Past Migrations
These are migrations that have already been enabled for all customers.



### Email Delivery Changes: "From" Address

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-04-20 | 2016-04-27 |

Auth0's built-in email provider starting sending all emails from a predefined "from" address (`no-reply@auth0user.net`). Custom Email Providers will now be free for every customer, and to be able to customize the "from" address you can switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom).

If you already use a custom email provider, nothing will change.

For more information, see: [Emails in Auth0](/email).

### TokenInfo endpoint validation

| Severity | Mandatory Opt-In|
| --- | --- |
| Low | 2016-06-01 |

When calling the [TokenInfo](/api/authentication/reference#get-token-info) endpoint, the URL of the API call (e.g. `https://${account.namespace}/`) must match the value of the `iss` attribute of the `id_token` being validated.

If these values do not match, the response will be `HTTP 400 - Bad Request`.

#### Am I affected by the change?

If you are calling the `/tokeninfo` endpoint directly, make sure that the value of the `iss` attribute of the `id_token` being validated matches your Auth0 account namespace: `https://${account.namespace}/`.

**NOTE**: You can use [jwt.io](https://jwt.io/) to decode the token to confirm the `iss` attribute value.

### Identity Provider access tokens removed from user profile and id_token

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | 2016-07-11 | 2016-08-18 |

The format of the user profile JSON object (id_token) that is returned by Auth0 Authentication APIs has been changed to remove the Identity Provider's access token, which had been included in the user profile `identities` array.

Now, to obtain a user's IdP access token, you will need to make an HTTP GET call to the `/api/v2/users/{user-id}` endpoint containing an API token generated with  `read:user_idp_tokens` scope.

> NOTE: You will still have access to the Identity Provider access token in the `user` argument in Auth0 [rules](/rules).

#### Am I affected by the change?
You are affected by the change only if you are using the Identity Provider access token (`identities[0].access_token` in the user profile) outside of rules to call other services from the Identity Provider (e.g. Facebook Graph API, Google APIs, etc. ).

For more information on how to obtain an access token, see: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) and [Identity Provider Access Token](/tokens/idp).

**NOTE:** If your account was created after the change, this update will be applied automatically.


### Email Delivery Changes: Template Customizations

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-07-21 | 2016-08-29 |

Auth0's built-in email provider will no longer be supported for use in a production environment. The emails sent using the Auth0 provider will no longer be customizable. They will be restricted to the template and you will not be able to change the *from address* or subject line.

The built-in email service may still be used for test purposes but you must switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom) before moving your apps to production.

If you already use a custom email provider, no action is necessary.

For more information, see: [Emails in Auth0](/email).

### Delete All Users Endpoint Change

| Severity | Effective Date |
| --- | --- | --- | --- |
| Low | 2016-09-13 |

The previous endpoint for deleting all users was `DELETE  /api/v2/users`. This is rather similar to the endpoint to delete _one_ user: `DELETE /api/v2/users/{id}`. To prevent accidental requests to the delete all users endpoint, the url has been changed to `DELETE /api/v2/allusers`. This should ensure that only intentional calls to this endpoint get made.

#### Am I affected by the change?
You are affected by the change only if you currently make use of the delete all users endpoint. If so, the only change you need to make is to change the URL as explained above.




### State Parameter required on redirect from rule

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-11-01 |

When a redirect is done from an Auth0 rule, Auth0 takes care of generating and sending a state parameter in HTTP and Auth0 will check for a valid state parameter when flow returns to the /continue endpoint.  The site to which the redirect goes has to capture the value of the state parameter and return it by adding it as a parameter when returning to the /continue endpoint.

This is documented [here](/rules/redirect#what-to-do-after-redirecting)

#### Am I affected by the change?
You are effected by the change only if you redirect from rules, and do not yet capture and return (to the /continue end point) the state parameter.

### Patch and Post endpoints no longer accept secret_encoded flag

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-12-06 |

The `jwt_configuration.secret_encoded` configuration is no longer accepted by the PATCH and POST clients endpoints.

In order to further comply with the OIDC specification, Auth0 will no longer generate or accept base64 encoded client secrets for new clients.

Existing clients with encoded secrets stored will remain intact and unchanged, but *new* clients will no longer use base64 encoding. The `secret_encoded` flag is no longer accepted or necessary, as a result.

#### Am I affected by the change?

You are affected by this change only if you interact with these endpoints directly.
