# Introduction

The Authentication API enables you to manage all aspects of user identity when you use Auth0. It offers endpoints so your users can log in, sign up, log out, access APIs, and more. 

The API supports various identity protocols, like <dfn data-key="openid">[OpenID Connect](/protocols/oidc)</dfn>, [OAuth 2.0](/protocols/oauth2), and <dfn data-key="security-assertion-markup-language">[SAML](/protocols/saml)</dfn>.

:::note
This API is designed for people who feel comfortable integrating with RESTful APIs. If you prefer a more guided approach check out our [Quickstarts](/quickstarts) or our [Libraries](/libraries).
:::

## Base URL

The Authentication API is served over HTTPS. All URLs referenced in the documentation have the following base: `https://${account.namespace}`

## Authentication methods

You have four options for authenticating with this API:
- OAuth2 <dfn data-key="access-token">Access Token</dfn>
- Client ID and Client Assertion (confidential applications)
- Client ID and Client Secret (confidential applications)
- Client ID (public applications)

### OAuth2 Access Token

Send a valid Access Token in the `Authorization` header, using the `Bearer` authentication scheme.

An example is the [Get User Info endpoint](#get-user-info). In this scenario, you get an Access Token when you authenticate a user, and then you can make a request to the [Get User Info endpoint](#get-user-info), using that token in the `Authorization` header, in order to retrieve the user's profile.

### Client ID and Client Assertion
Generate a [client assertion](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authenticate-with-private-key-jwt) containing a signed JSON Web Token (JWT) to authenticate. In the body of the request, include your Client ID, a `client_assertion_type` parameter with the value `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`, and a `client_assertion` parameter with your signed assertion. Review [Private Key JWT]( https://auth0.com/docs/get-started/authentication-and-authorization-flow/authenticate-with-private-key-jwt) for examples.

### Client ID and Client Secret

Send the Client ID and Client Secret. The method you can use to send this data is determined by the [Token Endpoint Authentication Method](https://auth0.com/docs/get-started/applications/confidential-and-public-applications/view-application-type) configured for your application.

If you are using **Post**, you must send this data in the JSON body of your request.

If you are using **Basic**, you must send this data in the `Authorization` header, using the `Basic` authentication scheme. To generate your credential value, concatenate your Client ID and Client Secret, separated by a colon (`:`), and encode it in Base64.

An example is the [Revoke Refresh Token endpoint](#revoke-refresh-token). This option is available only for confidential applications (such as applications that are able to hold credentials in a secure way without exposing them to unauthorized parties).

### Client ID

Send the Client ID. For public applications (applications that cannot hold credentials securely, such as SPAs or mobile apps), we offer some endpoints that can be accessed using only the Client ID.

An example is the [Implicit Grant](#implicit-grant).

## Parameters

For GET requests, any parameters not specified as a segment in the path can be passed as an HTTP query string parameter:

`GET https://${account.namespace}/some-endpoint?param=value&param=value`

For POST requests, parameters not included in the URL should be encoded as JSON with a Content-Type of `application/json`:

`curl --request POST --url 'https://${account.namespace}/some-endpoint' --header 'content-type: application/json' --data '{"param": "value", "param": "value"}'`

::: note
An exception to that is the [SAML IdP-Initiated Single Sign-on (SSO) Flow](#idp-initiated-sso-flow), which uses both a query string parameter and a `x-www-form-urlencoded` value.
:::

## Code samples

For each endpoint, you will find sample snippets you can use, in three available formats:
- HTTP request
- Curl command
- JavaScript: depending on the endpoint each snippet may use the [Auth0.js library](/libraries/auth0js), Node.js code or simple JavaScript

Each request should be sent with a Content-Type of `application/json`.

## Testing

You can test the endpoints using the [Authentication API Debugger](/extensions/authentication-api-debugger).

### Test with the Authentication API Debugger

The [Authentication API Debugger](/extensions/authentication-api-debugger) is an Auth0 extension you can use to test several endpoints of the Authentication API. 

If it's the first time you use it, you have to install it using the [dashboard](${manage_url}/#/extensions). Once you do, you are ready to configure your app's settings and run your tests. 

Note that its URL varies according to your tenant's region:
- <a href="https://${account.tenant}.us.webtask.io/auth0-authentication-api-debugger" target="_blank">US West</a>
- <a href="https://${account.tenant}.eu.webtask.io/auth0-authentication-api-debugger" target="_blank">Europe Central</a>
- <a href="https://${account.tenant}.au.webtask.io/auth0-authentication-api-debugger" target="_blank">Australia</a>

## Errors

When an error occurs, you will receive an error object. Most of these error objects contain an error code and an error description so that your applications can more efficiently identify the problem.

If you get an `4xx` HTTP response code, then you can assume that there is a bad request from your end. In this case, check the [Standard Error Responses](#standard-error-responses) for more context. 

`5xx` errors suggest a problem on Auth0's end, so in this case, check [Auth0 Status Page](https://status.auth0.com/) and [@auth0status on Twitter](https://twitter.com/auth0status) to see how our systems are doing.

In any other case you can use [our support options](#support).

## Rate limiting

The Authentication API is subject to rate limiting. The limits differ per endpoint.

If you exceed the provided rate limit for a given endpoint, you will receive the `429 Too Many Requests` response with the following message: `Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers.`

For details on rate limiting, refer to [Auth0 API Rate Limit Policy](/policies/rate-limits).

Note that for database connections Auth0 limits certain types of repeat login attempts depending on the user account and IP address. For details, refer to [Rate Limits on User/Password Authentication](/policies/rate-limit-policy/database-connections-rate-limits).

## Support

If you have problems or need help with your case, you can always reach out to our [Support](${env.DOMAIN_URL_SUPPORT}).

Note that if you have a free subscription plan, and you are not in your 22-day trial period, you will not be able to access or open tickets in the [Support Center](${env.DOMAIN_URL_SUPPORT}). In this case, you can seek support through the [Auth0 Community](https://community.auth0.com/). For more info on our support program, refer to [Support Options](/support).
