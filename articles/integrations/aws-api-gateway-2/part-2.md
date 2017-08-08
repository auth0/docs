---
title: AWS API Gateway Tutorial - Secure the API
description: Step 2 of Amazon API Gateway Tutorial
toc: true
---

# AWS API Gateway Tutorial, Part 2: Secure the API

In [step 1](/integrations/aws-api-gateway-2/part-1) of this tutorial, we showed you how to import, test, and deploy an API using Amazon Web Services' (AWS) API Gateway. In this tutorial, we will show you how to secure this API so that only those with the appropriate authorization may access the back-end behind the API.

To do this, we will be using API Gateway's custom [request] authorizers, which allow you to authorize your APIs using bearer token authorization strategies, such as OAuth 2.0 or SAML. For each incoming request, the following happens:

1. API Gateway checks for a properly-configured custom authorizer.
2. API Gateway calls the custom authorizer (which is a Lambda function) with the authorization token.
3. If the authorization token is valid, the custom authorizer returns the appropriate AWS Identity and Access Management (IAM) policies.
4. API Gateway uses the policies returned in step 3 to authorize the request.

## Prepare the Custom Authorizer

You can [download a sample custom authorizer](https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer) that supports Auth0-issued tokens. Afterwards, you'll need to customize the files so that the custom authorizer works for your environment.

1. Unzip the folder containing the sample files you downloaded above to the location of your choice, and navigate into the folder using the command line.

2. Within the sample folder, run `npm install` to install the Node.js packages required for deployment; AWS requires that these files be included in the bundle you will upload to AWS during a later step.

3. Configure your local environment with a `.env` file. You can copy the `.env.sample` file (while simultaneously renaming it `.env`) using `cp .env.sample .env`. Make the following changes:

| Parameter | Value |
| - | - |
| `TOKEN_ISSUER` | The issuer of the token. If Auth0 is the token issuer, use `https://${account.namespace}.auth0.com/` |
| `JWKS_URI` | The URL of the JWKS endpoint. If Auth0 is the token issuer, use `https://${account.namespace}.auth0.com/.well-known/jwks.json` |
| `AUDIENCE` | The token's `audience`. If Auth0 is the authorization server, the `audience` value is identical to the [API identifier](/apis#how-to-configure-an-api-in-auth0) |

    As an example, the text of your .env file should look something like this when complete:

    ```text
    JWKS_URI=https://auth0user.auth0.com/.well-known/jwks.json
    AUDIENCE=https://auth0user.auth0.com/api/v2/	
    TOKEN_ISSUER=https://auth0user.auth0.com/
    ```

