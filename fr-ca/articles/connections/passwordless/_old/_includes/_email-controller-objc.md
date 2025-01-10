```objc
A0Lock *lock = ... //Fetch Lock instance from where you stored it
A0EmailLockViewController *controller = [lock newEmailViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Your user is now authenticated with Auth0
    // You'd probably want to store somewhere safe the tokens stored in "token" parameter
    [self dismissViewControllerAnimated:YES completion:nil];
};
[lock presentEmailController:controller fromController:self];
```
