# Integrating Auth0 with Amazon Cognito for Mobile Apps.

**Amazon Cognito** is a backend as a service that lets you focus on writing a fantastic user experience for your client app (native or web).

In this document, I’ll explain how you can integrate your mobile app with two solutions: Auth0 to get authentication with either [Social Providers](/identityproviders#social) (Facebook, Twitter, etc.), [Enterprise providers](/identityproviders#enterprise) or regular Username and Password, and [Amazon Cognito](http://aws.amazon.com/cognito/), to get a backend for your app without writing a line of code

## Configuring Amazon Web Services
### Create a new OpenID Connect Provider
The first step is to create an OpenID Connect Provider pointing to your Auth0 account. Please take a note of your Auth0 domain (_accountName_.auth0.com) and your _clientId_ and use them to create the Identity Pool in the [IAM Console](https://console.aws.amazon.com/iam/home):

![IDP Creation](/media/articles/scenarios/amazon-cognito/IDPCreation.gif)

> It's not necessary to set up an IAM role after creating the identity provider. If you don't have one already, Cognito will create a default IAM role in the next step.

To obtain the Auth0 Dashboard's Thumbprint value:

1. [Retrieve your Auth0 Domain's certificate chain.](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html?icmpid=docs_iam_console)
2. Once you've obtained the certificate chain, isolate the last certificate in the chain.
3. Using the last certificate in the chain, [compute the fingerprint](https://www.samltool.com/fingerprint.php).
4. Convert the fingerprint to a thumbprint by removing all of the `:` characters.
5. Use the computed thumbprint when calling the `aws iam create-open-id-connect-provider` command.

Please do **not** use the certificate thumbprint shown on the Auth0 Application Dashboard.

### Create a Cognito Identity Pool
Now, you need to create an Identity Pool in the [Cognito Console](https://console.aws.amazon.com/cognito/home). This will be used to log in to Amazon Cognito using the Auth0 Identity Provider that you created in the previous step.

![Cognito Pool Creation](/media/articles/scenarios/amazon-cognito/IDPCognito.gif)

> Please take a note of the ARN selected in the end of the gif. We’ll use it later on!

### Grab the Role ARN
Finally, grab the ARN of the role that was automatically created in the previous step from the [IAM console](https://console.aws.amazon.com/iam/home).

![Grab Role ARN](/media/articles/scenarios/amazon-cognito/Roles.gif)

# Configuring Auth0
### Configure your application
Amazon will use the public signing key from the OpenID Provider Metadata (https://subscription.auth0.com/.well-known/jwks.json) to validate the signature of the JSON Web Token.

By default Auth0 will use the HS256 signature algorithm which is not supported in this scenario (this will result in "Invalid login token" errors). Go to your application in the dashboard, press "Show Advanced Settings" and change the algorithm to RS256:

![](/media/articles/scenarios/amazon-cognito/cdn-amazon-cognito-rs256.png)

## Code time!
Now it’s time to start coding our app. In this case, we’ll be using Swift, but the same sample applies to Objective-C as well.

### Adding the Needed Dependencies

Add the following dependencies to your `Podfile`

```ruby
pod "Lock", "~> 2.4"
pod "JWTDecode"
pod "SimpleKeychain"
pod "AWSCore"
pod "AWSCognito"
```
### Logging the User In
We’ll use [Auth0 Lock for iOS](https://github.com/auth0/lock) to log the user in. You can read detailed instructions on how to implement it in [this documentation page](/native-platforms/ios-swift).
Once the user is successfully logged in with Auth0, we’ll send their credentials to Amazon Cognito:

```swift
let authController = A0LockViewController()
authController.onAuthenticationBlock = {(profile:A0UserProfile!, token:A0Token!) -> () in
  // Save Tokens and Credentials into the keychain as you'd regularly do
  // ...

  let provider = AWSCognitoCredentialsProvider.credentialsWithRegionType(
    AWSRegionType.USEast1,
    // Your AWS Account ID
    accountId: Constants.AWSAccountID.value,
    // This is the ARN from Cognito Identity Pool
    identityPoolId: Constants.CognitoPoolID.value,
    unauthRoleArn: '',
    // This is the ARN from the Role
    authRoleArn: Constants.CognitoRoleAuth.value);


  let configuration = AWSServiceConfiguration(region: AWSRegionType.USEast1, credentialsProvider: self.provider);
  AWSServiceManager.defaultServiceManager().setDefaultServiceConfiguration(configuration)

  // Set here the Auth0 URL you've set when creating the OpenID Connect Provider
  provider.logins = ['samples.auth0.com': token.idToken]
  self.provider.getIdentityId().continueWithBlock { (task: BFTask!) -> AnyObject! in
      self.provider.refresh()
      if (task.error != nil) {
          // Fail
      } else {
          // Logged in with Cognito successfully
      }
      return nil
  }
}
```

### Using Cognito

Now, the user is logged in to Cognito through Auth0. You can now store information in Cognito that only this user will be able to use.

```swift
let cognitoSync = AWSCognito.defaultCognito()
let dataset = cognitoSync.openOrCreateDataset("MainDataset")
// Get an existing value
dataset.synchronize().continueWithBlock { (task) -> AnyObject! in
    dispatch_async(dispatch_get_main_queue(), { () -> Void in
        self.textValue.text = dataset.stringForKey("value")
    })
    return nil
}

// Set a new value
dataset.setString(self.textValue.text, forKey: "value")
dataset.synchronize()
```
## Let’s see how it works!

![Cognito working](/media/articles/scenarios/amazon-cognito/CognitoSample.gif)

## Final Thoughts

That’s it! Now, your users can login with Github or any other identity provider using a native UI and save their information with Cognito easily.

You can check out a working sample that uses Cognito and Auth0 in [this Github repository](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/Cognito.Swift)

Happy coding :).
