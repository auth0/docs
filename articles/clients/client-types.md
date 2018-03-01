---
title: Public and confidential, first vs. third-party clients
---
# Client Types

<%= include('../_includes/_pipeline2') %>

When working with Auth0 clients, which are used to represent your applications, there are several terms you should know in terms of how clients are classified:

* Confidential vs. public
* First vs. third-party

## Confidential vs. Public Clients

The OAuth 2.0 specification [defines two types of clients](https://tools.ietf.org/html/rfc6749#section-2.1): public and confidential.

When creating a client through the [Dashboard](${manage_url}/#/clients), Auth0 will ask you what type of application you want the client to represent and use that information to determine the client type.

### Checking Your Client Type

You can use the Management API's [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id) to check your existing Client's type. If the client is first party, the `is_first_party` equals `true`, else `false`. Be sure to replace `CLIENT_ID` with the ID of your Client.

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
See [The Auth0 Management APIv2 Token](/api/management/v2/tokens) for instructions on obtaining the Access Token required to call the Management API.
:::

### Confidential Clients

Confidential clients are able to hold credentials (such as a client ID and secret) in a secure way without exposing them to unauthorized parties. This means that you will need a trusted backend server to store the secret(s).

The following application types use confidential clients:

* A web application with a secure backend using the [Authorization Code grant](/api-auth/grant/authorization-code), [Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* A non-interactive client using the [Client Credentials grant](/api-auth/grant/client-credentials)

All of these grants require clients to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential clients are capable of holding secrets, you can choose to have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically using their client secret (`HS256`)
* Asymmetrically using a private key (`RS256`)

### Public Clients

Public clients **cannot** hold credentials securely. The following application types use public clients:

* Native desktop or mobile applications using the [Authorization Code grant with PKCE](/api-auth/grant/authorization-code-pkce)
* JavaScript-based client-side web applications (such as single-page apps) using the [Implicit](/api-auth/grant/implicit) grant

Since public clients are unable to hold secrets, [ID Tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## First vs. Third-Party Clients

First-party and third-party refer to the ownership of the application. This has implications in terms of who has administrative access to your Auth0 domain.

### First-Party Client

First-party clients are those controlled by the same organization or person who owns the Auth0 domain. For example, if you wanted to access the Contoso API, you'd use a first-party client to log into `contoso.com`.

All clients created via the [Dashboard](${manage_url}/#/clients) are first-party by default.

### Third-Party Client

Third-party clients are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party clients enable external parties or partners to access protected resources behind your API securely. For example, if you were to create a developer center that allows users to obtain credentials to integrate their apps with your API (this functionality is similar to those provided by well-known APIs such as Facebook, Twitter, and GitHub), you would use a third-party client. 

Third-party clients must be created through the [Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.

Third party clients have the following characteristics:

- They cannot skip user consent when consuming APIs. This is for security purposes, as anyone can create a client, but each client relies on the final user to provide consent.
- The [ID Tokens](/tokens/id-token) generated for these clients, hold minimum user profile information.
- They can use only tenant level connections (domain connections). These are sources of users, configured in the tenant's [dashboard](${manage_url}) as connections. These connections are enabled for every third party client and can be also enabled for selected first party (standard) clients.
- To authenticate users using [Lock](/libraries/lock), you will have to use a version greater than `10.7`.
  - [PSaaS Appliance](/appliance) users must use `https://{config.auth0Domain}/` as the value for [the `configurationBaseUrl` option](https://github.com/auth0/lock#other-options).
- They cannot use [ID Tokens](/tokens/id-token) to invoke [Management APIv2](/api/management/v2) endpoints. Instead, they should get a Management APIv2 Token (see the *How to get a Management APIv2 Token* panel for details). Note that the client should be granted the `current_user_*` scopes, as required by each endpoint.
  - `read:current_user`: [List or search users](/api/management/v2#!/Users/get_users), [Get a user](/api/management/v2#!/Users/get_users_by_id), [Get user Guardian enrollments](/api/management/v2#!/Users/get_enrollments)
  - `update:current_user_metadata`: [Update a user](/api/management/v2#!/Users/patch_users_by_id), [Delete a user's multifactor provider](/api/management/v2#!/Users/delete_multifactor_by_provider)
  - `create:current_user_device_credentials`: [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials)
  - `delete:current_user_device_credentials`: [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id)
  - `update:current_user_identities`: [Link a user account](/api/management/v2#!/Users/post_identities), [Unlink a user identity](/api/management/v2#!/Users/delete_provider_by_user_id)

::: panel How to get a Management APIv2 Token
In order to access the [Management APIv2](/api/management/v2) endpoints from a third party client, you need a Management APIv2 Token. To get one you can use any of the [API Authorization Flows](/api-auth), with the following request parameters:
- `audience=https://${account.namespace}/api/v2/`
- `scope=read:current_user update:current_user_metadata`
:::
