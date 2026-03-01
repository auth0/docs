```objc
void(^failure)(NSError *) = ^(NSError *error) {
    // Handle error
};

void(^success)(A0UserProfile *, A0Token *) = ^(A0UserProfile *profile, A0Token *token) {
    // Your user is now authenticated with Auth0
    // You'd probably want to store somewhere safe the tokens stored in "token" parameter
};

A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0APIClient *client = [lock apiClient];
[client loginWithEmail:email
              passcode:passcode
              parameters:nil
               success:success
               failure:failure;]
```
