---
title: Global Rate Limit Policy For Authentication API
description: Learn about the Authentication API Rate Limit Policy for free subscribers
toc: true
topics:
    - auth0-policies
    - rate-limits
    - testing
contentType:
  - reference
useCase:
  - support
---
# Authentication API: Global Rate Limit Policy

To ensure Auth0's quality of service, the Authentication API is subject to several levels of rate limiting.

This document describes the global rate limiting policy applicable to __free subscribers__. For information on other applicable limits, please see [Rate limits](/policies/rate-limits).

## Limits

__Free subscribers__ Authentication API usage is restricted to __300 requests per minute__.

Please be aware that the limit is global for the tenant and not per endpoint.

### Affected endpoints

The global rate limit applies to all [Authentication API](/api/authentication) endpoints. A complete list of endpoints that are affected by this limit, along with the associated response if the rate limit is exceeded, is a follows:

Endpoint | Response
---------|---------
`GET /authorize` |  [Error Page](#error-page)
`GET /passwordless/verify_redirect` |  [Error Page](#error-page)
`POST /dbconnections/change_password` | [JSON Error](#json-error) (`too_many_requests`)
`GET /dbconnections/change_password` | [JSON Error](#json-error) (`too_many_requests`)
`POST /dbconnections/self_change_password` | [JSON Error](#json-error) (`too_many_requests`)
`POST /co/authenticate` |  [JSON Error](#json-error) (`access_denied`)
`POST /delegation` | [JSON Error](#json-error) (`too_many_requests`)
`GET /delegation` | [JSON Error](#json-error) (`too_many_requests`)
`GET /activate` | [Error Page](#error-page)
`POST /activate` | [Error Page](#error-page)
`POST /oauth/device/code` |  [JSON Error](#json-error) (`access_denied`)
`POST /oauth/ro` |  [JSON Error](#json-error) (`access_denied`)
`GET /oauth/ro` |  [JSON Error](#json-error) (`access_denied`)
`POST /oauth/token` |  [JSON Error](#json-error) (`access_denied`)
`POST /oauth/introspect` |  [JSON Error](#json-error) (`access_denied`)
`GET /passwordless/start` | [JSON Error](#json-error) (`too_many_requests`)
`POST /passwordless/start` | [JSON Error](#json-error) (`too_many_requests`)
`POST /u/reset-password/request/:connection` | [Error Page](#error-page)
`GET /u/consent` | [Error Page](#error-page)
`POST /u/consent` | [Error Page](#error-page)
`GET /u/login` | [Error Page](#error-page)
`POST /u/login` | [Error Page](#error-page)
`GET /u/mfa-country-codes` | [Error Page](#error-page)
`POST /u/mfa-country-codes` | [Error Page](#error-page)
`GET /u/mfa-email-challenge` | [Error Page](#error-page)
`POST /u/mfa-email-challenge` | [Error Page](#error-page)
`GET /u/mfa-email-enrollment` | [Error Page](#error-page)
`POST /u/mfa-email-enrollment` | [Error Page](#error-page)
`GET /u/mfa-email-enrollment-verify` | [Error Page](#error-page)
`POST /u/mfa-email-enrollment-verify` | [Error Page](#error-page)
`GET /u/mfa-email-list` | [Error Page](#error-page)
`POST /u/mfa-email-list` | [Error Page](#error-page)
`GET /u/mfa-enroll-options` | [Error Page](#error-page)
`POST /u/mfa-enroll-options` | [Error Page](#error-page)
`GET /u/mfa-guardian-list` | [Error Page](#error-page)
`POST /u/mfa-guardian-list` | [Error Page](#error-page)
`GET /u/mfa-guardian-welcome` | [Error Page](#error-page)
`POST /u/mfa-guardian-welcome` | [Error Page](#error-page)
`GET /u/mfa-login-options` | [Error Page](#error-page)
`POST /u/mfa-login-options` | [Error Page](#error-page)
`GET /u/mfa-otp-challenge` | [Error Page](#error-page)
`POST /u/mfa-otp-challenge` | [Error Page](#error-page)
`GET /u/mfa-otp-enrollment` | [Error Page](#error-page)
`POST /u/mfa-otp-enrollment` | [Error Page](#error-page)
`GET /u/mfa-push-challenge` | [Error Page](#error-page)
`POST /u/mfa-push-challenge` | [Error Page](#error-page)
`GET /u/mfa-push-enrollment` | [Error Page](#error-page)
`POST /u/mfa-push-enrollment` | [Error Page](#error-page)
`GET /u/mfa-recovery-code-challenge` | [Error Page](#error-page)
`POST /u/mfa-recovery-code-challenge` | [Error Page](#error-page)
`GET /u/mfa-recovery-code-challenge-new-code` | [Error Page](#error-page)
`POST /u/mfa-recovery-code-challenge-new-code` | [Error Page](#error-page)
`GET /u/mfa-recovery-code-enrollment` | [Error Page](#error-page)
`POST /u/mfa-recovery-code-enrollment` | [Error Page](#error-page)
`GET /u/mfa-sms-challenge` | [Error Page](#error-page)
`POST /u/mfa-sms-challenge` | [Error Page](#error-page)
`GET /u/mfa-sms-enrollment` | [Error Page](#error-page)
`POST /u/mfa-sms-enrollment` | [Error Page](#error-page)
`GET /u/mfa-sms-enrollment-verify` | [Error Page](#error-page)
`POST /u/mfa-sms-enrollment-verify` | [Error Page](#error-page)
`GET /u/mfa-sms-list` | [Error Page](#error-page)
`POST /u/mfa-sms-list` | [Error Page](#error-page)
`GET /u/reset-password` | [Error Page](#error-page)
`POST /u/reset-password` | [Error Page](#error-page)
`GET /u/reset-password/request/:connection` | [Error Page](#error-page)
`GET /u/signup` | [Error Page](#error-page)
`POST /u/signup` | [Error Page](#error-page)
`GET /tokeninfo` | Text: "Rate limit exceed"
`POST /tokeninfo` | Text: "Rate limit exceed"
`POST /userinfo` | Text: "Rate limit exceed"
`GET /userinfo` | Text: "Rate limit exceed"
`POST /usernamepassword/login` | [JSON Error](#json-error) (`too_many_requests`)
`GET /usernamepassword/login` | [JSON Error](#json-error) (`too_many_requests`)
`GET /.well-known/jwks.json` | Text: "Rate limit exceed"
`GET /.well-known/openid-configuration` |  [JSON Error](#json-error) (`access_denied`)
`GET /cer/:clientID?` | Text: "Rate limit exceed"
`GET /pb7/:clientID?` | Text: "Rate limit exceed"
`GET /pem/:clientID?` | Text: "Rate limit exceed"
`GET /rawpem/:clientID?` | Text: "Rate limit exceed"
`GET /samlp/:clientID` | Text: "Rate limit exceed"
`POST /samlp/:clientID` | Text: "Rate limit exceed"
`GET /samlp/metadata` | Text: "Rate limit exceed"
`GET /samlp/metadata/:clientID` | Text: "Rate limit exceed"
`GET /:clientID/trust/mex` | XML Error (`wst:RequestFailed`)
`POST /:clientID/trust/usernamemixed` | XML Error (`wst:RequestFailed`, Status Code: 500)
`GET /decision` | [Error Page](#error-page)
`POST /decision` | [Error Page](#error-page)
`POST /drwatson` | Text: "Rate limit exceed"
`POST /mfa/associate` |  [JSON Error](#json-error) (`access_denied`)
`GET /mfa/authenticators` |  [JSON Error](#json-error) (`access_denied`)
`DELETE /mfa/authenticators/:authenticator_id` |  [JSON Error](#json-error) (`access_denied`)
`POST /mfa/challenge` |  [JSON Error](#json-error) (`access_denied`)
`GET /oauth/access_token` |  [JSON Error](#json-error) (`access_denied`)
`POST /oauth/access_token` |  [JSON Error](#json-error) (`access_denied`)
`GET /p/:strategy/:ticket` | Text: "Rate limit exceed"
`POST /p/:strategy/:ticket` | Text: "Rate limit exceed"
`GET /p/:strategy/:ticket/info` | Text: "Rate limit exceed"
`GET /passwordless/verify` | [JSON Error](#json-error) (`too_many_requests`)
`POST /passwordless/verify` | [JSON Error](#json-error) (`too_many_requests`)
`GET /rms` | [Error Page](#error-page)
`GET /rms/:clientID/adfs/fs/federationserverservice.asmx` | XML Error (`fed:BadRequest`)
`POST /rms/:clientID/adfs/fs/federationserverservice.asmx` | XML Error (`fed:BadRequest`)
`GET /rms/:clientID/FederationMetadata/2007-06/FederationMetadata.xml` | [JSON Error](#json-error) (`too_many_requests`)
`GET /samlp/:clientID/logout` | [Error Page](#error-page)
`POST /samlp/:clientID/logout` | [Error Page](#error-page)
`GET /samlp/idp/slo` | Text: "Rate limit exceed"
`GET /sso_dbconnection_popup/:clientID` |  [JSON Error](#json-error) (`access_denied`)
`GET /wsfed` | [Error Page](#error-page)
`GET /wsfed/:clientID` | [Error Page](#error-page)
`GET /wsfed/:clientID/FederationMetadata/2007-06/FederationMetadata.xml` | [Error Page](#error-page)
`GET /wsfed/FederationMetadata/2007-06/FederationMetadata.xml` | [Error Page](#error-page)
`GET /.well-known/apple-app-site-association` |  [JSON Error](#json-error) (`access_denied`)
`GET /.well-known/assetlinks.json` |  [JSON Error](#json-error) (`access_denied`)
`GET /adfs/fs/federationserverservice.asmx` | XML Error (`fed:BadRequest`)
`POST /adfs/fs/federationserverservice.asmx` | XML Error (`fed:BadRequest`)
`GET /apple-app-site-association` |  [JSON Error](#json-error) (`access_denied`)
`GET /aws-saml/metadata` | Text: "Rate limit exceed"
`GET /changepwd/completed` | [JSON Error](#json-error) (`too_many_requests`)
`GET /changepwd/form` | [Error Page](#error-page)
`POST /changepwd/reset` | [JSON Error](#json-error) (`too_many_requests`)
`POST /co/verify` | Text: "Rate limit exceed"
`GET /continue` | [Error Page](#error-page)
`POST /continue` | [Error Page](#error-page)
`GET /custom-login/preview` | [JSON Error](#json-error) (`too_many_requests`)
`POST /dbconnections/delete` | [JSON Error](#json-error) (`too_many_requests`)
`GET /dbconnections/login` | [JSON Error](#json-error) (`too_many_requests`)
`POST /dbconnections/login` | [JSON Error](#json-error) (`too_many_requests`)
`GET /dbconnections/signup` | [JSON Error](#json-error) (`too_many_requests`)
`POST /dbconnections/signup` | [JSON Error](#json-error) (`too_many_requests`)
`POST /dbconnections/verify_email` | [JSON Error](#json-error) (`too_many_requests`)
`GET /FederationMetadata/2007-06/FederationMetadata.xml` | XML Error (`fed:BadRequest`)
`GET /i/login` | [Error Page](#error-page)
`GET /i/login/sso/:provider` | Text: "Rate limit exceed"
`GET /i/oauth2/authorize` |  [JSON Error](#json-error) (`access_denied`)
`GET /login` | [Error Page](#error-page)
`GET /login/callback` | [Error Page](#error-page)
`POST /login/callback` | [Error Page](#error-page)
`GET /logout` | [Error Page](#error-page)
`POST /logout` | [Error Page](#error-page)
`GET /mf` | [Error Page](#error-page)
`POST /mf` | [Error Page](#error-page)
`POST /oauth/reverse` |  [JSON Error](#json-error) (`access_denied`)
`POST /oauth/revoke` |  [JSON Error](#json-error) (`access_denied`)
`POST /state/introspect` | [JSON Error](#json-error) (`too_many_requests`)
`GET /unblock` | [Error Page](#error-page)
`POST /unlink` | [JSON Error](#json-error) (`too_many_requests`)
`GET /user/ssodata` | Text: "Rate limit exceed"
`GET /users/:id/impersonate` | [JSON Error](#json-error) (`too_many_requests`)
`POST /users/:id/impersonate` | [JSON Error](#json-error) (`too_many_requests`)
`GET /v2/logout` | [Error Page](#error-page)

## Exceeding the Rate Limit

If you exceed the rate limit for a given API endpoint, you'll receive an [HTTP 429 (Too Many Requests)](http://tools.ietf.org/html/rfc6585#section-4) response (except for the cases documented in the [previous section](#affected-endpoints)). The response will also contain [HTTP Response Headers](/policies/rate-limits#http-response-headers) that provide additional information on the rate limits applicable to that endpoint.

If you exceed the global rate limit, the following example log entry will be emitted to your logs: **You have reached the global limit for your account**. There will be a single log entry per hour while your account exceeds the rate limit.

To view the log entries for a subscription, navigate the to [Logs](${manage_url}#/logs) page in the [Dashboard](${manage_url}).

### Reducing the number of calls to Auth0

When you exceed your rate limits, you'll need to reduce the number of calls you make to Auth0. The specifics depend on your use case, but here are some recommendations:

 * Cache `/.well-known/*` responses: This information does not change frequently, so you can usually cache it to reduce the number of times you need to call Auth0.
 
 * Consider requesting an `id_token` instead of calling `/userinfo` to get information about the user.

### Response body

The response body you receive depends on the endpoint. Each endpoint typically provides a return value in a different format (for example, some return an HTTP response, while others redirect to a URL and pass values in the query string). If the endpoint typically provides the response expected as JSON in the HTTP body, then a JSON error response will be sent if a rate limit is reached (exceptions are documented above).

To view the particular response per endpoint, see [Affected endpoints](#affected-endpoints). Descriptions of each possible error are listed below.

#### Error Page

The Error Page response is sent for endpoints that render HTML content to the end user. When you exceed the rate limit, Auth0 renders the [Error Page](/universal-login/custom-error-pages) instead of the expected content.

#### JSON Error

Endpoints that usually provide JSON-formatted responses will return a JSON object containing an error code and description.

```json
{
  "error": "access_denied or too_many_requests",
  "error_description": "Global rate limit exceeded",
  "error_uri": "https://.../... documentation url"
}
```

The error you receive depends on the type of endpoint you're calling:

* `access_denied`: for OAuth endpoints 
* `too_many_requests`: for endpoints that return JSON

#### XML Error

XML Errors are returned for endpoints that normally return XML.

```xml
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" ...>
 <env:Body>
  <env:Fault>
   <env:Code>
     <env:Value>env:Sender</env:Value>
     <env:Subcode>
      <env:Value>fed:BadRequest or wst:RequestFailed</env:Value>
     </env:Subcode>
   </env:Code>
   <env:Reason>
     <env:Text xml:lang="en">Global rate limit exceeded</env:Text>
   </env:Reason>
   <env:Detail>
   </env:Detail>
  </env:Fault>
 </env:Body>
</env:Envelope>
```

The error you receive depends on the type of endpoint you're calling:

- `fed:BadRequest` will be sent for WSFed-related endpoints.
- `wst:RequestFailed` will be used in for WSTrust-related endpoints.
