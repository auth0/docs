---
lodash: true
title: AWS API Gateway Tutorial
name: AWS API Gateway
alias:
  - xxx
  - xxx
language: 
  - Javascript
framework:
  - xxx
image: //auth0.com/lib/platforms-collection/img/xxx.png
tags:
  - quickstart
---
## AWS API Gateway Tutorial
##### Building a Serverless Application using Token based Authentication with AWS API Gateway and Lambda
<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-ember-simple-auth/master/create-package?path=examples/simple&filePath=examples/simple/config/auth0-variables.js&type=replace@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

@@includes.callback@@

## Abstract

With AWS developers can create powerful, highly scalable APIs and applications without running any servers through AWS Lambda, AWS API Gateway, and a Javascript client. You can use federated authentication sources that integrate with IAM like AWS partner Auth0 to secure your APIs to particular users or groups. This blog shows developers how to use Auth0 with AWS API Gateway and AWS Lambda to secure their serverless applications.

## Introduction
This blog demonstrates how to use API gateway with IAM and an Auth0 SAML provider using the Auth0 delegation capability. The approach enables you to tie permissions to  APIs you develop using the API gateway to your existing user base. It use the pet scenario from the the [API gateway model walkthrough](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-models.html). 

### Prerequisite Setup Steps for AWS API Gateway
You will need to have node.js installed to perform some of this tutorial. Perform the following steps to create the lambda functions and apis for getting and putting pets from a DynamoDB table, and the DynamoDB table.
 - In the DynamoDB console, create a table “Pets” with a string hash key,   “username”.
 - Follow create the APIGatewayLamdaExecRole as outlined in [Walkthrough: Lambda Functions, step 4](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-models.html#getting-started-models-lambda), and expand the additional policy for dynamodb access table as shown below:
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
 - Go to the AWS API Gateway console. Create a new API, `Secured Pets`. Select Resources->Models.
 - Now go to the AWS Lamda console, and click **Create a Lamda function**. Click **Skip** for the blueprint, and then enter `GetPetInfo` for the Name. Select Node.js for runtime, and paste the following code which reads the pets from the dynamodb table:
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
For Role select the role you just created (APIGatewayLambdaRole) and leave defaults for other settings. Select **Next**, and then select **Create function**. Go ahead and select **Test**, and then **Submit** (the method isn’t using the inputs, they will just be ignored).  You should just see an empty output (`{}`) since the table is empty.
 - Repeat the previous step, naming the function `UpdatePetInfo` and use this code:
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
 - Test the function by supplying the following as the input sample data, and then clicking **Submit**:
```js
{"pets": [ {"id": 1, "type": "dog", "price": 249.99}]}
```
You should see an empty return result (`{}`).  You can go back to your GetPetInfo lambda, and click **Test** again. You should now see a single pet.
 - One more lambda is required that does nothing. This is needed by the OPTIONS method for CORS described in the following section. Repeat the steps for creating a Lambda function and name it `NoOp`. For the code simply call `context.succeed('');`.
 - Back in the AWS API Gateway console, Select Models->Resources. Click **Create Resource**. Name the resource Pets, and click **Create Resource** again.
 - In the left pane, select `/pets` and then click the **CreateMethod** button. In the drop down, select GET and click the checkmark button. Select **Lambda Function** for integration type, select the region you are in, and select `“GetPetInfo”` for the Lambda function. Click **Save** and then **OK** in the popup. Click **Test**, and you should see the single pet returned in the response body.
 - In the left pane, select `/pets` again, and click **CreateMethod**. Ih the drop down, select POST, and click the checkmark button. Select **Lambda Function** for integration type, select the region you are in, and select `“UpdatePetInfo”` for the Lambda function. By default the method will just pass through the body for the API method so we will use this instead of creating models and mappings. Click **Save** and then **OK** in the popup.  click **Test**, and for the request body paste:
```js
{"pets": [ {"id": 1, "type": "dog", "price": 249.99},
{"id": 2, "type": "cat", "price": 124.99}]}
```
You should see an empty return result (`{}`).  You can go back to the get API, and click **Test** again to see 2 pets. At this point two API methods are defined with no security.

## Securing your AWS API Gateway APIs
Now that we got the basics of our API running, now to the fun stuff. AWS API Gateway provides a two different methods to secure your APIs - API keys, and IAM. Using API keys a secret shared out of band and long-lived secret that is typically appropriate for a service to service interaction as illustrated. Putting a long lived secret on a client is a bit riskier since clients are easier to compromise. Also creating a framework to issue and manage api keys to clients requires implementing in a secure way may also be challenging.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-key.png)

