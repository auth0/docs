```objc
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0APIClient *client = [lock apiClient];
A0AuthParameters *params = [A0AuthParameters newDefaultParams];
params[A0ParameterConnection] = kAuth0ConnectionType; // Or your configured DB connection

[client signUpWithUsername:username
                  password:password
            loginOnSuccess:YES
                parameters:params
                   success:^(A0UserProfile *profile, A0Token *token) {
                      [self loginTouchIDWithToken:token.idToken];
                   } failure:^(NSError *error){
                      // Handle failure
                   }];
```
