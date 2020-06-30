---
description: Step 3 of Amazon API Gateway Tutorial
toc: true
topics:
  - integrations
  - aws
  - api-gateway
contentType: tutorial
useCase:
  - secure-an-api
---
# AWS API Gateway Tutorial, Part 3: Create the Custom Authorizers

In [part 1](/integrations/aws-api-gateway/custom-authorizers/part-1), we showed you how to configure Auth0 for use with API Gateway, and in [part 2](/integrations/aws-api-gateway/custom-authorizers/part-2) of this tutorial, we showed you how to import, test, and deploy an API using Amazon Web Services' (AWS) API Gateway. In this tutorial, we will show you how to secure this API so that only those with the appropriate authorization may access the back-end behind the API.

To do this, we will be using API Gateway's custom [request] authorizers, which allow you to authorize your APIs using bearer token authorization strategies, such as OAuth 2.0 or <dfn data-key="security-assertion-markup-language">SAML</dfn>. For each incoming request, the following happens:

1. API Gateway checks for a properly-configured custom authorizer.
2. API Gateway calls the custom authorizer (which is a Lambda function) with the authorization token.
3. If the authorization token is valid, the custom authorizer returns the appropriate AWS Identity and Access Management (IAM) policies.
4. API Gateway uses the policies returned in step 3 to authorize the request.

## Prepare the Custom Authorizer

You can [download a sample custom authorizer](https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer) that supports Auth0-issued tokens. Afterward, you'll need to customize the files so that the custom authorizer works for your environment.

1. Unzip the folder containing the sample files you downloaded above to the location of your choice, and navigate to the folder using the command line.

2. Within the sample folder, run `npm install` to install the Node.js packages required for deployment; AWS requires that these files be included in the bundle you will upload to AWS during a later step.

3. Configure your local environment with a `.env` file. You can copy the `.env.sample` file (while simultaneously renaming it `.env`) using `cp .env.sample .env`. Make the following changes:

| **Parameter** | **Value** |
| - | - |
| **`TOKEN_ISSUER`** | The issuer of the token. If Auth0 is the token issuer, use `https://${account.namespace}/`. Be sure to include the trailing slash.|
| **`JWKS_URI`** | The URL of the JWKS endpoint. If Auth0 is the token issuer, use `https://${account.namespace}/.well-known/jwks.json` |
| **`AUDIENCE`** | The **identifier** value of the API you created in [part 1](/integrations/aws-api-gateway/custom-authorizers/part-1) |

As an example, the text of your .env file should look something like this when complete:

```text
JWKS_URI=https://${account.namespace}/.well-known/jwks.json
AUDIENCE=https://your-api-gateway
TOKEN_ISSUER=https://${account.namespace}/
```

4. Test the custom authorizer locally.

a. First, obtain a valid JWT Access Token. There are multiple methods by which you can get one, and the method you choose depends on your application's type, trust level, or overall end-user experience. 

