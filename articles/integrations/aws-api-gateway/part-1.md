---
title: Amazon API Gateway Tutorial - Setup the Amazon API Gateway
description: Step 1 of Amazon API Gateway Tutorial
---

# Amazon API Gateway Tutorial
## Step 1 - Setting up the Amazon API Gateway
[Prev](/integrations/aws-api-gateway) ----- [Next](/integrations/aws-api-gateway/part-2)

After completing this step, you will have:

* created two unauthenticated REST service methods for getting and updating a list of pets;
* set up Amazon API Gateway using AWS Lambda functions to execute your service logic that stores and retrieves pets from an [Amazon DynamoDB](https://aws.amazon.com/dynamodb) table.

> Prior to beginning, please have [Node.js](https://nodejs.org/) installed.

### Log in to the AWS Console

Log in to the [AWS console](https://console.aws.amazon.com), and perform the following steps to create:

* an Amazon table;
* the AWS Lambda functions;
* the Amazon API Gateway APIs.

### 1. Create the Amazon DynamoDB Table

In the [Amazon DynamoDB Console](https://console.aws.amazon.com/dynamodb), click on **Create Table**.

![](/media/articles/integrations/aws-api-gateway/part-1/dynamodb-create-table.png)

Configure the variables associated with the table:

* **Table name**: Pets
* **Primary key**: username
* **Primary key type**: String
* **Use default settings**: *unchecked*
* **Read capacity units**: 3
* **Write capacity units**: 3

![](/media/articles/integrations/aws-api-gateway/part-1/configure-newly-created-table.png)

Click **Create** to create the table with your provided settings.

While the table is being created, take note of the *Amazon Resource Name (ARN)* under the *Table details* section. You will need the table's ARN in the next step.

![](/media/articles/integrations/aws-api-gateway/part-1/table-arn.png)

### 2. Create the Policy that Grants AWS Lambda Functions Access to CloudWatch Logs and the DynamoDB Pets Table

Navigate to the [AWS IAM Console](https://console.aws.amazon.com/iam).

Click on **Roles** in the left menu, and then click the **Create New Role** button.

![](/media/articles/integrations/aws-api-gateway/part-1/roles.png)

Name the role `APIGatewayLambdaExecRole` and click **Next Step**.

![](/media/articles/integrations/aws-api-gateway/part-1/set-role-name.png)

Select the Role Type. Under *AWS Service Roles*, select *AWS Lambda*.

![](/media/articles/integrations/aws-api-gateway/part-1/select-role-type.png)

On the Attach Policy screen, skip this by clicking **Next Step**. Review the information you provided. If all looks correct, click **Create Role**. When finished, you should see your role listed on the IAM homepage.

![](/media/articles/integrations/aws-api-gateway/part-1/iam-roles-list.png)

Select the role you just created, **APIGatewayLambdaExecRole**. Click the down arrow for *Inline Policies* and click the **click here** link.

![](/media/articles/integrations/aws-api-gateway/part-1/create-inline-policies.png)

Select *Custom Policy*, and then click **Select**. Name the policy `LogAndDynamoDBAccess` and add the following code as the policy document (be sure to first update the Amazon Resource Name (ARN) for your DynamoDB table). Click **Apply Policy**.

    ```js
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AccessCloudwatchLogs",
          "Action": ["logs:*"],
          "Effect": "Allow",
          "Resource": "arn:aws:logs:*:*:*"
        },
        {
          "Sid": "PetsDynamoDBReadWrite",
                      "Effect": "Allow",
          "Action": [
                      "dynamodb:DeleteItem",
                      "dynamodb:GetItem",
                      "dynamodb:PutItem",
                      "dynamodb:UpdateItem"
                      ],
          "Resource": ["DYNAMODB_TABLE_ARN_VALUE_FROM_PREVIOUS_STEP"]
        }
       ]
    }
    ```

![](/media/articles/integrations/aws-api-gateway/part-1/custom-policy.png)

### 2. Create the AWS Lambda Functions

The next three steps create the AWS Lambda functions for getting and putting pet information.

#### Create the Lambda Function for `GetPetInfo`

In the [AWS Lambda Console](https://console.aws.amazon.com/lambda), select **Create a Lambda function** (if you have not created an AWS Lambda function before, you will click **Get Started Now**). Click **Skip** for selecting a blueprint, and enter `GetPetInfo` for the *Name*. Select *Node.js* for the runtime, and paste the following code to read pets from the dynamodb table:

    ```js
    var AWS = require('aws-sdk');
    var DOC = require('dynamodb-doc');
    var dynamo = new DOC.DynamoDB();

    exports.handler = function(event, context) {
       var cb = function(err, data) {
          if(err) {
             console.log('error on GetPetsInfo: ',err);
             context.done('Unable to retrieve pet information', null);
          } else {
             if(data.Item && data.Item.pets) {
                 context.done(null, data.Item.pets);
             } else {
                  context.done(null, {});
             }
          }
       };

       dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, cb);
    };
    ```
For *Role*, select the *APIGatewayLambdaExecRole* role you just created and leave the default for all other settings. Click **Next**, and then click **Create function**. Click **Test**. You should see an empty output (`{}`) in the *Execution Results* section since the table is empty.

#### Create the Lambda Function for `UpdatePetInfo`

Repeat the instructions for the previous step, but paste the following code instead:

    ```js
    var AWS = require('aws-sdk');
    var DOC = require('dynamodb-doc');
    var dynamo = new DOC.DynamoDB();
    exports.handler = function(event, context) {
        var item = { username:"default",
                     pets: event.pets || {}
                };

        var cb = function(err, data) {
            if(err) {
                console.log(err);
                context.fail('unable to update pets at this time');
            } else {
                console.log(data);
                    context.done(null, data);
            }
        };
        dynamo.putItem({TableName:"Pets", Item:item}, cb);
    };
    ```

Test the function by clicking on the *Actions* drop down and choosing **Configure sample event**. Enter the following for sample data, and click **Submit**:

    ```js
    {"pets": [ {"id": 1, "type": "dog", "price": 249.99}]}
    ```

You should see an empty return result (`{}`). Go to your `GetPetInfo` Lambda, and click **Test** again. You should now see a single pet.

#### Create the Third Lambda Function

One more AWS Lambda function is required that does nothing. This is needed by the OPTIONS method for CORS as described in the next step. Repeat the steps for creating a Lambda function and name it `NoOp`. For the code add the following:
    ```js
    exports.handler = function(event, context) {
        context.succeed('');
    }
    ```

Go to the Amazon API Gateway console, and click **Create API**. Name the API `SecurePets` and click **Create API**.

Click **Create Resource**. Name the resource `Pets`, and click **Create Resource** again.

In the left pane, select `/pets` and then click the **CreateMethod** button. In the drop down, select *GET* and click the checkmark button. Select *Lambda Function* for integration type, select the region you are in, and select *GetPetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. Click **Test**, and you should see the single pet returned in the response body.

In the left pane, select `/pets` again, and click **CreateMethod**. In the drop down, select *POST*, and click the checkmark button. Select *Lambda Function* for integration type, select the region you are in, and select *UpdatePetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. click **Test**, and for the request body paste:

    ```js
    {"pets": [ {"id": 1, "type": "dog", "price": 249.99},
               {"id": 2, "type": "cat", "price": 124.99}
             ]
     }
    ```

You should see an empty return result (`{}`). Go back to the *GET* API, and click **Test** again to see 2 pets. At this point the AWS Lambda functions and the Amazon API Gateway methods are defined with no security.

[Prev](/integrations/aws-api-gateway) ----- [Next](/integrations/aws-api-gateway/part-2)
