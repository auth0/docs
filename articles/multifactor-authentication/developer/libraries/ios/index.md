---
toc_title: Getting Started with Guardian for iOS
url: /multifactor-authentication/developer/libraries/ios
description: Installation, usage, and configuration options guide for Guardian for iOS
---

# Guardian for iOS
The Guardian for iOS Software Development Kit allows developers to create iOS apps with Guardian functionality, providing easy and secure access to multifactor authentication with push notifications. For example, this toolkit gives you the power to build a 'white label' version of the Guardian application for your users, using your own look-and-feel.

More information can be found on Guardian [here](/multifactor-authentication/guardian). For general multifactor discussion, read more [here](/multifactor-authentication).

Get started using Guardian for iOS below, or, if you're looking for a specific document, try the listing of [additional documents](#additional-documents) related to Guardian for iOS.

## Requirements

The Guardian iOS SDK requires iOS 9.3+ or Swift 3.

## Installation

The Guardian iOS SDK is available through CocoaPods. To install it, simply add the following line to your Podfile:

```
pod "GuardianSDK", "~> 0.1.0"
```

## Dashboard Settings

To enable Guardian Push Notifications for your users, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard. Then toggle the **Push Notification** slider to enable it.

![](/media/articles/mfa/guardian-dashboard.png)

## Using the SDK
`Guardian` is the core of the SDK. Import the library:

```swift
import Guardian
```

Set the domain for your specific tenant/url:

```swift
let domain = "tenant.guardian.auth0.com"
```

### Enroll

The link between the second factor (an instance of your app on a device) and an Auth0 account is referred to as an enrollment.

You can create an enrollment using the `Guardian.enroll` function. Obtain the enrollment information by scanning the Guardian QR code, and then use it to enroll the account:
```swift
let enrollmentUriFromQr: String = ... // the URI obtained from a Guardian QR code
let apnsToken: String = ... // the APNS token of this device, where notifications will be sent

Guardian
        .enroll(forDomain: domain, usingUri: enrollmentUriFromQr, notificationToken: apnsToken)
        .start { result in
            switch result {
            case .success(let enrollment): 
                // success, we have the enrollment data available
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

You must provide the `notificationToken`. This is the token required to send push notifications to the device using the Apple Push Notification service (APNs). Refrence their [docs](https://developer.apple.com/go/?id=push-notifications) for more information.

The notification token MUST be a String containing the 64 bytes (expressed in hexadecimal format) received on `application(:didRegisterForRemoteNotificationsWithDeviceToken)`

### Unenroll

To disable multifactor authentication you can delete the enrollment:
```swift
Guardian
        .api(forDomain: domain)
        .device(forEnrollmentId: enrollment.id, token: enrollment.deviceToken)
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

### Allow a login request

Once you have the enrollment in place, you will receive a push notification for each validation.

Guardian provides a method to parse the data received from APNs and return a `Notification` instance ready to be used.

For example, your `AppDelegate` might have something like this:

```swift
func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
    // when the app is open and we receive a push notification

    if let notification = Guardian.notification(from: userInfo) {
        // we have received a Guardian push notification
    }
}
```

Once you have the notification instance, you can easily approve the authentication request by using the `allow` method. You'll also need the enrollment that you obtained previously. If there are multiple enrollments, be sure to use the one that has the same `id` as the notification (the `enrollmentId` property).

```swift
Guardian
        .authentication(forDomain: domain, andEnrollment: enrollment)
        .allow(notification: notification)
        .start { result in
            switch result {
            case .success: 
                // success, the enrollment was deleted
            case .failure(let cause):
                // something failed, check cause to see what went wrong
            }
        }
```

### Reject a login request

To deny an authentication request, use `reject` instead. You can optionally add a reason for the rejection, which will be available in the guardian logs.

```swift
Guardian
        .authentication(forDomain: domain, andEnrollment: enrollment)
        .reject(notification: notification)
        // or reject(notification: notification, withReason: "hacked")
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

<ul>
<li>
<span><a href="https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html">Getting Started with Apple Push Notification Service</a></span>
</li>
<% _.forEach(_.sortBy(articles.findByHash('multifactor-authentication/developer/libraries/android').items, 'toc_title'), function(article) { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- '/docs' + article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>
