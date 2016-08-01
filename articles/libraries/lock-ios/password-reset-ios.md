---
toc_title: Password Reset 
description: All you need to know about password reset in iOS
---

# Lock iOS: Password Reset

## Introduction
You can allow the user to reset the password for any database connections. 
We strongly suggest reading [this article](/connections/database/password-strength) before implementing this.

If you use Lock UI you can hide or show a "Reset password" button by setting property `disableResetPassword`, which default value is set to `false`.
If you implement your custom UI you need to send a password reset email to a user using `A0APIClient`.

## Important considerations
Please note that passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those platforms.

## Code snippets

### Objective-C version

```objc
A0Lock *lock = [A0Lock sharedLock];
A0APIClient *client = [lock apiClient];
A0AuthParameters *params = [A0AuthParameters newDefaultParams];
params[A0ParameterConnection] = @"Username-Password-Authentication"; // Or your configured DB connection

[client requestChangePasswordForUsername:<user_email>
                              parameters:params
                                 success:^{
                                     NSLog(@"Please check your email!");
                                 } failure:^(NSError * _Nonnull error) {
                                     NSLog(@"Oops something went wrong: %@", error);
                                 }];
```

### Swift version

```swift
let client = A0Lock.sharedLock().apiClient()
let params = A0AuthParameters.newDefaultParams();
params[A0ParameterConnection] = "Username-Password-Authentication";// Or your configured DB connection
client.requestChangePasswordForUsername(<user_email>,
    parameters: params, success: { () in
      print("Please check your email!")
    }, failure: { (error: NSError) in
      print("Oops something went wrong: \(error)")
})
```



