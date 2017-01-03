---
section: libraries
toc_title: Password Reset 
description: All you need to know about password reset with Lock for iOS.
---

# Lock iOS: Password Reset

You can allow the user to reset their password for any database connections. 

If you use Lock UI, you can hide or show a **Reset password** button by setting the `disableResetPassword` property, which will default to `false`.

If you implement a custom UI, you need to send a password reset email to the user using `A0APIClient`.

**NOTE**: Please see [Password Strength in Auth0 Database Connections](/connections/database/password-strength) before implementing password reset.

### Important considerations

Passwords can only be changed for users signing in using database connections. If a user is signing in with a social or enterprise connection, their password would need to be reset in those platforms.

### Examples

**Objective-C**

```objc
A0Lock *lock = [A0Lock sharedLock];
A0APIClient *client = [lock apiClient];
A0AuthParameters *params = [A0AuthParameters newDefaultParams];
params[A0ParameterConnection] = @"Username-Password-Authentication";
                                // Or your configured DB connection

[client requestChangePasswordForUsername:<user_email>
                              parameters:params
                                 success:^{
                                     NSLog(@"Please check your email!");
                                 } failure:^(NSError * _Nonnull error) {
                                     NSLog(@"Oops something went wrong: %@", error);
                                 }];
```

**Swift**

```swift
let client = A0Lock.sharedLock().apiClient()
let params = A0AuthParameters.newDefaultParams();
params[A0ParameterConnection] = "Username-Password-Authentication";
                                // Or your configured DB connection
client.requestChangePasswordForUsername(<user_email>,
    parameters: params, success: { () in
      print("Please check your email!")
    }, failure: { (error: NSError) in
      print("Oops something went wrong: \(error)")
})
```
