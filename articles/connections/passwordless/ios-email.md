---
title: Using Passwordless Authentication on iOS with e-mails
connection: Email
image:
alias:
  - email
  - ios
---

# Authenticate users with a one time code via e-mail

<%= include('./_introduction-email', { isMobile: true }) %>

## Setup

<%= include('./_setup-email') %>

## Implementation

### Using the Auth0 Lock

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

### Using your own UI

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

## Authenticate users with a Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

The next version of the iOS library will support these links through iOS 9 Universal Links. When users click the magic link they receive on their device it will automatically open your application and sign in the user (instead of opening the browser when clicking the link).

Finally when the user is authenticated you'll be able to access the user profile and the tokens returned by Auth0.