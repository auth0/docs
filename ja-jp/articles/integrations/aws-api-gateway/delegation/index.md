---
title: Amazon API Gateway Tutorial Introduction
description: How to build a serverless application using Token-based Authentication with AWS API Gateway and Lambda.
topics:
  - integrations
  - aws
  - api-gateway
contentType:
  - tutorial
  - index
useCase:
  - secure-an-api
---
# Build a Serverless Application Using Token-Based Authentication with AWS API Gateway and Lambda

<%= include('./_delegation-version-warning') %>

<%= include('../../../_includes/_webtask') %>

With AWS, you can create powerful, serverless, highly scalable APIs and applications through AWS Lambda, Amazon API Gateway, and a JavaScript application.

A serverless application runs custom code as a compute service without the need to maintain an operating environment to host your service. Instead, a service like [AWS Lambda](https://aws.amazon.com/lambda/) executes your code on your behalf.

Amazon API Gateway extends the capabilities of AWS Lambda by adding a service layer in front of your Lambda functions to extend security, manage input and output message transformations, and provide capabilities like throttling and auditing. A serverless approach simplifies your operational demands, since concerns like scaling out and fault tolerance are now the responsibility of the compute service that is executing your code.

However, you often want to tie your APIs to your existing users, either from social providers like Twitter and Facebook, or within your own organization from Active Directory or a customer database. This tutorial demonstrates how to authorize access of your Amazon API Gateway methods for your existing users using Auth0 delegation for AWS and integration with AWS Identity and Access Management (IAM).

Next, the tutorial walks you through setting up the Amazon API Gateway using AWS Lambda functions, securing those functions with AWS IAM roles, and then using Auth0 delegation to obtain a token for the AWS IAM role. It will then show you how to assign different permissions to various classes of users, like internal database or social users, and how to flow identity using a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn>.

You will be taken through the following steps:

* [Step 1 - Set up the AWS API Gateway](/integrations/aws-api-gateway/delegation/part-1)
* [Step 2 - Secure and Deploy the Amazon API Gateway](/integrations/aws-api-gateway/delegation/part-2)
* [Step 3 - Build the Application](/integrations/aws-api-gateway/delegation/part-3)
* [Step 4 - Use Multiple Roles with Amazon API Gateway](/integrations/aws-api-gateway/delegation/part-4)
* [Step 5 - Use Identity Tokens to Flow Identity](/integrations/aws-api-gateway/delegation/part-5)

<%= include('./_stepnav', {
 next: ["1. Setup", "/integrations/aws-api-gateway/delegation/part-1"]
}) %>
