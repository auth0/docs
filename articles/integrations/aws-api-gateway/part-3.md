---
title: Amazon API Gateway Tutorial - Building the Client App
description: Step 3 of Amazon API Gateway Tutorial
---

# AWS API Gateway Tutorial
## Step 3 - Building the Client Application

In this step, you will build a single page, serverless client application using the AngularJS framework that you will serve out of an AWS S3 bucket configured to act as a static website.

### 1. Setting Up Your Sample Application

For a simple starter app, download this seed project.

<%= include('../../_includes/_package2', {
  org: 'auth0',
  repo: 'auth0-aws',
  path: 'examples/api-gateway/client'
}) %>

Copy the contents of this seed project to a local folder called `pets`, which you will be using for the remainder of this tutorial. Within this folder, update `auth0-variables.js` with your Auth0 Client `AUTH0_CLIENT_ID` and `AUTH0_CLIENT_ID` (this information is available in the [Management Dashboard](${manage_url}/#/clients) for the client in question).

> Be sure that you have [created the AWS S3 bucket configured to act as a static website](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html). During the setup process, copy the contents of the `pets` folder to your S3 bucket to provide content for the website.
>
> If you are using a pre-existing bucket, you can move the files with the [AWS CLI](https://aws.amazon.com/cli/) using the following command:
> ```
> aws s3 cp --recursive --acl "public-read" ./ s3://YOUR-BUCKET/
> ```

Prior to proceeding, please be sure that you have at least one user associated with your *Username-Password-Authentication* (or the Database Connection associated with the Client you are using) Connection. To fully utilize the functionality of your sample app and its integration with AWS, you will need that user to test authentication and gain access.

Lastly, ensure that Auth0 allows authentication from your website by providing the URL in the **Allowed Origins** field in the *Settings* page of your Client. Your website's URL should look something like this:

`http://your-bucket.s3-website-us-east-1.amazonaws.com`

If you don't know what your URL is, you can find it listed under the **Properties** tab of your S3 bucket.

Before going further, test logging into your application. Open `http://your-bucket-domain/index.html` in your browser. After logging in, you should see an alert box pop up that says "getPets not implemented":

![Pop up with Get Method Error](/media/articles/integrations/aws-api-gateway/part-3/log-in-popup.png)

You should also see the page for viewing pets.

![Log in success screen](/media/articles/integrations/aws-api-gateway/part-3/log-in-success.png)

### Use Delegation to Get an AWS Token

At this point, you have authentication set up with Auth0, and you have an OpenId JWT. Here is the directory structure for the generated code:

![S3 website directory structure](/media/articles/integrations/aws-api-gateway/aws-api-gateway-project.png)

You can use Auth0's delegation capability to obtain an AWS access token that is based on the Auth0 identity token. Behind the scenes, Auth0 authenticates your identity token, and then uses SAML based on the addon that you configured.

Update `pets/login/login.js` as follows to get an AWS delegation token from the identity token after a successful signin with `auth.signin`. Note that you are treating any user not logged in using a Social Connection as an admin. Later, we'll code a second role and show better ways to enforce role selection.


```js
auth.signin(params, function(profile, token) {
    store.set('profile', profile);
    store.set('token', token);

// set admin and get delegation token from identity token.
profile.isAdmin = !profile.identities[0].isSocial;
var options = getOptionsForRole(profile.isAdmin, token);

auth.getToken(options)
    .then(
      function(delegation)  {
        store.set('awstoken', delegation.Credentials);  //add to local storage
        $location.path("/");
      },
    function(err) {
       console.log('failed to acquire delegation token', err);
  });
}, function(error) {
  console.log("There was an error logging in", error);
});
```

#### Modifying the `role` and `principal` Strings

To modify the `role` and `principal` strings, specify the appropriate values via [Rules](${manage_url}/#/rules):

```js
function (user, context, callback) {
  if (context.clientID === 'CLIENT_ID' &&
      context.protocol === 'delegation') {
    // set AWS settings
    context.addonConfiguration = context.addonConfiguration || {};
    context.addonConfiguration.aws = context.addonConfiguration.aws || {};
    context.addonConfiguration.aws.principal = 'arn:aws:iam::[omitted]:saml-provider/auth0-provider';
    context.addonConfiguration.aws.role = 'arn:aws:iam::[omitted]:role/auth0-role';
  }

  callback(null, user, context);
}
```

Be sure to update the `role` and `[principal]` ARN values with the ones for your integration.

Copy the updated files to your S3 bucket for your web site.

Optionally, you can set a breakpoint in the browser at `store.set('awstoken', delegation.Credentials);`. When you log out and and log back in, inspect `delegation.Credentials` when you arrive at the breakpoint. You will see a familiar values like *AccessKeyId* and *SecretAccessKey*:

```js
{
    AccessKeyId: "ASIAJB...BNQ",
    SecretAccessKey: "vS+b6...2Noav",
    SessionToken: "AQoDYBqsivOV...DdQW0gsKr8rgU=",
    Expiration: "2015-08-27T14:48:32.000Z"
}
```

If you don't see these values, be sure that you have the *Amazon Web Services addon* enabled in the *Addons* tab for your Auth0 Client.

### Display Pets with the AWS API Service

The first thing you will do is show the pets to the end users.

#### Adding the API Code to Call Your API

To add the API code for adding a call to your service, copy the contents of *apiGateway-js-sdk.zip* you [previously downloaded](/integrations/aws-api-gateway/part-2/#deploy-the-api) to the `pets` directory. The contents should include:

* `apiClient.js`;
* `lib` folder;
* `README.md`.

There is already a `README.md` in the `pets` directory, so you will need to rename one of the files to keep both in the directory. The `README.md` for the API gateway explains how to use the API client from your Auth0 Client.

Open the `index.html` file located in the root of your `pets` folder to add all of the scripts listed at the top of the API readme to `index.html`:

```html
<!-- scripts for aws api gateway include after you create your package from aws for api gateway. -->
<script type="text/javascript" src="lib/axios/dist/axios.standalone.js"></script>
<script type="text/javascript" src="lib/CryptoJS/rollups/hmac-sha256.js"></script>
<script type="text/javascript" src="lib/CryptoJS/rollups/sha256.js"></script>
<script type="text/javascript" src="lib/CryptoJS/components/hmac.js"></script>
<script type="text/javascript" src="lib/CryptoJS/components/enc-base64.js"></script>
<script type="text/javascript" src="lib/url-template/url-template.js"></script>
<script type="text/javascript" src="lib/apiGatewayCore/sigV4Client.js"></script>
<script type="text/javascript" src="lib/apiGatewayCore/apiGatewayClient.js"></script>
<script type="text/javascript" src="lib/apiGatewayCore/simpleHttpClient.js"></script>
<script type="text/javascript" src="lib/apiGatewayCore/utils.js"></script>
<script type="text/javascript" src="apigClient.js"></script>
```

If you open `apigClient.js`, you can see that the downloaded library has created wrappers like `petsPost` and `petsGet` for your API methods. You do *not* need to modify this generated code.

#### Configuring the `getPets` Method

Open `home.js` in the `home` folder, and update the contents of `getPets` with a method for retrieving pets data (be sure to update the region if you are not running in `us-east-1`):

```js
function getPets() {
    // this is unauthenticated
    var apigClient = apigClientFactory.newClient({
        region: 'us-east-1' // The region where the API is deployed
    });

    apigClient.petsGet({},{})
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

Copy the updated code to your S3 bucket. Refresh the page to see two animals listed (if you ran the previously described test on your APIs that created these pets).

![API Get Method Success](/media/articles/integrations/aws-api-gateway/part-3/get-success.png)

### Update Pets with the AWS API Service

Now that you have a working Auth0 Client with the API Gateway, you will add a method for updating the `pets` table.

Modify the `putPets` method logic to update pets using your API function. This function will be used for both adding and removing pets.

```js
function putPets(updatedPets) {
    var body = {pets: updatedPets};

    var apigClient = apigClientFactory.newClient({
        region: 'us-east-1' // set this to the region you are running in.
    });

    apigClient.petsPost({},body)
      .then(function(response) {
        console.log(response);
       }).catch(function (response) {
        alert('pets update failed');
        showError(response);
      });
}
```

Copy the updated code to your S3 bucket. Test the method:

1. Log out and log back in.
2. Enter in values for `Pet Type` and `Pet Price`.
3. Click **Save** to post your data.

You should see a message that says, "We have a `<Pet Type>` for sale for `<Pet Price>`" with a red **REMOVE** button to its left.

![Post Method Success Screen](/media/articles/integrations/aws-api-gateway/part-3/add-frog-success.png)

To add security, add the `getSecureApiClient` function at the start of the `putPets` method:

```js

function putPets(updatedPets) {
     var apigClient = getSecureApiClient();
}
```

Copy the code to your S3 bucket.

The `getSecureApiClient` function provided for you retrieves the AWS token from local storage acquired using delegation to the API, and uses the access key, secret, and session token:

```js
  function getSecureApiClient() {
    var awstoken = store.get('awstoken');

    return apigClientFactory.newClient({
        accessKey: awstoken.AccessKeyId,
        secretKey: awstoken.SecretAccessKey,
        sessionToken: awstoken.SessionToken,
        region: 'us-east-1' // The region you are working out of.
    });
  }
```

<%= include('./_stepnav', {
 prev: ["2. Securing and Deploying", "/docs/integrations/aws-api-gateway/part-2"],
 next: ["4. Using Multiple Roles", "/docs/integrations/aws-api-gateway/part-4"]
}) %>
