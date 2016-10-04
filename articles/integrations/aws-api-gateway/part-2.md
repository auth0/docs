---
title: Amazon API Gateway Tutorial - Adding Security and Deploying
description: Step 2 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 2 - Securing and Deploying the Amazon API Gateway
[Prev](/integrations/aws-api-gateway/part-1) ----- [Next](/integrations/aws-api-gateway/part-3)

Now that you have your API running, you need to add security. In this step, you will:

* Secure the update API to limit access to authenticated users with a specific AWS IAM role;
* Configure Auth0 delegation to use AWS IAM federation capabilities;
* Obtain an AWS access token that uses the AWS IAM role.

Once your API is secure, you'll build a serverless, single page application (SPA). The SPA will rely on federating identity to determine which users are allowed access. By combining AWS IAM Integration for AWS Gateway API, AWS IAM Identity Federation for SAML, and Auth0 Delegation for AWS, you can enable users from many different sources, including Social Providers or enterprise connections, to access your APIs. The following diagram illustrates a sample flow using a SAML-based Identity Provider and Auth0 SAML Federation and Delegation for AWS.

![Authentication Flow](/media/articles/integrations/aws-api-gateway/auth-flow.png)

You will see two ways of implementing this flow:

1. Using Auth0 Delegation with AWS IAM;
2. Adding an identity token to flow identity to the Lambda function.

Delegation makes it easy for you to obtain tokens from AWS to access AWS services in your application.

### Ways to Secure the Amazon API Gateway

AWS API Gateway provides two different methods to secure your APIs:

1. API keys;
2. IAM.

Using API keys is typically appropriate for a service-to-service interaction, as illustrated below. However, there are several downsides to this approach:

* Placing a secret with a long lifetime on the client is risky (clients are easier to compromise);
* Creating a framework to issue and manage API keys requires a secure implementation that can be challenging to develop.

### 1. Configure IAM and Auth0 for SAML Integration with the API Gateway

The AWS IAM SAML Integration lets the trusted identity provider (IDP) specify an AWS IAM role in the SAML token used to obtain an AWS token. The returned token has the AWS access permissions of that role. Your SAML IDP controls the level of access for your users by issuing SAML tokens with different AWS IAM roles. For example, the IDP could specify the IAM role based on group membership (for example, an administrator in Active Directory) or authentication source (for example, a database connection or a social provider like Facebook). This approach lets you differentiate user access to your Amazon API Gateway methods when secured using AWS IAM.

#### Configuring Auth0

Log in to your Auth0 account. You will be brought to the Management Dashboard. Click on **+ New Client**, which is located in the top right corner of the page.

![Auth0 nManagement Dashboard](/media/articles/integrations/aws-api-gateway/part-2/mgmt-dashboard.png)

Name your new client *AWS API Gateway*, and indicate that this Client is going to be a *Single Page Application*. Click **Create**.

![Create Client](/media/articles/integrations/aws-api-gateway/part-2/create-new-client.png)

Navigate to the *Addons* tab for your newly-created Client. Using the appropriate slide, enable *Amazon Web Services*. This turns on AWS Delegation.

![Enable AWS for Client](/media/articles/integrations/aws-api-gateway/part-2/enable-aws-addon.png)

#### Configuring AWS

Follow the [Set Up AWS for Delegated Authentication with APIs](/aws-api-setup) tutorial to configure AWS for delegated access, which uses SAML. Some caveats:

