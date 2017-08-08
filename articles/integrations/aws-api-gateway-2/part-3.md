---
description:
---

# AWS Part 3

LOREM IPSUM

## Configure API Gateway Resources to use the Custom Authorizer

Log in to AWS and navigate to the API Gateway Console.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-1.png)

Open the **PetStore** API we created in part 1 of this tutorial. In the left panel, under your API name, click Resources. Under the Resource tree, select a specific resource and one of its Methods (eg. GET). 

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-2.png)

Select Method Request.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-3.png)

Under the Settings section, click the pencil to the right of the Authorization and choose the jwt-rsa-custom-authorizer Custom Authorizer. 

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-4.png)

Click the checkbox to the right of the drop down to save. Make sure the API Key Required field is set to false.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-5.png)

## Deploy the API

You need to Deploy the API to make the changes public.

Select the Action menu and choose Deploy API

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-6.png)

Select the test deployment stage you created in part 1 and click **Deploy**.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-7.png)

If successful, you'll be redirected to the **Test Stage Editor**. Copy down the **Invoke URL** provided in the blue ribbon, since you'll need this to test your deployment.

![](/media/articles/integrations/aws-api-gateway-2/part-3/pt3-8.png)

https://castdb0qvl.execute-api.us-east-1.amazonaws.com/Test

## Test Your Deployment

There are three ways you can test your API Gateway endpoint remotely

In the examples below:

INVOKE_URL is the Invoke URL from the Deploy the API Gateway section above
ACCESS_TOKEN is the token in the event.json file
/your/resource is the resource you secured in AWS API Gateway
With Postman

You can use Postman to test the REST API

Method: (matching the Method in API Gateway, eg. GET)
URL: INVOKE_URL/your/resource
Headers tab: Add an Authorization header with the value Bearer ACCESS_TOKEN
With curl from the command line

curl -i "INVOKE_URL/your/resource" \
  -X GET \
  -H 'Authorization: Bearer ACCESS_TOKEN'
The above command is performed using the GET method.

In (modern) browsers console with fetch

fetch( 'INVOKE_URL/your/resource', { method: 'GET', headers: { Authorization : 'Bearer ACCESS_TOKEN' }}).then(response => { console.log( response );});


<%= include('./_stepnav', {
 prev: ["2. Part 2", "/integrations/aws-api-gateway-2/part-2"]
}) %>