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

After entering the code in your application, the user will be created in the `sms` connection and authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)

On mobile platform authentication means your application will receive an `id_token`, the user profile and optionally also a `refresh_token`.

### Setup

#### 1. Open an account with Twilio

You will need a [Twilio Account SID](https://www.twilio.com/help/faq/twilio-basics/what-is-an-application-sid) and a [Twilio Auth Token](https://www.twilio.com/help/faq/twilio-basics/what-is-the-auth-token-and-how-can-i-change-it). These are the Twilio API credentials that Auth0 will use to send an SMS to the user.

#### 2. Configure the connection

On the **SMS (Twilio)** page on Auth0, enter your **Twilio Account SID** and **Auth Token**. Enter the **From** phone number users will see as the sender of the SMS (also configurable in Twilio) and a **message**.

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

    // Store token.idToken, token.refresh_token and profile
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