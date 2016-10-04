---
title: Amazon API Gateway Tutorial - Setup the Amazon API Gateway
description: Step 1 of Amazon API Gateway Tutorial
---

# Amazon API Gateway Tutorial
## Step 1 - Setting up the Amazon API Gateway
[Prev](/integrations/aws-api-gateway) ----- [Next](/integrations/aws-api-gateway/part-2)

After completing this step you will have created two unauthenticated REST service methods for getting and updating a list of pets. You will set up Amazon API Gateway using AWS Lambda functions to execute your service logic that stores and retrieves pets from an [Amazon DynamoDB](https://aws.amazon.com/dynamodb) table. You need to have [node.js](https://nodejs.org/) already installed.

Perform the following steps to create an Amazon table and the AWS Lambda functions and Amazon API Gateway APIs after logging into the AWS console.

1. First create a table in Amazon DynamoDB. In the Amazon DynamoDB console, click on **Create Table**, name the table `Pets`, select a *Primary Key Type* of *String*, and name the key `username`. Uncheck *Use default settings*, change the read and write units to *3*, and then press **Create**. While the table is being created, take note of the *Amazon Resource Name (ARN)* under the *Table details* section, you will need the table's ARN in the next step.

2. Next create a policy that allows your AWS Lambda functions to access CloudWatch logs and the Pets table. Select the AWS IAM console. Click on **Roles** in the left menu, and then click the **Create New Role** button. Name the role `APIGatewayLambdaExecRole` and click **Next Step**. Under *AWS Service Roles*, select *AWS Lambda*. For Attach Policy just skip by clicking **Next Step**. Click **Create Role**. Now select the role you just created, **APIGatewayLambdaExecRole**. Click the down arrow for *Inline Policies* and click the **click here** link. Select *Custom Policy*, and then click **Select**. Name the policy `LogAndDynamoDBAccess` and add the following for the policy document (first update the amazon resource name (arn) for your DynamoDB table). Click **Apply Policy**.

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

3. The next three steps create the AWS Lambda functions for getting and putting pet information. In the AWS Lambda console, select **Create a Lambda function** (if you have not created an AWS Lambda function before, you will click **Get Started Now**). Click **Skip** for selecting a blueprint, and enter `GetPetInfo` for the *Name*. Select *Node.js* for the runtime, and paste the following code to read pets from the dynamodb table:

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

4. Repeat the previous step, naming the new function `UpdatePetInfo` and paste this code:

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
5. Test the function by clicking on the *Actions* drop down and choosing **Configure sample event**. Enter the following for sample data, and click **Submit**:
    ```js
    {"pets": [ {"id": 1, "type": "dog", "price": 249.99}]}
    ```
You should see an empty return result (`{}`). Go to your `GetPetInfo` Lambda, and click **Test** again. You should now see a single pet.

6. One more AWS Lambda function is required that does nothing. This is needed by the OPTIONS method for CORS as described in the next step. Repeat the steps for creating a Lambda function and name it `NoOp`. For the code add the following:
    ```js
    exports.handler = function(event, context) {
        context.succeed('');
    }
    ```
7. Go to the Amazon API Gateway console, and click **Create API**. Name the API `SecurePets` and click **Create API**.

8. Click **Create Resource**. Name the resource `Pets`, and click **Create Resource** again.

9. In the left pane, select `/pets` and then click the **CreateMethod** button. In the drop down, select *GET* and click the checkmark button. Select *Lambda Function* for integration type, select the region you are in, and select *GetPetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. Click **Test**, and you should see the single pet returned in the response body.

10. In the left pane, select `/pets` again, and click **CreateMethod**. In the drop down, select *POST*, and click the checkmark button. Select *Lambda Function* for integration type, select the region you are in, and select *UpdatePetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. click **Test**, and for the request body paste:
    ```js
    {"pets": [ {"id": 1, "type": "dog", "price": 249.99},
               {"id": 2, "type": "cat", "price": 124.99}
             ]
     }
    ```

You should see an empty return result (`{}`). Go back to the *GET* API, and click **Test** again to see 2 pets. At this point the AWS Lambda functions and the Amazon API Gateway methods are defined with no security.

[Prev](/integrations/aws-api-gateway) ----- [Next](/integrations/aws-api-gateway/part-2)
