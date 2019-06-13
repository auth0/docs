---
description: Step 2 of Amazon API Gateway Tutorial
toc: true
topics:
  - integrations
  - aws
  - api-gateway
contentType: tutorial
useCase:
  - secure-an-api
---

# AWS API Gateway Tutorial, Part 2: Import and Deploy the API Gateway API

::: warning
This portion of the tutorial has been adapted from the [official AWS example](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html). Please refer to this example for in-depth notes and discussion.
:::

In this part of the AWS API Gateway tutorial, we will show you how to import and manage an API using API Gateway. More specifically, we will:

* Import an API into API Gateway
* Test an API import
* Deploy an API for use with any front-end applications
* Test an API deployment

In later parts of this tutorial, we will show how to secure the endpoints of this API using custom authorizers that accept Auth0 Access Tokens, as well as how we can integrate this API with our front-end JavaScript application.

## Import and Configure the Pets API

Log in to your AWS account, and using the **Services** drop down located in the top navigation bar, go to the **API Gateway** Console.

::: note
If you've previously created an API, simply navigate to the API Gateway Console and click **Create API**. You'll be given the option to create the **Example API** on the **Create new API** form.
:::

If you've never created an API using API Gateway, you'll see the following screen. Click **Get Started** to proceed.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-1.png)

You'll see a pop-up message welcoming you to API Gateway. Click **OK** to proceed.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-3.png)

On the **Create new API** form, you'll see that **Example API** is selected by default, and there's an example API defined in the editor. We'll use this API for the rest of our tutorial, so begin the API creation process by clicking **Import**.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-4.png)

When done, AWS will display a message indicating that your API created and populated with the provided data.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5.png)

Notice that the API already has methods associated with it (namely, `GET` and `POST`). You can view the details of a method, modify its setup, or test the method invocation by clicking the method name from the resource tree.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5a.png)

### Test Your API

Now that you've successfully imported your API, let's run some tests to ensure that everything works as expected. This exercise will also demonstrate some of the features of the API itself.

As an example, click **POST** under `/pets`. This brings up the **Method Execution** window that provides an overview of the `POST` method's structure and behaviors:

* **Method Request** and **Method Response**: the API's interface with the front-end
* **Integration Request** and **Integration Response**: the API's interface with the back-end

We can use this area to test the API we've created. 

Click **Test** (shown on the **Application** sliver located in the middle of the page).

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5b.png)

You'll be redirected to the `/pets - POST - Method Test` page.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5c.png)

Scroll to the bottom of the page, and provide the following snippet as the **Request Body**:

```json
{"type": "dog", "price": 249.99}
```

The request body indicates the attributes of the pet we want to add to the database, as well as the cost for the pet.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5d.png)

Click **Test** to proceed.

You'll see the results of the test at the right side of the page.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-5e.png)

## Deploy the API

The test we just completed was done using the API Gateway console. To use the API with a different application, you'll need to deploy the API to a stage. You can do this via the **Actions** menu, which offers the **Deploy API** option.

You'll be asked to provide the following values:

| **Parameter** | **Value** |
| - | - |
| **Deployment stage** | Choose `[New Stage]` |
| **Stage name** | Provide a name for your stage |
| **Stage description** | Provide a description for your stage |
| **Deployment description** | Provide a description for your API deployment |

Once you've provided the appropriate values, click **Deploy** to proceed.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-6.png)

### Test the Deployment

When the API has successfully deployed, you'll be redirected to the **Test Stage Editor**. You can, at this point, test the API to see if it deployed correctly.

At the top of the **Test Stage Editor** window is a blue banner with your **Invoke URL**. This is the URL used to invoke the `GET` endpoint of your API. 

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-7.png)

Click on the link to submit the `GET / method` request in a browser. This should result in the following success response:

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-8.png)

Next, we'll make a call to **GET** under `/pets/{petId}`. In the **Stages** page, expand the tree under **Test**. Click **GET** under `/pets/{petId}`.

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-9.png)

You'll see an **Invoke URL** displayed in the blue banner at the top of the window. The final portion, `{petID}`, stands for a path variable. Replace this variable with `1`, and navigate to the new URL using your browser. You should receive an HTTP 200 request with the following JSON payload:

```json
{
  "id": 1,
  "type": "dog",
  "price": 249.99
}
```

![](/media/articles/integrations/aws-api-gateway-2/part-1/aws-pt1-10.png)

## Summary

In Part 2 of the AWS API Gateway tutorial, we covered how to:

* Import an API into API Gateway
* Test an API import
* Deploy an API for use with any front-end applications
* Test an API deployment

Now that we have a fully functional API that's managed by API Gateway, we'll...

<%= include('./_stepnav', {
 prev: ["Configure the Auth0 API", "/integrations/aws-api-gateway/custom-authorizers/part-1"],
 next: ["Create the Custom Authorizers", "/integrations/aws-api-gateway/custom-authorizers/part-3"]
}) %>
