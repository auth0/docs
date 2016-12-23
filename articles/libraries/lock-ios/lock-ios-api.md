---
section: libraries
toc_title: Lock Objective-C API
description: Description of the Lock Objective-C API
---

## API

### A0Lock

#### A0Lock#newLock
```objc
+ (instancetype)newLock;
```
Creates a new `A0Lock` instance using account information from Info.plist file.
```objc
A0Lock *lock = [A0Lock newLock];
```

#### A0Lock#newLockWithClientId:domain:
```objc
+ (instancetype)newLockWithClientId:(NSString *)clientId domain:(NSString *)domain;
```
Creates a new `A0Lock` instance with Auth0 clientId and domain.
```objc
A0Lock *lock = [A0Lock newLockWithClientId:@"YOUR_CLIENT_ID" domain:@"YOUR_DOMAIN"];
```

#### A0Lock#newLockWithClientId:domain:configurationDomain:
```objc
+ (instancetype)newLockWithClientId:(NSString *)clientId domain:(NSString *)domain configurationDomain:(NSString *)configurationDomain;
```
Creates a new `A0Lock` instance with Auth0 clientId, domain and configurationDomain.
```objc
A0Lock *lock = [A0Lock newLockWithClientId:@"YOUR_CLIENT_ID" domain:@"YOUR_DOMAIN" configurationDomain:@"YOUR_CONFIG_DOMAIN"];
```

#### A0Lock#apiClient
```objc
- (A0APIClient *)apiClient;
```
Returns an instance of the API client for Authentication API configured for your application.
```objc
A0APIClient *client = [lock apiClient];
```

#### A0Lock#newUserAPIClientWithIdToken
```objc
- (A0UserAPIClient *)newUserAPIClientWithIdToken:(NSString *)idToken;
```
Returns a new instance of the API client for Auth0 API with the credentials of a authenticated user obtained from the **id_token**
```objc
A0UserAPIClient *client = [lock newUserAPIClientWithIdToken:@"AN ID TOKEN"];
```

#### A0Lock#handleURL:sourceApplication:
```objc
- (BOOL)handleURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication;
```
Handle URL received from AppDelegate when application is called from a third party at the end of an authentication flow.
```objc
[lock handleURL:URL sourceApplication:sourceApplication];
```

#### A0Lock#registerAuthenticators
```objc
- (void)registerAuthenticators:(NSArray *)authenticators;
```
Register IdP authenticators that will be used for Social & Enterprise connections. By default all Social & Enterprise authentications are performed by using the web flow with Safari but you can plug your own authenticator for a connection. e.g.: you can register `A0FacebookAuthenticator` in order to login with FB native SDK.
```objc
[lock registerAuthenticators:@[facebook, twitter]];
```

#### A0Lock#applicationLaunchedWithOptions
```objc
- (void)applicationLaunchedWithOptions:(NSDictionary *)launchOptions;
```
Handle application launched event.
```objc
[lock applicationLaunchedWithOptions:launchOptions];
```

#### A0Lock#clearSessions
```objc
- (void)clearSessions;
```
Remove all stored sessions of any IdP in your application. If the user logged in using Safari, those sessions will not be cleaned.
```objc
[lock clearSessions];
```

### A0LockViewController

#### A0LockViewController#init
```objc
- (instancetype)initWithLock:(A0Lock *)lock;
```
Initialise 'A0LockViewController' using a `A0Lock` instance.
```objc
A0LockViewController *controller = [[A0LockViewController alloc] initWithLock:lock];
```

#### A0LockViewController#onAuthenticationBlock
```objc
@property (copy, nonatomic) void(^onAuthenticationBlock)(A0UserProfile *profile, A0Token *token);
```
Block that is called on successful authentication. It has two parameters profile and token, which will be non-nil unless login is disabled after signup.
```objc
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  NSLog(@"Auth successful: profile %@, token %@", profile, token);
};
```

#### A0LockViewController#onUserDismissBlock
```objc
@property (copy, nonatomic) void(^onUserDismissBlock)();
```
Block that is called on when the user dismisses the Login screen. Only when `closable` property is `YES`.
```objc
controller.onUserDismissBlock = ^() {
  NSLog(@"User dismissed login screen.");
};
```

#### A0LockViewController#usesEmail
```objc
@property (assign, nonatomic) BOOL usesEmail;
```
Enable the username to be treated as an email (and validated as one too) in all Auth0 screens. Default is `YES`
```objc
controller.usesEmail = NO;
```

#### A0LockViewController#closable
```objc
@property (assign, nonatomic) BOOL closable;
```
Allows the `A0LockViewController` to be dismissed by adding a button. Default is `NO`
```objc
controller.closable = YES;
```

#### A0LockViewController#loginAfterSignup
```objc
@property (assign, nonatomic) BOOL loginAfterSignUp;
```
After a successful Signup, `A0LockViewController` will attempt to login the user if this property is `YES` otherwise will call `onAuthenticationBlock` with both parameters nil. Default value is `YES`
```objc
controller.loginAfterSignup = NO;
```

#### A0LockViewController#authenticationParameters
```objc
@property (assign, nonatomic) A0AuthParameters *authenticationParameters;
```
List of optional parameters that will be used for every authentication request with Auth0 API. By default it only has  'openid' and 'offline_access' scope values. For more information check out our [Wiki](/libraries/lock-ios/sending-authentication-parameters)
```objc
controller.authenticationParameters.scopes = @[A0ScopeOfflineAccess, A0ScopeProfile];
```

### A0LockViewController#signupDisclaimerView
```objc
@property (strong, nonatomic) UIView *signUpDisclaimerView;
```
View that will appear in the bottom of Signup screen. It should be used to show Terms & Conditions of your app.
```objc
UIView *view = //..
controller.signupDisclaimerView = view;
```
#### A0LockViewController#useWebView
```objc
@property (assign, nonatomic) BOOL useWebView;
```
When the authentication requires to open a web login, for example Linkedin, it will use an embedded UIWebView instead of Safari if it's `YES`. We recommend using Safari for Authentication since it will always save the User session. This means that if the user is already signed in, for example in Linkedin, and they click on the Linkedin button, it will just work. Default values is `NO`
```objc
controller.useWebView = YES
```
