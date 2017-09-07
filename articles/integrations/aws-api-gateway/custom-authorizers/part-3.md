---
description: How to set your API methods to use your custom authorizer
---

# AWS Part 3: Secure the API Using Custom Authorizers

In [part 1](/integrations/aws-api-gateway/custom-authorizers/part-1), you configured an API using API Gateway, and in [part 2](/integrations/aws-api-gateway/custom-authorizers/part-2), you created the custom authorizer that can be used to retrieve the appropriate policies when your API receives an access request. In this part of the tutorial, we will show you how to use the custom authorizer to secure your API's endpoints.

## Configure API Gateway Resources to use the Custom Authorizer

Log in to AWS and navigate to the [API Gateway Console](http://console.aws.amazon.com/apigateway).

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-1.png)

::: note
Custom authorizers are set on a method by method basis; if you want to secure multiple methods using a single authorizer, you'll need to repeat the following instructions for each method.
:::

Open the **PetStore** API we created in [part 1](/integrations/aws-api-gateway-2/part-1) of this tutorial. Under the **Resource** tree in the center pane, select the **GET** method under the `/pets` resource.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-2.png)

Select **Method Request**.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-3.png)

Under **Settings**, click the **pencil** icon to the right **Authorization** and choose the `jwt-rsa-custom-authorizer` custom authorizer you created in [part 2](/integrations/aws-api-gateway-2/part-2). 

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-4.png)

Click the **check mark** icon to save your choice of custom authorizer. Make sure the **API Key Required** field is set to `false`.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-5.png)

## Deploy the API

To make your changes public, you'll need to [deploy your API](/integrations/aws-api-gateway-2/part-1#deploy-the-api).

If successful, you'll be redirected to the **Test Stage Editor**. Copy down the **Invoke URL** provided in the blue ribbon at the top, since you'll need this to test your deployment.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-8.png)

## Test Your Deployment

You can test your deployment by making a `GET` call to the **Invoke URL** you copied in the previous step.

```har
{
    "method": "GET",
    "url": "https://YOUR_INVOKE_URL/pets",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer TOKEN"
    }]
}
```

## Summary

In this tutorial, you have

1. Imported an API for use with API Gateway
2. Created a custom authorizer to secure your API's endpoints, which required working with AWS IAM and Lambda
3. Secured your API with your custom authorizer

<%= include('./_stepnav', {
 prev: ["2. Create the Custom Authorizers", "/integrations/aws-api-gateway/custom-authorizers/part-3"]
}) %>