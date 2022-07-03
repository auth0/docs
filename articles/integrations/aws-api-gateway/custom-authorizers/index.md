---
description: How to use secure AWS API Gateway using custom authorizers that accept Auth0-issued Access Tokens
topics:
  - integrations
  - aws
  - api-gateway
contentType:
  - index
  - concept
  - tutorial
useCase:
  - secure-an-api
---

# Secure AWS API Gateway Endpoints Using Custom Authorizers

<%= include('../../../_includes/_webtask') %>

With AWS, you can create powerful, serverless, highly scalable APIs and applications using [Lambda](https://aws.amazon.com/lambda/), [API Gateway](https://aws.amazon.com/api-gateway/), and a JavaScript application for the front-end.

A serverless application runs custom code as a compute service without the need to maintain an operating environment to host your service. Instead, a service like [AWS Lambda](https://aws.amazon.com/lambda/) executes your code on your behalf.

The API Gateway extends the capabilities of Lambda by adding a service layer in front of your Lambda functions to extend security, manage input and output message transformations, and provide capabilities like throttling and auditing. A serverless approach simplifies your operational demands since concerns like scaling out and fault tolerance are now the responsibility of the compute service that is executing your code.

This tutorial will show you how to set up your API with API Gateway, create and configure your Lambda functions (including the custom authorizers) to secure your API endpoints, and implement the authorization flow so that your users can retrieve the <dfn data-key="access-token">Access Tokens</dfn> needed to gain access to your API from Auth0.

More specifically, the custom authorizers will:

1. Confirm that the Access Token has been passed via the `authorization` header of the request to access the API
2. Verify the [RS256 signature](/apis#signing-algorithms) of the Access Token using a public key obtained via a [JWKS endpoint](/tokens/concepts/jwks)
3. Ensure the Access Token has the required Issuer `iss` and <dfn data-key="audience">Audience</dfn> `aud` claims

::: note
New to OAuth 2.0? Check out our [introduction to OAuth 2.0](/protocols/oauth2).
:::

To that end, this tutorial will be divided into the following sections.

* [Step 1 - Configure Auth0](/integrations/aws-api-gateway/part-1)
* [Step 2 - Set up and Deploy the AWS API Gateway](/integrations/aws-api-gateway/part-2)
* [Step 3 - Create the Custom Authorizers](/integrations/aws-api-gateway/part-3)
* [Step 4 - Secure the API Using Custom Authorizers](/integrations/aws-api-gateway/part-4)

## How API Gateway Custom Authorizers Work

[According to Amazon](http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html), an API Gateway custom authorizer is a "Lambda function you provide to control access to your API using bearer token authentication strategies, such as OAuth or <dfn data-key="security-assertion-markup-language">SAML</dfn>."

Whenever someone (or some program) attempts to call your API, API Gateway checks to see if there's a custom authorizer configured for the API.

If **there is a custom authorizer for the API**, API Gateway calls the custom authorizer and provides the authorization token extracted from the request header received.

You can use the custom authorizer to implement different types of authorization strategies, including [JWT](/tokens/concepts/jwts) verification, to return IAM policies authorizing the request. If the policy returned is invalid or if the permissions are denied, the API call fails.

For a valid policy, API caches the returned policy, associating it with the incoming token and using it for the current and subsequent requests. You can configure the amount of time for which the policy is cached. The default value is `300` seconds, and the maximum length of caching is `3600` seconds (you can also set the value to 0 to disable caching).

## Before You Begin

Before beginning this tutorial, you'll need to [sign up for an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html). This grants you access to all of the AWS features we'll use in this tutorial, including API Gateway and Lambda. All new members receive twelve months of free tier access to AWS.

<%= include('./_aws-dev-guide-link') %>

## Next steps

* [API Authorization](/api-auth)
* [Get Access Tokens](/tokens/guides/get-access-tokens)
* [JSON Web Key Sets (JWKS)](/tokens/concepts/jwks)

<%= include('./_stepnav', {
 next: ["Configure the Auth0 API", "/integrations/aws-api-gateway/custom-authorizers/part-1"]
}) %>