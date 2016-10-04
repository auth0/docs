---
title: Amazon API Gateway Tutorial - Flowing Identity
description: Step 5 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 5 - Using Identity Tokens to Flow Identity
[Prev](/integrations/aws-api-gateway/part-4)

In this final step you will flow identity to the service by passing your OpenID JSON Web Token (JWT). You will validate the token, and extract profile information to assign a buyer for a pet.

## Use An Identity Token
Often, you will want to do the processing of a user's role based on the users identity in the logic of your Lambda function. In the purchasing example above, you retrieved the user name from the profile returned with the identity token. Another option is to have the user information embedded with the identity, which is a JSON web token (JWT). The advantage of this method is that you can verify the authenticity of the JWT, and be assured that the calling user is authenticated rather than relying on a plain-text parameter that could be tampered with. You could also use the JWT for authorization and bypass the IAM integration with the Amazon API Gateway. However, by using the API Gateway for authorization, you have the opportunity of halting the API call before your Lambda function is ever invoked.

![](/media/articles/integrations/aws-api-gateway/identity-flow.png)

There are several ways of causing the email to be added to the JWT. One way is to use another rule, which is a good approach if you want make sure this value is always in the JWT for an authenticating client. Since the provided sample includes the email as part of the scope when you login in the browser client, you will be using this approach. In `login.js` you can see this scope specified in the parameters passed to `auth.signin`:

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

The AWS Lambda console has access to a relatively limited number of node modules that can be accessed when you enter your node.js code using the browser console. In order to use the modules needed to process the identity token, you'll need to include additional modules and upload the Lambda function as a package (for details, see [Creating Deployment Package (Node.js)](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) and [Upload the Deployment Package and Test](http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-s3-events-adminuser-create-test-function-upload-zip-test.html). The following seed project contains the code you'll need for your updated AWS Lambda function.

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-aws',
  pkgBranch: 'master',
  pkgPath: 'examples/api-gateway/lambda',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

You'll see a two Javascript files, `index.js` which is expected by the AWS Lambda service to contain your main code, and `auth0-variables` which contains the only code you need to update. There is also a standard nodejs `package.json` file.

This code adds extraction and validation of the JWT and uses several modules to help with that process. By default, Auth0 uses a symmetric key for signing the JWT, although there is an option to use asymmetric keys. If you need to allow third parties to validate your token as well, you should use an asymmetric key and only share your public key. For more information about token verification see [Identity Protocols supported by Auth0](/protocols).

Update `auth0-variables.js` with your secret key which can be found on the settings tab of your application in the Auth0 console:

```js
var env={};
env.AUTH0_SECRET='ADD-YOUR-SECRET';
module.exports = env;
```

Now run **npm install** from the directory, zip up the contents (`index.js` must be at the root of the zip), and upload it for the `PurchasePet` Lambda function. You can try testing it, and you should see an authorization failure since there is not JWT in the message body.

Take a look at the logic in index.js. You will see logic around line 60 that validates the token, and extracts the decoded information that contains the identity information that is used then for the purchase logic:
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

The final step is to pass the JWT to the method from the browser client. The standard method is with an `Authorization` header as a *bearer* token, and you can use this method if you turn off IAM authorization and rely solely upon the OpenID token for authorization (you will also need to map the Authorization header into the event data passed to the AWS Lambda function). If you are using IAM, then the AWS API Gateway uses the `Authorization` header to contain the signature of the message, and you will break the authentication by inserting the JWT into this header. You could either add a custom header for the JWT, or put it into the body of the message. If you choose to use a custom header, you'll also need to do some mapping for the *Integration Request* of the *POST* method for `pets/purchase`. To keep it simple, pass it in the body of the post and it will pass through to the AWS Lambda function. To do this, update the `buyPet` method in `home.js` by removing the `userName` from the body, and adding `authToken` as follows:

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

Now upload your code to your S3 bucket, and try to purchase a pet. You will see the email of the purchaser in the resulting message. If you have any errors, double check that you have properly set your secret key. One useful tool for checking issues with your token decoding is [jwt.io](http://jwt.io/).

## Summary
In this tutorial, you have created AWS API Gateway methods using AWS Lamdba functions, and have secured access to the APIs using IAM. You integrated a SAML identity provider with IAM to tie access to the API to your user base. You then provided different levels of access based on whether a user authenticated from the built in database, or with a social identity, and used an Auth0 rule to enforce the role assignment. Finally, you used a JWT to provide further authorization context, and to pass identity information into the Lambda function.

[Prev](/integrations/aws-api-gateway/part-4)
