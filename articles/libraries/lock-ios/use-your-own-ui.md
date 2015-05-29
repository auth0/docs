# Lock iOS: Using Your Own UI

For this tutorial, you need to create a new account in [Auth0](https://www.auth0.com) and setup a new application. We will then implement mobile auth.

1.  Add the following dependencies to your project using Cocoapods:
    ```ruby
pod "Lock/Core", "~> 1.10"
pod "Lock-Facebook", "~> 2.0" #If you need FB integration
pod "Lock-Twitter", "~> 1.0" #If you need Twitter integration
    ```

2. Add in your app's Info plist your ClientId and Domain with the keys `Auth0ClientId` and `Auth0Domain`

3. Instantiate `A0Lock` and keep a reference to it either in your AppDelegate or other object
    ```objc
self.lock = [A0Lock newLock];
    ```

3. In your `AppDelegate.m` inside the method `-application:didFinishLaunchingWithOptions` load your **Auth0** app information from the server
    ```objc
A0Lock *lock = ... //Get your Lock instance
[[lock apiClient] fetchAppInfoWithSuccess:^(A0Application *application) {
  //You don't need to store this object. It's stored for you inside A0APIClient
  NSLog(@"Your Auth0 app information: %@.", application);
} failure:^(NSError *error) {
  NSLog(@"Oops something went wrong: %@", error);
}];
    ```

3. Create a `UIViewController` for the Login Screen and declare `IBOutlet` for *username* and *password*.
  ```objc
  @property (weak, nonatomic) IBOutlet UILabel *usernameLabel;
  @property (weak, nonatomic) IBOutlet UILabel *passwordLabel;
  ```
  > **Note**: The Layout of the ViewController's view is up to you!. We only need these two outlets to fetch username and password.

4. Declare an `IBAction` method to perform the login and implement it calling Auth0 Database Login
  ```objc
  - (IBAction)loginUser:(id)sender;
  ```

  ```objc
  - (void)loginUser:(id)sender {
    //Validate User and Password
    //Show some feedback to the user. e.g: a spinner.
    A0Lock *lock = ... //Get your Lock instance
    A0APIClient *client = [lock apiClient];
    A0APIClientAuthenticationSuccess success = ^(A0UserProfile *profile, A0Token *token) {
      NSLog(@"We did it!. Logged in with Auth0!.");
    };
    A0APIClientError *error = ^(NSError *error){
      NSLog(@"Oops something went wrong: %@", error);
    };
    [client loginWithUsername:self.username.text
                     password:self.password.text
                   parameters:nil
                      success:success
                      failure:failure];
  }
  ```

6. In your Sign up `UIViewController` add the following to sign up users with Auth0 Database connection:
  ```objc
  @property (weak, nonatomic) IBOutlet UILabel *usermname;
  @property (weak, nonatomic) IBOutlet UILabel *password;
  @property (weak, nonatomic) IBOutlet UILabel *repeatPassword;

  - (IBAction)signUpUser:(id)sender;
  ```
  ```objc
  - (void)signUpUser:(id)sender {
    //Validate User, password and repeat password.
    //Show some feedback to the user. e.g: a spinner.
    A0Lock *lock = ... //Get your Lock instance
    A0APIClient *client = [lock apiClient];
    A0APIClientAuthenticationSuccess success = ^(A0UserProfile *profile, A0Token *token) {
      NSLog(@"We did it!. Signed up and logged in with Auth0!.");
    };
    A0APIClientError *error = ^(NSError *error){
      NSLog(@"Oops something went wrong: %@", error);
    };
    [client signUpWithUsername:self.username.text
                      password:self.password.text
                loginOnSuccess:YES
                    parameters:nil
                       success:success
                       failure:failure];
  }
  ```
> More details about the parameters you can use check [this wiki page](https://github.com/auth0/Auth0.iOS/wiki/Sending-authentication-parameters).

After that, you may want to save the user's token to be able to use them later, you can find how to do it [here](https://github.com/auth0/Auth0.iOS/wiki/How-to-save-and-refresh-JWT-token).

## Social Authentication
1. Register a new _URL Type_ with the following scheme
`a0$<clientId>`.

2. Add the following lines to your `AppDelegate.m`
  ```objc
  #import <Lock/Lock.h>

  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    A0Lock *lock = ... //Get your Lock instance
    return [lock handleURL:url sourceApplication:sourceApplication];
  }
  ```

3. Configure Facebook Native Login (Only once in your `AppDelegate.m` `-application:didFinishLaunchingWithOptions`)
  ```objc
  A0Lock *lock = ... //Get your Lock instance
  A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticationWithDefaultPermissions];
  [lock registerAuthenticators:@[facebook]];
  ```
  > **Note**: You need to configure your iOS App for Facebook, please check [this guide](https://github.com/auth0/Auth0.iOS#facebook) for more information.

4. Configure Twitter Native Login (Only once in your `AppDelegate.m` `-application:didFinishLaunchingWithOptions`)
  ```objc
  NSString *twitterApiKey = ... //Remember to obfuscate your api key
NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
  A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticationWithKey:twitterApiKey andSecret:twitterApiSecret];
  A0Lock *lock = ... //Get your Lock instance
  [lock registerAuthenticators:@[twitter]];
  ```
4. Configure A0IdentityProviderAuthenticator with your App's social connections (Only once in your `AppDelegate.m` `-application:didFinishLaunchingWithOptions`)
  ```objc
    A0Lock *lock = ... //Get your Lock instance
    [[lock apiClient] fetchAppInfoWithSuccess:^(A0Application *application) {
      NSLog(@"Your Auth0 app information: %@.", application);
      [[A0IdentityProviderAuthenticator sharedInstance] configureForApplication:application];
    } failure:^(NSError *error) {
      NSLog(@"Oops something went wrong: %@", error);
    }];
  ```

5. Authenticate with a social connection
  ```objc
  A0APIClientAuthenticationSuccess success = ^(A0UserProfile *profile, A0Token *token) {
    NSLog(@"We did it!. Signed up and logged in with Auth0!.");
  };
  A0APIClientError *error = ^(NSError *error){
    NSLog(@"Oops something went wrong: %@", error);
  };
  A0Lock *lock = ... //Get your Lock instance
  [[lock identityProviderAuthenticator] authenticateForStrategyName:A0StrategyNameFacebook
                                                                     parameters:nil
                                                                        success:success
                                                                        failure:failure];
  ```
