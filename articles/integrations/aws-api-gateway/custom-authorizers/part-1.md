---
desc: Configure Auth0 for use with AWS API Gateway
---

# AWS API Gateway Tutorial, Part 1: Create an Auth0 API

You will need to configure the APIs consumed by the clients that successfully authorize. You can do so using the [APIs section of the Management Dashboard](${manage_url}/#/apis).

Click **Create API** to create a new API for your integration.

![](/api-1.png)

You'll be asked to provide values for the following fields:

| Field | Description |
| - | - |
| Name | A friendly name for your API. This is the name you'll see in your list of Auth0 APIs |
| Identifier | A logical identifier for your API (we recommend formatting this identifier like a URL `https://your-api-gateway`). This will be used as your APIs audience parameter in authorization calls |
| Signing Algorithm | The algorithm you want Auth0 to use to sign the issued access tokens |

Click **Create** to proceed.

![](/api-2.png)

You can refer to the **Settings** page for the details of your newly-created API. 

![](/api-3.png)

More specifically, you'll need to refer to your API's **Identifier** (or `audience` parameter) when you [configure your API Gateway custom authorizer in step 3](/integrations/aws-api-gateway/custom-authorizers/part-3#prepare-the-custom-authorizer) of this tutorial.

<%= include('./_stepnav', {
 prev: ["Introduction", "/integrations/aws-api-gateway/custom-authorizers"],
 next: ["2. Import and Deploy the API Gateway API", "/integrations/aws-api-gateway/custom-authorizers/part-2"]
}) %>