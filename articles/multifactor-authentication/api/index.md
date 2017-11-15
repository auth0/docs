---
title: Enroll a New Authenticator for Use with Multifactor Authentication
description: How to enroll a new authenticator for use with MFA using the new MFA API endpoints
toc: true
---
# Enroll a New Authenticator for Use with Multifactor Authentication

Introduction...

Doing this requires multiple steps:

1. Obtain an access token
2. Request authenticator enrollment
3. Use the authenticator to confirm enrollment

## Prerequisites

1. Configure Your Tenant
1. Create and Configure Your API and Client
1. Create Your Connection

::: note
For this article, we will be using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant).
:::

## Step 1. Obtain an Access Token to Enroll the New Authenticator

To obtain an [access token](/tokens/access-token) to enroll your new authenticator, you'll need to make the appropriate `POST` call to the [`/oauth/token` endpoint](/api/authentication#resource-owner-password). 

More specifically, you'll need to provide values for the following parameters:

| Parameter | Value |
| - | - |
| Client ID | The ID of your Auth0 [client](/clients) |
| Realm | [Realms](/api-auth/grant/password#realm-support) allow you to specify a specific user director to use with the token endpoint. Specify the realms you'd like to use (in Auth0, these are typically [connections](/identityproviders)) |
| Grant Type | The authorization flow you're using |
| Audience | The unique identifier of the target API you want to access. For MFA, use `https://${account.namespace}/mfa` |
| Scope | The scopes you're requesting. Include `enroll`, `read:authenticators`, and `remove:authenticators` |
| Username | The resource owner's identifier |
| Password | The resource owner's password |

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"J0...pl\", \"realm\": \"Username-Password-Authentication\", \"grant_type\": \"http://auth0.com/oauth/grant-type/password-realm\", \"audience\": \"https://${account.namespace}/mfa/\", \"scope\": \"enroll read:authenticators remove:authenticators\", \"username\": \"a...@auth0.com\", \"password\": \"YOUR_PASSWORD\" }"
	}
}
```

If successful, your response, which includes your access token, will look like this:

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"ey...Ww",
  "token_type":"Bearer",
  "expires_in":86400
}
```

## Step 2: Use the Access Token to Request Enrollment of the Authenticator

Now that you have the appropriate access token, you can send the appropriate `POST` request to the `/mfa/associate` endpoint to request enrollment of your authenticator.

Currently, you can use enroll two types of authenticators:

* Authenticators using one-time passwords as the MFA challenge
* Authenticators using SMS messages as the MFA challenge

### Authenticators Utilizing One-Time Passwords

### Authenticators Utilizing SMS Messages

## Step 3: Use the Authenticator to Confirm Its Enrollment

## Manage the Authenticators

### List Authenticators

### Delete Authenticators

## Require MFA with Login

### Get the MFA Challenge

### Post the MFA response

## Keep Reading

::: next-steps
* [How to Implement the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
* [Multifactor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password)
:::