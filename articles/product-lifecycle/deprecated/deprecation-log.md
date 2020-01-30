---
description: List of Auth0 migrations that have already been enabled for all customers
topics:
  - migrations
contentType:
  - reference
useCase:
  - migrate
---
# Deprecation Log

These are deprecations that have already been enabled for all customers.

| Feature | Severity | Grace Period Start | Mandatory Opt-in | 
| -- | -- | -- | -- | 
| [Legacy Lock API](/product-lifecycle/deprecated/references/legacy-lock-api) | Medium | 2017-12-21 | 2018-08-06 | 
| [Account Linking ID Tokens](/product-lifecycle/deprecated/references/account-linking-id-tokens) | Medium | -- | 2018-10-19 |
| [Vulnerable Password Reset Flow](/product-lifecycle/deprecated/references/vulnerable-password-reset-flow) | 

## Account Linking Removal

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-01-03 |  2017-03-01 |

As part of Auth0's efforts to improve security and standards compliance, we will stop supporting account linking as part of the authorization callback (that is, accepting an <dfn data-key="access-token">Access Token</dfn> as part of the [authorize](/api/authentication#authorization-code-grant) call as stated [in the account linking section](/api/authentication?http#account-linking).

### Am I affected by the change?

If you received an email notification about it, then you are impacted by this change. As you work to update your applications to [use the Management API to link accounts](/api/management/v2#!/Users/post_identities), you can check if you are still impacted, by checking your tenant logs for warnings indicating _"Account linking via /authorize is being deprecated. Please refer to https://auth0.com/docs/link-accounts for supported ways to link an account."_. These entries will be logged if you are sending an Access Token in your [authorize](/api/authentication#authorization-code-grant) calls.

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})

## Password and Refresh Token Exchange Rules Migration Notice

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-02-23 |  2017-05-31 |

As part of Auth0's efforts to improve security, we recently added the ability to execute rules during the OAuth 2.0 Resource Owner Password Grant exchange (the password exchange) and the <dfn data-key="refresh-token">Refresh Token</dfn> exchange.

You are using this feature if you are calling the [/oauth/token](/api/authentication#authorization-code) endpoint of our Authentication API with `grant_type = "password"` , `grant_type = "http://auth0.com/oauth/grant-type/password-realm"`, or `grant_type = "refresh_token"`.

### Am I affected by the change?

You could be impacted if you are currently using these exchanges and have Rules defined in Dashboard. In order to ensure a smooth transition, we have disabled the rules execution on these specific exchanges for your tenant. These rules will now execute for all new customers, as well as customers who have not yet used these exchanges.

You can add logic to your rules to alter their behavior for these exchanges by checking the `context.protocol` property:
- `oauth2-password` indicates the password (and password-realm) exchange
- `oauth2-refresh-token` indicates the Refresh Token exchange

If you would like to enable the new behavior on this tenant for testing before the mandatory opt-in date, login to [Dashboard](${manage_url}) and enable the __Run Rules on Password and Refresh Token Exchanges__ toggle in [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT})

## Email Delivery Changes: "From" Address

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-04-20 | 2016-04-27 |

Auth0's built-in email provider starting sending all emails from a predefined "from" address (`no-reply@auth0user.net`). Custom Email Providers will now be free for every customer, and to be able to customize the "from" address you can switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom).

If you already use a custom email provider, nothing will change.

For more information, see: [Emails in Auth0](/email).

## TokenInfo endpoint validation

| Severity | Mandatory Opt-In|
| --- | --- |
| Low | 2016-06-01 |

