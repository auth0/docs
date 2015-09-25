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

The [Lock](https://github.com/auth0/Lock.iOS-OSX) is a widget allowing you to easily integrate Auth0's Passwordless Authentication in your iOS applications.

After [installing and configuring](/articles/libraries/lock-ios#install) the Lock.iOS you will be able to use it as follows:

```
- (void)showLogin {
    A0TouchIDLockViewController *controller = [[A0TouchIDLockViewController alloc] init];
    controller.closable = NO;
    @weakify(self);
    controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
        @strongify(self);
        [self.keychain setString:token.idToken forKey:@"id_token"];
        [self onSuccess];
        [self dismissViewControllerAnimated:YES completion:nil];
    };
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:controller];
    [self presentViewController:navController animated:YES completion:nil];
}

- (NSString *)publicKeyTag {
    return [[[NSBundle mainBundle] bundleIdentifier] stringByAppendingString:@".pubkey"];
}

- (NSString *)privateKeyTag {
    return [[[NSBundle mainBundle] bundleIdentifier] stringByAppendingString:@".key"];
}

- (void)onSuccess {
    NSString *idToken = [self.keychain stringForKey:@"id_token"];
    if (idToken) {
        self.jwtLabel.text = idToken;
        A0RSAKeyExporter *exporter = [[A0RSAKeyExporter alloc] init];
        A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:@"TouchIDAuthentication"];
        NSData *pubKey = [keychain dataForRSAKeyWithTag:[self publicKeyTag]];
        NSData *privKey = [keychain dataForRSAKeyWithTag:[self privateKeyTag]];
        self.publicKeyTextView.text = [[NSString alloc] initWithData:[exporter exportPublicKey:pubKey] encoding:NSUTF8StringEncoding];
        self.privateKeyTextView.text = [privKey base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength|NSDataBase64EncodingEndLineWithCarriageReturn];
    }
}
```

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Examples/TouchID).

### Using your own UI

If you choose to build your own UI you'll also need to use our [TouchIDAuth](https://github.com/auth0/TouchIDAuth) library which will take care of the Touch ID specific features.

You will first start by signing up a user in a Database Connection:

```
A0APIClient *client = [self a0_apiClientFromProvider:self.lock];
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

After the user signed up, you should use the `idToken` to register the public key with the user:

```
    NSString *deviceName = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    NSString *userId = profile.userId;

    A0TouchIDAuthentication *authentication = [[A0TouchIDAuthentication alloc] init];
    authentication.registerPublicKey = ^(NSData *pubKey, A0RegisterCompletionBlock completed, A0ErrorBlock errored) {
        void(^registerBlock)() = ^{
            [userClient registerPublicKey:pubKey device:deviceName user:userId success:^{
                completed();
            } failure:^(NSError *error) {
                NSLog(@"Failed to add pk with error %@", error);
                errored(error);
            }];
        };
        [userClient removePublicKeyOfDevice:deviceName user:userId success:^{
            registerBlock();
        } failure:^(NSError *error) {
            NSLog(@"Failed to remove with error %@", error);
            registerBlock();
        }];
    };
    
    authentication.jwtPayload = ^{
        return @{
                 @"iss": userId,
                };
    };

    authentication.authenticate = ^(NSString *jwt, A0ErrorBlock block) {
        A0AuthParameters *parameters = [A0AuthParameters newWithDictionary:@{      
           A0ParameterConnection: @"{NAME_OF_MY_DB_CONNECTION}",
           A0ScopeProfile: @"openid name email nickname"
        }];

        [client loginWithIdToken:jwt deviceName:deviceName parameters:parameters success:^(A0UserProfile *profile, A0Token *token) {
            NSLog(@"Authenticated with JWT & TouchID!");
            self.user = [[User alloc] initWithTokens:token andProfile:profile];
            [self performSegueWithIdentifier:@"ShowLoginCompleteScreen" sender:self];
        } failure:^(NSError *error){
            NSLog(@"Failed to authenticate with error %@", error);
            block(error);
        }];
    };
    authentication.onError = ^(NSError *error) {
        NSLog(@"Authentication with TouchID has failed!");
    };
    self.authentication = authentication;
    [self.authentication start];
```

> [The Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/tree/master/Pod/Classes/TouchID) shows in detail how the same flow was used to build the UI of the Lock.iOS - you can use this as an example if you wish to build your own UI for Touch ID authentication.

