---
title: Using Passwordless Authentication on iOS
connection: SMS, Email & iOS Touch ID
image:
alias:
  - sms
  - email
  - ios-touchid
  - ios
---

# Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need of a password. This can vastly improve the user experience (especially on mobile applications) because users only need their email address, phone number or fingerprint when they register for your application. In addition to that they don't need to remember any password (no more reset/forgot password or using the same password everywhere).

And this also means that the email address or phone number used for authentication is automatically validated because they just used it to sign up and authenticate.

## Configuration

These connections work by using an authentication channel like SMS messages, emails our Touch ID. These connections are configured in the dashboard under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless):

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Authenticate users with a one time code via SMS

With the SMS connection users are requested to enter their phone number. After entering their phone number, Auth0 will use [Twilio](http://www.twilio.com) to send a one time code to the user. 

After entering the code in your application, the user will be created in the `sms` connection and then authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

On mobile platform authentication means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.

### Setup

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

On the **SMS (Twilio)** page under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless), enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

The `@@password@@` placeholder in the message template will be replaced with the one-time password that is sent in a text message to the user.

![](/media/articles/connections/passwordless/passwordless-sms-config.png)

### Implementation

#### Using the Auth0 Lock

The [Lock](https://github.com/auth0/Lock.iOS-OSX) is a widget allowing you to easily integrate Auth0's Passwordless Authentication in your iOS applications.

After [installing and configuring](/articles/libraries/lock-ios#install) the Lock.iOS you will be able to use it as follows:

```
A0Lock *lock = [[A0LockApplication sharedInstance] lock];
A0SMSLockViewController *controller = [lock newSMSViewController];
controller.closable = YES;
@weakify(self);
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    @strongify(self);

    // You will typically store the id_token, refresh_token and profile
    [self.keychain setString:token.idToken forKey:@"id_token"];
    [self.keychain setString:token.refreshToken forKey:@"refresh_token"];
    [self.keychain setData:[NSKeyedArchiver archivedDataWithRootObject:profile] forKey:@"profile"];

    // Continue to other view.
    [self dismissViewControllerAnimated:YES completion:^(){
        [self performSegueWithIdentifier:@"LoggedIn" sender:self];
    }];
};
[lock presentSMSController:controller fromController:self];
```

When this code runs it will start by asking the users for their phone number:

![](/media/articles/connections/passwordless/passwordless-sms-request-ios.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code.png)

Finally the users can enter the one time password in the Lock and, if correct, the user will be authenticated. This will call the `onAuthenticationBlock` where you'll typically store the `id_token`, `refresh_token` and user profile after which the user will be able to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-ios.png)

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Lock/A0HomeViewController.m).

#### Using your own UI

If you choose to build your own UI you'll need to start by asking your users for their phone number and call `startPasswordlessWithPhoneNumber` on the `A0APIClient`


```
void(^onFailure)(NSError *) = ^(NSError *error) {
    NSLog(@"Failed to send SMS code with error %@", error);
};

A0Lock *lock = ...;
A0APIClient *client = [lock apiClient];
[client startPasswordlessWithPhoneNumber:phoneNumber success:^{
    NSLog(@"SMS code sent to phone %@", phoneNumber);
    
    // Navigate to the next view.

} failure:onFailure];
```

After having started the passwordless login you will need to ask the user for the one time code and authenticate using that code:

```
void(^failureBlock)(NSError *) = ^(NSError *error) {
    NSLog(@"Failed to send SMS code with error %@", error);
};

void(^authenticatedBlock)(NSError *) = ^(A0UserProfile *profile, A0Token *token) {

    // Store token.idToken, token.refreshToken and profile
    // Continue to the authenticated part of your application
};

A0Lock *lock = ...;
A0APIClient *client = [lock apiClient];
[client loginWithPhoneNumber:phoneNumber
                    passcode:passcode
                     success:authenticatedBlock
                     failure:failureBlock];
```

Finally when the user is authenticated you'll be able to access the user profile and the tokens returned by Auth0.

## Authenticate users with a one time code via e-mail

With the e-mail connection users are requested to enter their e-mail address after which Auth0 will send an email to the user containing the one time code. 

After entering the code in your application, the user will be created in the `email` connection and then authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

On mobile platform authentication means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.

### Setup

#### 1. Optional: Configure an Email Provider

By default Auth0 will send out the emails from its own infrastructure but optionally you can [configure your own Email Provider](/articles/email/providers) to better monitor and troubleshoot the email communication

#### 2. Configure the connection

On the **Email** page under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless) you are able to configure the behavior and the contents of the email.