For our scenario we want to build a serverless single page application, so ideally we can rely upon federating identity with other identity sources as a means to determine the users we’ll allow access. You can achieve this using a combination of the API gateway IAM integration and IAM’s identity federation. The following diagram illustrates an example flow using a SAML based identity provider:

TODO: INSERT IMAGE FOR FEDERATED

We’ll show how to achieve this using Auth0 delegation with AWS and an alternative using identity tokens. 

### Configuring IAM and Auth0 for SAML integration and the API Gateway
The IAM integration with SAML lets the identity provider specify the IAM role to assume for a user. This model is powerful since the identity provider can provide different levels of access, for example based upon group membership for a user like an administrator, or based on the authentication source, or give internal users higher privileges than social users. Initially we are just going to setup a single role. To see how to configure Auth0 with SAML do the following:
1. Sign up for an Auth0 developer account, which is free, and sign in.
2. In the left menu, select Apps and APIs, then click **New App and API**. Call the new app AWS Api Gateway.
3. Click on the settings tab. 
4. Follow the walkthrough [here](https://auth0.com/docs/aws-api-setup) to configure for AWS delegated access. Delegated access uses SAML under the covers. Call the role you create **auth0-api-role**.

Once you’ve completed configuring the role you’ll need to add a policy to the **auth0-api-role** role that lets you execute your api gateway methods. This is described in [User Access Permissions for Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html). The following paragraphs summarize the steps required.

The Amazon Resource Name (arn) that controls access to your APIs will look something like:
```
arn:aws:execute-api:us-east-1:accountid:api-id/*/pets
```
The wildcard (*) enables the permissions for all stages for your API. You can deploy different stages (for example dev, test, prod). You can see the arn by selecting the ‘Method Request’ definition for one of your API methods (like the POST method).

Select the role you just created, and expand Inline Policies, and click on the **click here** link. Select **Custom Policy**, click the **Select** button, and pick a name like api-gateway-policy.  Add the following to enable access to your api methods after updating the arn with the one for your api, and then click **Apply Policy**.
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
You’ll need to make one additional change. The api gateway will assume this role on a user’s behalf, so the trust policy needs to permit this action. Click on **Edit Trust Relationship** and add the policy statement for gateway. The final trust relationship should look similar to the following (the first statement was created when you created the STS for Auth0):
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
          "SAML:iss": "urn:fredflint.auth0.com"
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
At this point we are finished with IAM. Go back to the API gateway. In the **Resources** view, select the **POST** method under `/pets`. Click the **Method Request** link. Click the edit icon beside the **Authorization Type**, and select **AWS_IAM**. Now click the **Check Button** beside the field to save the setting.

##Setting up CORS and Deploying the API

Our single page app will access the web API methods from a different domain that where the page is served in the browser. The Cross-Origin Resource Sharing settings needs to explicitly permit this action for the browser to permit access to the AWS API Gateway site. Typically a browser does this by first issuing an OPTIONS request to see what the site will permit. See [Enable CORS for a Method in API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html) for details. Here is a summary of the steps:
1. Select /pets in resources, and then click **Create Method**. In the drop down select **OPTIONS**, and click the **check** button to save the setting.
2. The Options method is used by the browser to get headers, but the function needs to work. For options setup, select Lambda and the select the NoOp for the method.
3. Click on Method Response, expand 200, and then add three headers:
```
'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods',  'Access-Control-Allow-Origin'
```
4. Now you need to map values. Click on **Method Execution** link and then click on **Integration Response** link. Expand the **200** response. and then expand the **Header Mappings**. For Access-Control-Allow-Headers, enter `'Content-Type,X-Amz-Date,Authorization,x-api-key,x-amz-security-token'`.  For Access-Control-Allow-Origin, enter `'*'`. For Access-Control-Allow-Methods, enter `'POST, GET, OPTIONS'`.
5. For the POST and GET methods, follow the same process to add a single header, Access-Control-Allow-Origin, with the value `'*'`.

### Deploy the API

Now we are ready to deploy the API and start building an application to use the APIs. Select the **DEPLOY API** button from the **RESOURCES** view. Select **New Stage** for deploy state, and name the stage **test**. Click the **Deploy** button. On the result page, you will see a tab for **SDK Generation**.  Click the tab, and select JavaScript for the platform. Click the **Generate SDK** button. Save off the downloaded zip file for later use.

## Creating the Client Application

We need to create a client application to use the APIs. The client application will be a single page, serverless application based on the AngularJS framework that we will serve out of an S3 bucket configured as a website. . To start, go ahead and create a bucket for the application, and configure it as a website with a home page of index.html. You can find instructions at http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html. 

Now get a seed project from Auth0 for angular. The seed project provides a nice simple starter app for you. Go back to the application you created previously in Auth0, and click on the **Quick Start** tab. Here you will see a bunch of options for different types of application models.  Select **Single Page App**, then select **Angular**.  For the backend platform, select the **NO, SKIP THIS** button. You can now download a seed project that has preconfigured your account settings. Copy the contents of this seed project into a local folder. We will use `pets` as an example for the remainder of the blog. From the `pets` directory copy the contents to your S3 bucket for the website. An easy way to do this is with the [AWS CLI](https://aws.amazon.com/cli/).
```
aws s3 cp --recursive --acl "public-read" ./ s3://your-bucket/
```
The sample project is functional although we need to make a few configuration changes for this to work with our APIs. First we’ll need to get an OpenId identity token based upon our credentials. With Auth0 you can use many different sources of users to authenticate, called connections to grant access to applications like AWS. We will start with using the built in Auth0 database users. Auth0 created a database for you called Username-Password-Authentication when you created your account.  If you click on the connections tab of your application you should see this connection enabled for you. If you did not want to use it for the application, you could simply turn it off. Click on Users in the left column, and click **New User**. Fill in the information for the user, and click **Save**. You now have one user available to authenticate!

The website runs at a url like `http://your-bucket-domain/index.html`, which is shown under properties of your S3 bucket. There is one last step to get authentication to work. You need to tell Auth0 that it is ok to permit authentication from your website. You do this by adding `http://your-bucket-domain` to the Allowed Origins in the Auth0 application settings.

Before going any further, let’s try testing logging into your application. Open up `http://your-bucket-domain/index.html` in your browser. If everything goes well, you should see a welcome screen with a big blue button, CALL API.

### Using Delegation to get an AWS Token

At this point you have authenticated with Auth0, and you have an OpenId token. Now lets look at some of the code. You’ll see the seed project doesn’t have a lot of content.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-project.png)

This one of the typical setups for an AngularJS project. We want to obtain a token to access AWS based upon our identity token with Auth0. We can use the Auth0 delegation capability to do this. Behind the scenes Auth0 authenticates your identity token, and then uses SAML based upon the add-on that you configured as part of the [Configuring IAM and Auth0 for SAML integration and the API Gateway](#Configuring IAM and Auth0 for SAML integration and the API Gateway) section. You need to make a simple extension to login.js to obtain a delegation token from the identity token:

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

We’ll simply need to make one more call at this point by modifying the callback function for auth.signin to  the following code:

```js
      store.set('profile', profile);
      store.set('token', token);
      var targetClientId = "<client id from auth0 application>";
      var options = {
        "id_token": token,        // the token we just obtained
        "targetClientId": targetClientId,
        "role":"<the arn for the  auth0-api-role role created to execute APIs>",
        "principal": "<the arn of the auth0 STS>"
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

### Displaying Pets with the AWS API Service

First let’s show the pets to end users. To do this you’ll need to add the code you previously generated by the API gateway (*apiGateway-js-sdk.zip*), and modify the home view where there is a placeholder for adding a call to your service.

To add the API code, copy the contents of *apiGateway-js-sdk.zip* to the `pets` directory. The contents should include `apiClient.js`, a `lib` folder, and a `README.md`. There is already a `README.md` in the `pets` directory, so just keep both. The `README.md` for the API gateway explains how to use the api client from your application. Open `index.html`, and add all of the scripts listed at the top of the api readme to index.html, for example:

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

If you open up `apiClient.js`, you can see that the downloaded library has created wrappers for your API methods, like `petsPost` and `petsGet`. We won't modify the generated code. Open `home.js`, and replace the contents of `callApi` with `alert('not implemented');` and rename `callApi` to `putPets`. Add a method for getting pets as follows:

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

Finally we need to add the code to show the pets.  Open up `home.html` and update it as follows (updating pets won’t yet be functional, we’ll get to that next):

```html
<div class="home">
  <h1 id="logo"><img src="/home/auth0_logo_final_blue_RGB.png" /></h1>
  <h2>Welcome {{auth.profile.nickname}} to sell your pets!</h2>

  <div ng-repeat="pet in pets track by pet.id">
	<!--"id": 1, "type": "dog", "price": 249.99-->
    We have a {{pet.type}} is for sale for {{pet.price}}
  </div>
  <br />
  <button class="btn btn-lg btn-primary" ng-click="putPets()">Update Pets</button> <br />
  <button class="btn-sm btn-warning" ng-click="logout()">Logout</button>
</div>
```

Now when you refresh the page, you should see two animals listed (assuming you ran the test previously described on your API’s that created the pets).

### Updating Pets with the AWS API Service

Now that we have a working application with the API Gateway, lets add an authenticated method for updating the pets. First we’ll try it without authentication, and then add it in. Update your home view to the following:

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
This adds a delete button for each line, and an add button and add section. You’ll now need to add handlers for the buttons in your controller. First lets add the handlers for adding a pet (we’ll only allow admins to do that, and we’ll assume for now anyone authenticated from the Username-Password-Authentication store is an admin). Add this above the call to `getPets()` in your controller.

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

We need to make one small modification to login as well. While you could make a determination of if a user is an admin with rules logic, for now we'll simply decide that a user is an admin if they don't use a social login. That logic belongs in the login controller. Simply add the following to your login function before you set the profile in the store.

```js
   profile.isAdmin = !profile.identities[0].isSocial;
   store.set('profile', profile);
```
  
We expect that the update logic will fail because we are not authenticating, but lets try it out. Go ahead and add a frog for 4.99. You should see a failure occurring when you try to save. The error code is likely a failure due to the `Access-Control-Allow-Origin` header not being present. Remember that when we setup CORS, we only set it up for a 200 status code. You’ll need to set this up for each status code you want to go through to the end user. If you look in the browser debugger, you’ll see that the underlying status is a 403 as expected. Now add security by simply providing the token information to the API at the start of the `putPets` method:

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

Try again, and the update should now succeed (add or remove).

## Discriminating between types of users

Offloading managing security processing at scale is great, and the AWS API Gateway takes this off of your plate in production. For many applications you’ll want different users to have different levels of access, and you’ll also often want to have more information about a identity to use in your service logic. This can be tackled using two approaches. For cases where it’s sufficient to lock down access at the API level, you can use different IAM roles, for example administrators can use the update function to add and remove pets, but social users can only buy pets. For cases where you want to make decisions within your code, like do a credit check of a user buying a pet.

### Create the PetPurchase API resource

From the API Gateway console, repeat the process outlined above to create a new API resource by selecting `pets`, and clicking **CreateResource**. Name the new API resource `purchase`. Add an OPTIONS method for the `purchase` resource as outlined previously for `pets`.  Create a new Lamda method for purchasing a pet called `PetPurchase`, which adds a `isSold` and `soldTo` attribute to a pet as follows:

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
            context.done({error:'failed on update'}, null);
        }
    };

    var readcb = function(err, data) {
        if(err) {
            console.log('error on GetPetsInfo: ',err);
            context.done({error:'failed to retrieve pet information'}, null);
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
                    context.done({error:'That pet is not available.'}, null);
                }
            } else {
               console.log('pet already sold');
               context.done({error:'That pet is not available.'}, null);           
            }
        }
    };

    dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, readcb);
};
```

Once the lambda function is defined, add another method, POST, to the `purchase` resource which calls the `PetPurchase` Lambda. Make sure you also add the `Access-Control-Allow-Origin` header with a value of `‘*’` to the POST method using the method response/integration response configuration. Go ahead and test the API gateway method, providing as input a message similar to this, and it should suceed: 

```js
 {
    "petId": 1,
    "userName": "fred flintstone"
 }
```

### Using IAM to Secure the PurchasePet API

#### Update IAM

Follow the same process for adding a new role that you performed in [Configuring IAM and Auth0 for SAML integration and the API Gateway](#Configuring IAM and Auth0 for SAML integration and the API Gateway) for securing your new API. Call the new role **auth0-api-social-role**. The arn for the method being secured should look something like;

```
arn:aws:execute-api:us-east-1:accountid:api-id/*/pets/purchase
```

Go to the API Gateway console, and select the `POST` method for the `/pets/purchase` resource. Select **Method Request** and change **Authorization Type** to **AWS_IAM**. Click the check to save the setting.

At this point we have two roles now defined that we can use with the API gateway, the first, `auth0-api-role`, permits updating the pets (`/pets`, POST method) and the second, `auth0-api-social-role`, which permits purchasing a pet.

#### Configure Login with Amazon and Update Auth0

Now to create a social role, we’ll use Login with Amazon. Go back to the Auth0 console, and select *Connections* then *Social* in the right menu. Turn on the connection for Amazon. A wizard pops up to lead you through the process. Click *Continue*, and you’ll see a configuration page dialog for Amazon to enter the client id and client secret. If you haven’t used Login with Amazon before, there is also a link for “how to obtain a client id”. Click on this link to get help on how to go about configuring Login with Amazon to obtain that information. Once you’ve added your client id and client secret then you can try it right from the Auth0 console. Make sure that when you configure LWA you enter the callback to your Auth0 which should look something like `https://johndoe.auth0.com/login/callback` into the **Allowed Return URLs**. The Auth0 help page shows you specifically what to enter. While we are using Login with Amazon in this example, you could easily use other social providers as well like Facebook or Google.

In Auth0 go back to your **Apps/APIs**, select your application, then select the **Connections** tab. Make sure that `amazon` is enabled for social.

### Deploy the API and Update the Single Page Application

In the AWS API Gateway console, deploy the API again and generate a new javascript SDK. At this point everything is set with the API services to purchase pets. You can copy that SDK over the previous one in the client code.

First you will need to update the login controller logic to select different roles for different users. You can tell Auth0 which role to use when you get the delegation token by doing the select based upon whether or not the user is an admin. Make sure you replace the account id in the following code with your ids.

```js
  function getOptionsForRole(isAdmin, token) {
    if(isAdmin) {
      return {
          "id_token": token,        // the token we just obtained
          "role":"arn:aws:iam::<your account id>:role/auth0-api-role",
          "principal": "arn:aws:iam::<your account id>:saml-provider/auth0-api"
        };
      }
    else {
      return {
          "id_token": token,        // the token we just obtained
          "role":"arn:aws:iam::<your account id>:role/auth0-api-social-role",
          "principal": "arn:aws:iam::<your account id>:saml-provider/auth0-api"
        };
    }
  }
```

Update the login logic for obtaining the delegation token to set the role based upon if the user is a social user, and call `getOptionsForRole` to get the appropriate role:

```js
profile.isAdmin = !profile.identities[0].isSocial;
var options = getOptionsForRole(profile.isAdmin, token);
```

At this point you should be able to log in using your Amazon credentials, or using the database user you previously created. If you try to add or remove using your Amazon credentials, you will see that the operation fails.

Now we’ll update the home view to show a buy button if the user is not an administrator, and indicate pets that are sold. The remove and add pet buttons will only be shown to administrators, while the buy button will only be shown to social users.

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
	   <!--"id": 1, "type": "dog", "price": 249.99-->
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

In the controller, update the functionality to identify whether the user is an administrator, and add a purchase for social users. The following snippets show updated code in the `HomeController`.

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

At this point you can log in as a social user. When you log in as an Amazon user, you’ll now see that you can buy a pet. If you log in with the database account, you should still be able to add and remove pets.

### Using Auth0 Rules to Enforce Role Assignment

In some cases determining the role in the browser application is appropriate, for example AWS has a feature where you can take on another role (assuming you have permission) within the AWS console to avoid the chances of accidentally taking an action that has potentially serious consequences, like deleting an operational server instance. Often you will want to determine the privileges a user has on the service side to prevent a user from specifying a more privileged role then they are permitted. With Auth0 you can do this with a rule. Rules are service logic defined by developers/administrators that run during the authentication process within Auth0. Rules can override and add settings, for example, insert the role information into the delegation request based upon the authentication source rather than having this done by the client. For more on rules see [Rules](https://auth0.com/docs/rules).

Let’s add a rule that will check if the role requested is allowed for this user depending upon if they have a social or administrative login. If you wanted to you could just eliminate altogether passing role information in from the client, and only implement it in a rule. Go to the Auth0 console, and click **Rules** in the left menu. Click the **New Rule** button. You can see a lot of pre-built templates for common rules. In this case select empty rule. Put the following into the rule body:

```js
function (user, context, callback) {
  if(context.clientID === '<the client id of your application>') {    
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

A few characteristics to point out. Rules run at a global scope for every authentication so its a good practice to only run your logic if it is your application unless you want to run logic on every request. The check for clientID at the top restricts running to only this application. Secondly you can see that a lot of information is passed into the rule with context and user. Third you can see that we can extend the objects passed in. In this case the rule checks the body of the request for the role information passed in, and if it is there, makes sure that the user is allowed the requested role by matching it to the allowed role. The role is then set into the context addonConfiguration, which always overrides settings in the request body, to the allowed role. Go ahead and adjust the role and principal values above for the ones in your account and save. After saving you can setup debugging. Its simple to do, just click the **Debug Rule** button and follow the instructions.

You can try both switching roles in the client, and see what happens, and just removing the role definitions in the client code. You can see that the roles are now being enforced by the service.

### Using An Identity Token
Often you will want to do processing within your own logic based upon the users identity. In the example of buying something, or doing something based upon a user's role in the logic within your lambda. The purchasing example above we retrieved the user name from the profile returned with the identity token. Another option you could do is to instead have the user information embedded with the identity, which is a java web token (JWT). THe advantage of this method is that you can verify the authenticity of the JWT, and be assured that the calling user that authenticated rather than relying upon having it passed in as a parameter. 

TODO: insert an image here for this flow.

There are a couple ways of causing the email to be added into the JWT.  One way is with the use of another rule like so, which is a good approach if you always want make sure this value is always in the JWT for an authenticating client:

```js
   function (user, context, callback) {
     if(context.clientID === '<the client id of your application>') {   
  	context.jwtConfiguration.scopes = { 'openid': ['email'] };
	callback(null, user, context);
     }
   }
```

The other way to do this is to request it as part of the scope when you login in the browser client. We'll use this approach. Open login.js and update the login method as follows to instruct Auth0 to include the email:

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

You can request additional information as well, up to the full profile of the user logging in within the JWT. Since typically the JWT is passed every request however, you'll want to only include what you need to keep the token lightweight.

We'll need to perform a more complicated way of updating the lambda function on AWS. The lambda environment when using lining editing has access to a relatively limited number of node modules. In order to use other modules required for processing the identity token you'll need to instead upload the lambda function as a package (for details, see [Creating Deployment Package (Node.js)](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) and [Upload the Deployment Package and Test](http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-s3-events-adminuser-create-test-function-upload-zip-test.html).

We'll need to create two files, run npm install, and zip up the result. Create a directory for your definition, and add the following package.json definition:

```js
{
  "name": "purchase-pet-example",
  "version": "0.1.0",
  "description": "Example for creating a lambda with json web token logic",
  "license": "MIT",
  "main": "purchasepet.js",
   "dependencies": {
        "aws-sdk":"*",
        "dynamodb-doc":"*",
        "jsonwebtoken": "*"
    }
}
```

Next create a new file, index.js, where we will put the code for purchasing a pet. The code adds extracting and validating the JWT. By default Auth0 uses a symmetric key, although there is also an option to use asymmetric keys, in which case you'd only need to put your public key into the function. In this case we are showing the use of a symmetric key (client secret) for validating the token:

```js
var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var dynamo = new DOC.DynamoDB();
var jwt = require('jsonwebtoken');

var secret = '<your client secret>';
var tokenRegex = /bearer (.*)/;
    
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
        var parseToken = tokenRegex.exec(event.authToken);

        if(parseToken.length === 2) {
            jwt.verify(parseToken[1], new Buffer(secret, 'base64'), function(err, decoded) {
                if(err) {
                    console.log('err, failed jwt verification: ', err, 'auth: ', event.authToken);
                    context.done('authorization failure', null);
                } else if(!decoded.email)
                {
                    console.log('err, email missing in jwt', 'jwt: ', decoded);
                    context.done('authorization failure', null);
                } else {
                    userEmail = decoded.email;
                    console.log('start PetsPurchase, petId', petId, 'userEmail:', userEmail);
                    dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, readcb);
                }
            });
        } else {
            console.log('invalid authorization header', event.authToken);
            context.done('authorization failure', null);
        }
    } else {
        console.log('missing authorization header');
        context.done('authorization failure', null);
    }
};
```

Now run **npm install** from the directory, and zip up the contents, and upload it for the PurchasePet lambda function.

The final step is to pass the JWT to the method from the browser client. The standard method to do this is with an **Authorization** header as a **bearer** token. If you are using IAM, then the AWS API Gateway uses the **Authorization** header to contain the signature of the message, and you will break the authentication by inserting the JWT in that header. We could either add a custom header for the JWT, or put it into the body of the message. Since we're checking it further back in the lamda function, we'll pass it in the body of the post. To do this we simply update the buyPet method in home.js by removing the userName from the body, and adding authToken as follows:

```js
  function getBearerToken() {
    var token = store.get('token');
    return "bearer " + token;
  }

  function buyPet(user, id) {
    var apigClient = getSecureApiClient();
    var body = {
      petId:id, 
      authToken: getBearerToken()
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

## Summary Recap
In this tutorial you have created AWS API Gateway methods using AWS Lamda functions, and secured access to the APIs using IAM. You integrated a SAML identity provider with IAM to tie access to the API to your user base. You then provided different levels of access based upon whether a user authenticated from the built in database, or with a social identity, and used an Auth0 rule to enforce the assignment. Finally you used a JWT to provide a further authorization context, and pass identity information into the Lambda function.
