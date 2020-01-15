---
title: Check API Calls
description: Learn how to check API calls to troubleshoot issues. 
topics:
  - management-api-calls
  - api-calls
  - access-tokens
contentType: how-to
useCase: troubleshooting
---
# Check API Calls

## Check Management API calls

* Do you have a [Management API Access Token](/api/management/v2/tokens)?
* Did the Access Token expire?
* Did the Access Token contain the scopes needed for the call you made?
* If a rule adjusts the scopes in the Access Token or checks whether specific users are allowed to have the scopes, have you checked the rule to make sure it is executing correctly?  
* Get the Access Token from a [HAR file](/troubleshoot/guides/generate-har-files) and test it in the [Auth0 Management API Explorer](/api/management/v2/) to see if it works there.
* If you are calling the Auth0 Management API from an application that authenticates with [Client Credentials flow](/flows/guides/client-credentials/call-api-client-credentials), note that rules are not executed in this context. The Client Credentials Exchange Hook can be used in this context instead, for functionality similar to a rule.

## Check other API calls

* Check in the [HAR file](/troubleshoot/guides/generate-har-files) if the Access Token contains correct scopes to call the API.
* Check if the response to the `/authorize` endpoint call contains a scopes object. If so, check if the returned scopes are different from the requested scopes.
* Make sure your API can [validate the Access Token](/tokens/guides/validate-access-tokens).  It should validate the audience, issuer, client (if any), signature algorithm, signature, claims and permissions.
* If you experience errors with Access Token expiration, they could be caused by [clock skew differences manifested across different systems](/connector/troubleshooting#clock-skew) or even different language libraries, such as Java and Node.js.  This can be handled by running NTP on servers and configuring a clock skew tolerance in libraries used to validate tokens such as [jwt.verify](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback).

<%= include('../_includes/_log_events_link') %>

## Keep reading

* [Learn Identity Video: Calling an API](/videos/learn-identity/04-calling-an-api)
* [Best Practices: Minimize API requests](/best-practices/performance#minimize-api-requests)
* [Best Practices: Consider use of explicit timeouts when making API calls](/best-practices/performance#consider-use-of-explicit-timeouts-when-making-api-calls)
* [Call APIs Using the Implicit Flow](/flows/guides/implicit/call-api-implicit)
* [Call APIs Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
* [Call APIs Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code)
* [Call APIs Using Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce)
* [Call APIs Using Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth)
* [Call APIs Using Hybrid Flow](/api-auth/grant/hybrid)
* [Call Identity Provider APIs](/connections/calling-an-external-idp-api)
* [Call APIs with Auth0 Tokens](/api-auth/tutorials/adoption/api-tokens)
* [Call APIs from Highly Trusted Applications](/api-auth/grant/password)
* [Call APIs from Machine-to-Machine Applications](/microsites/call-api/call-api-m2m-app)
* [Call AWS APIs and Resources Securely with Tokens](/integrations/aws/tokens)