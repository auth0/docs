---
title: Amazon API Gateway Tutorial - Flowing Identity
description: Step 5 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 5 - Using Identity Tokens to Flow Identity

In this final step, you will:

* Flow identity to the service by passing your OpenID JSON Web Token (JWT);
* Validate the token;
* Extract profile information to assign a buyer for a pet.

## Use an Identity Token

Often, you will want to use your Lambda function to process the user's role based on the user's identity. For example, during a purchasing transaction, you retrieved the username from the profile returned with the identity token.

Alternatively, you can choose to have the user's information embedded with the identity itself, which is a JSON Web Token (JWT). The advantage of this method is that you can:

1. Verify the authenticity of the JWT;
2. Be sure that the calling user is authenticated (instead of relying on a plain-text parameter that could have been tampered with).

In addition, you can use the JWT for authorization, allowing you to bypass the IAM integration with Amazon API Gateway. The caveat to this, however, is that using the API Gateway for authorization allows you to halt the API call prior to invocation of your Lambda function.

![AWS Identity Flow](/media/articles/integrations/aws-api-gateway/identity-flow.png)

### Adding Email Information to the JWT

There are several ways of adding a user's email address to the JWT.

#### Using Rules

One way to add a user's email address to the JWT is to use a [rule](/rules). This is a good approach if you want to make sure that this value is always available in the JWT for an authenticating user.

In `login.js`, you can see this scope specified in the parameters passed to `auth.signin`:

```js
$scope.login = function() {
    var params = {
        authParams: {
          scope: 'openid email'
        }
      };

    auth.signin(params, function(profile, token) {
      ...
    }
  }
```

While you can include the full profile of the user within the JWT, you will want to include only what is necessary since the JWT is typically passed with *every* request.

## Validate the JWT Token

Because the AWS Lambda console has access to a limited number of Node modules that can be accessed when you enter your Node.js code using the browser console, you'll need to include additional modules and upload the Lambda function as a package to process the identity token.

> For additional details, see [Creating Deployment Packages using Node.js](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) and [Uploading Deployment Packages and Testing](http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-s3-events-adminuser-create-test-function-upload-zip-test.html).

The following seed project contains the code you'll need for your updated AWS Lambda function.

<%= include('../../_includes/_package2', {
  org: 'auth0',
  repo: 'auth0-aws',
  path: 'examples/api-gateway/lambda'
}) %>

You'll see two custom JavaScript files within the seed project:

* `index.js`: contains your main code;
* `auth0-variables`: contains the code you need to update.

In addition to the custom files, there is a standard Node.js `package.json` file.

The code adds functionality to extract information from and validate the JWT. By default, Auth0 uses a symmetric key for signing the JWT, though you may opt to use asymmetric keys (if you need to allow third-party validation of your token, you should use an asymmetric key and share only your public key).

>For more information about token verification, see [Identity Protocols Supported by Auth0](/protocols).

Update `auth0-variables.js` with your secret key, which can be found on the *Settings* tab of your Client in the Auth0 Dashboard:

```js
var env={};
env.AUTH0_SECRET='ADD-YOUR-SECRET';
module.exports = env;
```

Run **npm install** from the directory where your files are, zip up the contents (`index.js` must be at the root of the zip), and upload it for use by the `PurchasePet` Lambda function. If you test this, you should see an authorization failure, since the JWT is not in the message body.

Take a look at the logic in `index.js`. You will see logic around line 60 that validates the token and extracts the decoded information that contains the identity information used for the purchase logic:

```js
 if(event.authToken) {
     var secretBuf = new Buffer(secret, 'base64');
     jwt.verify(event.authToken, secretBuf, function(err, decoded) {
         if(err) {
           console.log('failed jwt verify: ', err, 'auth: ', event.authToken);
           context.done('authorization failure', null);
         } else if(!decoded.email)
         {
           console.log('err, email missing in jwt', 'jwt: ', decoded);
           context.done('authorization failure', null);
         } else {
           userEmail = decoded.email;
           console.log('authorized, petId', petId, 'userEmail:', userEmail);
           dynamo.getItem({TableName:"Pets", Key:{username:"default"}}, readcb);
         }
     });
  } else {
     console.log('invalid authorization token', event.authToken);
     context.done('authorization failure', null);
  }
    ...
```

### Extract Profile Information to Assign a Buyer

The final step is to pass the JWT to the method used by the browser client. The standard method comes with an `Authorization` header as a *bearer* token, and you can use this method by turning off IAM authorization and relying solely on the OpenID token for authorization (you will also need to map the Authorization header into the event data passed to the AWS Lambda function).

If, however, you are using IAM, then the AWS API Gateway uses the `Authorization` header to contain the signature of the message, and you will break the authentication by inserting the JWT into this header. To do this, you can either:

* Add a custom header for the JWT;
* Put the custom header into the body of the message.

If you choose to use a custom header, you'll also need to do some mapping for the *Integration Request* of the *POST* method for `pets/purchase`.

To keep the validation process simple, pass the JWT in the body of the post to the AWS Lambda function. To do this, update the `buyPet` method in `home.js` by removing the `userName` from the body, and adding `authToken` as follows:

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

Upload your code to your S3 bucket and try to purchase a pet. You will see the email of the purchaser in the resulting message.

If you have any errors, double check that you have properly set your secret key. One useful tool for checking issues with your token decoding is [jwt.io](http://jwt.io/).

## Summary

In this tutorial, you have:

* Created an API using AWS API Gateway that includes methods using AWS Lamdba functions;
* Secured access to your API using IAM roles;
* Integrated a SAML identity provider with IAM to tie access to the API to your user base;
* Provided different levels of access based on whether a user authenticated from the Database or Social Connection;
* Used an Auth0 rule to enforce role assignment;
* Used a JWT to provide further authorization context and pass identity information into the appropriate Lambda function.

<%= include('./_stepnav', {
 prev: ["4. Using Multiple Roles", "/docs/integrations/aws-api-gateway/part-4"]
}) %>
