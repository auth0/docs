---
description: Learn how to call an API from a server process using OAuth 2.0 and the Client Credentials grant.
toc: true
topics:
  - api-authentication
  - oidc
  - client-credentials
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Implement the Client Credentials Grant

The **Client Credentials Grant** (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) allows an application to request an Access Token using its __Client Id__ and __Client Secret__. It is used for non interactive applications (a CLI, a daemon, or a Service running on your backend) where the token is issued to the application itself, instead of an end user.

Before beginning this tutorial, please:

* Make sure you that your application has the `Client Credentials` [grant type enabled](/dashboard/guides/applications/update-grant-types). Regular web applications and machine to machine applications have it enabled by default.

* [Register the API](/apis#how-to-configure-an-api-in-auth0) with Auth0 with the required <dfn data-key="scope">scopes</dfn>.

* Authorize the application to call the API by creating a Client Grant either [using the Dashboard](/api-auth/config/using-the-auth0-dashboard) or [using the Management API](/api-auth/config/using-the-management-api).

## Ask for a token

To ask Auth0 for tokens for any of your authorized applications, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "client_credentials"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "audience",
        "value": "YOUR_API_IDENTIFIER"
      }
    ]
  }
}
```

Where:

* `grant_type`: This must be `client_credentials`.
* `client_id`: Your application's Client ID. You can find this value at the [application's settings tab](${manage_url}/#/applications).
* `client_secret`: Your application's Client Secret. You can find this value at the [application's settings tab](${manage_url}/#/applications).
* `audience`: The **Identifier** value on the [Settings](${manage_url}/#/apis) tab for the API you created as part of the prerequisites for this tutorial.

The response contains a signed <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn>, the token's type (which is `Bearer`), and in how much time it expires in [Unix time](https://en.wikipedia.org/wiki/Unix_time) (86400 seconds, which means 24 hours).

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

If you [decode the `access_token`](https://jwt.io/#debugger-io) you will see that it contains the following claims:

```json
{
  "iss": "https://${account.namespace}/",
  "sub": "YOUR_MACHINE_TO_MACHINE_APPLICATION_CLIENT_ID@clients",
  "aud": "YOUR_API_IDENTIFIER",
  "exp": 1489715431, // unix timestamp of the token's expiration date,
  "iat": 1489679431, // unix timestamp of the token's creation date,
  "scope": ""
}
```

## Modify scopes and claims

You can change the <dfn data-key="scope">scopes</dfn> and add custom claims to the Access Token you got, using [Hooks](/hooks).

Hooks allow you to customize the behavior of Auth0 using Node.js code. They are secure, self-contained functions associated with specific extensibility points of the Auth0 platform (like the Client Credentials grant). Auth0 invokes the Hooks at runtime to execute your custom logic.

For more information and details on how to do that refer to [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).

## Verify the token

Once your API receives a request with a Bearer Access Token, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, see [Validate Access Tokens](/tokens/guides/validate-access-tokens). You can find examples on how to do it in different platforms in the [Quickstarts for backend applications](/quickstart/backend).

## Sample application

For an example implementation see the [Server Client + API](/architecture-scenarios/application/server-api) architecture scenario.

This is a series of tutorials that describe a scenario for a fictitious company that wants to implement a Timesheets API and send timesheets entries from a server process using OAuth 2.0. The tutorials are accompanied by a sample that you can access in [GitHub](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets).

## Keep reading

- [Use Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks)
- [Tokens](/tokens)