![](/media/articles/connections/passwordless/passwordless-email-config.png)

The email contents can be writting in HTML with the Liquid syntax, allowing you to conditionally shape the contents of the email. The following macros are available when defining the template:

 - `{{ application.name }}`
 - `{{ code }}` (the one time code)


### Implementation

#### Using the Auth0 Lock

The [Lock](https://github.com/auth0/Lock.iOS-OSX) is a widget allowing you to easily integrate Auth0's Passwordless Authentication in your iOS applications.

After [installing and configuring](/articles/libraries/lock-ios#install) the Lock.iOS you will be able to use it as follows:

```
A0Lock *lock = [[A0LockApplication sharedInstance] lock];
A0SMSLockViewController *controller = [lock newEmailViewController];
controller.closable = YES;
@weakify(self);
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    @strongify(self);

    // You will typically store the id_token, refresh_token and profile
    [self.keychain setString:token.idToken forKey:@"id_token"];
    [self.keychain setString:token.refreshToken forKey:@"refresh_token"];
    [self.keychain setData:[NSKeyedArchiver archivedDataWithRootObject:profile] forKey:@"profile"];

    // Continue to other view.
    [self dismissViewControllerAnimated:YES completion:^(){
        [self performSegueWithIdentifier:@"LoggedIn" sender:self];
    }];
};
[lock presentEmailController:controller fromController:self];
```

When this code runs it will start by asking the users for their email address:

![](/media/articles/connections/passwordless/passwordless-email-request-ios.png)

Then Auth0 will send an email to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code.png)

Finally the users can enter the one time password in the Lock and, if correct, the user will be authenticated. This will call the `onAuthenticationBlock` where you'll typically store the `id_token`, `refresh_token` and user profile after which the user will be able to continue to the authenticated part of the application.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-ios.png)

> A sample application is available in [the Lock.iOS-OSX repository on GitHub](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Lock/A0HomeViewController.m).

#### Using your own UI

If you choose to build your own UI you'll need to start by asking your users for their email address and call `startPasswordlessWithEmail` on the `A0APIClient`


```
void(^onFailure)(NSError *) = ^(NSError *error) {
    NSLog(@"Failed to send email with error %@", error);
};

A0Lock *lock = ...;
A0APIClient *client = [lock apiClient];
[client startPasswordlessWithEmail:emailAddress success:^{
    NSLog(@"One time code sent to email %@", emailAddress);
    
    // Navigate to the next view.

} failure:onFailure];
```

After having started the passwordless login you will need to ask the user for the one time code and authenticate using that code:

```
void(^failureBlock)(NSError *) = ^(NSError *error) {
    NSLog(@"Failed to send SMS code with error %@", error);
};

void(^authenticatedBlock)(NSError *) = ^(A0UserProfile *profile, A0Token *token) {

    // Store token.idToken, token.refreshToken and profile
    // Continue to the authenticated part of your application
};

A0Lock *lock = ...;
A0APIClient *client = [lock apiClient];
[client loginWithEmail:emailAddress
              passcode:passcode
               success:authenticatedBlock
               failure:failureBlock];
```

Finally when the user is authenticated you'll be able to access the user profile and the tokens returned by Auth0.

## Authenticate users with a Magic Link via e-mail

In addition to sending the user a one time code it's also possible to send a magic link to the users. This is a clickable link which will automatically sign in the user. 

MAGIC_LINK IMAGE

The next version of the iOS library will support these links through custom schemes. When users click the magic link they receive on their device it will automatically open your application and sign in the user (instead of opening the browser when clicking the link).

## Authenticate users with TouchID

A feature specific to iOS is the support for Touch ID, which allows users to authenticate with their fingerprint (biometric authentication). 

![](/media/articles/connections/passwordless/passwordless-touchid-start.png)

During sign up the library will create a user in Auth0, create a key pair on the device and then upload the public key in the user. 

The private key is stored in the keystore of the device. Each time the users try to authenticate, their fingerprint is used to retrieve fhe private key from the keystore, create a token, sign it with the private key and send it to Auth0. Auth0 will then return an `id_token`, the profile and optionally also a `refresh_token`.

> You can use Touch ID with an iPhone 5s or later, iPad Air 2, or iPad mini 3 or later.

### Implementation

#### Using the Auth0 Lock

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

#### Using your own UI

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

