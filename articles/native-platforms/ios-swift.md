---
title: iOS Swift Tutorial
name: iOS - Swift
alias:
  - ios
  - iphone
  - ipad
  - swift
  - touchid
language:
  - Swift
hybrid: false
image: /media/platforms/ios.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/ios-swift/dependencies
  setup: native-platforms/ios-swift/setup
  use: native-platforms/ios-swift/use
alias:
  - ios
---

## iOS Swift Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**
### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Auth0 dependencies

Add the following to the `Podfile` and run `pod install`:

${snippet(meta.snippets.dependencies)}

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 2. Configuring your Swift project to use an ObjC library

Since [CocoaPods 0.36](http://blog.cocoapods.org/CocoaPods-0.36/) you can build any library as a Cocoa Touch framework. This allows to import them directly in your swift files like this:

```swift
import Lock
```

To enable this feature, there is a line at the top level of the `Podfile` (outside any target definition):

```ruby
use_frameworks!
```

> If you dont want to use this feature please read [this guide](/libraries/lock-ios/swift).

### 3. Configure Auth0 Lock for iOS

Add the following entries to your app's `Info.plist`:

<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>Auth0ClientId</td>
    <td>${account.clientId}</td>
  </tr>
  <tr>
    <td>Auth0Domain</td>
    <td>${account.namespace}</td>
  </tr>
</table>

Also you'll need to register a new _URL Type_ with the following scheme
`a0${account.clientId}`. You can do it from your app's target Info section.

![Url type register](https://cloudup.com/cwoiCwp7ZfA+)

The next step is to create and configure an instance of `A0Lock` with your Auth0 credentials from `Info.plist`. We are going to do this in a custom object called `MyApplication`.

${snippet(meta.snippets.setup)}

> You can create `A0Lock` in any other class, even in your AppDelegate, the only requirement is that you keep it in a **strong** reference.

### 4. Register Native Authentication Handlers

First in your AppDelegate method `application:didFinishLaunchingWithOptions:` add the following lines:

```swift
let lock = MyApplication.sharedInstance.lock
lock.applicationLaunchedWithOptions(launchOptions)
```

Then to allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following method:

```swift
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    let lock = MyApplication.sharedInstance.lock
    return lock.handleURL(url, sourceApplication: sourceApplication)
}
```

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to __step #5__

**IMPORTANT**: Before you continue to the next section, please check that you have enabled and correctly configured the social connection with your own credentials in the [Dashboard](${uiURL}/#/connections/social)

#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info:

First, add the following entries to the `Info.plist`:

<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>FacebookAppID</td>
    <td>YOUR_FACEBOOK_APP_ID</td>
  </tr>
  <tr>
    <td>FacebookDisplayName</td>
    <td>YOUR_FACEBOOK_DISPLAY_NAME</td>
  </tr>
</table>

Then, register a custom URL Type with the format `fb<FacebookAppID>`.

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started) and [Obtaining an App ID and App Secret for Facebook](/connections/social/facebook).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Here's an example of how the entries should look like:

![FB plist](https://cloudup.com/cYOWHbPp8K4+)

Then add Lock Facebook's Pod

```ruby
pod 'Lock-Facebook', '~> 2.0'
```

Click on the `Pods` project and select `Lock-Facebook` target and set `Allow Non-modular Includes In Framework Modules` to Yes:

![Lock.png](/media/articles/native-platforms/ios-swift/Facebook-Config-Screenshot.png)

After that, where you initialize `A0Lock`, import `LockFacebook` module

```swift
import LockFacebook
```

And register it with `A0Lock`:

```swift
let facebook = A0FacebookAuthenticator.newAuthenticatorWithDefaultPermissions()
lock.registerAuthenticators([facebook])
```

#### Twitter

First add Lock Twitter's Pod

```ruby
pod 'Lock-Twitter', '~> 1.0'
```

After that, where you initialize `A0Lock`, import `LockTwitter` module

```swift
import LockTwitter
```

And register it with `A0Lock`:

```swift
let apiKey = ... //Remember to obfuscate your api key
let apiSecret = ... //Remember to obfuscate your api secret
let twitter = A0TwitterAuthenticator.newAuthenticationWithKey(apiKey, andSecret:apiSecret)
lock.registerAuthenticators([twitter])
}
```

> For more information on how to configure this, please check [Obtaining Consumer and Secret Keys for Twitter](/connections/social/twitter).

### 5. Let's implement the login
Now we're ready to implement the Login. We can instantiate `A0LockController` and present it as a modal screen. In one of your controllers instantiate the native widget and present it as a modal screen:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/ios-swift/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> Or you can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid)

On successful authentication, `onAuthenticationBlock` will yield the user's profile and tokens.

> To learn how to save and manage the tokens and profile, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens)

### 7. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information:

```swift
  self.usernameLabel.text = profile.name
  self.emailLabel.text = profile.email
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile or you can check [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h). Please note that some of this depend on the social provider being used.

### 8. We're done

You've implemented Login and Signup with Auth0 in iOS. You're awesome!

> You can also <a href="/native-mobile-samples/master/create-package?path=iOS/profile-sample-swift&type=replace&filePath=iOS/profile-sample-swift/ProfileSample/Info.plist${account.clientParam}">download</a> our sample project that shows how to store/update your user profile with Auth0
