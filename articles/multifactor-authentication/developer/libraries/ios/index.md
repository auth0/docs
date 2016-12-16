---
toc_title: Getting Started with Guardian for iOS
url: /multifactor-authentication/developer/libraries/ios
description: Installation, usage, and configuration options guide for Guardian for iOS
---

# Guardian for iOS
The [Guardian for iOS Software Development Kit](https://github.com/auth0/GuardianSDK.iOS) allows developers to create iOS apps with Guardian functionality, providing easy and secure access to multifactor authentication with push notifications. For example, this toolkit gives you the power to build a 'white label' version of the Guardian application for your users, using your own look-and-feel.

More information can be found on Guardian [here](/multifactor-authentication/guardian). For general multifactor discussion, read more [here](/multifactor-authentication).

Get started using Guardian for iOS below, or, if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Guardian for iOS.

## Requirements

The Guardian iOS SDK requires iOS 9.3+ and Swift 3.

## Installation

#### CocoaPods

Guardian.swift is available through [CocoaPods](http://cocoapods.org). 
To install it, simply add the following line to your Podfile:

```ruby
pod "Guardian"
```

#### Carthage

In your Cartfile add this line

```
github "auth0/Guardian.swift"
```

## Dashboard Settings

To enable Guardian Push Notifications for your users, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

![](/media/articles/mfa/guardian-dashboard.png)

## SNS configuration

For your native application to receive push notifications from Guardian, you will need to override the default SNS settings. Follow the instructions [here](/multifactor-authentication/developer/sns-configuration).

## Using the SDK

`Guardian` is the core of the SDK. To get things going you'll have to import the library:

```swift
import Guardian
```

Then you'll need the Auth0 Guarduan domain for your account:

```swift
let domain = "{YOUR_ACCOUNT_NAME}.guardian.auth0.com"
```

### Enroll

An enrollment is a link between the second factor and an Auth0 account. When an account is enrolled
you'll need it to provide the second factor required to verify the identity.

For an enrollment you need the following things, besides your Guardian Domain:

- Enrollment Uri: The value encoded in the QR Code scanned from Guardian Web Widget or in your enrollment ticket sent to you, e.g. by email.
- APNS Token: Apple APNS token for the device and **MUST** be a `String`containing the 64 bytes (expressed in hexadecimal format)
- Key Pair: A RSA (Private/Public) key pair used to assert your identity with Auth0 Guardian

> In case your app is not yet using push notifications or you're not familiar with it, you should check their [docs](https://developer.apple.com/go/?id=push-notifications).

after your have all of them, you can enroll your device

```swift
Guardian
        .enroll(forDomain: "{YOUR_GUARDIAN_DOMAIN}",
                usingUri: "{ENROLLMENT_URI}",
                notificationToken: "{APNS_TOKEN}",
                keyPair: keyPair)
        .start { result in
            switch result {
            case .success(let enrollment): 
                // success, we have the enrollment data available
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

On success you'll obtain the enrollment information, that should be secured stored in your application. This information includes the enrollment identifier, and the token for Guardian API associated to your device for updating or deleting your enrollment.

#### RSA key pair

Guardian.swift provides a convenience class to generate an RSA key pair and store it in iOS Keychain.

```swift
let rsaKeyPair = RSAKeyPair.new(
    usingPublicTag: "com.auth0.guardian.enroll.public",
    privateTag: "com.auth0.guardian.enroll.private"
    )
```

> The tags should be unique since it's the identifier of each key inside iOS Keychain. 

> Since the keys are already secured stored inside iOS Keychain, you olny need to store the identifiers

### Allow a login request

Once you have the enrollment in place, you will receive a push notification every time the user has to validate their identity with MFA.

Guardian provides a method to parse the data received from APNs and return a `Notification` instance ready to be used.

```swift
if let notification = Guardian.notification(from: notificationPayload) {
    // we have received a Guardian push notification
}
```

Once you have the notification instance, you can easily allow the authentication request by using
the `allow` method. You'll also need the enrollment that you obtained previously.
In case you have more than one enrollment, you'll have to find the one that has the same `id` as the
notification (the `enrollmentId` property).

```swift
Guardian
        .authentication(forDomain: "{YOUR_GUARDIAN_DOMAIN}", andEnrollment: enrollment)
        .allow(notification: notification)
        .start { result in
            switch result {
            case .success: 
                // the auth request was successfuly allowed
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

### Reject a login request

To deny an authentication request just call `reject` instead. You can also send a reject reason if
you want. The reject reason will be available in the guardian logs.

```swift
Guardian
        .authentication(forDomain: "{YOUR_GUARDIAN_DOMAIN}", andEnrollment: enrollment)
        .reject(notification: notification)
        // or reject(notification: notification, withReason: "hacked")
        .start { result in
            switch result {
            case .success: 
                // the auth request was successfuly rejected
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

### Unenroll

If you want to delete an enrollment -for example if you want to disable MFA- you can make the
following request:

```swift
Guardian
        .api(forDomain: "{YOUR_GUARDIAN_DOMAIN}")
        .device(forEnrollmentId: "{USER_ENROLLMENT_ID}", token: "{ENROLLMENT_DEVICE_TOKEN}")
        .delete()
        .start { result in
            switch result {
            case .success: 
                // success, the enrollment was deleted
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

## Additional Documents

* [Configuring Amazon SNS with Guardian](/multifactor-authentication/developer/sns-configuration)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
