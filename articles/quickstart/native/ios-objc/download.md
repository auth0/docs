To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
auth0.samples.Auth0Sample://${account.namespace}/ios/auth0.samples.Auth0Sample/callback
```
2) Set the **Allowed Logout URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
auth0.samples.Auth0Sample://${account.namespace}/ios/auth0.samples.Auth0Sample/callback
```
3) Open `Auth0Sample.xcworkspace` in [Xcode](https://developer.apple.com/xcode/). 

4) Click the `Run` button or select the menu option `Product | Run ` or keyboard shortcut `CMD + R`.
