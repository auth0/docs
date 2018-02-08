---
toc: true
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

During the grace period, customers are informed via dashboard notifications and emails to tenant administrators. You will continue to receive emails until the migration has been enabled on each tenant you administer.

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Active Migrations

Current migrations are listed below, newest first. 

For migrations that have already been enabled for all customers, see [Past Migrations](/migrations/past-migrations).

### Summary of Endpoint Migrations

This table is a summary of the endpoint migrations for the first part of 2018. See the entries below the table for more detailed explanations.

| Endpoint | Replacement | Mandatory Opt-In | More Info |
| --- | --- | --- | --- | --- |
| /usernamepassword/login | /co/authenticate | 2018-04-01 | [More Info](#introducing-lock-v11-and-auth0-js-v9) |
| /ssoData | /authorize?prompt=none | 2018-04-01 | [More Info](#introducing-lock-v11-and-auth0-js-v9) |
| [/tokeninfo](/api/authentication/reference#get-token-info) | [userinfo](/api/authentication#get-user-info) | 2018-06-01 | [More Info](#introducing-lock-v11-and-auth0-js-v9) |
| [/delegation](/api/authentication#delegation) | TBD | 2018-06-01 | [More Info](#introducing-api-authorization-with-third-party-vendor-apis) |
| [/oauth/ro](/api/authentication#resource-owner) | [/oauth/token](/api/authentication#authorization-code) | 2018-07-01 | [More Info](#introducing-resource-owner-support-for-oauth-token-endpoint) |
| [/oauth/access_token](/api/authentication#social-with-provider-s-access-token) | TBD | TBD | [More Info](#introducing-resource-owner-support-for-oauth-token-endpoint) |

### Introducing Lock v11 and Auth0.js v9

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-04-01 |

We are continually improving the security of our service. As part of this, we are deprecating a set of APIs (/usernamepassword/login, /ssodata, [tokeninfo](/api/authentication/reference#get-token-info), [/delegation](/api/authentication#delegation)) used by Lock.js v8, v9, and v10 and and auth0.js, v6, v7, and v8. You should update your applications by **April 1, 2018**.

Here are the migration guides for [Auth0.js](/libraries/auth0js/v9/migration-guide) and for [Lock](/libraries/lock/v11/migration-guide).

#### Am I affected by the change?

If you are currently implementing login in your application with Lock v8, v9, or v10, or Auth0.js v6, v7, or v8, you will be affected by these changes. We **recommend** that applications using [universal login](/hosted-pages/login) update, as customized login pages may or may not need to be updated. However, those who are using Lock or Auth0.js embedded within their applications, however, are **required** to update, and applications which still use deprecated versions may cease to work at some point after the deadline.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Introducing Resource Owner Support for oauth/token Endpoint

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-07-01 |

Support was introduced for [Resource Owner Password](/api/authentication#resource-owner-password) to the [/oauth/token](/api/authentication#authorization-code) endpoint earlier this year. 

We will now deprecate the current [/oauth/ro](/api/authentication#resource-owner) and [/oauth/access_token](/api/authentication#social-with-provider-s-access-token) endpoints.

Applications must be updated before July 1, 2018, when [/oauth/ro](/api/authentication#resource-owner) will become unavailable. The migration guide will be available in Q1 2018.

#### Am I affected by the change?

If you are currently implementing the [/oauth/ro](/api/authentication#resource-owner) endpoint your application will need to be updated to use the [/oauth/token](/api/authentication#authorization-code) endpoint instead.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Introducing API Authorization with Third-Party Vendor APIs

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | Q1 2018 |  2018-06-01 |

The mechanism by which you get tokens for third-party / vendor APIs (for example AWS, Firebase, and others) is being changed. It now works the same as any custom API, providing better consistency. This new architecture will be available in Q1 2018 and at that point the [/delegation](/api/authentication#delegation) endpoint will be deprecated. All clients must be updated prior to June 1, 2018. The migration guide will be available in Q1 2018.

#### Am I affected by the change?

If you are currently using [/delegation](/api/authentication#delegation) to provide third party authorization, your application will need to be updated.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Deprecating the Usage of ID Tokens on the Auth0 Management API

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-06-01 |

We are deprecating the usage of [ID Tokens](/tokens/id-token) when calling [/users](/api/management/v2#!/Users/get_users_by_id) and [/device-credentials](/api/management/v2#!/Device_Credentials/get_device_credentials). We have moved to regular [Management APIv2 Tokens](/api/management/v2/tokens). This is available now. Applications must be updated by June 1, 2018, when the ability to use ID Tokens will become unavailable. Migration guides will be available by February 2018.

#### Am I affected by the change?

If you are currently using [id tokens](/tokens/id-token) to access any part of the Management API, your application will need to be updated.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Improved OpenID Connect Interoperability in Auth0

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-07-01 |

The [userinfo](/api/authentication#get-user-info) endpoint is being updated to return [OIDC conformant user profile attributes](/user-profile/normalized/oidc). The most notable change is that `user_id` becomes `sub`. This will deprecate the [legacy Auth0 user profile](/user-profile/normalized/auth0) (in [userinfo](/api/authentication#get-user-info) and in [id tokens](/tokens/id-token)). Applications must be updated to use the new user profile before July 1, 2018. Migration guide will be available in late Q1 2018.

#### Am I affected by the change?

If you are currently using the [userinfo](/api/authentication#get-user-info) endpoint or receiving ID Tokens, you are affected by this change and need to update your implementation so that it expects normalized OIDC conformant user profile attributes.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Past Migrations

These are migrations that have already been enabled for all customers.

### New IP Addresses for Whitelisting in Australia

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-08-22 |  2017-09-30 |

Auth0 is updating its cloud environments, and traffic from these regions will originate from new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

#### Am I affected by the change?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to make sure the following IP addresses are allowed to go through your firewall:

```
13.55.232.24, 13.54.254.182, 13.210.52.131, 52.62.91.160, 52.63.36.78, 52.64.84.177, 52.64.111.197, 52.64.120.184, 54.66.205.24, 54.79.46.4, 54.153.131.0
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### New IP Addresses for Whitelisting in Europe

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-08-22 |  2017-09-30 |

Auth0 is updating its cloud environments, and traffic from these regions will originate from new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

#### Am I affected by the change?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to make sure the following IP addresses are allowed to go through your firewall:

```
34.253.4.94, 35.156.51.163, 35.157.221.52, 52.16.193.66, 52.16.224.164, 52.28.45.240, 52.28.56.226, 52.28.184.187, 52.28.212.16, 52.29.176.99, 52.50.106.250, 52.57.230.214, 52.211.56.181, 52.213.216.142, 52.213.38.246, 52.213.74.69
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### CDN provider migration in the Europe and Australia environments

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | N/A |  2017-07-12 |

The existing Auth0 CDN service is one of our older services. It was been built and maintained internally since the early days of the company. To improve its scaling and availability, we are changing providers to use Amazon CloudFront on July 12, at 1pm UTC. We have already made this change in the US environment, and are now ready to do so in Europe and Australia.

#### Am I using the CDN?

If you use Lock (hosted by our CDN) in Europe or Australia, yes.

#### Do I need to do something?

This change shouldn't cause any disruption or change in behavior in your applications, so you don't have to do anything. This notification is for information only.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Whitelisting IP Address Ranges (Q1 2017)

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Low | 2017-01-15 |  2017-02-20 |

Auth0 is expanding into new US regions, and traffic originating from these regions will have new IP addresses. If you are whitelisting IP addresses, you will need to add the new addresses to your firewall rules.

#### Am I affected by the change?

If you are using a custom database connection, rule, and/or custom email provider that connects to your environment, **and** you have implemented firewall restrictions for IP address ranges, then you are affected by this change. You will need to add the following IP addresses to your firewall rules:

```
138.91.154.99, 54.183.64.135, 54.67.77.38, 54.67.15.170,
54.183.204.205, 54.173.21.107, 54.85.173.28, 35.167.74.121, 35.160.3.103,
35.166.202.113, 52.14.40.253,
52.14.38.78, 52.14.17.114, 52.71.209.77, 34.195.142.251, 52.200.94.42
```

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Vulnerable Password Flow

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2016-03-22 |  2017-02-01 |

The current password reset flow on Auth0 allows a user to enter their email and a new password. This triggers a confirmation email that is sent to the user asking them to confirm that they requested a password reset.

The issue is that the confirmation link may be inadvertently clicked by a user, which would result in the user's password being changed by an attacker.

Lock version 9 and above uses the [new password reset flow](/connections/database/password-change) exclusively. Lock 8 and below does not handle the new password reset flow. We strongly recommend upgrading to Lock 9 or greater as soon as possible.

::: panel Security Warning
Even if you are not using Lock, the vulnerable reset flow can be accessed directly through the API. (See the [/dbconnections/change_password](/api/authentication/reference#change-password) endpoint for details.) We strongly encourage any app using the current flow to move immediately to the new reset flow and enable this migration.
:::

### Account Linking Removal

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-01-03 |  2017-03-01 |

As part of Auth0's efforts to improve security and standards compliance, we will stop supporting account linking as part of the authorization callback (that is, accepting an [Access Token](/tokens/access-token) as part of the [authorize](/api/authentication#authorization-code-grant) call as stated [in the account linking section](/api/authentication?http#account-linking).

#### Am I affected by the change?

If you received an email notification about it, then you are impacted by this change. As you work to update your applications to [use the Management API to link accounts](/api/management/v2#!/Users/post_identities), you can check if you are still impacted, by checking your tenant logs for warnings indicating _"Account linking via /authorize is being deprecated. Please refer to https://auth0.com/docs/link-accounts for supported ways to link an account."_. These entries will be logged if you are sending an Access Token in your [authorize](/api/authentication#authorization-code-grant) calls.

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})

### Password and Refresh Token Exchange Rules Migration Notice

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-02-23 |  2017-05-31 |

As part of Auth0's efforts to improve security, we recently added the ability to execute rules during the OAuth 2.0 Resource Owner Password Grant exchange (the password exchange) and the Refresh Token exchange.

You are using this feature if you are calling the [/oauth/token](/api/authentication#authorization-code) endpoint of our Authentication API with `grant_type = "password"` , `grant_type = "http://auth0.com/oauth/grant-type/password-realm"`, or `grant_type = "refresh_token"`.

#### Am I affected by the change?

You could be impacted if you are currently using these exchanges and have Rules defined in Dashboard. In order to ensure a smooth transition, we have disabled the rules execution on these specific exchanges for your tenant. These rules will now execute for all new customers, as well as customers who have not yet used these exchanges.

You can add logic to your rules to alter their behavior for these exchanges by checking the `context.protocol` property:
- `oauth2-password` indicates the password (and password-realm) exchange
- `oauth2-refresh-token` indicates the Refresh Token exchange

If you would like to enable the new behavior on this tenant for testing before the mandatory opt-in date, login to [Dashboard](${manage_url}) and enable the __Run Rules on Password and Refresh Token Exchanges__ toggle in [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})

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

When calling the [TokenInfo](/api/authentication/reference#get-token-info) endpoint, the URL of the API call (for example `https://${account.namespace}/`) must match the value of the `iss` attribute of the `id_token` being validated.

If these values do not match, the response will be `HTTP 400 - Bad Request`.

#### Am I affected by the change?

If you are calling the [tokeninfo](/api/authentication#get-token-info) endpoint directly, make sure that the value of the `iss` attribute of the `id_token` being validated matches your Auth0 tenant namespace: `https://${account.namespace}/`.

::: note
You can use [jwt.io](https://jwt.io/) to decode the token to confirm the `iss` attribute value.
:::

### Identity Provider Access Tokens removed from user profile and id_token

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | 2016-07-11 | 2016-08-18 |

The format of the user profile JSON object (id_token) that is returned by Auth0 Authentication APIs has been changed to remove the Identity Provider's Access Token, which had been included in the user profile `identities` array.

Now, to obtain a user's IdP Access Token, you will need to make an HTTP GET call to the `/api/v2/users/{user-id}` endpoint containing an API token generated with  `read:user_idp_tokens` scope.

::: note
You will still have access to the Identity Provider Access Token in the `user` argument in Auth0 [rules](/rules).
:::

#### Am I affected by the change?

You are affected by the change only if you are using the Identity Provider Access Token (`identities[0].access_token` in the user profile) outside of rules to call other services from the Identity Provider (such as Facebook Graph API, Google APIs, and so on).

For more information on how to obtain an Access Token, see: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) and [Identity Provider Access Token](/tokens/idp).

::: note
If your tenant was created after the change, this update will be applied automatically.
:::

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

The previous endpoint for deleting all users was `DELETE  /api/v2/users`. This is rather similar to the endpoint to delete _one_ user: [DELETE  /api/v2/users](/api/management/v2#!/Users/delete_users_by_id). To prevent accidental requests to the delete all users endpoint, the url has been changed to `DELETE /api/v2/allusers`. This should ensure that only intentional calls to this endpoint get made.

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