You can get a test token for your API by going to **APIs > Your API > Test** in the [dashboard](${manage_url}/#/apis). For specific details refer to [Get Access Tokens](/tokens/guides/get-access-tokens).

b. Create a local `event.json` file containing the token. You can copy the sample file (run `cp event.json.sample event.json`). Replace `ACCESS_TOKEN` with your JWT token, and `methodArn` with the appropriate ARN value for the `GET` method of your API.

To get the `methodArn`:

1. Using the API Gateway Console, open the **PetStore** API.
2. Click **Resources** in the left-hand navigation panel.
3. In the middle **Resources** panel, expand the resource tree. Underneath `/pets`, click **GET**.
4. In the **Method Request** box, you'll see the **ARN**.

c. Run the test using `npm test`. The test uses the [lambda-local](https://www.npmjs.com/package/lambda-local) package to test the custom authorizer using your token. If the test was successful, you'll see output similar to the following:

```text
Message
------
{
    "principalId": "C8npTEMVnBrILsBTI91MOh6dfuZbPVAU@clients",
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "Allow",
                "Resource": "arn:aws:execute-api:us-east-1:1234567890:apiId/stage/method/resourcePath"
            }
        ]
    },
    "context": {
        "scope": "FULL_LIST_OF_SCOPES"
    }
}
```

If the value of `Effect` is `Allow`, your authorizer would've allowed the call to API Gateway.

## Create the IAM Role

The IAM role has the required permissions to call Lambda functions; before we can proceed with our custom authorizer, we'll need to create an IAM role that can call our custom authorizer whenever API Gateway receives a request for access.

1. Log in to AWS and navigate to the [IAM Console](https://console.aws.amazon.com/iam). Click **Roles** in the left-hand navigation bar.
2. Click **Create new role**.
3. Under **AWS service** select the **AWS Lambda** row and click the **Next: Permissions** button.
4. On the **Attach permissions policy** screen, select the **AWSLambdaRole**. You can use the provided filter to narrow down the list of options. Click **Next: Tags**, then click **Next: Review** to proceed.
5. On the **Review** screen, provide a **Role name**, such as `Auth0Integration`. Leave the rest of the fields as is. Click **Create role**.
6. Once AWS has created your role, you'll be directed back to the **Roles** page of IAM. Select your new role.
7. On the **Summary** page for the role you've just created, click on to the **Trust relationships** tab.
8. Click **Edit trust relationship**, and populate the **Policy Document** field with the following JSON snippet:

    ```json
    {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": [
            "apigateway.amazonaws.com",
            "lambda.amazonaws.com"
            ]
        },
        "Action": "sts:AssumeRole"
        }
    ]
    }
    ```

    ![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-9.png)

    Click **Update Trust Policy**.

9. You'll be redirected back to the **Summary** page. Copy down the **Role ARN** value for later use.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-10.png)

## Create the Lambda Function and Deploy the Custom Authorizer

Now that you've configured your custom authorizer for your environment and tested it to see it works, you'll deploy it to AWS.

1. First, you'll need to create a bundle that you can upload to AWS by running `npm run bundle`. This generates a `custom-authorizer.zip` bundle containing the source, configuration, and node modules required by AWS Lambda.

2. Navigate to the [Lambda console](https://console.aws.amazon.com/lambda), and click **Create function**.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-11.png)

3. On the **Select blueprint** page, click **Author from scratch** to create a blank function. Under **Basic information**, provide values for the following parameters:

| **Parameter** | **Value** |
| - | - |
| **Name** | A name for your Lambda function, such as `jwtRsaCustomAuthorizer` |
| **Description** | A description for your Lambda function (optional) |
| **Runtime** | Select `Node.js 10.x` |

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-12.png)

4. Click **Create Function** to continue.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-13.png)

5. On the **Configuration** page of your function, scroll down to the **Function Code** section.
6. Select **Upload a .ZIP file** as the **Code entry type**.
7. Click **Upload** and select the `custom-authorizer.zip` bundle you created earlier.
8. Then, create the following three **Environment variables**. Note that this information is identical to that which is the `.env` file.

| **Parameter** | **Value** |
| - | - |
| **`TOKEN_ISSUER`** | The issuer of the token. If Auth0 is the token issuer, use `https://${account.namespace}/` |
| **`JWKS_URI`** | The URL of the JWKS endpoint. If Auth0 is the token issuer, use `https://${account.namespace}/.well-known/jwks.json` |
| **`AUDIENCE`** | The **identifier** value of the API you created in [part 1](/integrations/aws-api-gateway/custom-authorizers/part-1) |

9. In the **Execution role** section, select **Use an existing role** then select the IAM role you created previously as the **Existing role**. 

10. Under **Basic settings** set **Timeout** to **30** sec.
11. Click **Save**.
12. Test the Lambda function you just created. Click **Test** in the top right corner.
13. Copy the contents of your `event.json` file into the **Configure test event** form. You can use the default "Hello World" event template.
14. Click **Create**.
15. Run your test by selecting it and clicking **Test**. If the test was successful, you'll see: "Execution result: succeeded". Expanding the output window should show a message similar to the one you received after your successful local test.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-19.png)

## Configure API Gateway Custom Authorizer

Return to API Gateway Console.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-21.png)

Open the **PetStore** API we created earlier.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-22.png)

Using the left-hand navigation bar, open **Authorizers** and select **Create New Authorizer** then set the following parameters:

| **Parameter** | **Value** |
| - | - |
| **Name** | `jwt-rsa-custom-authorizer` |
| **Type** | Select **Lambda** |
| **Lambda Region** | Use the region for the Lambda function you created previously |
| **Lambda Function** | `jwtRsaCustomAuthorizer` |
| **Lambda Invoke Role** | The IAM Role ARN you copied above |
| **Lambda Event Payload** | Select **Token** |
| **Token Source** | `Authorization` |
| **Token Validation** | `^Bearer [-0-9a-zA-z\.]*$` |
| **TTL (seconds)** | `3600` |

Click **Create**.

After AWS creates the authorizer and the page refreshes, test your authorizer by clicking **Test** and providing the Auth0 token (`Bearer ey...`) you previously used.
If the test was successful, you'll see a response similar to the following.

![](/media/articles/integrations/aws-api-gateway-2/part-2/pt2-26.png)

## Summary

In this part of the API Gateway tutorial, we configured the custom authorizer we'll use to handle access requests. To do this, we:

1. Prepared a bundle containing the code that will be used by the Lambda function using the Auth0 sample
1. Created the IAM role that will call the Lambda function
1. Created the Lambda function using the custom bundle created in step 1
1. Created the API Gateway custom authorizer using the Lambda function we created in step 3

In the next part of the tutorial, we will use the custom authorizer we created.

<%= include('./_stepnav', {
 prev: ["Import and Deploy the API Gateway API", "/integrations/aws-api-gateway/custom-authorizers/part-2"],
 next: ["Secure the API Using Custom Authorizers", "/integrations/aws-api-gateway/custom-authorizers/part-4"]
}) %>
