# Lock iOS: Authentication Options

By default, Lock handles every social authentication through Safari (this is also known as *Web Login*). However, you can enable *native* login for some social connections. Currently, we are providing native integration support for [**Facebook**](#Facebook) and [**Google**](#Google). Next up, you'll find out how to configure each of those.

## Facebook

> First, make sure you take a look at this guide: [Configuring your Facebook App](/connections/social/facebook). For further information, please check the official [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started) for Facebook Developers.

> **Note:** The Facebook app you use should match the one set in your [Facebook's Connection Settings](${uiURL}/#/connections/social) in your Auth0 account.

Add the following entries to the `Info.plist`:

<table class="table">
  <thead>

```
<tr>
  <th>Key</th>
  <th>Value</th>
</tr>
```

  </thead>
  <tr>

```
<td>FacebookAppID</td>
<td>YOUR_FACEBOOK_APP_ID</td>
```

  </tr>
  <tr>

```
<td>FacebookDisplayName</td>
<td>YOUR_FACEBOOK_DISPLAY_NAME</td>
```

  </tr>
</table>

Then, register a custom *URL Type* with the format `fb<FacebookAppID>`. 

Here is an example of how these entries should look like:

![Plist Example](/media/articles/libraries/lock-ios/plist2.png)

Then, copy the following keys to the `Info.plist`.

> To open this file in Source Code mode within Xcode, **Control-Click** (or right click) on it, select **Open As**, **Source Code**.

Paste them inside the main `<dict>` key:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>facebook.com</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
        <key>fbcdn.net</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
        <key>akamaihd.net</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
    </dict>
</dict>
<key>LSApplicationQueriesSchemes</key>
<array>
        <string>fbapi</string>
        <string>fb-messenger-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
</array>
```

> **Note:** these entries enable compatibility with iOS 9. You can get more information about this in Facebook's developer portal: [Preparing your apps for iOS 9](https://developers.facebook.com/docs/ios/ios9).

Then, add Lock Facebook's Pod to the `Podfile`, and run `pod install`:

```ruby
pod 'Lock-Facebook', '~> 2.1'

post_install do |installer|
    installer.pods_project.build_configurations.each { |bc|
        bc.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
    }
end
```

After that, anywhere before presenting the Lock login widget, import the `LockFacebook` module:

```swift
import LockFacebook
```

And register it in `A0Lock`, using this code snippet:

```swift
let facebook = A0FacebookAuthenticator.newAuthenticatorWithDefaultPermissions()
A0Lock.sharedLock().registerAuthenticators([facebook])
```

That's it.

## Google

Google authentication uses [Google Sign-In](https://developers.google.com/identity/sign-in/ios/) iOS library. In consequence, you would need to register your iOS application in [Google Developer Console](https://console.developers.google.com/project) in order to get your `clientId`. However, we recommend following [this wizard](https://developers.google.com/mobile/add?platform=ios) instead, and downloading the file `GoogleServices-Info.plist` that is generated at the end.

Once you've got that file, add it to your application's target and register two custom URLs for your app:

- The first URL should have a scheme equal to your application Bundle Identifier.
- The second URL should be your Google `clientId` reversed (so, if your `clientId` is `CLIENTID.apps.googleusercontent.com`, then the scheme will be `com.googleusercontent.apps.CLIENTID`).

> This last value can be found in `GoogleServices-Info.plist` under the key `REVERSED_CLIENT_ID`
> For more information please check Google's [documentation](https://developers.google.com/identity/sign-in/ios/)

Finally, go to your [Social Connections Dashboard](${uiURL}/#/connections/social), select **Google** and add your `clientID` to the field named `Allowed Mobile Client IDs`.

That's it.