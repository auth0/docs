```objc
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0APIClient *client = [lock apiClient];
[client signUpWithUsername:username
                  password:password
            loginOnSuccess:YES
                   success:^(A0UserProfile *profile, A0Token *token) {
                      [self loginTouchIDWithToken:token.idToken];
                   } failure:^(NSError *error){
                      // Handle failure
                   }];
```