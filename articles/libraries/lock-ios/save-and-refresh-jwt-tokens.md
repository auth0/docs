---
toc_title: Saving and Refreshing JWT Tokens
description:
---

# Lock iOS: Saving and Refreshing JWT Tokens

When an authentication is performed with the `offline_scope` included, it will return a [refresh token](/refresh-token) that can be used to request a new JWT token and avoid asking the user his/her
credentials again.

> We are using [SimpleKeychain](https://github.com/auth0/SimpleKeychain) to handle iOS Keychain access.

First thing we need to do is store the `id_token`, `refresh_token` and `profile` in the iOS Keychain after a successful authentication.

```objc
A0LockViewController *controller = [[A0LockViewController alloc] init];
@weakify(self);
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
   @strongify(self);
   SimpleKeychain *keychain = [SimpleKeychain keychainWithService:@"Auth0"];
   [keychain setString:token.idToken forKey:@"id_token"];
   [keychain setString:token.refreshToken forKey:@"refresh_token"];
   [keychain setData:[NSKeyedArchiver archivedDataWithRootObject:profile] forKey:@"profile"];

   [self dismissViewControllerAnimated:YES completion:nil];
};
[self presentViewController:controller animated:YES completion:nil];
```

Once you have that stored, you can at any point request a new `id_token` using the `refresh_token` with Auth0 API. A good moment to do this would be when you get a 401 when calling your server. This is the code snippet you need to do:

```objc
SimpleKeychain *keychain = [SimpleKeychain keychainWithService:@"Auth0"];
NSString* refreshToken = [keychain stringForKey: @"refresh_token"];
[[A0APIClient sharedClient] fetchNewIdTokenWithRefreshToken:refreshToken parameters:nil success:^(A0Token *token) {
    [keychain setString:token.idToken forKey:@"id_token"];
    //Everything its OK!
} failure:^(NSError *error) {
    [keychain clearAll];
    //refresh_token is no longer valid.
    //You should ask the user to login again!.
}];
```

If you need to show profile information in your application, just retrieve the saved profile and pick what you need. For example:

```objc
SimpleKeychain *keychain = [SimpleKeychain keychainWithService:@"Auth0"];
A0UserProfile *profile = [NSKeyedUnarchiver unarchiveObjectWithData:[keychain dataForKey:@"profile"]];
self.nameLabel.text = profile.name;
self.emailLabel.text = profile.email;
```
