---
section: libraries
title: Lock Passwordless for iOS
description: Using Passwordless authentication with Lock for iOS v2
---
# Lock Passwordless for iOS

::: warning
Passwordless on native platforms is disabled by default for new tenants as of 8 June 2017. If you would like this feature enabled, please contact support to discuss your use case. See [Client Grant Types](/clients/client-grant-types) for more information. Alternatively, you can use Lock Passwordless on Auth0's [Hosted Login Page](/hosted-pages/login).
:::

Lock Passwordless handles passwordless authentication using email and sms connections.

To show Lock, add the following snippet in your `UIViewController`.

```swift
Lock
    .passwordless()
    // withConnections, withOptions, withStyle, and so on.
    .onAuth { credentials in
      // Save the Credentials object
    }
    .present(from: self)
```

**Notes:**

- Passwordless can only be used with a single connection and will prioritize the use of email connections over SMS.
- The `audience` option is not available in Passwordless.

### Passwordless Method

When using Lock Passwordless the default `passwordlessMethod` is `.code` which sends the user a one time passcode to login. If you want to use [Universal Links](/clients/enable-universal-links) you can add the following:

```swift
.withOptions {
    $0.passwordlessMethod = .magicLink
}
```

### Activity callback

If you are using Lock Passwordless and have specified the `.magicLink` option to send the user a universal link then you will need to add the following to your `AppDelegate.swift`:

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
    return Lock.continueAuth(using: userActivity)
}
```