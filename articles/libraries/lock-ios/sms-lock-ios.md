---
toc_title: SMS in Lock iOS
description: How to use SMS in Lock iOS
---

## SMS

`A0SMSLockViewController` authenticates without using a password with SMS. In order to be able to authenticate the user, your application must have the SMS connection enabled and configured in your [dashboard](${manage_url}/#/connections/passwordless).

First instantiate `A0SMSLockViewController` and register the authentication callback that will receive the authenticated user's credentials.

The next step is register a block to return an API Token used to register the  phone number and send the login code with SMS. This token can be generated in  [Auth0 API v2 page](/api/v2), just select the scope `create:users` and copy the generated API Token.

Finally present it to the user:
```objc
A0Lock *lock = ... //Fetch Lock from where its stored
A0SMSLockViewController *controller = [lock newSMSViewController];
controller.auth0APIToken = ^{
    return @"Copy API v2 token here";
};
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile. e.g.: save them.
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    [self dismissViewControllerAnimated:YES completion:nil];
};
[lock presentSMSController:controller fromController:self];
```

```swift
let lock = ... //Fetch Lock from where its stored
let controller = lock.newSMSViewController()
controller.auth0APIToken = {() -> String in return "Copy API v2 token here"}
controller.onAuthenticationBlock = {(profile: A0UserProfile!, token: A0Token!) -> () in
    // Do something with token & profile. e.g.: save them.
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    self.dismissViewControllerAnimated(true, completion: nil)
}
lock.presentSMSController(controller, fromController: self)
```
And you'll see SMS login screen

[![Lock.png](http://blog.auth0.com.s3.amazonaws.com/Lock-SMS-Screenshot.png)](https://auth0.com)
