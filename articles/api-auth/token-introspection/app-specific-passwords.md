---
description: How to use app-specific password flows
---

# Application-Specific Passwords

An **application-specific password** (ASP) can be used to get you limited access to a protected resource, such as an API. In Auth0, you can use them in one of two ways:

* As a replacement for the password portion of your credentials when using basic authentication. More specifically, instead of providing your username/password combination, you'd provide your username/ASP combination;
* As an alternative to Bearer tokens when calling your API.

## Prerequisites

Before you can use Application-Specific Passwords (ASP), you'll need to complete the following steps:

1. Provide your API's public key to Auth0
2. Set up the client grant for ASP

### Step 1: Provide Your API's Public Key to Auth0

There are three ways by which Auth0 can obtain the public key:

1. You can define the `verificationKey` on the API's Auth0 record. This is a JSON Web Key (JWK) or PEM-encoded certificate.
2. You can define the `verificationLocation` on the API's Auth0 record. This is a URI from which Auth0 fetches JSON Web Keys (JWK).
3. If the API's `identifier` is `http:`- or `https:`-based (such as `https://example.com/foo`), then Auth0 attempts to fetch the key from the well-known JWK registry of the host (for the provided URI example, Auth0 attempts to fetch from `https://example.com/.well-known/jwks.json`).

### Step 2: Set Up the Client Grant for App-Specific Passwords

Ensure that you've granted the appropriate [scopes](/scopes/current#api-scopes) (such as `read`, `create`, `delete:user_application_passwords`) to the [Client](/clients) you'll be using with the Management API. These are the scopes needed for the client to be able to call the Management API endpoints to manage ASPs.

## Create an Application-Specific Password

To **create** an application-specific password using the Management API, make a `POST` call to the `application-passwords` endpoint for a specific user (identified by the unique ID included in the URL to the API endpoint).

::: note
The only time you can view the value of the App-Specific Password is during creation.
:::

Scope required for your Management API Access Token: `create:user_application_passwords`

**Parameters**:

* `user_id` [**string**]: the unique ID used to identify the user to whom the ASP is assigned

**Payload Body**:

* `label`[ **string**]: free text of 100 characters to describe your ASP
* `audience` [**string**]: identifier of the API
* `scope` [**array**]: list of allowed scopes for this token

```har
{
	"method": "POST",
	"url": "https://${account.namespace}.auth0.com/api/v2/users/YOUR_USER_ID/application-passwords",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"label\": \"My app\",\"audience\": \"https://my-api/service\",\"scope\": [\"read:foo\", \"create:foo\", \"update:foo\"]}"},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

**Sample Response**:

```json
{
  "id": "asp_......",
  "label": "YOUR LABEL HERE",
  "audience": "https://my-api/service",
  "scope": ["read:foo", "create:foo"],
  "value": "abcdefghijklmnop",
  "created_at": "2017-03-17T21:30:33.032Z"
}
```

- `id` [**String**]: unique ASP identifier
- `label` [**String**]: free text input up to `100` characters
- `audience` [**String**]: text identifier of resource server API
- `scope` [**Array**]: list of allowed scopes for the token
- `value` [**String**]: generated token/password consisting of 16 letters
- `created_at` [**String**]: - date of ASP creation

## List Existing Application-Specific Passwords

You can use the Management API to get a list of existing application-specific passwords for a given user.

Scope required for your Management API Access Token: `read:user_application_passwords`

**Parameters**:

* `user_id` [**string**]: the unique ID used to identify the user whose ASP information you want returned

**Payload Body**: None

```har
{
	"method": "GET",
	"url": "https://${account.namespace}.auth0.com/api/v2/users/YOUR_USER_ID/application-passwords",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}]
}
```

**Sample Response**:

```json
[{
  "id": "...",
  "label": "...",
  "audience": "...",
  "scope": ["...", "..."],
  "created_at": "...",
  "last_accessed": "..."
}, {
  "id": "...",
  "label": "...",
  "audience": "...",
  "scope": ["...", "..."],
  "created_at": "...",
  "last_accessed": "..."
}]
```

- `id` [**String**]: unique ASP identifier
- `label` [**String**]: free text input up to `100` characters
- `audience` [**String**]: text identifier of resource server API
- `scope` [**Array**]: list of allowed scopes for the token
- `value` [**String**]: generated token/password consisting of 16 letters
- `created_at` [**String**]: - date of ASP creation
`last_accessed` [**String**]: date the last time the ASP was used

## Delete an Application-Specific Password

You can use the Management API to delete a user's ASP.

Scope required for your Management API Access Token: `delete:user_application_passwords`

**Parameters**:

* `user_id` [**string**]: the unique ID used to identify the user whose ASP information you want returned
* `asp_id` [**string**]: the ASP unique identifier retrieved as the `id` property using the `GET` endpoint response

**Payload Body**: None

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}.auth0.com/api/v2/users/YOUR_USER_ID/application-passwords/ASP_TO_DELETE",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}]
}
```

**Sample Response**: HTTP `204`

## Use App-Specific Passwords in a Basic Authentication Flow

In this scenario, your API accepts a username and password combination. The user may provide either their actual credentials *or* a username and an app-specific password.

If the user opts for the latter option, your API should check the credentials against Auth0's [`/oauth/token` endpoint](/api/authentication#client-credentials) using `grant_type`: `password` (for full instructions on how to configure this type of authentication flow, please see [How to Implement the Resource Owner Password Grant](https://auth0.com/docs/api-auth/tutorials/password-grant#optional-customize-the-tokens))

If the authentication fails, the API then uses [token introspection](/api-auth/token-introspection#calling-the-authentication-api-s-token-introspection-endpoint) to verify that the password is a valid app-specific password. If it is, and the ASP is active, the API will return the claims associated with the token. Based on these results, your API can make authorization decisions.

## Use App-Specific Passwords as Bearer Tokens

Your API consumes ASPs the same way it would consume any other Bearer token, regardless of whether it's a JWT or not.

The primary difference, however, is that using JWT access tokens means that you don't have to make a call to Auth0 to check the token's validity -- the API can verify the validity of the token on its own by checking the token's signature.

With ASPs, your API (which is also known as the *resource server*) needs to call Auth0 to check the ASPs's validity, as well as the validity of the claims associated with the tokens.

Sample flow:

1. The user uses the ASP as a Bearer token to call your API
2. The API recognizes the token as non-JWT, so it has to [introspect](/api-auth/token-instrospection). It makes a call to `oauth/introspect`, and the response indicates whether the token is active or not. If the token is active, the endpoint also returns the claims associated with the token. The response looks something like this:

    ```json
    {
      "token_type": "application_specific_password_token",
      "scope": "read:foo create:foo update:foo",
      "iat": 1490234011,
      "sub": "auth0|1234",
      "aud": "https://demo.api",
      "iss": "https://tenant.auth0.com/",
      "active": true,
      "username": "user@gmail.com"
    }
    ```

3. Upon receiving the results of the call, the API can make an authorization decision, such as whether the user is allowed to use the indicated scopes.

::: note
Anytime the token introspection endpoint is called using an ASP, the ASP record is updated with the `last_accessed` timestamp.
:::
