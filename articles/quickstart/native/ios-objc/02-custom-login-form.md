---
title: Custom Login Form
description: This tutorial demonstrates how to perform Login and Sign Up by creating your own Login form.
budicon: 448
github:
    path: 02-Custom-Login-Form
    branch: embedded-login
---

<%= include('_includes/_hybrid_setup') %>

## Implement Database Login

${snippet(meta.snippets.setup)}

Then, add the following code to perform a login:

```objc
HybridAuth *auth = [[HybridAuth alloc] init];
[auth loginWithUsernameOrEmail:@"email@foo.com"
                      password:@"123456"
                         realm:@"Username-Password-Authentication"
                      audience:nil
                         scope:@"openid profile"
                      callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
                              if(error) {
                                  // You've got an error
                              } else {
                                  // Logged in successfully
                                  // You've got a Credentials instance, which you'll use, for example, to retrieve the User Profile
                              }
                      }];
```

That's it! You'll get either a `credentials` object or an `error` case after performing a login.

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` is an enum containing possible authentication error cases that you might want to keep track of.

::: note
For further reference on the `Credentials` object, see [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift)
:::

## Retrieve the User Profile

Once you've obtained a `Credentials` object, retrieving a user profile is quite simple. All you have to do is:

```objc
[auth userInfoWithAccessToken:[credentials accessToken]
      callback:^(NSError * _Nullable error, UserInfo * _Nullable profile) {
               dispatch_async(dispatch_get_main_queue(), ^{
                   [self.spinner stopAnimating];
                   if(error) {
                       // You've got an error
                   } else {
                       // You've got a Profile object
                   }
               });
           }];
```

::: note
For further reference on the `userInfo` object, see [UserInfo](https://github.com/auth0/Auth0.swift/blob/master/Auth0/UserInfo.swift) documentation.
:::

## Implement a Sign Up

${snippet(meta.snippets.setup)}

Next add the following:

```objc
HybridAuth *auth = [[HybridAuth alloc] init];
[auth signUpWithEmail:@"foo@email.com",
             username:nil
             password:@"123456"
           connection:@"Username-Password-Authentication"
         userMetadata:@{@"first_name": @"Foo",
                        @"last_name": @"Bar"}
                scope:@"openid profile"
           parameters:@{}
             callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
                 dispatch_async(dispatch_get_main_queue(), ^{
                     [self.spinner stopAnimating];
                     if(error) {
                         // You've got an error
                     } else {
                        // Registered successfully
                        // You've got a Credentials object
                     }
                 });
             }];
```

Notice that any extra information that you need to add to the user's profile, other than the `email` and `password`, goes within the `userMetadata` dictionary, which is passed as a parameter to this function.

## Perform Social Authentication

::: note
Please ensure you have configured your callback URL as show in [Configure Callback](/quickstart/native/ios-objc/getting-started#configure-callback-urls).
:::

Add the following function in your application's `AppDelegate`:

${snippet(meta.snippets.setup)}

```objc
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options{
    return [HybridAuth resume:url options:options];
}
```

### Web Authentication

Finally, you can now perform webAuth authentication by specifying the social connection name, for example with Facebook.

```objc
HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile" connection:@"facebook" callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
        if (error) {
            // Handle the error
        } else {
            // You've got your credentials
        }
    }];
```

Once you obtain the `credentials` object upon a successful authentication, you can deal with them as usual.
