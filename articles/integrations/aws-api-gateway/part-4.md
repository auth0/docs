---
title: Amazon API Gateway Tutorial - Using Multiple Roles
description: Step 4 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 4 - Using Multiple Roles with Amazon API Gateway

[Prev](/integrations/aws-api-gateway/part-3) ----- [Next](/integrations/aws-api-gateway/part-5)

In this step, you'll assign different AWS IAM roles to users based on authentication information:

* users that authenticate with Social Connections will be treated as buyers;
* users authenticated with a Database Connection will be treated as admins.

You will perform this role assignment logic in two different ways:

* client-side: JavaScript;
* server-side: Auth0 rules.


For many Auth0 Clients, you'll want different users to have different levels of access, and you'll want additional information about a given identity to use in your service logic. In cases where it's sufficient to lock down access at the API level, you can use different AWS IAM roles (for example, administrators can use the update function to *add* and *remove* pets, but social users can only *buy* pets).

The following diagram illustrates AWS IAM role assignments for two different user classes: users authenticated via Social Connections and users authenticated via Database Connections. It also illustrates that AWS IAM roles can be assigned to other entities, like AWS Lamdba functions, to control the permissions these entities are assigned for an account. In short, an IAM role is a group of permissions to AWS capabilities  that is defined by one or more policies and then assigned to an entity.

![](/media/articles/integrations/aws-api-gateway/roles-in-use.png)

For cases where you want to make decisions within your code (for example, you might want a credit check of a user buying a pet), you will want to flow identity as well. This will be demonstrated below in [Step 5 - Using Identity Tokens to Flow Identity](/integrations/aws-api-gateway/part-5).

### Create the PetPurchase API Resource

Using the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway), select your *Pets* API. You will be taken to its *Resources* page.

![](/media/articles/integrations/aws-api-gateway/part-4/create-resource.png)

Click on **Actions** and **Create Resource**. Name the *New Child Resource* `Purchase`. Click **Create Resource**.

![](/media/articles/integrations/aws-api-gateway/part-4/new-child-resource.png)

From the Amazon API Gateway console, create a new API resource by selecting `pets`, and clicking **Create Resource**. Name the new API resource "purchase". Add an *OPTIONS* method for the `purchase` resource as outlined previously for `pets` in [Step 2 - Securing and Deploying the Amazon API Gateway](/integrations/aws-api-gateway/part-2) in the *Set up CORS* section. Create a new AWS Lambda function for purchasing a pet called "PetPurchase", which adds a `isSold` and `soldTo` attribute to a pet as follows:

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

In the response to the test you should see the pet with id 1 is now sold to fred flintstone:
```js
[
  {
    "id": 1,
    "price": 249.99,
    "type": "dog",
    "isSold": true,
    "soldTo": "fred flintstone"
  },

  ...
```

### Use IAM to Secure the PurchasePet API

#### Update IAM

To secure your new API, follow the same process for adding a new role that you [performed in step 2](/integrations/aws-api-gateway/part-2). Call the new role "auth0-api-social-role". The arn for the method you will secure in the IAM policy should look something like:

```
arn:aws:execute-api:us-east-1:your-accountid:your-api-id/*/pets/purchase
```

Don't forget to update the trust policy as well. Go to the API Gateway console, and select the *POST* method for the `/pets/purchase` resource. Select **Method Request** and change **Authorization Type** to *AWS_IAM*. Click the check to save the setting.

At this point, you have defined two roles that you can use with the API gateway. The first, `auth0-api-role`, permits updating the pets (`/pets`, *POST* method) and the second, `auth0-api-social-role`, permits purchasing a pet.

#### Configure Login with Amazon and update Auth0

