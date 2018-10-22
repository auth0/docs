---
description: How to set the Access Token format
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# Set the Access Token Format

Auth0 generates Access Tokens in two formats: 
* Opaque strings: When not using a custom API
* [JSON Web Tokens (JWTs)](/jwt): When using a custom API

Set the format using the value of the **audience** parameter in the [authorization request](/api/authentication#authorize-application). The **audience** is a parameter set during [authorization](/api/authentication#authorize-application), and it contains the unique identifier of the target API. This is how you tell Auth0 for which API to issue an Access Token (in other words, which is the intended *audience* of this token). 

## Set Access Token format to an opaque string
If you do not want to access a custom API, set the **audience** parameter to `${account.namespace}/userinfo` to make the Access Token an opaque string.

## Set Access Token format to a JWT
Auth0 creates Access Tokens in JWT format for custom APIs. JWTs contain three parts:

* **Header**: The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
* **Claims**: The set of claims contains verifiable security statements such as the identity of the user and the permissions they are allowed.
* **Signature**: The signature is used to validate that the token is trustworthy and has not been tampered with.

Set the **audience** to the unique identifier of a custom API to make the Access Token a [JWT](/jwt).

When the **audience** is set to a custom API and the **scope** parameter includes the `openid` value, then the generated Access Token will be a JWT valid for both [retrieving the user's profile](/api/authentication#get-user-info) and for accessing the custom API. The `aud` claim of this JWT will include two values: `${account.namespace}/userinfo` and your custom API's unique identifier.

:::panel Use RS256 for multiple audiences
If you set a custom API audience and also use `scope=openid` in your request, then your custom API must use **RS256** (see [how to change an API's settings](/apis#api-settings)). For security reasons, tokens signed with HS256 can hold only one audience. This also applies if you have set a **Default Audience** at your [API Authorization settings](${manage_url}/#/tenant).
:::

::: warning
Remember that the application should not depend on the Access Token to be any specific format; instead treat the Access Token as opaque. It is meant **only** for the API.
:::
