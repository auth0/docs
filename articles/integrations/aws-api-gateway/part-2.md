---
title: Amazon API Gateway Tutorial - Adding Security and Deploying
description: Step 2 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 2 - Securing and Deploying the Amazon API Gateway
[Prev](/integrations/aws-api-gateway/part-1) ----- [Next](/integrations/aws-api-gateway/part-3)

Now that you have your API running, you need to add security. In this step you will secure the update API to limit access to authenticated users in a specific AWS IAM role. You will configure Auth0 delegation to use AWS IAM federation capabilities and obtain an AWS access token that uses that AWS IAM role.

AWS API Gateway provides a two different methods to secure your APIs - API keys, and IAM. Using API keys is typically appropriate for a service to service interaction as illustrated below. However, putting a long lived secret on a client is risky since clients are easier to compromise. Also, creating a framework to issue and manage API keys requires a secure implementation that may be challenging to develop.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-key.png)

In the remainder of this tutorial you'll build a serverless, single page application, that relies on federating identity to determine which users are allowed access. By combining AWS IAM integration for Amazon API Gateway, AWS IAM's identity federation for SAML, and Auth0 delegation for AWS, you can enable users from many different sources, including social sources like Facebook, LinkedIn and Amazon, or enterprise sources like Active Directory, LDAP, ADFS, or SAML to access your APIs. The following diagram illustrates an the flow using a SAML based identity provider and Auth0 SAML federation and delegation for AWS:

![](/media/articles/integrations/aws-api-gateway/auth-flow.png)

You'll implement this in two ways, first using Auth0 delegation with AWS IAM and then in a later step by adding an identity token to flow identity to the Lambda function. Delegation makes it easy for you to obtain tokens from AWS to access AWS services in your application.

### Configure IAM and Auth0 for SAML integration and the API Gateway
The AWS IAM SAML integration lets the trusted identity provider (IDP) specify an AWS IAM role in the SAML token used to obtain an AWS token. The returned token has the AWS access permissions of that role. Your SAML IDP controls the level of access for your users by issuing SAML tokens with different AWS IAM roles. For example, the IDP could specify the IAM role based on group membership (e.g. administrator in Active Directory), or authentication source (e.g. a database connection or a social provider like Facebook). This approach lets you differentiate user access to your Amazon API Gateway methods when secured with AWS IAM.

To configure Auth0 with SAML, do the following:

1. Sign up for a free Auth0 developer account, and sign in.
2. In the left menu, select **Apps / APIs**, then click **New App and API** (or **Create your First APP/API** if this is your first time). Call the new app "AWS Api Gateway".
3. Click on the **Settings** tab.
4. Click the **Addons** tab, and enable **Amazon Web Services**. This turns on AWS delegation. 
5. Follow the [How to Setup AWS to do Delegated Authentication with APIs](/aws-api-setup) walkthrough to configure AWS for delegated access, which uses SAML behind the scenes. Don't worry about attaching a policy for additional permissions. Name the SAML provider you create `auth0`, and the AWS IAM role `auth0-api-role`.

Once the AWS IAM role is configured, you will add a policy to the `auth0-api-role` role that lets you execute your API gateway methods. This is described in [User Access Permissions for Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html). The following paragraphs summarize the steps required.

The Amazon Resource Name (arn) that controls access to your APIs will look something like:
```
arn:aws:execute-api:us-east-1:your-accountid:your-api-id/*/pets
```
You can see the arn by selecting for one of your API methods by selecting the *Method Request* definition in the Amazon API Gateway console (make sure the arn does not include the method, it should look like the above only with  your account and api gateway identifier). The wildcard (`*`) in the example above enables permissions for all stages for your API. You can deploy different stages (for example dev, test, prod).

Select the role you just created, and expand **Inline Policies**, and click the **click here** link. Select **Custom Policy**, click the **Select** button, and pick a name like "api-gateway-policy". To enable access to allow of your api methods for the role, apply the following policy after updating the arn with the one for your API. Click **Apply Policy**.
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
                "arn:aws:execute-api:us-east-1:1234567890:1234abcdef/*/pets"
            ]
        }
    ]
}
```
You'll need to make one additional change. Since the API gateway will assume this role on a user's behalf, the trust policy needs to permit this action. Click on **Edit Trust Relationship** and add the policy statement for gateway. The final trust relationship should look similar to the following:
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
At this point you are finished with IAM. Go back to the API gateway. In the **Resources** view, select the *POST* method under `/pets`. Click the **Method Request** link. Click the edit icon beside the **Authorization Type**, and select *AWS_IAM*. Now click the **Check Button** beside the field to save the setting.

## Set up CORS and deploy the API

Our single page app will access web API methods from a different domain than the page. The *Cross-Origin Resource Sharing* setting needs to explicitly permit this action for the browser to permit access to the AWS API Gateway site. Typically, a browser will first issue an OPTIONS request to see what the site will permit. See [Enable CORS for a Method in API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html) for details. Here is a summary of the steps:

1. Select `/pets` in resources, and then click **Create Method**. In the drop down select **OPTIONS**, and click the **check** button to save the setting.
2. The Options method is used by the browser to get headers, but the function needs to work. For options setup, select Lambda, select your region, and then select *NoOp* for the *Lambda Function*. Click on **Save**.
3. Click on **Method Response**, expand **200**, and then add three headers: *Access-Control-Allow-Headers*, *Access-Control-Allow-Methods*,  *Access-Control-Allow-Origin*.
4. Now you need to map values. Click the **Method Execution** link, and then click the **Integration Response** link. Expand the **200** response, and then expand the **Header Mappings**. For *Access-Control-Allow-Headers*, enter `'Content-Type,X-Amz-Date,Authorization,x-api-key,x-amz-security-token'`.  For *Access-Control-Allow-Origin*, enter `'*'`. For *Access-Control-Allow-Methods*, enter `'POST, GET, OPTIONS'`.
5. For the *POST* and *GET* methods, follow the same process as above to add a single header, *Access-Control-Allow-Origin*, with the value `'*'`.

### Deploy the API

Select the **DEPLOY API** button from the **RESOURCES** view. Select **New Stage** for deploy state, and name the stage "test". Click the **Deploy** button. On the result page, you will see a tab for **SDK Generation**. Click the tab, and select *JavaScript* for the platform. Click the **Generate SDK** button. Save the downloaded zip file for later use.

  [Prev](/integrations/aws-api-gateway/part-1) ----- [ Next](/integrations/aws-api-gateway/part-3)
