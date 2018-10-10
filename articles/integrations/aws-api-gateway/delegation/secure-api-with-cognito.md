---
title: Amazon API Gateway Tutorial - Secure AWS API Gateway Using Cognito
description: How to secure the API Gateway Tutorial using Cognito instead of IAM roles and policies.
topics:
  - integrations
  - aws
  - api-gateway
  - cognito
contentType: tutorial
useCase:
  - secure-an-api
---

# Secure AWS API Gateway Using Cognito

Instead of using IAM roles and policies to secure your API, you can do so using user pools in Amazon Cognito.

::: note
Please [create the appropriate Amazon Cognito User Pools](http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-cognito-user-identity-pools.html) prior to beginning this tutorial.
:::

## Integrate the Cognito User Pool with the API Gateway API

Go to the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway). Using the left-hand navigation bar, select the **SecurePets** API.

Then, select **Authorizers** for the **SecurePets** API.

![API nav area to select authorizers](/media/articles/integrations/aws-api-gateway/create-user-pool-authorizer.png)

On the *Authorizers* column near the center of the screen, choose **Create** and indicate that you are creating a **Cognito User Pool Authorizer**.

![API config page for authorizers](/media/articles/integrations/aws-api-gateway/config-authorizer.png)

To configure your authorizer:

1. Choose the **Cognito region** in which you created your User Pool.
2. Customize the **Authorizer name** field, if desired (it will be automatically populated with the name of the chosen User Pool, so you can opt to leave it as is)
3. Customize the **Identity token source** field. By default, this field is set to `method.request.header.Authorization`, which sets the name of the incoming request header containing the API caller's identity token to `Authorization`.
4. If desired, add a regular expression to the **App client ID regex** field to validate client IDs associated with the User Pool.

When you've finished configuring your authorizer, click **Create** to integrate the User Pool with your API.

## Enable the User Pool Authorizer on Methods

For each method that you want the User Pool to act as an authorizer, you must enable the User Pool to do so for that particular method.

To enable the User Pool authorizer on the `GET` method:

1. After selecting the *SecurePets* API, select the `GET` method listed under `/pets`.

  ![enabling authorizer for API method](/media/articles/integrations/aws-api-gateway/create-user-pool-authorizer.png)

2. Click on **Method Request**.
3. Under *Authorization Settings*, click on the **edit icon** next to the *Authorization* field.
4. Choose the appropriate Cognito User Pool authorizer from the list. Click the **checkmark icon** to save your selection.

  ![selecting authorizer for a given API method](/media/articles/integrations/aws-api-gateway/set-authorizer.png)

Repeat this process for any additional methods for which you want the Cognito User Pool to act as an authorizer (`GET` and `PURCHASE` for `/pets`, as well as `POST` for `/purchase`).