4. Test the custom authorizer locally.

    a. First, obtain a valid JWT access token. You can [obtain one from Auth0](/tokens/access-token#how-to-get-an-access-token).

    b. Once you've obtained a token, create a local `event.json` file containing the token. You can copy the sample file (run `cp event.json.sample event.json`). Replace `ACCESS_TOKEN` with your JWT token, and `methodArn` with the appropriate ARN value for the `GET` method of your API.

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

3. Under **AWS Service Role**, find the **AWS Lambda** row and click the associated **Select** button.

4. On the **Attach Policy** screen, select the **AWSLambdaRole**. You can use the provided filter to narrow down the list of options. Click **Next Step** to proceed.

5. On **Set role name and review**, provide a **Role name**, such as `Auth0Integration`. Leave the rest of the fields as is. Click **Create role**.

6. Once AWS has created your role, you'll be directed back to the **Roles** page of IAM. Select your new role.

7. On the **Summary** page for the role you've just created, click over to the **Trust relationships** tab.

8. Click **Edit trust relationship**, and populate the **Policy Document** field with the following JSON snippet:

    ```json
    {
    "Version": "2017-08-07",
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

    Click **Update Trust Policy**.

9. You'll be redirected back to the **Summary** page. Copy down the **Role ARN** value for later use.

## Create the Lambda Function and Deploy the Custom Authorizer

Now that you've configured your custom authorizer for your environment and tested it to see it works, you'll deploy it to AWS.

1. First, you'll need to create a bundle that you can upload to AWS by running `npm run bundle`. This generates a `custom-authorizer.zip` bundle containing the source, configuration, and node modules required by AWS Lambda.

2. Navigate to the [Lambda console](https://console.aws.amazon.com/lambda), and click **Create function**.

3. On the **Select blueprint** page, click **Author from scratch** to create a blank function.

4. On the **Configure triggers** page, click **Next** (you don't need to configure a trigger).

5. On the **Configure function** page, you'll provide all of the information needed for your new Lambda function. Under **Basic information**, provide values for the following parameters:

| Parameter | Value |
| - | - |
| Name | A name for your Lambda function, such as `jwtRsaCustomAuthorizer` |
| Description | A description for your Lambda function (optional) |
| Runtime | Select `Node.js 4.3` |

    a. Next, provide the function code. Under **Code entry type**, select **Upload a .ZIP file**. Click **Upload** and select the `custom-authorizer.zip` bundle you created earlier.

    b. Then, create the following three **Environment variables**. Note that this information is identical to that which is the `.env` file.

| Parameter | Value |
| - | - |
| `TOKEN_ISSUER` | The issuer of the token. If Auth0 is the token issuer, use `https://${account.namespace}.auth0.com/` |
| `JWKS_URI` | The URL of the JWKS endpoint. If Auth0 is the token issuer, use `https://${account.namespace}.auth0.com/.well-known/jwks.json` |
| `AUDIENCE` | The token's `audience`. If Auth0 is the authorization server, the `audience` value is identical to the [API identifier](/apis#how-to-configure-an-api-in-auth0) |

    c. In the **Lambda function handler and role** section, set the following values:

| Parameter | Value |
| - | - |
| Handler | `index.handler` |
| Role | `Choose an existing role` |
| Existing role | Select the IAM role you created in the steps above. |  

    d. Open up the **Advanced settings** area, and set **Timeout** to **30** sec.

    When you've provided all of the information above, click **Next**.

    e. Review the information you've provided for your Lambda function. If everything looks correct, click **Create function**. If AWS successfully creates your function, you'll see the following.

6. Test the Lambda function you just created. Click **Test** in the top right corner.

7. Copy the contents of your `event.json` file into the Input test event JSON (you can use the default "Hello World" template). Click **Save and test**. If the test was successful, you'll see the following.

    Expanding the output window should show a message similar to the one you received after your successful local test.

## Configure API Gateway Custom Authorizer

Return to API Gateway, and open the **PetStore** API we created earlier.

Using the left-hand navigation bar, open **Authorizers**. If this is the first authorizer you've created, you'll see the **New custom authorizer** configuration screen by default. If not, you can bring up this screen by clicking **Create > Custom Authorizer** on the center panel.

Set the following parameters:

| Parameter | Value |
| - | - |
| Lambda region | Use the region for the Lambda function you created previously |
| Lambda function | `jwtRsaCustomAuthorizer` |
| Authorizer name | `jwt-rsa-custom-authorizer` |
| Execution role | The IAM Role ARN you copied above |
| Identity token source | `method.request.header.Authorization` |
| Token validation expression | `^Bearer [-0-9a-zA-z\.]*$` |
| Result TTL in seconds | `3600` |

Click **Create**.

After AWS creates the authorizer and the page refreshes, you'll see a new **Test your authorizer** section at the bottom of the screen. You can test your authorizer by providing the Auth0 token (`Bearer ey...`) you've previously used and clicking **Test**.

If the test was successful, you'll see a response similar to the following.

<%= include('./_stepnav', {
 prev: ["1. Import and Deploy the API", "/integrations/aws-api-gateway-2/part-1"],
 next: ["3. Part 3", "/integrations/aws-api-gateway-2/part-3"]
}) %>