* Follow the [instructions below](#setting-the-permissions-policy-on-your-iws-iam-role) for attaching the permissions policy to your role instead of the one for the linked tutorial;
* Name the SAML provider you create `auth0`;
* Name the AWS IAM role `auth0-api-role`.

##### Setting the Permissions Policy on Your IWS IAM Role

Once you have configured the AWS IAM role, you will add a policy to `auth0-api-role` that lets you execute your API Gateway methods.

> For more information on this process, please see [User Access Permissions for Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html).

::: panel-info Getting the Gateway API ARN

Before you begin, you will need the ARN for your Gateway API:

1. Navigate to [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway) and log in.
2. Select the appropriate API.
3. Click on any of the Methods associated with the API to bring up the *Method Execution* page.
4. On the *Method Execution* page, the *Method Request* box in the top left corner displays the **ARN** for the API, though it includes the Method name:

`arn:aws:execute-api:us-east-2:484857107747:97i1dwv0j4/*/POST/`

You'll strip the method name to get the base ARN for the API:

`arn:aws:execute-api:us-east-2:484857107747:97i1dwv0j4/*/`

The wildcard (`*`) in the ARN above enables permissions to your API for all stages, but you can deploy different stages individually (for example, development, then test, then production).

:::

Select the `auth0-api-role` role you just created to open its *Summary* page.

![Select IAM Role](/media/articles/integrations/aws-api-gateway/part-2/select-iam-role.png)

Expand **Inline Policies**, and click **click here**.

![Attach Policy](/media/articles/integrations/aws-api-gateway/part-2/attach-policy.png)

Select **Custom Policy** and click **Select**.

![Custom Policy](/media/articles/integrations/aws-api-gateway/part-2/custom-policy.png)

Edit your policy document. You can set the **Policy Name** to whatever you would like, but we suggest something like `api-gateway-policy`. To enable access to the API methods for this role, apply the following policy *after* updating the ARN with the one for your API.

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "execute-api:*"
            ],
            "Resource": [
                "arn:[YOUR_ARN]"
            ]
        }
    ]
}
```

![Edit custom policy](/media/articles/integrations/aws-api-gateway/part-2/edit-custom-policy.png)

Click **Apply Policy**.

Since the API Gateway will assume this role on behalf of the user, the trust policy needs to permit this action. To do so, edit the role's *Trust Relationships* by navigating to this tab on the role's *Summary* page.

The final trust relationship should look similar to the following:

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "auth0",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::012345670:saml-provider/auth0-api"
      },
      "Action": "sts:AssumeRoleWithSAML",
      "Condition": {
        "StringEquals": {
          "SAML:iss": "urn:${account.namespace}"
        }
      }
    },
    {
      "Sid": "gateway",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

At this point, you will need to set the *Authorization Settings* on the [API Gateway](https://console.aws.amazon.com/apigateway).

In the **Resources** view, select the *POST* method under `/pets`.

![Post Method](/media/articles/integrations/aws-api-gateway/part-2/post-method-request.png)

Click the **Method Request** link.

![Set Authorization Settings for Method](/media/articles/integrations/aws-api-gateway/part-2/auth-settings.png)

Click the edit icon beside the **Authorization Type**, and select *AWS_IAM*. Now click the **Check Button** beside the field to save the setting.

### 2. Set Up CORS and Deploy the API

Our Single Page Application (SPA) will access web API methods from a domain different from that of the page. The *Cross-Origin Resource Sharing* setting needs to explicitly permit this action for the browser to allow access to the AWS API Gateway. Typically, the browser will first issue an `OPTIONS` request to see what actions the site will permit.

> See [Enable CORS for a Method in API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html) for details.

Select `/pets` under Resources, and click **Create Method**. In the drop-down, select **OPTIONS**, and click the **checkmark** to save the setting.

![Create Options Method](/media/articles/integrations/aws-api-gateway/part-2/create-options-method.png)

The Options method is used by the browser to get the necessary HTTP headers, but the function needs further instructions on what to do. Under the `OPTIONS` Setup screen, set the following variables/parameters:

* **Integration Type**: Lambda Function;
* **Use Lambda Proxy Integration**: *leave unchecked*;
* **Lambda Region**: *select your region*;
* **Lambda Function**: NoOp.

![Configure Options Method](/media/articles/integrations/aws-api-gateway/part-2/config-options-method.png)

Click **Save**. On the next pop-up screen, grant your Lambda function the permissions it needs.

![Set Lambda Permissions](/media/articles/integrations/aws-api-gateway/part-2/permissions.png)

You will then be auto-directed to the `OPTIONS` *Method Execution* page. Open the *Method Response* page.

![Method Response](/media/articles/integrations/aws-api-gateway/part-2/method-response.png)

Expand the **200** section located under the *HTTP Status* bar and add the following response headers:

* *Access-Control-Allow-Headers*;
* *Access-Control-Allow-Methods*;
* *Access-Control-Allow-Origin*.

![Add headers](/media/articles/integrations/aws-api-gateway/part-2/add-headers.png)

Next, map the appropriate values to each of the response headers. After returning to the *Method Execution* page, click on **Integration Response**. After expanding the row associated with the **200** method response status, expand the **Header Mappings**, and apply the following mappings:

* *Access-Control-Allow-Headers*: `'Content-Type,X-Amz-Date,Authorization,x-api-key,x-amz-security-token'`;
* *Access-Control-Allow-Origin*: `'*'`
* *Access-Control-Allow-Methods*: `'POST, GET, OPTIONS'`

![Configure headers](/media/articles/integrations/aws-api-gateway/part-2/integration-response.png)

Finally, repeat the above steps to enable CORS for the *POST* and *GET* methods. However, for these two methods, you will add one header, *Access-Control-Allow-Origin*, and its value should be set to `'*'`.

### Deploy the API

Return to the **Resources** view for your API. Click on **Actions**, and select **DEPLOY API**.

![Choose Deployment Stage](/media/articles/integrations/aws-api-gateway/part-2/choose-deploy-stage.png)

Select **New Stage** for Deploy State, and name the stage `Test`. Click the **Deploy** button.

![Test Stage Editor](/media/articles/integrations/aws-api-gateway/part-2/test-stage-editor.png)

On the result page, you will see a tab for **SDK Generation**. Click the tab and select *JavaScript* for the platform. Click the **Generate SDK** button.

![Generate SDK](/media/articles/integrations/aws-api-gateway/part-2/sdk-generation.png)

Save the downloaded zip file for later use.

  [Prev](/integrations/aws-api-gateway/part-1) ----- [ Next](/integrations/aws-api-gateway/part-3)
