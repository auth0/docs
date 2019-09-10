---
description: Configure Auth0 for use with AWS API Gateway
topics:
  - integrations
  - aws
  - api-gateway
contentType: tutorial
useCase:
  - secure-an-api
---

# AWS API Gateway Tutorial, Part 1: Create an Auth0 API

You will need to configure the APIs consumed by the applications that successfully authorize. You can do so using the [APIs section of the Management Dashboard](${manage_url}/#/apis).

Click **Create API** to create a new API for your integration.

![](/media/articles/integrations/aws-api-gateway-2/api-1.png)

You'll be asked to provide values for the following fields:

| Field | Description |
| - | - |
| Name | A friendly name for your API. This is the name you'll see in your list of Auth0 APIs. |
| Identifier | A logical identifier for your API. We recommend formatting this identifier like a URL `https://your-api-gateway`. |
| Signing Algorithm | The algorithm you want Auth0 to use to sign the issued <dfn data-key="access-token">Access Tokens</dfn>. To learn more, see [Signing Algorithms](/tokens/concepts/signing-algorithms). |

Click **Create** to proceed.

![](/media/articles/integrations/aws-api-gateway-2/api-2.png)

You can refer to the **Settings** page for the details of your newly-created API. 

![](/media/articles/integrations/aws-api-gateway-2/api-3.png)

Creating an API also creates a Machine to Machine Application for use with the API. You can see this application listed as **Authorized** under the **Machine to Machine Application** tab. Additionally, you might want to make note of the Client ID, since you will need it in [Part 3](/integrations/aws-api-gateway/custom-authorizers/part-3) of this tutorial.

<%= include('./_stepnav', {
 prev: ["Introduction", "/integrations/aws-api-gateway/custom-authorizers"],
 next: ["Import and Deploy the API Gateway API", "/integrations/aws-api-gateway/custom-authorizers/part-2"]
}) %>