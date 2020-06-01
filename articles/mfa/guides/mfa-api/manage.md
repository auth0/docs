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

In order to call the MFA API to manage enrollments, you first need to obtain an MFA Access Token for the API.

If you are using these endpoints as part of an authentication flow, you can follow the steps detailed in the [Authenticating With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticating) document.

If you are building a user interface to manage authentication factors, you'll need to obtain a token you can use for the MFA API at any moment, not only during authentication. 

* If you are using [Universal Login](/universal-login), you can to make an additional redirect call to the `/authorize` endpoint, specifying the `https://${account.namespace}/mfa` audience, before using calling the MFA API.

* If you are using the Resource Owner Password Grant, you have two options:

  - You ask for the `https://${account.namespace}/mfa` audience when logging-in, and use a [Refresh Token](/tokens/concepts/refresh-tokens) to refresh it later.
  - You ask the user to authenticate using his user/password before seeing or changing his MFA Enrollments. You will get an `mfa_required` error and the `mfa_token` you can later use to call the MFA API.

## List Authenticators

To get a list of the authenticators a user has associated and can be used with your tenant, you can call the `/mfa/authenticators` endpoint:

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
    "oob_channel": "sms",
    "id": "sms|dev_sEe99pcpN0xp0yOO",
    "name": "+1123XXXXX",
    "active": true
  }
]
```

For the purposes of building an user interface for end users to manage their factors, you should ignore authenticators that have `active` = `false`. Those authenticators are not confirmed by users, so they can't be used to challenge for MFA.

:::note
- When a user enrolls with Push, Auth0 creates an OTP enrollment. You will see both when listing enrollments.
- When Email MFA is enabled, all verified emails will be listed as authenticators.
- When a user enrolls any factor, Auth0 creates a recovery code, that will be listed as an authenticator.
:::

## Enroll Authenticators

The documents below explain how to enroll with different factors:

- [Enrolling with SMS](/mfa/guides/mfa-api/sms#enrolling-with-sms)
- [Enrolling with OTP](/mfa/guides/mfa-api/otp#enrolling-with-otp)
- [Enrolling with Push](/mfa/guides/mfa-api/push#enrolling-with-push)
- [Enrolling with Email](/mfa/guides/mfa-api/email#enrolling-with-email)

You can also [use the Universal Login flow](/mfa/guides/guardian/create-enrollment-ticket) for enrolling users at any moment.

## Delete Authenticators

To delete an associated authenticator, send a delete request to the `/mfa/authenticators/AUTHENTICATOR_ID` endpoint (be sure to replace `AUTHENTICATOR_ID` with the relevant authenticator ID).

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
- If Email MFA is enabled, all verified emails will be listed as authenticators, but you can't delete them. You can only delete email authenticators that were enrolled explicitly.
- You cannot delete Recovery codes using this API. They only be deleted using the [Management API](/api/management/v2#!/Users/post_recovery_code_regeneration).
:::

## Keep reading

* [Authenticating With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticating)

