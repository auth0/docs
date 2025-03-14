---
title: Manage Authenticator Factors using the MFA API
description: Learn how to manage your MFA authenticators
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Manage Authenticator Factors using the MFA API

Auth0 provides several API endpoints to help you manage the authenticators you're using with an application for <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

You can use these endpoints to build a complete user interface for letting users manage their authenticator factors. 

<%= include('../../_includes/_authenticator-before-start') %>

## Getting an MFA API Access Token

In order to call the MFA API to manage enrollments, you first need to obtain an Access Token for the MFA API.

If you want to use the MFA API as part of an authentication flow, you can follow the steps detailed in the [Authenticate With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticate) document.

If you are building a user interface to manage authentication factors, you'll need to obtain a token you can use for the MFA API at any moment, not only during authentication:

* If you are using [Universal Login](/universal-login), redirect to the `/authorize` endpoint, specifying the `https://${account.namespace}/mfa/` audience, before using calling the MFA API.
* If you are using the Resource Owner Password Grant, you have two options:
    * Ask for the `https://${account.namespace}/mfa/` audience when logging-in, and use a [Refresh Token](/tokens/concepts/refresh-tokens) to refresh it later.
    * If you need to list and delete authenticators, ask the user to [authenticate again](/mfa/guides/mfa-api/authenticate) with `/oauth/token`, specifying the `https://${account.namespace}/mfa/` audience. Users will need to complete MFA before being able to list/delete the authentication factors. 
    * If you only need to list authenticators, ask the user to [authenticate again](/mfa/guides/mfa-api/authenticate) using `/oauth/token`, with username/password. The endpoint will return an `mfa_required` error, and an `mfa_token` you can use to list authenticators. Users will need to provide their password to see their authenticators.

When you request a token for the MFA audience, you can request the following scopes:

* `enroll`: needed to enroll a new authenticator
* `read:authenticators`: needed to list existing authenticators
* `remove:authenticators`: needed to delete an authenticator

## List Authenticators

To get the list of the authenticators for a user, you can call the `/mfa/authenticators` endpoint:

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MFA_TOKEN"
	}]
}
```

You should receive information about the authenticator type(s) in the response:

```json
[
  {
    "authenticator_type": "recovery-code",
    "id": "recovery-code|dev_IsBj5j3H12VAdOIj",
    "active": true
  },
  {
    "authenticator_type": "otp",
    "id": "totp|dev_nELLU4PFUiTW6iWs",
    "active": true,
  },
  {
    "authenticator_type": "oob",
    "oob_channels": "sms",
    "id": "sms|dev_sEe99pcpN0xp0yOO",
    "name": "+1123XXXXX",
    "active": true
  }
]
```

For the purposes of building an user interface for end users to manage their factors, you should ignore authenticators that have `active` = `false`. Those authenticators are not confirmed by users, so they can't be used to challenge for MFA.

::: note
- When a user enrolls with Push, Auth0 creates an OTP enrollment. You will see both when listing enrollments.
- If both SMS and Voice are enabled, when a user enrolls with either SMS or Voice, Auth0 will automatically create two authenticators for the phone number, one for `sms` and another for `voice`. 
- When Email MFA is enabled, all verified emails will be listed as authenticators.
- When a user enrolls any factor Auth0 creates a recovery code that will be listed as an authenticator.
:::

## Enroll Authenticators

The documents below explain how to enroll with different factors:

* [Enrolling with SMS or Voice](/mfa/guides/mfa-api/phone#enrolling-with-sms-or-voice)
* [Enrolling with OTP](/mfa/guides/mfa-api/otp#enrolling-with-otp)
* [Enrolling with Push](/mfa/guides/mfa-api/push#enrolling-with-push)
* [Enrolling with Email](/mfa/guides/mfa-api/email#enrolling-with-email)

You can also [use the Universal Login flow](/mfa/guides/guardian/create-enrollment-ticket) for enrolling users at any moment.

## Delete Authenticators

To delete an associated authenticator, send a `DELETE` request to the `/mfa/authenticators/AUTHENTICATOR_ID` endpoint. You can get the `ID` when listing authenticators.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MFA_TOKEN"
	}]
}
```

If the authenticator was deleted, a 204 response is returned.

:::note
- When you enroll a Push authenticator, Auth0 also enrolls an OTP one. If you delete any of them, the other one will be also deleted.
- If both SMS and Voice are enabled, when a user enrolls with either SMS or Voice, Auth0 will automatically create two authenticators for the phone number, one for `sms` and another for `voice`.  When you delete one, the other will also be deleted.
- If Email MFA is enabled, all verified emails will be listed as authenticators, but you can't delete them. You can only delete email authenticators that were enrolled explicitly.
:::

## Delete a Recovery Code

To delete a Recovery Code, you need to use Management API's `/api/v2/users/USER_ID/recovery-code-regeneration` endpoint. You previously need to get a [Management API Access Token](/api/management/v2/tokens).

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/recovery-code-regeneration",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MANAGEMENT_API_TOKEN"
	}]
}
```

You will get a new recovery code that the end user will need to capture:

```json
{
  "recovery_code": "FA45S1Z87MYARX9RG6EVMAPE"
}
```

## Keep reading

* [Authenticate With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticate)
