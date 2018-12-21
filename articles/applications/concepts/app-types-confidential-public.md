---
title: Application Types - Public vs. Confidential
description: Understand the difference between public and confidential application types.
toc: true
topics:
  - applications
  - application-types
contentType: reference
useCase:
  - build-an-app
---
# Application Types: Public vs. Confidential

The OAuth 2.0 specification [defines two types of applications](https://tools.ietf.org/html/rfc6749#section-2.1): public and confidential.

When creating an application through the [Dashboard](${manage_url}/#/applications), Auth0 will ask you what type of application you want the application to represent and use that information to determine the application type.

### Check your application type

You can use the Management API's [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id) to check your existing Application's type. If the application is first party, the `is_first_party` equals `true`, else `false`. Be sure to replace `CLIENT_ID` with the ID of your application.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/clients/CLIENT_ID?fields=is_first_party&include_fields=true",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}]
}
```

::: note
See [Access Tokens for the Management API](/api/management/v2/tokens) for instructions on obtaining the Access Token required to call the Management API.
:::

### Confidential applications

Confidential applications are able to hold credentials (such as a client ID and secret) in a secure way without exposing them to unauthorized parties. This means that you will need a trusted backend server to store the secret(s).

The following application types use confidential applications:

* A web application with a secure backend using the [Authorization Code grant](/api-auth/grant/authorization-code), [Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* A machine to machine application using the [Client Credentials grant](/api-auth/grant/client-credentials)

All of these grants require applications to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential applications are capable of holding secrets, you can choose to have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically using their client secret (`HS256`)
* Asymmetrically using a private key (`RS256`)

### Public applications

Public applications **cannot** hold credentials securely. The following application types use public applications:

* Native desktop or mobile applications using the [Authorization Code grant with PKCE](/api-auth/grant/authorization-code-pkce)
* JavaScript-based client-side web applications (such as single-page apps) using the [Implicit](/api-auth/grant/implicit) grant

Since public applications are unable to hold secrets, [ID Tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token