When calling the [TokenInfo](/api/authentication/reference#get-token-info) endpoint, the URL of the API call (for example `https://${account.namespace}/`) must match the value of the `iss` attribute of the ID Token being validated.

If these values do not match, the response will be `HTTP 400 - Bad Request`.

### Am I affected by the change?

If you are calling the [tokeninfo](/api/authentication#get-token-info) endpoint directly, make sure that the value of the `iss` attribute of the ID Token being validated matches your Auth0 tenant namespace: `https://${account.namespace}/`.

::: note
You can use [jwt.io](https://jwt.io/) to decode the token to confirm the `iss` attribute value.
:::

## Identity Provider Access Tokens removed from user profile and ID Token

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | 2016-07-11 | 2016-08-18 |

The format of the user profile JSON object (ID Token) that is returned by Auth0 Authentication APIs has been changed to remove the Identity Provider's Access Token, which had been included in the user profile `identities` array.

Now, to obtain a user's IdP Access Token, you will need to make an HTTP GET call to the `/api/v2/users/{user-id}` endpoint containing an API token generated with  `read:user_idp_tokens` <dfn data-key="scope">scope</dfn>.

::: note
You will still have access to the Identity Provider Access Token in the `user` argument in Auth0 [rules](/rules).
:::

### Am I affected by the change?

You are affected by the change only if you are using the Identity Provider Access Token (`identities[0].access_token` in the user profile) outside of rules to call other services from the Identity Provider (such as Facebook Graph API, Google APIs, and so on).

For more information on how to obtain an Access Token, see: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) and [Identity Provider Access Tokens](/tokens/overview-idp-access-tokens).

::: note
If your tenant was created after the change, this update will be applied automatically.
:::

## Email Delivery Changes: Template Customizations

| Severity | Platforms | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- | --- |
| Medium | Auth0 Cloud Only | 2016-07-21 | 2016-08-29 |

Auth0's built-in email provider will no longer be supported for use in a production environment. The emails sent using the Auth0 provider will no longer be customizable. They will be restricted to the template and you will not be able to change the *from address* or subject line.

The built-in email service may still be used for test purposes but you must switch to an Auth0-supported [third-party service](/email/providers) ([Amazon SES](https://aws.amazon.com/ses/), [Mandrill](https://www.mandrill.com/signup/), [SendGrid](https://sendgrid.com/pricing)) or another [SMTP-based provider](/email/custom) before moving your apps to production.

If you already use a custom email provider, no action is necessary.

For more information, see: [Emails in Auth0](/email).

## Delete All Users Endpoint Change

| Severity | Effective Date |
| --- | --- | --- | --- |
| Low | 2016-09-13 |

The previous endpoint for deleting all users was `DELETE  /api/v2/users`. This is rather similar to the endpoint to delete _one_ user: [DELETE  /api/v2/users](/api/management/v2#!/Users/delete_users_by_id). To prevent accidental requests to the delete all users endpoint, the url has been changed to `DELETE /api/v2/allusers`. This should ensure that only intentional calls to this endpoint get made.

### Am I affected by the change?

You are affected by the change only if you currently make use of the delete all users endpoint. If so, the only change you need to make is to change the URL as explained above.

## State Parameter required on redirect from rule

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-11-01 |

When a redirect is done from an Auth0 rule, Auth0 takes care of generating and sending a state parameter in HTTP and Auth0 will check for a valid state parameter when flow returns to the /continue endpoint.  The site to which the redirect goes has to capture the value of the state parameter and return it by adding it as a parameter when returning to the /continue endpoint.

This is documented [here](/rules/redirect#what-to-do-after-redirecting)

### Am I affected by the change?

You are effected by the change only if you redirect from rules, and do not yet capture and return (to the /continue end point) the state parameter.

## Patch and Post endpoints no longer accept secret_encoded flag

| Severity | Effective Date |
| --- | --- | --- | --- |
| High | 2016-12-06 |

The `jwt_configuration.secret_encoded` configuration is no longer accepted by the PATCH and POST applications endpoints.

In order to further comply with the OIDC specification, Auth0 will no longer generate or accept base64 encoded application secrets for new applications.

Existing applications with encoded secrets stored will remain intact and unchanged, but *new* applications will no longer use base64 encoding. The `secret_encoded` flag is no longer accepted or necessary, as a result.

### Am I affected by the change?

You are affected by this change only if you interact with these endpoints directly.