To create a social role, use Login with Amazon(LWA) (if you want to use another social provider, that will also work, it doesn't need to be LWA). Go back to the Auth0 console, and select **Connections** then **Social** in the right menu. Turn on the connection for Amazon. A wizard pops up to lead you through the process. Click **Continue**, and you'll see a configuration page for entering the *client id* and *client secret*. If you haven't used Login with Amazon before, there is also a link for "how to obtain a client id". Click on this link and follow the process to obtain the *client id* and *client secret*. Once you've entered your *client id* and *client secret*, you can test it from the Auth0 console. When you configure LWA make sure to enter into **Allowed Return URLs** the callback to your Auth0, which should look something like `https://johndoe.auth0.com/login/callback`. The Auth0 help page shows you specifically what to enter.

In Auth0 console, go back to your **Apps/APIs**, select your application, then select the **Connections** tab. Make sure that *amazon* is enabled for social. While this tutorial uses LWA, you can choose to use any other social provider and follow similar steps. The remainder of the tutorial will work once your social authentication is functioning.

#### Deploy the API and update the single page application

In the AWS API Gateway console, deploy the API again and generate a new javascript SDK. At this point everything is set to purchase pets with the AWS API Gateway and Auth0. You can copy that SDK over the previous one in the client code.

The login controller logic uses `getOptionsForRole` to select different roles for different users. When you obtain the delegation token, you can tell Auth0 which role to use if the user is an admin or if not. In the `pets/login/login.js` file, modify the `role` and `principal` values for the non-admin user for the social user IAM role you just created.

At this point, you should be able to login using Amazon credentials, or the database user you previously created. Notice that the UI lets a social user buy pets, while an admin user can add and remove pets. To test it, you can temporarily hide the remove button in the UI by removing `ng-show="isAdmin"` in this line of `/pets/home/home.html`, then attempt to remove a pet while logged in as a social user:

```
 <button ng-show="isAdmin" class="btn delete-btn" ng-click="removePet(pet.id)">remove</button>
```

Now add the logic for a social user to buy a pet. In `HomeController`, modify the `buyPet` function to make the pet purchase:

```js
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
```

Now copy the code to your S3 bucket, log out, and then log in as a social user by clicking on the Amazon icon in the Lock login dialog. You may need to click **show all** so Lock forgets your previous login name. Note that as an Amazon user, you can buy a pet, but not add or remove pets. If you log in with the database account, you should still be able to add and remove pets, but not buy pets. Try to buy a pet, and it should succeed.

### Use Auth0 rules to enforce role assignment

In some cases, determining the role in the browser application is appropriate as shown here, but often you will want to determine user privileges on the server-side to prevent a user from assuming a more privileged role then they are permitted by hacking the client code. With Auth0, you can do this with a rule. Rules are service logic defined by developers/administrators that run during the authentication process within Auth0. You could eliminate passing role information from the client and only implement it in a rule. Rules can override and add settings. For example, you can create a rule to insert role information into the delegation request based on the authentication source. For more on rules see: [Rules](/rules).

Add a rule that will check if the role requested is allowed for this user depending on whether they have a social or an administrative login. Go to the Auth0 console, and click **Rules** in the left menu. Click the **New Rule** button (or **Create your First Rule** if this is your first time). You can see a lot of pre-built templates for common rules. In this case select an empty rule. Put the following code into the rule body (make sure the *clientID* matches the *clientID* of your Auth0 application) and name the rule *AWS Pets Rule*:

```js
function (user, context, callback) {
  if(context.clientID === '${account.clientId}') {
    var socialRoleInfo = {
      role:"arn:aws:iam::<your account>:role/auth0-api-social-role",
      principal: "arn:aws:iam::your account>:saml-provider/auth0"
    };

    var adminRoleInfo = {
      role:"arn:aws:iam::<your account>:role/auth0-api-role",
      principal: "arn:aws:iam::<your account>:saml-provider/auth0"
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
Adjust the role and principal values above for the ones already created for your account and click **Save**.

A few characteristics to point out:

- Rules run at a global scope for every authentication. Unless you want to run logic on every request, it's best to only run your logic if it is your application. The check for *clientID* at the top of this code restricts running to only this Auth0 application.
- A lot of information is passed into the rule with *context* and *user*.
- You can extend the objects passed in. In the code above, the rule checks the body of the request for the role information passed and, if present, it logs a warning if the role isn't an allowed role, and overrides the role. The role is set into the context *addonConfiguration* (which always overrides settings in the request body) of the allowed role.

Now, you can setup debugging. Click the **Debug Rule** button and follow the instructions to see the logged output. You can test switching roles in the client, or just removing the role definitions in the client code. You can see that the roles are now being enforced by the service.

[Prev](/integrations/aws-api-gateway/part-3) ----- [Next](/integrations/aws-api-gateway/part-5)
