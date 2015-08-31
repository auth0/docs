# AWS API Gateway Tutorial
### Building a Serverless Application using Token-based Authentication with AWS API Gateway and Lambda

With AWS, you can create powerful, serverless, highly scalable APIs and applications through AWS Lambda, Amazon API Gateway, and a Javascript client. A serverless application runs custom code as a service without the need to maintain an operating the environment to host your service. Instead, a compute service like [AWS Lambda](https://aws.amazon.com/lambda/) or [webtask.io](https://webtask.io) executes your code on your behalf. Amazon API Gateway extends the capabilities of AWS Lambda by adding a service layer in front of your Lambda functions to extend security, manage input and output message transformations, and provide capabilities like throttling and auditing. A serverless approach simplifies your operational demands since concerns like scaling out and fault tolerance are now the responsibility of the compute service that is executing your code.

However, you may still want to tie your APIs to existing users, either from social providers like Twitter and Facebook, or within your own organization from Active Directory or a customer database. This tutorial demonstrates how to authorize access of your Amazon API Gateway methods for your existing users using Auth0 delegation for AWS and integration with AWS Identity and Access Management (IAM), and assign different permissions to various classes of users, like internal database or social users.

## Setup the AWS API Gateway
You will need to have [node.js](https://nodejs.org/) already installed. Perform the following steps to create a [DynamoDB](https://aws.amazon.com/dynamodb) table and the Lambda functions and APIs for getting and putting pets.

1. In the DynamoDB console, create a table `Pets` with a string hash key, `username`.
2. Create the *APIGatewayLamdaExecRole* as outlined in [Walkthrough: Lambda Functions, step 4](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-models.html#getting-started-models-lambda), and expand the additional policy for dynamodb access as shown below:
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
            	"Resource": ["<your dynamodb pets table arn>"]
     }]}
    ```
3. In the AWS API Gateway console, create a new API named “Secured Pets”. Select **Resources > Models**.
4. In the AWS Lamda console, select **Create a Lamda function**. Click **Skip** for the blueprint, and enter “GetPetInfo” for the *Name*. Select *Node.js* for the runtime, and paste the following code to read pets from the dynamodb table:
    ```js

    var AWS = require('aws-sdk');
    var DOC = require('dynamodb-doc');
    var dynamo = new DOC.DynamoDB();

    exports.handler = function(event, context) {
    var cb = function(err, data) {
        if(err) {
            console.log('error on GetPetsInfo: ',err);
            context.done('Unable to retrieve pet information at this time', null);
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
For *Role*, select the *APIGatewayLambdaExecRole* role you just created and leave the default for all other settings. Click **Next**, and then select **Create function**. Select **Test**, and then **Submit**. You should see an empty output (`{}`) since the table is empty.
5. Repeat the previous step, naming the new function “UpdatePetInfo” and paste this code:
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
6. Test the function by supplying the following as the input and clicking **Submit**:
    ```js

    {"pets": [ {"id": 1, "type": "dog", "price": 249.99}]}
    ```
You should see an empty return result (`{}`). Go to your GetPetInfo Lambda, and click **Test** again. You should now see a single pet.
7. One more AWS Lambda function is required that does nothing. This is needed by the OPTIONS method for CORS as described in the following section. Repeat the steps for creating a Lambda function and name it “NoOp”. For the code simply call `context.succeed('');`.
8. Back in the AWS API Gateway console, select **Models > Resources**. Click **Create Resource**. Name the resource “Pets”, and click **Create Resource** again.
9. In the left pane, select `/pets` and then click the **CreateMethod** button. In the drop down, select *GET* and click the checkmark button. Select **Lambda Function** for integration type, select the region you are in, and select *GetPetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. Click **Test**, and you should see the single pet returned in the response body.
10. In the left pane, select `/pets` again, and click **CreateMethod**. In the drop down, select *POST*, and click the checkmark button. Select **Lambda Function** for integration type, select the region you are in, and select *UpdatePetInfo* for the Lambda function. Click **Save** and then **OK** in the popup. click **Test**, and for the request body paste:
    ```js

    {"pets": [ {"id": 1, "type": "dog", "price": 249.99},
    {"id": 2, "type": "cat", "price": 124.99}]}
    ```
You should see an empty return result (`{}`). Go back to the *GET* API, and click **Test** again to see 2 pets. At this point both API methods are defined with no security.

## Secure your AWS API Gateway APIs

Now that you have your API running, you need to add security. AWS API Gateway provides a two different methods to secure your APIs - API keys, and IAM. Using API keys is typically appropriate for a service to service interaction as illustrated below. However, putting a long lived secret on a client is risky since clients are easier to compromise. Also, creating a framework to issue and manage API keys requires a secure implementation that may be challenging to develop.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-key.png)

For this tutorial, you’ll build a serverless, single page application, that will rely on federating identity with other identity sources to determine which users are allowed access. You can achieve this using a combination of the Amazon API Gateway IAM integration and AWS IAM’s identity federation with Auth0. The following diagram illustrates an example flow using a SAML based identity provider:

![](/media/articles/integrations/aws-api-gateway/auth-flow.png)

You’ll implement this in two ways, first using Auth0 delegation with AWS IAM and then adding an identity token to flow identity to the Lambda function.

### Configure IAM and Auth0 for SAML integration and the API Gateway
The IAM integration with SAML lets the SAML identity provider (IDP) specify the IAM role for a user within the issued SAML token which is exchanged for an AWS token. This model is powerful because it lets the IDP control the level of access for your users by issuing SAML tokens with different IAM roles. For example, the IDP could select the IAM role based on group membership (e.g. administrator in Active Directory), or authentication source (e.g. a database connection or a social provider like Facebook). This approach lets your service differentiate user access to your Amazon API Gateway methods when secured using IAM.

To configure Auth0 with SAML, do the following:


1. Sign up for a free Auth0 developer account, and sign in.
2. In the left menu, select **Apps and APIs**, then click **New App and API**. Call the new app “AWS Api Gateway”.
3. Click on the **Settings** tab.
4. Follow the [How to Setup AWS to do Delegated Authentication with APIs](https://auth0.com/docs/aws-api-setup) walkthrough to configure AWS for delegated access, which uses SAML behind the scenes. Name the AWS IAM role you create “auth0-api-role”.

Once the AWS IAM role is configured, add a policy to the `auth0-api-role` role that lets you execute your API gateway methods. This is described in [User Access Permissions for Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html). The following paragraphs summarize the steps required.

The Amazon Resource Name (arn) that controls access to your APIs will look something like:
```
arn:aws:execute-api:us-east-1:your-accountid:your-api-id/*/pets
```
The wildcard (`*`) enables permissions for all stages for your API. You can deploy different stages (for example dev, test, prod). You can see the arn by selecting the *Method Request* definition for one of your API methods.

Select the role you just created, and expand **Inline Policies**, and click the **click here** link. Select **Custom Policy**, click the **Select** button, and pick a name like “api-gateway-policy”. To enable access to your api methods after updating the arn with the one for your API, add the following and then click **Apply Policy**.
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
You’ll need to make one additional change. Since the API gateway will assume this role on a user’s behalf, the trust policy needs to permit this action. Click on **Edit Trust Relationship** and add the policy statement for gateway. The final trust relationship should look similar to the following:
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
2. The Options method is used by the browser to get headers, but the function needs to work. For options setup, select Lambda and then select *NoOp* for the method.
3. Click on **Method Response**, expand **200**, and then add these three headers:
    ```
    'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods',  'Access-Control-Allow-Origin'
    ```
4. Now you need to map values. Click the **Method Execution** link and then click the **Integration Response** link. Expand the **200** response, and then expand the **Header Mappings**. For *Access-Control-Allow-Headers*, enter `'Content-Type,X-Amz-Date,Authorization,x-api-key,x-amz-security-token'`.  For *Access-Control-Allow-Origin*, enter `'*'`. For *Access-Control-Allow-Methods*, enter `POST, GET, OPTIONS`.
5. For the *POST* and *GET* methods, follow the same process as above to add a single header, *Access-Control-Allow-Origin*, with the value `'*'`.

### Deploy the API

Select the **DEPLOY API** button from the **RESOURCES** view. Select **New Stage** for deploy state, and name the stage “test”. Click the **Deploy** button. On the result page, you will see a tab for **SDK Generation**. Click the tab, and select *JavaScript* for the platform. Click the **Generate SDK** button. Save the downloaded zip file for later use.

## Create the Client Application

The client application will be a single page, serverless application based on the AngularJS framework that you will serve out of an S3 bucket configured as a website. To begin, create a bucket for the application and configure it as a website with a home page of `index.html`. You can find instructions at [Hosting a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html).

For a simple starter app, download a seed project from [Auth0 for AngularJS](https://auth0.com/docs/client-platforms/angularjs). Go to the application you created in Auth0, and click on the **Quick Start** tab. Here you will see options for different types of application models. Select **Single Page App**, then select **Angular**. For the back-end platform, select the **NO, SKIP THIS** button. You can now download a seed project that has your account settings pre-configured. Copy the contents of this seed project to a local folder. You will be using the `pets` folder for the remainder of this tutorial. From the `pets` directory, copy the contents to your S3 bucket for the website. An easy way to do this is with the [AWS CLI](https://aws.amazon.com/cli/).
```
aws s3 cp --recursive --acl "public-read" ./ s3://your-bucket/
```
Although the sample project is functional, you need to make a few configuration changes for it to work with your AWS API Gateway APIs. First, get an *OpenId* identity token based on your credentials. With Auth0, you can use many different sources of users to authenticate called connections and grant access to applications like AWS. Begin with using the users of the built-in Auth0 database *Username-Password-Authentication* that was created when you opened your account. From the Auth0 console, click on the **Connections** tab of your application and you should see that this connection is enabled. Click on **Users** in the left column, and click **New User**. Fill in the information for the user, and click **Save**. You now have one user available to authenticate.

There is one last step to get authentication to work. The website runs at a url like `http://your-bucket-domain/index.html`, which is shown under the properties of your S3 bucket. To tell Auth0 that it is OK to permit authentication from your website, add `http://your-bucket-domain` to the *Allowed Origins* in the Auth0 application settings.

Before going further, test logging into your application. Open `http://your-bucket-domain/index.html` in your browser. After logging in with the user you just created you should see a welcome screen with a big blue button, **CALL API**.

### Use Delegation to get an AWS Token

At this point you have authenticated with Auth0, and you have an OpenId token. Here is the directory structure for the generated code.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-project.png)

You can use Auth0's delegation capability to obtain a token to access AWS based on our identity token. Behind the scenes, Auth0 authenticates your identity token, and then uses SAML based on the add-on that you configured as part of the [previous section](#configure-iam-and-auth0-for-saml-integration-and-the-api-gateway). You need to make a simple extension to `login.js` to obtain a delegation token from the identity token:

```js
angular.module( 'sample.login', ['auth0'])
.controller( 'LoginCtrl', function HomeController( $scope, auth, $location, store ) {
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      
      // obtain a delegation token here!!!
      
      $location.path("/");
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
});

```

You need to make one more call by modifying the callback function for `auth.signin` to the following code, (be sure to modify the role and principal strings to contain your actual account id value):

```js
      store.set('profile', profile);
      store.set('token', token);

      var options = {
        "id_token": token,        // the token you just obtained
        "role":"arn:aws:iam::<your account id>:role/auth0-api-role",
        "principal": "arn:aws:iam::<your account id>:saml-provider/auth0-api"
      };

      auth.getToken(options)
        .then(
          function(delegation)  {
            store.set('awstoken', delegation.Credentials);  //add to local storage
      $location.path("/");
          }, 
        function(err) {
           console.log('failed to acquire delegation token', err);
      });
```

If you set a breakpoint in the browser and inspect `delegation.Credentials`, you will see a familiar values like *AccessKeyId* and *SecretAccessKey* if you've accessed AWS APIs programmatically before:

```js
  {
	AccessKeyId: "ASIAJB...BNQ", 
	SecretAccessKey: "vS+b6...2Noav", 
	SessionToken: "AQoDYBqsivOV...DdQW0gsKr8rgU=", 
	Expiration: "2015-08-27T14:48:32.000Z"
  }
```

### Display Pets with the AWS API Service

First, show the pets to end users. To add the API code for adding a call to your service, copy the contents of *apiGateway-js-sdk.zip* you previously downloaded to the `pets` directory. The contents should include `apiClient.js`, a `lib` folder, and a `README.md`. There is already a `README.md` in the `pets` directory, so just keep both. (The `README.md` for the API gateway explains how to use the api client from your application.) Open `index.html`, and add all of the scripts listed at the top of the API readme to `index.html`. For example:

```html
    <!-- scripts for aws api gateway -->
    <script type="text/javascript" src="lib/axios/dist/axios.standalone.js"></script>
    <script type="text/javascript" src="lib/CryptoJS/rollups/hmac-sha256.js"></script>
    <script type="text/javascript" src="lib/CryptoJS/rollups/sha256.js"></script>
    <script type="text/javascript" src="lib/CryptoJS/components/hmac.js"></script>
    <script type="text/javascript" src="lib/CryptoJS/components/enc-base64.js"></script>
    <script type="text/javascript" src="lib/moment/moment.js"></script>
    <script type="text/javascript" src="lib/url-template/url-template.js"></script>
    <script type="text/javascript" src="lib/apiGatewayCore/sigV4Client.js"></script>
    <script type="text/javascript" src="lib/apiGatewayCore/apiGatewayClient.js"></script>
    <script type="text/javascript" src="lib/apiGatewayCore/simpleHttpClient.js"></script>
    <script type="text/javascript" src="lib/apiGatewayCore/utils.js"></script>
    <script type="text/javascript" src="apigClient.js"></script>
```

If you open `apiClient.js`, you can see that the downloaded library has created wrappers like `petsPost` and `petsGet` for your API methods. Don't modify this generated code. Open `home.js` and replace the contents of `callApi` with `alert('not implemented');` and rename `callApi` to `putPets`. Add a method for getting pets as follows:

```js
  function showError(response) {
    if (response instanceof Error) {
       console.log('Error', response.message);
    } else {
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
      console.log(response.config);
    }
  }
  
   function getPets() {
    // this is unauthenticated
    var apigClient = apigClientFactory.newClient({
        region: 'us-east-1' // The region where the API is deployed
    });

    apigClient.petsGet()
      .then(function(response) {
        console.log(response);
        $scope.pets = response.data;
        $scope.$apply();
      }).catch(function (response) {
        alert('pets get failed');
        showError(response);
     });
   }
```

At the very bottom of the controller method, add a call to `getPets();`.

Finally,add the code to show the pets. Open `home.html` and replace the content with the following html:

```html
<div class="home">
  <h1 id="logo"><img src="/home/auth0_logo_final_blue_RGB.png" /></h1>
  <h2>Welcome {{auth.profile.nickname}} to sell your pets!</h2>

  <div ng-repeat="pet in pets track by pet.id">
    We have a {{pet.type}} is for sale for {{pet.price}}
  </div>
  <br />
  <button class="btn btn-lg btn-primary" ng-click="putPets()">Update Pets</button> <br />
  <button class="btn-sm btn-warning" ng-click="logout()">Logout</button>
</div>
```

If you refresh the page, you should see two animals listed (assuming you ran the previously described test on your API’s that created these pets).

### Update Pets with the AWS API Service

Now that you have a working application with the API Gateway, add a method for updating the pets. First try it without authentication, and then add it in.

To add a *delete* button for each line, and an *add* button and an *add* section, update your home view to the following:

```html
<style>
  .delete-btn { font-size:14px; background-color:red; }
  .sm-btn { font-size:16px;}
</style>

<div class="home">
  <h1 id="logo"><img src="/home/auth0_logo_final_blue_RGB.png" /></h1>
  <h2>Welcome {{auth.profile.nickname}} to sell your pets!</h2>

  <div ng-repeat="pet in pets track by pet.id">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
We have a {{pet.type}} is for sale for {{pet.price}}
      </div>
      <div class="col-md-1">
       <button ng-show="isAdmin" class="btn delete-btn" ng-click="removePet(pet.id)">remove</button>
       </div>
    </div>
  </div>
  <br />

  <button class="btn sm-btn" ng-click="addPets()" ng-hide="adding">Add Pets</button>
  <div ng-show="adding">
    <label>Pet Type:&nbsp;</label><input type="text" ng-model="newpet.type"></input><br />
    <label>Pet Price:&nbsp;</label><input type="text" ng-model="newpet.price"></input>
    <br />
    <button class="bnt sm-btn" ng-click="savePet()">save</button>
    <button class="bnt  sm-btn" ng-click="cancelAddPet()">cancel</button>
  </div>
  <br /><br />
  <button class="btn btn-warning sm-btn" ng-click="logout()">Logout</button>
</div>
```
Now add handlers for the buttons in your controller. First, add the handlers for adding a pet (only allowing admins to do that, and assuming that anyone authenticated from the *Username-Password-Authentication* store is an admin). Add this code above the call to `getPets()` in your controller.

```js
  $scope.isAdmin = store.get('profile').isAdmin;
  $scope.adding = false;

  $scope.addPets = function() {
    $scope.adding = true;
  }

  $scope.cancelAddPet = function() {
    $scope.adding = false;
  }

 function putPets(updatedPets) {
    var body = {pets: updatedPets};
 
    var apigClient = apigClientFactory.newClient({
        region: 'us-east-1' // OPTIONAL: by default this parameter is set to us-east-1
    });

    apigClient.petsPost({},body)
      .then(function(response) {
        console.log(response);      
       }).catch(function (response) {
        alert('pets update failed');
        showError(response);
      });
  }

  $scope.removePet = function(id) {
    var index = -1;
     angular.forEach($scope.pets, function(p, i) {
       if(p.id === id) index = i;
     });   
     
     if(index >= 0) {
        $scope.pets.splice(index, 1);
        putPets($scope.pets);
     }
  }

  $scope.savePet = function() {
    var maxid = 0;
    angular.forEach($scope.pets, function(p) {
      if(p.id > maxid) maxid = p.id;
    });
    
    var newPet = {};
    newPet.id = maxid + 1;
    newPet.type = $scope.newpet.type;
    newPet.price = $scope.newpet.price;
    $scope.pets.push(newPet);
    putPets($scope.pets);
    $scope.adding = false;
    $scope.newpet.type = "";
    $scope.newpet.price = "";
  }
```

You need to make a small modification to the login. While you could determine if a user is an admin by using a rule to add a property when the user is authenticated by Auth0, you could simply decide that a user is an admin if they don't use a social login. That logic belongs in the login controller. Add the following to your login function before you set the profile in the store:

```js
   profile.isAdmin = !profile.identities[0].isSocial;
   store.set('profile', profile);
```

The update logic will fail because you are not yet authenticating the AWS API Gateway method using IAM for *petsPost*, but you should test it. Add a frog for 4.99. You should see a failure occurring when you try to save. The error code is likely a failure due to the absence of the `Access-Control-Allow-Origin` header. When you setup CORS, it was only configured up for a *200* status code. You’ll need to set this up for each status code you want to go through to the end user. If you look in the browser debugger, you’ll see that the underlying status is a 403.

Now add security by providing the token information to the API at the start of the `putPets` method:

```js
  function getSecureApiClient() {
    var awstoken = store.get('awstoken');
    return apigClientFactory.newClient({
        accessKey: awstoken.AccessKeyId,
        secretKey: awstoken.SecretAccessKey,
        sessionToken: awstoken.SessionToken,
        region: 'us-east-1' // OPTIONAL: by default this parameter is set to us-east-1
    });
  }
  function putPets(updatedPets) {
     var apigClient = getSecureApiClient();
```

The update should now succeed.

## Discriminate between types of users

For many applications, you’ll want different users to have different levels of access, and often you’ll want more information about an identity to use in your service logic. For cases where it’s sufficient to lock down access at the API level, you can use different IAM roles (for example, administrators can use the update function to add and remove pets, but social users can only buy pets). For cases where you want to make decisions within your code, (e.g. a credit check of a user buying a pet) you will want to flow identity as well. This will be demonstrated below in the [Use An Identity Token](#use-an-identity-token) section.

### Create the PetPurchase API resource

From the API Gateway console, repeat the process [outlined above](#setup-the-aws-api-gateway) to create a new API resource by selecting `pets`, and clicking **Create Resource**. Name the new API resource “purchase”. Add an *OPTIONS* method for the `purchase` resource as outlined previously for `pets`. Create a new AWS Lamda function for purchasing a pet called “PetPurchase”, which adds a `isSold` and `soldTo` attribute to a pet as follows:

```js
var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var dynamo = new DOC.DynamoDB();
    
exports.handler = function(event, context) {
    var petId = event.petId;
    var user = event.userName;
    var pets = {};
    console.log('start PetsPurchase, petId', petId, ' userName', user);
    
    var writecb = function(err, data) {
        if(!err) {
            context.done(null, pets);
        } else {
            console.log('error on GetPetsInfo: ',err);
            context.done('failed on update', null);
        }
    };

    var readcb = function(err, data) {
        if(err) {
            console.log('error on GetPetsInfo: ',err);
            context.done('failed to retrieve pet information', null);
        } else {
            // make sure we have pets
            if(data.Item && data.Item.pets) {
                pets = data.Item.pets;
                var found = false;
                
                for(var i = 0; i < pets.length && !found; i++) {
                    if(pets[i].id === petId) {
                        if(!pets[i].isSold) {
                            pets[i].isSold = true;
                            pets[i].soldTo = user;
                            var item = { username:"default",pets: pets};
                            dynamo.putItem({TableName:"Pets", Item:item}, writecb);
                            found = true;
                        }
                    }
                }
                if(!found) {
                    console.log('pet not found');
                    context.done('That pet is not available.', null);
                }
            } else {
               console.log('pet already sold');
               context.done('That pet is not available.', null);           
            }
        }
    };

    dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, readcb);
};
```

Once the Lambda function is defined, add another method, *POST*, to the `purchase` resource which calls the `PetPurchase` Lambda. Be sure to also add the `Access-Control-Allow-Origin` header with a value of `*` to the *POST* method using the method response/integration response configuration. Test the API gateway method, providing as input a message similar to this: 

```js
 {
    "petId": 1,
    "userName": "fred flintstone"
 }
```

### Use IAM to Secure the PurchasePet API

#### Update IAM

To secure your new API, follow the same process for adding a new role that you [performed above](#configure-iam-and-auth0-for-saml-integration-and-the-api-gateway). Call the new role “auth0-api-social-role”. The arn for the method being secured should look something like:

```
arn:aws:execute-api:us-east-1:your-accountid:your-api-id/*/pets/purchase
```

Go to the API Gateway console, and select the *POST* method for the `/pets/purchase` resource. Select **Method Request** and change **Authorization Type** to *AWS_IAM*. Click the check to save the setting.

At this point, you have defined two roles that you can use with the API gateway. The first, `auth0-api-role`, permits updating the pets (`/pets`, *POST* method) and the second, `auth0-api-social-role`, permits purchasing a pet.

#### Configure Login with Amazon and update Auth0

To create a social role, use Login with Amazon(LWA). Go back to the Auth0 console, and select **Connections** then **Social** in the right menu. Turn on the connection for Amazon. A wizard pops up to lead you through the process. Click **Continue**, and you’ll see a configuration page for entering the *client id* and *client secret*. If you haven’t used Login with Amazon before, there is also a link for “how to obtain a client id”. Click on this link to obtain the *client id* and *client secret* and copy this information into the configuration page. Once you’ve entered your *client id* and *client secret*, you can test it from the Auth0 console. When you configure LWA make sure to enter into **Allowed Return URLs** the callback to your Auth0, which should look something like `https://johndoe.auth0.com/login/callback`. The Auth0 help page shows you specifically what to enter.

In Auth0 console, go back to your **Apps/APIs**, select your application, then select the **Connections** tab. Make sure that *amazon* is enabled for social. While this tutorial uses LWA, you can choose to use any other social provider and follow similar steps. The remainder of the tutorial will work once your social authentication is functioning.

#### Deploy the API and update the single page application

In the AWS API Gateway console, deploy the API again and generate a new javascript SDK. At this point everything is set to purchase pets with the AWS API Gateway and Auth0. You can copy that SDK over the previous one in the client code.

First, update the login controller logic to select different roles for different users. When you obtain the delegation token, you can tell Auth0 which role to use if the user is an admin or not. Make sure to replace the *account id* in the following code with your ids.

```js
  function getOptionsForRole(isAdmin, token) {
    if(isAdmin) {
      return {
          "id_token": token,        // the token you just obtained
          "role":"arn:aws:iam::<your account id>:role/auth0-api-role",
          "principal": "arn:aws:iam::<your account id>:saml-provider/auth0-api"
        };
      }
    else {
      return {
          "id_token": token,        // the token you just obtained
          "role":"arn:aws:iam::<your account id>:role/auth0-api-social-role",
          "principal": "arn:aws:iam::<your account id>:saml-provider/auth0-api"
        };
    }
  }
```

Update the login logic for obtaining the delegation token to set the role if the user is a social user or not, and call `getOptionsForRole` to get the appropriate role:

```js
profile.isAdmin = !profile.identities[0].isSocial;
var options = getOptionsForRole(profile.isAdmin, token);
```

At this point, you should be able to login using your Amazon credentials, or using the database user you previously created. If you try to add or remove using your Amazon credentials, you will see that the operation fails.

Now update the home view to show a buy button if the user is not an administrator, and to indicate pets that are sold. The *remove* and *Add Pets* buttons will only be shown to administrators, while the *Buy!* button will only be shown to social users.

```html
<style>
    .delete-btn { font-size:14px; background-color:red; }
    .buy-btn { font-size:14px; background-color:green; }
    .sm-btn { font-size:16px;}
</style>

<div class="home">
  <h1 id="logo"><img src="/home/auth0_logo_final_blue_RGB.png" /></h1>
  <h2>Welcome {{auth.profile.nickname}} to sell your pets!</h2>

  <div ng-repeat="pet in pets track by pet.id">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">We have a {{pet.type}} is for sale for {{pet.price}}</div>
        <div class="col-md-2" style='text-align:left;'>
            <button ng-show="isAdmin" class="btn delete-btn" ng-click="removePet(pet.id)">remove</button>
            <button ng-show="!isAdmin && !pet.isSold" class="btn buy-btn" ng-click="buyPet(pet.id)">Buy!</button>
            <label ng-show="pet.isSold">sold</label>
       </div>
    </div>
  </div>
  <br />

  <button class="btn sm-btn" ng-click="addPets()" ng-hide="adding || !isAdmin">Add Pets</button>

  <div ng-show="adding">
        <label>Pet Type:&nbsp;</label><input type="text" ng-model="newpet.type"></input><br />
        <label>Pet Price:&nbsp;</label><input type="text" ng-model="newpet.price"></input> <br />
        <button class="bnt sm-btn" ng-click="savePet()">save</button>
        <button class="bnt  sm-btn" ng-click="cancelAddPet()">cancel</button>
  </div>

  <br /><br />
  <button class="btn btn-warning sm-btn" ng-click="logout()">Logout</button>
</div>
```

In the controller, update the functionality to identify if the user is an administrator and add a *buyPet* for social users. The following snippets show updated code in the `HomeController`.

```js
angular.module( 'sample.home', ['auth0'])
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store ) {
  … 
  function buyPet(user, id) {
    var apigClient = getSecureApiClient();

    apigClient.petsPurchasePost({},{userName:user, petId:id})
      .then(function(response) {
        console.log(response);
        $scope.pets = response.data;
        $scope.$apply();
      }).catch(function (response) {
        alert('buy pets failed');
        showError(response);
    });
  }
  … 
  $scope.buyPet = function(id) {
    var profile = store.get('profile');
    var user = profile.name || profile.email;
    buyPet(user, id);
  }
  … 
```

Now you can log in as a social user. When you log in as an Amazon user, you’ll see that you can buy a pet but not add or remove pets. If you log in with the database account, you should still be able to add and remove pets.

### Use Auth0 rules to enforce role assignment

In some cases, determining the role in the browser application is appropriate as shown here, but often you will want to determine user privileges on the server-side to prevent a user from assuming a more privileged role then they are permitted by hacking the client code. With Auth0, you can do this with a rule. Rules are service logic defined by developers/administrators that run during the authentication process within Auth0. You could eliminate passing role information from the client and only implement it in a rule. Rules can override and add settings. For example, you can create a rule to insert role information into the delegation request based on the authentication source. For more on rules see: [Rules](https://auth0.com/docs/rules).

![](/media/articles/integrations/aws-api-gateway/roles-in-use.png)

Add a rule that will check if the role requested is allowed for this user depending on whether they have a social or an administrative login. Go to the Auth0 console, and click **Rules** in the left menu. Click the **New Rule** button. You can see a lot of pre-built templates for common rules. In this case select an empty rule. Put the following code into the rule body (make sure the *clientID* matches the *clientID* of your Auth0 application):

```js
function (user, context, callback) {
  if(context.clientID === '${account.clientId}') {    
    var socialRoleInfo = {
      role:"arn:aws:iam::<your account>:role/auth0-api-social-role",
      principal: "arn:aws:iam::your account>:saml-provider/auth0-api"
    };
    
    var adminRoleInfo = {
      role:"arn:aws:iam::<your account>:role/auth0-api-role",
      principal: "arn:aws:iam::<your account>:saml-provider/auth0-api"
    };
    
    var requestRole = context.request.body.role;
    var requestPrincipal = context.request.body.principal;
    var allowedRole = null;
    
    if(user.identities[0].isSocial === false) {
      allowedRole = adminRoleInfo;
    } else {
      allowedRole = socialRoleInfo;
    }
    
    if((requestRole && requestRole !== allowedRole.role) ||
       (requestPrincipal && requestPrincipal !== allowedRole.principal)) {
        console.log('mismatch in requested role:',requestRole, ':', requestPrincipal);
        console.log('overridding');
    } else {
      console.log('valid or no role requested for delegation');
    }
    
    context.addonConfiguration = context.addonConfiguration || {};
    context.addonConfiguration.aws = context.addonConfiguration.aws || {};
    context.addonConfiguration.aws.role = allowedRole.role;
    context.addonConfiguration.aws.principal = allowedRole.principal;
    callback(null, user, context);
    
  } else {
    callback(null, user, context);
  } 
}
```

A few characteristics to point out:

- Rules run at a global scope for every authentication. Unless you want to run logic on every request, it's best to only run your logic if it is your application. The check for *clientID* at the top of this code restricts running to only this Auth0 application.
- A lot of information is passed into the rule with *context* and *user*.
- You can extend the objects passed in. In the code above, the rule checks the body of the request for the role information passed and, if present, allows the requested role by matching it to the allowed role. The role is then set into the context *addonConfiguration* (which always overrides settings in the request body) of the allowed role. 

Adjust the role and principal values above for the ones in your account and save. You can read more on rules at: [Rules](https://auth0.com/docs/rules). 

Now you can setup debugging. Click the **Debug Rule** button and follow the instructions to see the logged output. You can test switching roles in the client, or just removing the role definitions in the client code. You can see that the roles are now being enforced by the service.

## Use An Identity Token
Often, you will want to do the processing of a user's role based on the users identity in the logic of your Lambda function. In the purchasing example above, you retrieved the user name from the profile returned with the identity token. Another option is to have the user information embedded with the identity, which is a JSON web token (JWT). The advantage of this method is that you can verify the authenticity of the JWT, and be assured that the calling user is authenticated rather than relying on having it passed in as a parameter.

![](/media/articles/integrations/aws-api-gateway/identity-flow.png)

There are several ways of causing the email to be added into the JWT.  One way is to use another rule, which is a good approach if you want make sure this value is always in the JWT for an authenticating client:

```js
   function (user, context, callback) {
     if(context.clientID === '${account.clientId}') {   
  	context.jwtConfiguration.scopes = { 'openid': ['email'] };
	callback(null, user, context);
     }
   }
```

Another way is to request the information like the user's email as part of the scope when you login in the browser client. You will be using this approach. Open `login.js` and update the login method as follows to instruct Auth0 to include the email:

```js
 $scope.login = function() {
     var params = {
        authParams: {
          scope: 'openid email' 
        }
      };

    auth.signin(params, function(profile, token) {
      … 
```

You can request up to the full profile of the user to be contained within the JWT. However, since the JWT is typically passed on every request, you'll want to only include what you need to keep the token lightweight.

The AWS Lambda console has access to a relatively limited number of node modules that can be accessed when you enter your node.js code using the browser console. In order to use the modules needed to process the identity token, you'll need to include additional modules and upload the Lambda function as a package (for details, see [Creating Deployment Package (Node.js)](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) and [Upload the Deployment Package and Test](http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-s3-events-adminuser-create-test-function-upload-zip-test.html).

You'll need to create two files, and then run **npm install**, and zip up the result. Create a directory for your definition, and add the following `package.json` definition:

```js
{
  "name": "purchase-pet-example",
  "version": "0.1.0",
  "description": "Example for creating a Lambda with json web token logic",
  "license": "MIT",
  "main": "purchasepet.js",
   "dependencies": {
        "aws-sdk":"*",
        "dynamodb-doc":"*",
        "jsonwebtoken": "*"
    }
}
```

Next, create a new file, `index.js`, to contain the code for purchasing a pet. This code adds extraction and validation of the JWT. By default, Auth0 uses a symmetric key (although there is an option to use asymmetric keys, where you'd only need to put your public key into the function). If you need to let third parties validate your token, you should use an asymmetric key. For more information about token verification see [Identity Protocols supported by Auth0](https://auth0.com/docs/protocols). You will be using a symmetric key (client secret) for validating the token.

```js
var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var dynamo = new DOC.DynamoDB();
var jwt = require('jsonwebtoken');

var secret = '<client secret for your Auth0 application>';
    
exports.handler = function(event, context) {
    var petId = event.petId;
    var userEmail = '';
    var pets = {};

    // callback for reading pet info from dynamodb
    var readcb = function(err, data) {
        if(err) {
            console.log('error on GetPetsInfo: ',err);
            context.done('failed to retrieve pet information', null);
        } else {
            // make sure we have pets
            if(data.Item && data.Item.pets) {
                pets = data.Item.pets;
                var found = false;
                
                for(var i = 0; i < pets.length && !found; i++) {
                    if(pets[i].id === petId) {
                        if(!pets[i].isSold) {
                            pets[i].isSold = true;
                            pets[i].soldTo = userEmail;
                            var item = { username:"default",pets: pets};
                            dynamo.putItem({TableName:"Pets", Item:item}, writecb);
                            found = true;
                        }
                    }
                }
                if(!found) {
                    console.log('pet not found or is sold');
                    context.done('That pet is not available.', null);
                }
            } else {
               console.log('pet already sold');
               context.done('That pet is not available.', null);           
            }
        }
    };

    // callback for writing pet info back to dynamddb.
    var writecb = function(err, data) {
        if(!err) {
            context.done(null, pets);
        } else {
            console.log('error on GetPetsInfo: ',err);
            context.done('failed on update', null);
        }
    };

   // purchase execution logic.
    if(event.authToken) {
	jwt.verify(event.authToken, new Buffer(secret, 'base64'), function(err, decoded) {
           if(err) {
	   	console.log('err, failed jwt verification: ', err, 'auth: ', event.authToken);
	        context.done('authorization failure', null);
	    } else if(!decoded.email) {
	        console.log('err, email missing in jwt', 'jwt: ', decoded);
	        context.done('authorization failure', null);
	    } else {
	        userEmail = decoded.email;
	        console.log('start PetsPurchase, petId', petId, 'userEmail:', userEmail);
	        dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, readcb);
	    }
	});
    } else {
        console.log('missing authorization token');
        context.done('authorization failure', null);
    }
};
```

Now run **npm install** from the directory, zip up the contents, and upload it for the `PurchasePet` Lambda function.

The final step is to pass the JWT to the method from the browser client. The standard method is with an `Authorization` header as a *bearer* token. If you are using IAM, then the AWS API Gateway uses the `Authorization` header to contain the signature of the message, and you will break the authentication by inserting the JWT into this header. You could either add a custom header for the JWT, or put it into the body of the message. If you choose to use a custom header, you'll also need to do some mapping for the *Integration Request* of the *POST* method for `pets/purchase`. To keep it simple, pass it in the body of the post and it will pass through to the AWS Lambda function. To do this, update the `buyPet` method in `home.js` by removing the `userName` from the body, and adding `authToken` as follows:

```js

  function buyPet(user, id) {
    var apigClient = getSecureApiClient();
    var body = {
      petId:id, 
      authToken: store.get('token')
    };

    apigClient.petsPurchasePost({}, body)
      .then(function(response) {
        console.log(response);
        $scope.pets = response.data;
        $scope.$apply();
      }).catch(function (response) {
        alert('buy pets failed');
        showError(response);
    });
  }
```

## Summary
In this tutorial, you have created AWS API Gateway methods using AWS Lamda functions, and have secured access to the APIs using IAM. You integrated a SAML identity provider with IAM to tie access to the API to your user base. You then provided different levels of access based on whether a user authenticated from the built in database, or with a social identity, and used an Auth0 rule to enforce the role assignment. Finally, you used a JWT to provide further authorization context, and to pass identity information into the Lambda function.
