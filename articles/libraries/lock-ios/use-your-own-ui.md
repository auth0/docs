---
toc_title: Build your own UI
description: Customize the UI of Lock in your App
---

# Lock iOS: Build your own UI

<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'native-mobile-samples',
  path: 'iOS/custom-ui-sample-swift'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

1.  Add the following dependencies to your project using Cocoapods:
  ```ruby
  pod "Lock/Core", "~> 1.16"
  pod "Lock-Facebook", "~> 2.0" #If you need FB native integration
  pod "Lock-Twitter", "~> 1.1" #If you need Twitter native integration
  ```

2. Open your app's `Info.plist` file and add two new entries `Auth0ClientId` and `Auth0Domain` with the following values `${account.clientId}` and `${account.namespace}`

3. Create a new instantiate of `A0Lock` and store it where is easily accessible:
  ```objc
  self.lock = [A0Lock newLock];
  ```
  ```swift
  self.lock = A0Lock()
  ```

4. When you need to login your user with email/password credentials, just paste the following code
  ```objc
  NSString *email = ... // User's email
  NSString *password = ... // User's password
  A0Lock *lock = ... // Get your Lock instance
  A0APIClient *client = [lock apiClient];
  A0APIClientAuthenticationSuccess success = ^(A0UserProfile *profile, A0Token *token) {
    NSLog(@"We did it!. Logged in with Auth0.");
  };
  A0APIClientError failure = ^(NSError *error){
    NSLog(@"Oops something went wrong: %@", error);
  };
  A0AuthParameters *params = [A0AuthParameters newDefaultParams];
  params[A0ParameterConnection] = @"Username-Password-Authentication"; // Or your configured DB connection
  [client loginWithUsername:email
                   password:password
                 parameters:params
                    success:success
                    failure:error];
  ```

  ```swift
  let email = ... // User's email
  let password = ... // User's password
  let lock = ... // Get your Lock instance
  let client = lock.apiClient()
  let parameters = A0AuthParameters(dictionary: [A0ParameterConnection : "Username-Password-Authentication"])
  client.loginWithUsername(email, password: password, parameters: parameters, success: { profile, token in
    println("We did it!. Logged in with Auth0.")
  }, failure: { error in
    println("Oops something went wrong: \(error)")
  })
  ```
> More details about the parameters you can use check [this wiki page](/libraries/lock-ios/sending-authentication-parameters).

After that, you may want to save the user's token to be able to use them later, you can find how to do it [here](/libraries/lock-ios/save-and-refresh-jwt-tokens).

## Social Authentication

1. In your `AppDelegate` method named `application:didFinishLaunchingWithOptions` add the following line:
  ```objc
  A0Lock *lock = ... //Get your Lock instance
  [lock applicationLaunchedWithOptions:launchOptions];
  ```
  ```swift
  let lock = ... // Get your Lock instance
  lock.applicationLaunchedWithOptions(launchOptions)
  ```

2. Also add the following lines to your `AppDelegate` too
  ```objc
  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    A0Lock *lock = ... //Get your Lock instance
    return [lock handleURL:url sourceApplication:sourceApplication];
  }
  ```
  ```swift
  func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    let lock = ... // Get your Lock instance
    return lock.handleURL(url, sourceApplication: sourceApplication)
  }
  ```

3. Configure Facebook Native Integration
  ```objc
  A0Lock *lock = ... //Get your Lock instance
  A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
  [lock registerAuthenticators:@[facebook]];
  ```
  ```swift
  let lock = ... //Get your Lock instance
  let facebook = A0FacebookAuthenticator.newAuthenticatorWithDefaultPermissions()
  lock.registerAuthenticators([facebook])
  ```
  > **Note**: You need to configure your iOS App for Facebook, please check [this guide](/libraries/lock-ios/native-social-authentication#facebook) for more information.

4. Configure Twitter Native Integration
  ```objc
  NSString *twitterApiKey = ... //Remember to obfuscate your api key
  NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
  A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticationWithKey:twitterApiKey andSecret:twitterApiSecret];
  A0Lock *lock = ... //Get your Lock instance
  [lock registerAuthenticators:@[twitter]];
  ```
  ```swift
  let twitterApiKey = ... //Remember to obfuscate your api key
  let twitterApiSecret = ... //Remember to obfuscate your api key
  let twitter = A0TwitterAuthenticator.newAuthenticationWithKey(twitterApiKey, andSecret:twitterApiSecret)
  let lock = ... //Get your Lock instance
  lock.registerAuthenticators([twitter])
  ```

5. Authenticate with a social connection
  ```objc
  void(^success)(A0UserProfile *, A0Token *) = ^(A0UserProfile *profile, A0Token *token) {
    NSLog(@"We did it!. Logged in with Auth0.");
  };
  void(^error)(NSError *) = ^(NSError *error) {
    NSLog(@"Oops something went wrong: %@", error);
  };
  A0Lock *lock = ... //Get your Lock instance
  [[lock identityProviderAuthenticator] authenticateWithConnectionName:@"facebook" parameters:nil success:success failure:failure];
  ```
  ```swift
  let success = { (profile: A0UserProfile, token: A0Token) in
    println("We did it!. Logged in with Auth0.")
  }
  let failure = { (error: NSError) in
    println("Oops something went wrong: \(error)")
  }
  let lock = ... //Get your Lock instance
  lock.identityProviderAuthenticator().authenticateWithConnectionName("facebook", parameters: nil, success: success, failure: failure)
  ```
