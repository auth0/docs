---
title: Amazon API Gateway Tutorial - Secure AWS API Gateway Using Cognito
description: How to secure the API Gateway Tutorial using Cognito instead of IAM roles and policies.
---

# Secure AWS API Gateway Using Cognito

Instead of using IAM roles and policies to secure your API, you can do so using user pools in Amazon Cognito.

> Please [create the appropriate Amazon Cognito User Pools](http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-cognito-user-identity-pools.html) prior to beginning this tutorial.

Go to the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway). Using the left-hand navigation bar, select the **SecurePets** API.

Then, select **Authorizers** for the **SecurePets** API.

On the *Authorizers* column, choose **Create** and indicate that you are creating a **Cognito User Pool Authorizer**.

At this point, you will provide the following configuration details for this authorizer:

* **Cognito region**:
* **Cognito user pool**:
* **Authorizer name**:
* **Identity token source**:
* **App client ID regex**:
