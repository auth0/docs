---
title: Using Passwordless Authentication on iOS with Touch ID
connection: iOS Touch ID
image: /media/connections/touchid.svg
alias:
  - ios-touchid
  - ios
---

# Authenticate users with Touch ID

A feature specific to iOS is the support for Touch ID, which allows users to authenticate with their fingerprint (biometric authentication). 

![](/media/articles/connections/passwordless/passwordless-touchid-start.png)

During sign up the library will create a user in Auth0, create a key pair on the device and then upload the public key in the user. 

![](/media/articles/connections/passwordless/passwordless-touchid-flow.png)

The private key is stored in the keystore of the device. Each time the users try to authenticate, their fingerprint is used to retrieve fhe private key from the keystore, create a token, sign it with the private key and send it to Auth0. Auth0 will then return an `id_token`, the profile and optionally also a `refresh_token`.

> You can use Touch ID with an iPhone 5s or later, iPad Air 2, or iPad mini 3 or later.

## Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.iOS-OSX', platform: 'iOS', docsUrl: 'lock-ios' }) %>

```
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0TouchIDLockViewController *controller = [lock newTouchIDViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Your user is now authenticated with Auth0
    // You'd probably want to store somewhere safe the tokens stored in "token" parameter
    [self dismissViewControllerAnimated:YES completion:nil];
};
[lock presentTouchIDController:controller fromController:self];
```

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/TouchID).

### Using your own UI

If you choose to build your own UI you'll also need to use our [TouchIDAuth](https://github.com/auth0/TouchIDAuth) library which will take care of the Touch ID specific features.

You will first start by signing up a user in a Database Connection:

```
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0APIClient *client = [lock apiClient];
[client signUpWithUsername:username
                  password:password
            loginOnSuccess:YES
                   success:^(A0UserProfile *profile, A0Token *tokenInfo) {
                       @strongify(self);
                       // Continue to next view and forward tokenInfo.idToken

                   } failure:^(NSError *error){
                      NSLog(@"Signup failed: %@", error);    
                   }];

```

> You can generate a random password to avoid asking one to the user. He can later change it.

After the user signed up, you will use the `idToken` to register the public key for the user. First you need to create a Auth0 API client with the token and store it until you register the key:

```
@property (strong, nonatomic) A0UserAPIClient *userClient;
```

```
A0Lock *lock = ... //Fetch Lock instance from where you stored it
self.userClient = [lock newUserAPIClientWithIdToken:token.idToken]
```

Now let's configure our TouchID Authentication component, first declare the following property

```
@property (strong, nonatomic) A0TouchIDAuthentication *authentication;
```

and here is how you need to configure the authentication component

```
NSString *device = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
NSString *userId = profile.userId;

A0TouchIDAuthentication *authentication = [[A0TouchIDAuthentication alloc] init];
authentication.registerPublicKey = ^(NSData *pubKey, A0RegisterCompletionBlock completed, A0ErrorBlock errored) {
    void(^registerBlock)() = ^{
        [self.userClient registerPublicKey:pubKey device:device user:userId success:^{
            completed();
        } failure:^(NSError *error) {
            errored(error);
        }];
    };
    [self.userClient removePublicKeyOfDevice:device user:userId success:^{
        registerBlock();
    } failure:^(NSError *error) {
        registerBlock();
    }];
};

authentication.jwtPayload = ^{
    return @{
             @"iss": userId,
             @"device": device,
            };
};

authentication.authenticate = ^(NSString *jwt, A0ErrorBlock block) {
    A0AuthParameters *parameters = [A0AuthParameters newWithDictionary:@{      
       A0ParameterConnection: @"{NAME_OF_MY_DB_CONNECTION}",
       A0ScopeProfile: @"openid name email nickname"
    }];

    [client loginWithIdToken:jwt deviceName:deviceName parameters:parameters success:^(A0UserProfile *profile, A0Token *token) {
        // User is authenticated with Auth0 & TouchID
    } failure:^(NSError *error){
        block(error);
    }];
};
authentication.onError = ^(NSError *error) {
    // Handle authentication error
};

self.authentication = authentication;
```

Then to start authentication, just add this line

```
[self.authentication start];
``` 

> [The Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Pod/Classes/TouchID) shows in detail how the same flow was used to build the UI of the Lock.iOS - you can use this as an example if you wish to build your own UI for Touch ID authentication.

