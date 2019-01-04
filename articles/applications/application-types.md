---
title: Application Classifications
description: Read about the different application classifications
toc: true
topics:
  - applications
  - application-types
contentType: reference
useCase:
  - build-an-app
---

# Application Classifications

<%= include('../_includes/_pipeline2') %>

When working with Auth0 applications, which are used to represent your applications, there are several terms you should know regarding how applications are classified:

* [Confidential vs public application types](#confidential-vs-public-applications)
* [First vs third-party application ownership](#first-vs-third-party-applications) 

## Confidential vs. public applications

The OAuth 2.0 specification [defines two types of applications](https://tools.ietf.org/html/rfc6749#section-2.1): public and confidential. 

When creating an application through the [Dashboard](${manage_url}/#/applications), Auth0 will ask you what type of application you want the application to represent and use that information to determine the application type.

### Check your application type

Auth0 determines the **Application Type** based on the **Token Endpoint Authentication Method** setting on the application's settings page in the Dashboard.

|Application Type|Token Endpoint Authentication Method|
|-|-|
|Public|**None**|
|Confidential|**Basic**, **Post**, unspecified|

::: panel Token Endpoint Authentication Method
The `Token Endpoint Authentication Method` defines how a Confidential Application authenticates against the [token endpoint](/api/authentication#authorization-code). Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for an application using HTTP POST parameters
* `Basic`, for an application using HTTP Basic parameters 

Additionally, any Application where the Token Endpoint Authentication Method is unspecified is confidential.

You can find this field at the [Application Settings page](${manage_url}/#/applications/${account.clientId}/settings) of the [Auth0 Dashboard](${manage_url}).
:::

### Confidential applications

Confidential applications can hold credentials (such as a client ID and secret) securely without exposing them to unauthorized parties. This means that you will need a trusted backend server to store the secret(s).

The following application types use confidential applications:

* A web application with a secure backend using the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), or[Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* A machine-to-machine application using the [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow)

All of these grants require applications to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential applications are capable of holding secrets, you can choose to have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically using their client secret (`HS256`)
* Asymmetrically using a private key (`RS256`)

### Public applications

Public applications **cannot** hold credentials securely. The following application types use public applications:

* Native desktop or mobile applications using the [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow)
* JavaScript-based client-side web applications (such as single-page apps) using the [Single-Page Login Flow](/flows/concepts/single-page-login-flow)

Since public applications are unable to hold secrets, [ID Tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## First vs. third-party applications

First-party and third-party refer to the ownership of the application. This has implications regarding who has administrative access to your Auth0 domain.

### Check your application ownership setting

You can use the Management API's [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id) to check your existing Application's ownership configuration. If the application is classified as first-party, the `is_first_party` equals `true`, else `false`. Be sure to replace `CLIENT_ID` with the ID of your application.

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

### First-party applications

First-party applications are those controlled by the same organization or person who owns the Auth0 domain. For example, if you wanted to access the Contoso API, you'd use a first-party application to log into `contoso.com`.

All applications created via the [Dashboard](${manage_url}/#/applications) are first-party by default.

### Third-party applications

Third-party applications are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to access protected resources behind your API securely. For example, if you were to create a developer center that allows users to obtain credentials to integrate their apps with your API (this functionality is similar to those provided by well-known APIs such as Facebook, Twitter, and GitHub), you would use third-party applications.

Third-party applications must be created through the [Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.

<%= include('../_includes/_enable-third-party-apps-info') %>

Third party applications have the following characteristics:

- They cannot skip user consent when consuming APIs. This is for security purposes, as anyone can create an application, but each application relies on the final user to provide consent.
- The [ID Tokens](/tokens/id-token) generated for these applications, hold minimum user profile information.
- They can use only tenant [level connections (domain connections)](/applications/enable-third-party-applications#promote-connections). 
- They cannot use [ID Tokens](/tokens/id-token) to invoke [Management APIv2](/api/management/v2) endpoints. Instead, they should get a Management APIv2 Token (see the *How to get a Management APIv2 Token* panel for details). Note that the applications should be granted the `current_user_*` scopes, as required by each endpoint.
  - `read:current_user`: [List or search users](/api/management/v2#!/Users/get_users), [Get a user](/api/management/v2#!/Users/get_users_by_id), [Get user Guardian enrollments](/api/management/v2#!/Users/get_enrollments)
  - `update:current_user_metadata`: [Update a user](/api/management/v2#!/Users/patch_users_by_id), [Delete a user's multi-factor provider](/api/management/v2#!/Users/delete_multifactor_by_provider)
  - `create:current_user_device_credentials`: [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials)
  - `delete:current_user_device_credentials`: [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id)
  - `update:current_user_identities`: [Link a user account](/api/management/v2#!/Users/post_identities), [Unlink a user identity](/api/management/v2#!/Users/delete_provider_by_user_id)

::: panel How to get a Management APIv2 Token
In order to access the [Management APIv2](/api/management/v2) endpoints from a third party applications, you need a Management APIv2 Token. To get one you can use any of the [API Authorization Flows](/api-auth), with the following request parameters:
- `audience=https://${account.namespace}/api/v2/`
- `scope=read:current_user update:current_user_metadata`
:::
