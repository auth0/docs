### AWS API Gateway Tutorial - Step 3 - Building the Client Application

The client application will be a single page, serverless application based on the AngularJS framework that you will serve out of an S3 bucket configured as a website. To begin, create a bucket for the application and configure it as a website with a home page of `index.html`. You can find instructions at [Hosting a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html).

For a simple starter app, download this seed project which pre-configures your account settings. 

<%= include('../_includes/package', {
  pkgRepo: 'auth0-aws',
  pkgBranch: 'master',
  pkgPath: 'examples/api-gateway/client',
  pkgFilePath: null,
  pkgType: 'js' + account.clientParam
}) %>

Copy the contents of this seed project to a local folder called `pets`. You will be using the `pets` folder for the remainder of this tutorial. From the `pets` folder, copy the contents to your S3 bucket for the website. An easy way to do this is with the [AWS CLI](https://aws.amazon.com/cli/).
```
aws s3 cp --recursive --acl "public-read" ./ s3://your-bucket/
```
Although the sample project is functional, you need to make a few configuration changes for it to work with your AWS API Gateway APIs. First, get an *OpenId* identity token based on your credentials. With Auth0, you can use many different sources of users to authenticate called connections and grant access to applications like AWS. Begin with using the users of the built-in Auth0 database *Username-Password-Authentication* that was created when you opened your account. From the Auth0 console, click on the **Connections** tab of your application and you should see that this connection is enabled. Click on **Users** in the left column, and click **New User**. Fill in the information for the user, and click **Save**. You now have one user available to authenticate.

There is one last step to get authentication to work. The website runs at a url like `http://your-bucket-domain/index.html`, which is shown under the properties of your S3 bucket. To tell Auth0 that it is OK to permit authentication from your website, add `http://your-bucket-domain` to the *Allowed Origins* in the Auth0 application settings.

Before going further, test logging into your application. Open `http://your-bucket-domain/index.html` in your browser. After logging in with the user you just created you should see a welcome screen with a big blue button, **CALL API**.

### Use Delegation to get an AWS Token

At this point you have authenticated with Auth0, and you have an OpenId token. Here is the directory structure for the generated code.

![](/media/articles/integrations/aws-api-gateway/aws-api-gateway-project.png)

You can use Auth0's delegation capability to obtain a token to access AWS based on our identity token. Behind the scenes, Auth0 authenticates your identity token, and then uses SAML based on the add-on that you configured as part of the [previous section](#configure-iam-and-auth0-for-saml-integration-and-the-api-gateway). 

Update `pets/login/login.js` as follows to get an AWS delegation token from the identity token after a successful signin with `auth.signin`. Make sure to modify the `role` and `principal` strings in the `getOptionsForRole` function to contain your actual account id value. Note that you are treating any user not logged in using a social connection as an admin. Later, we'll code a second role and show better ways to enforce role selection.

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

If you open `apiClient.js`, you can see that the downloaded library has created wrappers like `petsPost` and `petsGet` for your API methods. Don't modify this generated code. Open `home.js` and update the contents of `getPets` with a method for getting pets as follows:

```js
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
If you refresh the page, you should see two animals listed (assuming you ran the previously described test on your API's that created these pets).

### Update Pets with the AWS API Service

Now that you have a working application with the API Gateway, add a method for updating the pets. First try it without authentication, and then add it in.

Append code for adding a pet. As in the previous modifications to `auth.signin`, you are assuming that anyone that is not a social user is an admin, including users authenticated from the *Username-Password-Authentication* store). Modify the `putPets` logic to update pets using your API function. This function will be used for both adding and removing pets  .

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

The update logic will fail because you are not yet authenticating the AWS API Gateway method using IAM for *petsPost*, but you should test it. Add a frog for 4.99. You should see a failure occurring when you try to save. The error code is likely a failure due to the absence of the `Access-Control-Allow-Origin` header. When you setup CORS, it was only configured up for a *200* status code. You'll need to set this up for each status code you want to go through to the end user. If you look in the browser debugger, you'll see that the underlying status is a 403.

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
}
```

The update should now succeed.

  [Prev](/integrations/aws-api-gateway-2) ----- [Next](/integrations/aws-api-gateway-4)