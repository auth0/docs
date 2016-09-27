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

### 1. Create the PetPurchase API Resource

Using the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway), select your *Pets* API. You will be taken to its *Resources* page.

![](/media/articles/integrations/aws-api-gateway/part-4/create-resource.png)

Click on **Actions** and **Create Resource**. Name the *New Child Resource* `Purchase`. Click **Create Resource**.

![](/media/articles/integrations/aws-api-gateway/part-4/new-child-resource.png)

Add an *OPTIONS* method for the `purchase` resource as outlined previously for `pets` in the [Set Up Cors and Deploy the API section of Step 2 - Securing and Deploying the Amazon API Gateway](/integrations/aws-api-gateway/part-2#set-up-cors-and-deploy-the-api).

[Create a new AWS Lambda function](/integrations/aws-api-gateway/part-1#2-create-the-aws-lambda-functions) for purchasing a pet called `PetPurchase`, which adds `isSold` and `soldTo` attributes to a pet as follows:

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

Once you have defined the Lambda function, [add a *POST* method to the `purchase` resource](/integrations/aws-api-gateway/part-1#method-post-pet-information) that calls the `PetPurchase` Lambda. Be sure to also add the `Access-Control-Allow-Origin` header with a value of `*` to the *POST* method using the [method response/integration response configuration](/integrations/aws-api-gateway/part-2#set-up-cors-and-deploy-the-api).

Test the API gateway method, providing the following as an input message:

```js
 {
    "petId": 1,
    "userName": "fred flintstone"
 }
```

In the test response, you should see the pet with ID of 1 is now sold to Fred Flintstone:
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

### 2. Use IAM to Secure the PurchasePet API

#### Update IAM

To secure your API, follow the same process for adding a new role that you [performed in Part 2](/integrations/aws-api-gateway/part-2) of this tutorial. Call the new role `auth0-api-social-role`.

The ARN for the method you will secure in the IAM policy should look something like:

```
arn:aws:execute-api:us-east-1:your-accountid:your-api-id/*/pets/purchase
```

Be sure to update the trust policy as well.

Go to the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway), and select the *POST* method for the `/pets/purchase` resource. Select **Method Request** and change **Authorization Type** to *AWS_IAM*. Click the check to save the setting.

At this point, you have defined two roles that you can use with the API gateway:

* `auth0-api-role`: permits updating the pets
* `auth0-api-social-role`: permits purchasing a pet

#### Configure Login with Amazon and Update Auth0

You can create a social role using Login with Amazon (LWA).

> While this tutorial includes instructions for using Login with Amazon, please note that you can use other social providers as well.

Go to the [Auth0 Management Dashboard](${manage_url}). Select **Connections** then **Social** in the drop-down menu. Enable the connection for Amazon by setting the slide to the right so that it turns green.

![](/media/articles/integrations/aws-api-gateway/part-4/enable-amazon-social-connnection.png)

You will now see a pop-up that walks you through the configuration process.

![](/media/articles/integrations/aws-api-gateway/part-4/configure-amazon.png)

Once you've selected the Clients that will be using this social connection, you will be prompted to enter values for the following fields:

* *client id*;
* *client secret*.

If you haven't used Login with Amazon before, there is also a link called **How to Obtain a Client ID**". Click on this link and follow the process to obtain the *client id* and *client secret* values.

Once you've entered the appropriate information, click **Try** to ensure that everything is set up correctly.

> When you configure LWA using the Amazon console, be sure to enter into *Allowed Return URLs* the callback URL to your Auth0 Client, which should look something like `https://johndoe.auth0.com/login/callback`. The Auth0 help page will show you specifically what to enter.

In the Auth0 Dashboard, go back to **Clients**, select your Client, and then open up the **Connections** page. Ensure that *amazon* is enabled under your section of Social connections.

![](/media/articles/integrations/aws-api-gateway/part-4/aws-connections.png)

#### Deploy the API and Update the Single Page Application

##### Deploy the API

Using the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway), you will again [deploy the API and generate a new JavaScript SDK](/integrations/aws-api-gateway/part-2#set-up-cors-and-deploy-the-api).

At this point, you have made all of the necessary configuration changes to enable pet purchases. To make this live, copy your newly-downloaded SDK over the previous one in your `pets` folder, as well as your Amazon S3 bucket.

##### Update the Login Controller Logic to Choose Different Roles for Different Types of Users

The login controller logic uses `getOptionsForRole` to select different roles for different users. When you obtain the delegation token, you can tell Auth0 which role to use (that is, if the user is an admin or if not).

In the `pets/login/login.js` file, modify the `role` and `principal` values for the non-admin user for the social user IAM role you just created.

At this point, you should be able to login using Amazon credentials **or** the database user you previously created. Notice that the UI lets a social user buy pets, while an admin user can add and remove pets.

To test this functionality, you can temporarily hide the remove button in the UI by removing `ng-show="isAdmin"` in `/pets/home/home.html`:

```
 <button ng-show="isAdmin" class="btn delete-btn" ng-click="removePet(pet.id)">remove</button>
```

After copying the changes to your S3 bucket, attempt to remove a pet while logged in as a social user.

##### Update the Home Controller Logic to Allow Social Users to Purchase Pets

In `home.js`, modify the `buyPet` function to enable pet purchases:

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

Copy the code to your S3 bucket, log out, and then log back in in as a social user by clicking on the Amazon icon in the Lock login dialog. You may need to click **SHOW ALL** if your previous login persists in the Lock pane.

![](/media/articles/integrations/aws-api-gateway/part-4/login-using-amazon.png)

Note that, as an Amazon user, you can buy a pet, but not add or remove pets. However, if you log in with a user associated with a Database Connection, you are able to add and remove pets, but not buy pets.

### Enforce Role Assignment with Auth0 Rules

In some cases, determine the appropriate role in the Client is appropriate (as shown here), but you might want to determine user privileges on the server-side to prevent the user from assuming a more privileged role than necessary.

With Auth0, this is done via [rules](/rules), which are service logic statements you define that are then run during the Auth0 authentication process. For example, you could create rules to:

* eliminate the passing of role information from the browser to the Client;
* insert role information into the delegation request based on the authentication source.

#### Enforce Role Assignment

You will add a rule that will check to see if the role requested by the user is allowed, depending on whether they are associated with a Social or Database Connection.

Go to the [Auth0 Management Dashboard](${manage_url}), and click on **Rules** in the left-hand menu.

Click the **+ Create Rule** button near the top left of the screen.

![](/media/articles/integrations/aws-api-gateway/part-4/dashboard-rules-page.png)

At this point, you will be asked to pick a rule template. Select the one for **empty rule**.

![](/media/articles/integrations/aws-api-gateway/part-4/pick-empty-rules-template.png)

You will now edit the empty rule. First, name the rule *AWS Pets Rule* (or something similar). Then, populate the body of the rule with the following JavaScript code:

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

Be sure to adjust the above code with the correct values for your integration. The fields are:

* `Princial` ARN:
* `Role` ARN;
* Client Secret

**Save** to persist your changes.

#### Caveats

* Rules run at a global scope for every authentication.

You should only run the logic on authentication requests associated with a given client (which is why the script used asks for the *clientID*. Without this information, the logic runs for every authentication request associated with your Auth0 account.
- Information is passed into the rule with the *context* and the *user*.
- You can extend the objects passed in to the rule. In the code above, the rule checks the body of the request for the role information. The role is set into the context *addonConfiguration* of the allowed role, which always overrides settings in the request body.

#### Debug Your Rule

At this point, you are ready to debug your rule(s). Click **Try This Rule**, and you will be presented with a script that tries the rule's logic.

![](/media/articles/integrations/aws-api-gateway/part-4/try-rule-script.png)

At the bottom of the screen, click **Try**.

![](/media/articles/integrations/aws-api-gateway/part-4/try-button.png)

You will then be presented with the output of running your rule.

![](/media/articles/integrations/aws-api-gateway/part-4/try-rules-output.png)

[Prev](/integrations/aws-api-gateway/part-3) ----- [Next](/integrations/aws-api-gateway/part-5)
